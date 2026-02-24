import os

def cleanup_backslashes():
    file_path = 'src/data/products.ts'
    if not os.path.exists(file_path):
        return

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Logika pembersihan backslash yang berlebihan
    # Mengubah literal backslash ganda atau tunggal yang merusak tampilan menjadi format \n yang benar
    res = content.replace("\\\\\\n", "\\n")
    res = res.replace("\\\\n", "\\n")
    res = res.replace("\\\n", "\\n")
    
    # Menghapus backslash yang menempel di akhir baris yang tidak sengaja terbuat
    res = res.replace("\\\n", "\n") 

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(res)
    print("Berhasil membersihkan kelebihan backslash di products.ts!")

if __name__ == "__main__":
    cleanup_backslashes()