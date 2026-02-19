import re

def clean_and_polish(text, lang):
    if not text: return ""
    
    # 1. Hapus karakter escaping yang rusak
    # Kita harus berhati-hati jangan sampai menghapus \n yang valid
    text = text.replace("\\\\n", "\n").replace("\\n", "\n")
    # Hapus karakter \ tunggal yang tertinggal di akhir baris (biasanya karena kesalahan skrip sebelumnya)
    text = re.sub(r'\\\n', '\n', text)
    text = text.replace("\\", "")
    
    # 2. Bersihkan simbol markdown agar tampilan lebih natural di teks biasa
    text = text.replace("### ", "").replace("**", "")
    
    # 3. Terjemahkan sisa-sisa kata Indonesia di tengah kalimat
    if lang == 'en':
        replacements = {
            "dan": "and", "lain-lain": "others", "lain lainnya": "others", "lainnya": "others",
            "nasi": "rice", "kue": "cake", "roti": "bread", "ayam": "chicken", "goreng": "fried",
            "berbagai": "various", "macam": "types", "pilihan": "choices", "warna": "colors"
        }
    else:
        replacements = {
            "dan": "和", "lain-lain": "其他", "lainnya": "其他",
            "nasi": "米饭", "kue": "蛋糕", "roti": "面包", "ayam": "鸡肉", "goreng": "炸"
        }
        
    for id_word, target in replacements.items():
        # Case insensitive regex replacement
        text = re.sub(rf'\b{id_word}\b', target, text, flags=re.IGNORECASE)
        
    return text.strip()

def run_polish():
    file_path = 'src/data/products.ts'
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    def update_block(match):
        key = match.group(1)
        val = match.group(2)
        
        lang = 'en' if '_en' in key else 'zh'
        # Kembalikan ke bentuk raw line breaks sebelum diproses
        raw_val = val.replace("\\n", "\n")
        new_val = clean_and_polish(raw_val, lang)
        
        # Simpan kembali dengan escape sequence JS yang benar
        safe_val = new_val.replace("'", "\\'").replace("\n", "\\n")
        return f"    {key}: '{safe_val}',"

    # Mencari kolom-kolom terjemahan yang sudah ada
    pattern = re.compile(r'    (name_en|name_zh|variant_en|variant_zh|description_en|description_zh): \'(.*?)\',')
    new_content = pattern.sub(update_block, content)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Data produk telah dibersihkan dan siap digunakan!")

if __name__ == "__main__":
    run_polish()