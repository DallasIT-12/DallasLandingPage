import re

BULK_MAP = {
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
}

def translate_block(text, lang):
    if not text: return ""
    translated = text
    for original, target in BULK_MAP[lang].items():
        translated = translated.replace(original, target)
    return translated

def migrate_products():
    with open('src/data/products.ts', 'r', encoding='utf-8') as f:
        content = f.read()

    # Split into product objects more safely
    items = content.split('  {\n')
    header = items[0]
    footer = items[-1].split('];')[1]
    items[-1] = items[-1].split('];')[0]
    
    new_items = []
    for item in items[1:]:
        # Extract fields using simple string search
        try:
            name = item.split("name: '")[1].split("'")[0]
            desc = item.split("description: '")[1].split("',")[0]
            
            variant = ""
            if "variant: '" in item:
                variant = item.split("variant: '")[1].split("'")[0]
            
            # Basic AI Mapping for titles
            name_en = name.replace('Kotak', 'Box').replace('isi', 'Count').replace('Motif', 'Patterned')
            name_zh = name.replace('Kotak', '盒子').replace('isi', '装').replace('Motif', '图案')
            
            desc_en = translate_block(desc, 'en')
            desc_zh = translate_block(desc, 'zh')
            
            variant_en = variant.replace('Putih', 'White').replace('Hitam', 'Black').replace('Merah', 'Red')
            variant_zh = variant.replace('Putih', '白色').replace('Hitam', '黑色').replace('Merah', '红色')

            # Build the new translation block
            translations = f"    name_en: '{name_en}',\n    name_zh: '{name_zh}',\n    variant_en: '{variant_en}',\n    variant_zh: '{variant_zh}',\n    description_en: '{desc_en}',\n    description_zh: '{desc_zh}',\n"
            
            # Insert before category
            if "category:" in item:
                parts = item.split("category:")
                new_item = parts[0] + translations + "    category:" + parts[1]
                new_items.append(new_item)
            else:
                new_items.append(item)
        except Exception as e:
            new_items.append(item) # fallback

    final_content = header + "  {\n" + "  {\n".join(new_items) + "];" + footer
    
    with open('src/data/products.ts', 'w', encoding='utf-8') as f:
        f.write(final_content)
    print("Successfully migrated products with block translations!")

if __name__ == "__main__":
    migrate_products()