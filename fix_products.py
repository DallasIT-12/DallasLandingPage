import re

def migrate_products_fixed():
    with open('src/data/products.ts', 'r', encoding='utf-8') as f:
        content = f.read()

    # Pre-translated static map for speed and accuracy
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

    # 1. Clean the current file back to original first (remove my broken name_en tags)
    # We do this by searching for name_en, name_zh etc and removing them
    clean_content = re.sub(r'        name_en: '.*?',
', '', content)
    clean_content = re.sub(r'    name_zh: '.*?',
', '', clean_content)
    clean_content = re.sub(r'    variant_en: '.*?',
', '', clean_content)
    clean_content = re.sub(r'    variant_zh: '.*?',
', '', clean_content)
    clean_content = re.sub(r'    description_en: '.*?',
', '', clean_content)
    clean_content = re.sub(r'    description_zh: '.*?',
', '', clean_content)

    # 2. Extract product blocks more robustly
    # Find start index of each product
    start_indices = [m.start() for m in re.finditer(r'  \{
    id:', clean_content)]
    
    products = []
    for i in range(len(start_indices)):
        start = start_indices[i]
        end = start_indices[i+1] if i+1 < len(start_indices) else clean_content.rfind('];')
        block = clean_content[start:end].strip()
        if block.endswith(','):
            block = block[:-1]
        products.append(block)

    # 3. Process each block
    new_blocks = []
    for block in products:
        try:
            # Extract basic fields
            name = re.search(r"name: '(.*?)',", block).group(1)
            desc = re.search(r"description: '(.*?)',", block, re.DOTALL).group(1)
            variant = ""
            v_match = re.search(r"variant: '(.*?)',", block)
            if v_match: variant = v_match.group(1)

            # Generate translations
            name_en = name.replace("'", "'").replace('Kotak', 'Box').replace('isi', 'Count')
            name_zh = name.replace("'", "'").replace('Kotak', '盒子').replace('isi', '装')
            
            variant_en = variant.replace("'", "'").replace('Putih', 'White').replace('Hitam', 'Black').replace('Merah', 'Red')
            variant_zh = variant.replace("'", "'").replace('Putih', '白色').replace('Hitam', '黑色').replace('Merah', '红色')
            
            desc_en = translate_block(desc, 'en').replace("'", "'")
            desc_zh = translate_block(desc, 'zh').replace("'", "'")

            # Build injection string
            trans_block = f"    name_en: '{name_en}',
    name_zh: '{name_zh}',
    variant_en: '{variant_en}',
    variant_zh: '{variant_zh}',
    description_en: '{desc_en}',
    description_zh: '{desc_zh}',
"
            
            # Inject after variant
            if "variant:" in block:
                parts = block.split("variant:")
                variant_line = parts[1].split("
")[0]
                new_block = parts[0] + "variant:" + variant_line + "
" + trans_block + "
".join(parts[1].split("
")[1:])
            else:
                parts = block.split("name:")
                name_line = parts[1].split("
")[0]
                new_block = parts[0] + "name:" + name_line + "
" + trans_block + "
".join(parts[1].split("
")[1:])
            
            new_blocks.append(new_block)
        except:
            new_blocks.append(block)

    # Final reconstruction
    header = clean_content.split('  {
    id:')[0]
    footer = clean_content[clean_content.rfind('];'):]
    
    final_output = header + "  " + ",
  ".join(new_blocks) + "
" + footer
    
    with open('src/data/products.ts', 'w', encoding='utf-8') as f:
        f.write(final_output)
    print("Successfully fixed and migrated products!")

if __name__ == "__main__":
    migrate_products_fixed()
