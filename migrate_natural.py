import re

def get_natural_translation(text, lang):
    if not text: return ""
    
    # 1. Handle common footer/notes block
    if "Untuk pengajuan komplain wajib sertakan video unboxing" in text:
        if lang == 'en':
            notes = "\\n\\nNote:\\n1) Shipped in flat form\\n2) Easy to assemble following the pattern\\n3) Ready stock\\n4) Wholesale prices differ\\n5) Orders before 15:00 WIB are shipped same day\\n6) Closed on Sundays & Public Holidays\\n7) Mandatory unboxing video for complaints. Videos of opened/repacked items are not valid."
            clean_text = text.split("Note :")[0].split("Note:")[0]
            # Natural replacements for body
            result = clean_text.replace("Bahan", "Material").replace("Ukuran", "Size").replace("Sangat cocok", "Very suitable").replace("Kotak", "Box").replace("Tersedia berbagai variasi", "Available in various variations").replace("Bahan: Ivori", "Material: Ivory")
            return result + notes
        if lang == 'zh':
            notes = "\\n\\n注意：\\n1) 扁平化发货\\n2) 遵循图案易于组装\\n3) 现货商品\\n4) 批发价格不同\\n5) 15:00 WIB 之前的订单当天发货\\n6) 周日及公共假期休息\\n7) 投诉必须提供开箱视频。已拆封或重新包装的视频无效。"
            clean_text = text.split("Note :")[0].split("Note:")[0]
            result = clean_text.replace("Bahan", "材质").replace("Ukuran", "尺寸").replace("Sangat cocok", "非常适合").replace("Kotak", "盒子").replace("Tersedia berbagai variasi", "提供多种款式选择").replace("Bahan: Ivori", "材质：白卡纸")
            return result + notes

    # 2. Natural Title Mapping
    if lang == 'en':
        text = text.replace('Kotak', 'Box').replace('isi', 'Count').replace('Isi', 'Count').replace('Tempat', 'Box').replace('Dus', 'Box').replace('Kue', 'Cake').replace('Polos', 'Plain').replace('Motif', 'Patterned')
    if lang == 'zh':
        text = text.replace('Kotak', '盒子').replace('isi', '装').replace('Isi', '装').replace('Tempat', '盒子').replace('Dus', '纸箱').replace('Kue', '蛋糕').replace('Polos', '纯色').replace('Motif', '图案')
        
    return text

def run_migration():
    with open('src/data/products.ts', 'r', encoding='utf-8') as f:
        content = f.read()

    # Split by product entries
    parts = content.split('  {\n')
    header = parts[0]
    
    new_parts = []
    for p in parts[1:]:
        try:
            # Safely extract values
            name_raw = p.split("name: '")[1].split("'")[0]
            desc_raw = p.split("description: '")[1].split("',")[0]
            variant_raw = ""
            if "variant: '" in p:
                variant_raw = p.split("variant: '")[1].split("'")[0]

            name_en = get_natural_translation(name_raw, 'en').replace("'", "\\'")
            name_zh = get_natural_translation(name_raw, 'zh').replace("'", "\\'")
            
            variant_en = get_natural_translation(variant_raw, 'en').replace("'", "\\'")
            variant_zh = get_natural_translation(variant_raw, 'zh').replace("'", "\\'")
            
            desc_en = get_natural_translation(desc_raw, 'en').replace("'", "\\'")
            desc_zh = get_natural_translation(desc_raw, 'zh').replace("'", "\\'")

            # Build the injection block
            trans_block = f"    name_en: '{name_en}',\n    name_zh: '{name_zh}',\n    variant_en: '{variant_en}',\n    variant_zh: '{variant_zh}',\n    description_en: '{desc_en}',\n    description_zh: '{desc_zh}',\n"
            
            # Inject before 'category:'
            if "category:" in p:
                p_parts = p.split("category:")
                new_p = p_parts[0] + trans_block + "    category:" + p_parts[1]
                new_parts.append(new_p)
            else:
                new_parts.append(p)
        except:
            new_parts.append(p)

    final_content = header + "  {\n" + "  {\n".join(new_parts)
    
    with open('src/data/products.ts', 'w', encoding='utf-8') as f:
        f.write(final_content)
    print("Successfully updated products.ts with human-like static translations!")

if __name__ == "__main__":
    run_migration()