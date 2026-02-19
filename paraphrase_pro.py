import re

def escape_js_string(text):
    if not text: return ""
    # Clean and safe escaping for JS string
    res = text.replace("\\", "\\\\")
    res = res.replace("'", "\\'")
    res = res.replace("\n", "\\n")
    return res

def paraphrase_en(text):
    if not text: return ""
    
    # Core paraphrasing logic for English
    text = text.replace("Untuk pengajuan komplain wajib sertakan video unboxing (video saat buka paket) dari sebelum paket terbuka sampai selesai.", 
                        "**Customer Care:** A complete unboxing video (starting from the sealed package) is mandatory for any quality claims.")
    text = text.replace("Video setelah paket terbuka atau dibungkus ulang TIDAK BERLAKU.", 
                        "Note: Videos taken after the package has been opened or repacked will not be accepted.")
    text = text.replace("Dimohon kerja samanya agar komplain dapat diproses.", 
                        "Thank you for your cooperation in helping us process your request efficiently.")
    text = text.replace("Keterlambatan dan kerusakan (terlipat, sobek, basah akibat hujan/ banjir) yang disebabkan kesalahan jasa pengiriman diluar tanggung jawab kami.",
                        "**Disclaimer:** Delays or physical damage (folds, tears, or moisture) incurred during transit are handled by the courier service and are beyond our responsibility.")
    
    # Common Terms
    text = text.replace("Harga yang tertera adalah harga per 20Pcs", "Pricing: Price listed is for 20 pieces")
    text = text.replace("Harga yang tertera untuk 1pcs", "Pricing: Unit price per 1 piece")
    text = text.replace("Dikirim dalam bentuk flat/ datar", "Delivery: Shipped flat to ensure safety and space efficiency.")
    text = text.replace("Box dapat dibentuk dengan mudah, hanya dengan mengikuti pola yang sudah ada", "Assembly: Easy-to-fold design; simply follow the pre-defined creases.")
    text = text.replace("Barang ready stok", "Status: Ready Stock Available")
    text = text.replace("Pembelian grosir harga beda", "Wholesale: Bulk order discounts available.")
    text = text.replace("Pembelian sebelum jam 15.00 WIB dikirim hari yang sama", "Shipping: Orders confirmed before 3:00 PM WIB are dispatched the same day.")
    text = text.replace("Hari Minggu & Tanggal Merah toko libur", "Operating Hours: Closed on Sundays and Public Holidays.")
    
    # Refined Headings
    text = text.replace("Bahan:", "**Material:**").replace("Ukuran:", "**Specifications:**").replace("Sangat cocok untuk:", "**Perfect for:**")
    text = text.replace("Note :", "\n---\n**Ordering Information:**")
    
    return text

def paraphrase_zh(text):
    if not text: return ""
    
    # Core paraphrasing logic for Mandarin
    text = text.replace("Untuk pengajuan komplain wajib sertakan video unboxing (video saat buka paket) dari sebelum paket terbuka sampai selesai.", 
                        "**售后保障：** 申请售后请务必提供从包裹未拆封状态开始的完整开箱视频。")
    text = text.replace("Video setelah paket terbuka atau dibungkus ulang TIDAK BERLAKU.", 
                        "注意：包裹一经拆封或重新包装后的视频将视为无效。")
    text = text.replace("Dimohon kerja samanya agar komplain dapat diproses.", 
                        "感谢您的理解与配合，以便我们尽快为您处理。")
    text = text.replace("Keterlambatan dan kerusakan (terlipat, sobek, basah akibat hujan/ banjir) yang disebabkan kesalahan jasa pengiriman diluar tanggung jawab kami.",
                        "**免责声明：** 运输中的延误或货物损坏（折叠、撕裂、受潮等）属物流公司责任，不属于本店售后范围。")
    
    # Common Terms
    text = text.replace("Harga yang tertera adalah harga per 20Pcs", "价格：所列价格为20个的价格")
    text = text.replace("Harga yang tertera untuk 1pcs", "价格：单价为1个的价格")
    text = text.replace("Dikirim dalam bentuk flat/ datar", "配送：扁平化发货，节省空间并确保运输安全。")
    text = text.replace("Box dapat dibentuk dengan mudah, hanya dengan mengikuti pola yang sudah ada", "组装：折叠简便，只需按照预设压痕操作即可。")
    text = text.replace("Barang ready stok", "状态：现货供应")
    text = text.replace("Pembelian grosir harga beda", "批发：大宗采购提供额外折扣。")
    text = text.replace("Pembelian sebelum jam 15.00 WIB dikirim hari yang sama", "发货：15:00 WIB 前下单的订单将于当天发货。")
    text = text.replace("Hari Minggu & Tanggal Merah toko libur", "营业时间：周日及公共假期店休。")
    
    # Refined Headings
    text = text.replace("Bahan:", "**材质：**").replace("Ukuran:", "**规格：**").replace("Sangat cocok untuk:", "**适用场景：**")
    text = text.replace("Note :", "\n---\n**订购须知：**")
    
    return text

def run_paraphrase():
    file_path = 'src/data/products.ts'
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    def update_block(match):
        key = match.group(1)
        val = match.group(2)
        
        # Unescape common sequences for processing
        raw_val = val.replace("\\n", "\n").replace("\\'", "'")
        
        if '_en' in key:
            new_val = paraphrase_en(raw_val)
            return f"    {key}: '{escape_js_string(new_val)}',"
        if '_zh' in key:
            new_val = paraphrase_zh(raw_val)
            return f"    {key}: '{escape_js_string(new_val)}',"
        return match.group(0)

    pattern = re.compile(r'    (name_en|name_zh|variant_en|variant_zh|description_en|description_zh): \'(.*?)\',')
    
    new_content = pattern.sub(update_block, content)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Professional Paraphrase COMPLETED!")

if __name__ == "__main__":
    run_paraphrase()