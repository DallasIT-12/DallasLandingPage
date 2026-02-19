import re

def escape_js_string(text):
    if not text: return ""
    # Clean and safe escaping for JS string
    res = text.replace("\\", "\\\\")
    res = res.replace("'", "\\'")
    res = res.replace("\n", "\\n")
    return res

def get_natural_translation(text, lang):
    if not text: return ""
    
    # 1. Block Translation for Headers & Common Phrases
    if lang == 'en':
        text = text.replace("MOHON DIBACA DULU DESKRIPSINYA", "PLEASE READ THE DESCRIPTION CAREFULLY")
        text = text.replace("Spesifikasi:", "Specifications:")
        text = text.replace("Warna Putih Polos", "Plain White Color")
        text = text.replace("DETAIL UKURAN:", "SIZE DETAILS:")
        text = text.replace("Harga yang tertera untuk isi", "Price listed is for count of")
        text = text.replace("Sangat cocok untuk", "Very suitable for")
        text = text.replace("Bahan:", "Material:")
        text = text.replace("Ukuran:", "Size:")
        text = text.replace("Tersedia berbagai variasi", "Available in various variations")
    elif lang == 'zh':
        text = text.replace("MOHON DIBACA DULU DESKRIPSINYA", "请仔细阅读说明")
        text = text.replace("Spesifikasi:", "规格:")
        text = text.replace("Warna Putih Polos", "纯白色")
        text = text.replace("DETAIL UKURAN:", "尺寸详情:")
        text = text.replace("Harga yang tertera untuk isi", "所列价格为装箱数")
        text = text.replace("Sangat cocok untuk", "非常适合用于")
        text = text.replace("Bahan:", "材质:")
        text = text.replace("Ukuran:", "尺寸:")
        text = text.replace("Tersedia berbagai variasi", "提供多种款式选择")

    # 2. Handle common footer/notes block
    if "Untuk pengajuan komplain wajib sertakan video unboxing" in text:
        if lang == 'en':
            notes = "\n\nNote:\n1) Shipped in flat form\n2) Easy to assemble following the pattern\n3) Ready stock\n4) Wholesale prices differ\n5) Orders before 15:00 WIB are shipped same day\n6) Closed on Sundays & Public Holidays\n7) Mandatory unboxing video for complaints. Videos of opened/repacked items are not valid."
            clean_text = text.split("Note :")[0].split("Note:")[0]
            # Avoid repeating header if already handled
            return clean_text.strip() + notes
        if lang == 'zh':
            notes = "\n\n注意：\n1) 扁平化发货\n2) 遵循图案易于组装\n3) 现货商品\n4) 批发价格不同\n5) 15:00 WIB 之前的订单当天发货\n6) 周日及公共假期休息\n7) 投诉必须提供开箱视频。已拆封或重新包装的视频无效。"
            clean_text = text.split("Note :")[0].split("Note:")[0]
            return clean_text.strip() + notes

    # 3. Titles / Names Natural Mapping
    if lang == 'en':
        text = text.replace('Kotak', 'Box').replace('isi', 'Count').replace('Isi', 'Count').replace('Tempat', 'Box').replace('Dus', 'Box').replace('Kue', 'Cake').replace('Polos', 'Plain').replace('Motif', 'Patterned').replace('Laminasi', 'Laminated')
    if lang == 'zh':
        text = text.replace('Kotak', '盒子').replace('isi', '装').replace('Isi', '装').replace('Tempat', '盒子').replace('Dus', '纸箱').replace('Kue', '蛋糕').replace('Polos', '纯色').replace('Motif', '图案').replace('Laminasi', '层压')
        
    return text

def run_safe_migration():
    file_path = 'src/data/products.ts'
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Regex pattern to find each product block
    product_pattern = re.compile(r'(\{\n\s+id: \'.*?\',[\s\S]*?slug: \'.*?\'\n\s+\})')
    
    def add_translations(match):
        block = match.group(1)
        try:
            # Check if it already has translation fields to avoid duplication or nested messes
            # But since we want to OVERWRITE with the better logic, we first clean the block
            clean_block = re.sub(r'\s+name_en: \'.*?\',', '', block)
            clean_block = re.sub(r'\s+name_zh: \'.*?\',', '', clean_block)
            clean_block = re.sub(r'\s+variant_en: \'.*?\',', '', clean_block)
            clean_block = re.sub(r'\s+variant_zh: \'.*?\',', '', clean_block)
            clean_block = re.sub(r'\s+description_en: \'.*?\',', '', clean_block)
            clean_block = re.sub(r'\s+description_zh: \'.*?\',', '', clean_block)

            name_match = re.search(r"name: '(.*?)',", clean_block)
            name = name_match.group(1) if name_match else ""
            
            desc_match = re.search(r"description: '(.*?)',", clean_block, re.DOTALL)
            desc = desc_match.group(1) if desc_match else ""
            
            variant_match = re.search(r"variant: '(.*?)',", clean_block)
            variant = variant_match.group(1) if variant_match else ""

            # Generate translations
            n_en = get_natural_translation(name, 'en')
            n_zh = get_natural_translation(name, 'zh')
            v_en = get_natural_translation(variant, 'en')
            v_zh = get_natural_translation(variant, 'zh')
            d_en = get_natural_translation(desc, 'en')
            d_zh = get_natural_translation(desc, 'zh')

            # Build injection block
            trans = f"\n    name_en: '{escape_js_string(n_en)}',\n"
            trans += f"    name_zh: '{escape_js_string(n_zh)}',\n"
            trans += f"    variant_en: '{escape_js_string(v_en)}',\n"
            trans += f"    variant_zh: '{escape_js_string(v_zh)}',\n"
            trans += f"    description_en: '{escape_js_string(d_en)}',\n"
            trans += f"    description_zh: '{escape_js_string(d_zh)}',"
            
            return clean_block.replace("    category:", trans + "\n    category:")
        except:
            return block

    new_content = product_pattern.sub(add_translations, content)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Migrasi BERHASIL. Terjemahan natural yang lebih lengkap sudah masuk ke products.ts!")

if __name__ == "__main__":
    run_safe_migration()
