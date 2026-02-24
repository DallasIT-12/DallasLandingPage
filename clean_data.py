import re

def clean_products_file():
    file_path = 'src/data/products.ts'
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    # Kita hanya simpan baris yang BUKAN kolom terjemahan buatan saya
    new_lines = []
    for line in lines:
        if any(key in line for key in ['name_en:', 'name_zh:', 'variant_en:', 'variant_zh:', 'description_en:', 'description_zh:']):
            continue
        new_lines.append(line)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.writelines(new_lines)
    print("Berhasil membersihkan file products.ts dari kolom rusak.")

if __name__ == "__main__":
    clean_products_file()
