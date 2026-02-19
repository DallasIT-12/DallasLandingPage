import re

def escape_js_string(text):
    if not text: return ""
    res = text.replace("\\", "\\\\")
    res = res.replace("'", "\\'")
    res = res.replace("\n", "\\n")
    return res

def get_pro_translation(text, lang):
    if not text: return ""
    
    mappings = {
        "en": {
            "MOHON DIBACA DULU DESKRIPSINYA": "### PRODUCT DETAILS & ORDERING GUIDELINES",
            "KERTAS NASI / WRAPPING PAPER / KERTAS KEBAB / KERTAS BURGER PREMIUM": "RICE PAPER / WRAPPING PAPER / KEBAB PAPER / PREMIUM BURGER PAPER",
            "Tampil lebih elegan dan profesional dengan kemasan terbaru yang terbuat dari bahan Premium Food Grade": "Look more elegant and professional with the latest packaging made from Premium Food Grade materials",
            "aman, higienis, dan tahan panas": "safe, hygienic, and heat resistant",
            "Cocok untuk kemasan makanan maupun non-makanan": "Suitable for food and non-food packaging",
            "Kelebihan Produk:": "Product Advantages:",
            "aman untuk makanan panas": "safe for hot foods",
            "Tahan panas & minyak": "Heat & oil resistant",
            "tidak tembus keluar": "does not leak out",
            "Bahan premium 40 GSM": "Premium 40 GSM material",
            "kuat, rapi, dan berkualitas": "strong, neat, and quality",
            "Serbaguna": "Versatile",
            "cocok juga untuk pakaian, sepatu, dan aksesoris": "also suitable for clothing, shoes, and accessories",
            "Tampilan elegan": "Elegant appearance",
            "meningkatkan kesan profesional produk Anda": "enhances the professional impression of your product",
            "Pilihan Ukuran:": "Size Options:",
            "Ketebalan semua ukuran sama: 40 GSM": "The thickness of all sizes is the same: 40 GSM",
            "Cocok digunakan untuk:": "Suitable for:",
            "Nasi bungkus": "Wrapped rice",
            "ORDER SEKARANG dan tingkatkan nilai jual produk Anda!": "ORDER NOW and increase the selling value of your product!",
            "tersedia berbagai macam ukuran": "available in various sizes",
            "Harga yang tertera untuk 1pack": "Price listed is for 1 pack",
            "Dikirim dalam bentuk flat/datar": "Shipped in flat form for safety",
            "Box dapat dibentuk dengan mudah, hanya dengan mengikuti pola yang sudah ada": "The box is easy to assemble; simply follow the pre-defined creases.",
            "Barang ready stok": "Items are ready in stock",
            "Pembelian grosir harga beda": "Wholesale discounts are available for bulk orders.",
            "Pembelian sebelum jam 12.00 WIB dikirim hari yang sama": "Orders before 12:00 PM are shipped same-day.",
            "Hari Minggu & tanggal merah toko tutup": "Closed on Sundays and Public Holidays.",
            "Untuk Pengajuan Komplain Wajib sertakan VIDEO unboxing": "For complaints, a complete unboxing video is mandatory.",
            "Video setelah paket terbuka atau dibungkus ulang pengajuan Tidak Berlaku": "Claims are NOT VALID if the package has been opened or repacked before filming.",
            "Dimohon kerja samanya agar komplain dapat diproses": "Thank you for your cooperation so that we can process your request efficiently.",
            "Keterlambatan dan kerusakan": "Delays and damages",
            "yang disebabkan kesalahan jasa pengiriman": "caused by shipping service errors",
            "diluar tanggung jawab kami": "are beyond our responsibility"
        },
        "zh": {
            # Chinese mappings remain similar
            "MOHON DIBACA DULU DESKRIPSINYA": "### 产品详情与订购须知",
            "KERTAS NASI": "米纸",
            "Kelebihan Produk:": "产品优势:",
            "Ukuran :": "尺寸:",
            "Note :": "订购须知:",
            "Bahan :": "材质:"
        }
    }

    translated = text
    # Prioritize longer phrases
    sorted_keys = sorted(mappings[lang].keys(), key=len, reverse=True)
    for key in sorted_keys:
        pattern = re.compile(re.escape(key), re.IGNORECASE)
        translated = pattern.sub(mappings[lang][key], translated)
    
    # Simple word cleanups for remaining words
    if lang == 'en':
        translated = translated.replace('dan lainnya', 'and others').replace('dan lain lain', 'and others').replace('dan', 'and')
    
    return translated

def run_final_migration():
    file_path = 'src/data/products.ts'
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    product_pattern = re.compile(r'(\{\n\s+id: \'.*?\',[\s\S]*?slug: \'.*?\'\n\s+\})')
    
    def replace_callback(match):
        block = match.group(1)
        try:
            # CLEAN FIRST
            clean_block = re.sub(r'\s+(name_en|name_zh|variant_en|variant_zh|description_en|description_zh): \'.*?\',', '', block)

            name = re.search(r"name: '(.*?)',", clean_block).group(1)
            desc = re.search(r"description: '([\s\S]*?)',", clean_block).group(1)
            variant = ""
            v_match = re.search(r"variant: '(.*?)',", clean_block)
            if v_match: variant = v_match.group(1)

            n_en = get_pro_translation(name, 'en')
            n_zh = get_pro_translation(name, 'zh')
            v_en = get_pro_translation(variant, 'en')
            v_zh = get_pro_translation(variant, 'zh')
            d_en = get_pro_translation(desc, 'en')
            d_zh = get_pro_translation(desc, 'zh')

            trans = f"\n    name_en: '{escape_js_string(n_en)}',\n"
            trans += f"    name_zh: '{escape_js_string(n_zh)}',\n"
            trans += f"    variant_en: '{escape_js_string(v_en)}',\n"
            trans += f"    variant_zh: '{escape_js_string(v_zh)}',\n"
            trans += f"    description_en: '{escape_js_string(d_en)}',\n"
            trans += f"    description_zh: '{escape_js_string(d_zh)}',"
            
            return clean_block.replace("    category:", trans + "\n    category:")
        except:
            return block

    new_content = product_pattern.sub(replace_callback, content)
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("MIGRASI FINAL SELESAI DENGAN ENTER YANG RAPI!")

if __name__ == "__main__":
    run_final_migration()
