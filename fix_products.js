const fs = require('fs');
const path = require('path');

const BULK_MAP = {
    "en": {
        "Note :": "Note:",
        "Harga yang tertera untuk 1pcs": "Price listed is for 1 piece",
        "Dikirim dalam bentuk flat/ datar": "Shipped in flat form",
        "Box dapat dibentuk dengan mudah, hanya dengan mengikuti pola yang sudah ada": "The box can be easily assembled by following the existing pattern",
        "Barang ready stok": "Ready stock items",
        "Pembelian grosir harga beda": "Wholesale purchases have different prices",
        "Pembelian sebelum jam 15.00 WIB dikirim hari yang sama": "Purchases before 15:00 WIB are shipped on the same day",
        "Hari Minggu & Tanggal Merah toko libur": "Sundays & Public Holidays the shop is closed",
        "Untuk pengajuan komplain wajib sertakan video unboxing (video saat buka paket) dari sebelum paket terbuka sampai selesai.": "For complaints, it is mandatory to include an unboxing video (video during package opening) from before the package is opened until finished.",
        "Video setelah paket terbuka atau dibungkus ulang TIDAK BERLAKU.": "Videos after the package is opened or repacked are NOT VALID.",
        "Dimohon kerja samanya agar komplain dapat diproses.": "Please cooperate so that complaints can be processed.",
        "Keterlambatan dan kerusakan (terlipat, sobek, basah akibat hujan/ banjir) yang disebabkan kesalahan jasa pengiriman diluar tanggung jawab kami.": "Delays and damage (folded, torn, wet due to rain/flood) caused by shipping service errors are beyond our responsibility.",
        "Bahan: Ivori": "Material: Ivory",
        "Tersedia berbagai variasi": "Various variations available",
        "Cocok sekali sebagai wadah popcorn": "Perfectly suitable as a popcorn container",
        "Sangat cocok untuk": "Very suitable for",
        "Kualitas premium dengan bahan terbaik": "Premium quality with the best materials"
    },
    "zh": {
        "Note :": "注意：",
        "Harga yang tertera untuk 1pcs": "所列价格为1件的价格",
        "Dikirim dalam bentuk flat/ datar": "以扁平形式发货",
        "Box dapat dibentuk dengan mudah, hanya dengan mengikuti pola yang sudah ada": "只需遵循现有图案即可轻松组装盒子",
        "Barang ready stok": "现货商品",
        "Pembelian grosir harga beda": "批发购买价格不同",
        "Pembelian sebelum jam 15.00 WIB dikirim hari yang sama": "15:00 WIB 之前的购买当天发货",
        "Hari Minggu & Tanggal Merah toko libur": "周日及公共假期休息",
        "Untuk pengajuan komplain wajib sertakan video unboxing (video saat buka paket) dari sebelum paket terbuka sampai selesai.": "投诉时必须附上开箱视频（拆包过程中的视频），从包裹未拆封到拆封完成。",
        "Video setelah paket terbuka atau dibungkus ulang TIDAK BERLAKU.": "拆封后或重新包装后的视频无效。",
        "Dimohon kerja samanya agar komplain dapat diproses.": "请配合以便处理投诉。",
        "Keterlambatan dan kerusakan (terlipat, sobek, basah akibat hujan/ banjir) yang disebabkan kesalahan jasa pengiriman diluar tanggung jawab kami.": "因运输服务错误造成的延误和损坏（折叠、撕裂、因雨/洪水受潮）不属于我们的责任范围。",
        "Bahan: Ivori": "材质：白卡纸",
        "Tersedia berbagai variasi": "提供多种变体",
        "Cocok sekali sebagai wadah popcorn": "非常适合作为爆米花容器",
        "Sangat cocok untuk": "非常适合用于",
        "Kualitas premium dengan bahan terbaik": "采用优质材料，品质卓越"
    }
};

function translateBlock(text, lang) {
    if (!text) return "";
    let translated = text;
    for (const [original, target] of Object.entries(BULK_MAP[lang])) {
        translated = translated.split(original).join(target);
    }
    return translated;
}

const filePath = path.join(__dirname, 'src/data/products.ts');
const content = fs.readFileSync(filePath, 'utf8');

// 1. Clean the current content from any previous broken fields
const cleanContent = content
    .replace(/        name_en: '.*?',
/g, '')
    .replace(/    name_zh: '.*?',
/g, '')
    .replace(/    variant_en: '.*?',
/g, '')
    .replace(/    variant_zh: '.*?',
/g, '')
    .replace(/    description_en: '.*?',
/g, '')
    .replace(/    description_zh: '.*?',
/g, '');

// 2. Identify all products
const productRegex = /\{
\s+id: '.*?',
\s+productSlug: '.*?',
\s+name: '.*?',[\s\S]*?slug: '.*?'
\s+\}/g;
const products = cleanContent.match(productRegex);

if (!products) {
    console.error("No products found!");
    process.exit(1);
}

const newProducts = products.map(block => {
    try {
        const name = block.match(/name: '(.*?)',/)[1];
        const desc = block.match(/description: '([\s\S]*?)',/)[1];
        const variantMatch = block.match(/variant: '(.*?)',/);
        const variant = variantMatch ? variantMatch[1] : "";

        const name_en = name.replace(/Kotak/g, 'Box').replace(/isi/g, 'Count').replace(/'/g, "'");
        const name_zh = name.replace(/Kotak/g, '盒子').replace(/isi/g, '装').replace(/'/g, "'");
        
        const variant_en = variant.replace(/Putih/g, 'White').replace(/Hitam/g, 'Black').replace(/'/g, "'");
        const variant_zh = variant.replace(/Putih/g, '白色').replace(/Hitam/g, '黑色').replace(/'/g, "'");

        const desc_en = translateBlock(desc, 'en').replace(/'/g, "'");
        const desc_zh = translateBlock(desc, 'zh').replace(/'/g, "'");

        const transBlock = `    name_en: '${name_en}',
    name_zh: '${name_zh}',
    variant_en: '${variant_en}',
    variant_zh: '${variant_zh}',
    description_en: '${desc_en}',
    description_zh: '${desc_zh}',
`;

        if (block.includes("variant:")) {
            return block.replace(/variant: '.*?',
/, match => match + transBlock);
        } else {
            return block.replace(/name: '.*?',
/, match => match + transBlock);
        }
    } catch (e) {
        return block;
    }
});

const header = cleanContent.split(/\{
\s+id:/)[0];
const footer = cleanContent.substring(cleanContent.lastIndexOf('}') + 1);

const finalOutput = header + newProducts.join(',
  ') + footer;

fs.writeFileSync(filePath, finalOutput, 'utf8');
console.log("Successfully fixed and migrated all products using Node.js!");
