import re

def escape_js_string(text):
    if not text: return ""
    # Safe manual escaping for JS string literals in .ts file
    res = text.replace("\\", "\\\\")
    res = res.replace("'", "\\'")
    res = res.replace("\n", "\\n")
    return res

def rewrite_en(text):
    if not text: return ""
    # Clearer usage descriptions
    text = re.sub(r"(Box|Kotak).*?tersedia.*?berbagai.*?macam.*?ukuran.*?", "Premium quality packaging available in various professional sizes.", text, flags=re.IGNORECASE)
    text = re.sub(r"Cocok untuk.*?kentang.*?", "Perfectly designed for serving french fries, snacks, and other culinary delights.", text, flags=re.IGNORECASE)
    text = re.sub(r"menggunakan bahan yang aman.*?", "Manufactured using high-grade, food-safe materials to ensure hygiene and durability.", text, flags=re.IGNORECASE)
    
    # Vocabulary scrubbing
    subs = {"dan": "and", "yg": "which", "yang": "which", "untuk": "for", "tempat": "container", "ukuran": "size", "dan lainnya": "and others"}
    for k, v in subs.items(): text = re.sub(rf"\b{k}\b", v, text, flags=re.IGNORECASE)

    policy = (
        "\\n---\\n"
        "### ORDERING & SHIPPING POLICY\\n"
        "• **Packaging:** Shipped flat to prevent damage and optimize logistics.\\n"
        "• **Assembly:** Tool-free design; easily folds along pre-scored lines.\\n"
        "• **Dispatch:** Orders confirmed before 3:00 PM are shipped same-day.\\n"
        "• **Operating Hours:** Warehouse closed on Sundays and Public Holidays.\\n\\n"
        "**QUALITY ASSURANCE:**\\n"
        "Please record a **clear unboxing video** from sealed to open. Claims without video proof or on repacked items cannot be accepted."
    )
    if "Note:" in text or "Information:" in text:
        text = text.split("Note:")[0].split("Information:")[0].strip() + policy
    return text

def rewrite_zh(text):
    if not text: return ""
    text = re.sub(r"(Box|Kotak).*?tersedia.*?berbagai.*?macam.*?ukuran.*?", "高品质包装盒，提供多种专业规格选择。", text, flags=re.IGNORECASE)
    text = re.sub(r"Cocok untuk.*?kentang.*?", "非常适合装薯条、零食、吐司及各类美食。", text, flags=re.IGNORECASE)
    text = re.sub(r"menggunakan bahan yang aman.*?", "采用食品级安全材质，确保卫生耐用。", text, flags=re.IGNORECASE)
    
    policy = (
        "\\n---\\n"
        "### 订购与发货须知\\n"
        "• **物流包装：** 扁平化发货，防止运输损坏并节省运费。\\n"
        "• **产品组装：** 简单易用，按预设压痕折叠即可。\\n"
        "• **发货时效：** 下午 3:00 前的订单将于当天发出。\\n"
        "• **售后保障：** 签收时请务必拍摄**完整开箱视频**。无视频证明或包裹已拆封重新包装将无法受理售后。"
    )
    if "注意：" in text or "须知:" in text:
        text = text.split("注意：")[0].split("须知:")[0].strip() + policy
    return text

def run_v3_migration():
    file_path = 'src/data/products.ts'
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    def update_block(match):
        key = match.group(1)
        val = match.group(2)
        raw_val = val.replace("\\n", "\n").replace("\\'", "'")
        if '_en' in key: return f"    {key}: '{escape_js_string(rewrite_en(raw_val))}',"
        if '_zh' in key: return f"    {key}: '{escape_js_string(rewrite_zh(raw_val))}',"
        return match.group(0)

    pattern = re.compile(r'    (name_en|name_zh|variant_en|variant_zh|description_en|description_zh): \'(.*?)\',')
    new_content = pattern.sub(update_block, content)
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("MIGRASI V3 BERHASIL!")

if __name__ == "__main__":
    run_v3_migration()