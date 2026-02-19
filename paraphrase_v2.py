import re

def escape_js_string(text):
    if not text: return ""
    res = text.replace("\\", "\\\\")
    res = res.replace("'", "\\'")
    res = res.replace("\n", "\\n")
    return res

def pro_copywriting_en(text):
    if not text: return ""
    # Header
    text = text.replace("PLEASE READ THE DESCRIPTION CAREFULLY", "### PRODUCT DETAILS & ORDERING GUIDELINES")
    # Specifications
    text = text.replace("Specifications:", "\n**Product Specifications:**")
    text = text.replace("- Material:", "• **Material:**")
    text = text.replace("- Foodgrade", "• **Safety:** Food-Grade Certified")
    text = text.replace("Plain White Color", "• **Color:** Elegant Plain White")
    text = text.replace("SIZE DETAILS:", "\n**Dimensions:**")
    # Application
    text = text.replace("Very suitable for", "\n**Ideal Applications:**\nPerfectly suited for")
    
    policy = (
        "\\n---\\n"
        "### ORDERING INFORMATION\\n"
        "• **Packaging:** Shipped flat to ensure maximum safety and space efficiency during transit.\\n"
        "• **Assembly:** User-friendly design; easily folds along pre-defined lines without tools.\\n"
        "• **Inventory:** Guaranteed Ready Stock for immediate dispatch.\\n"
        "• **Bulk Orders:** Wholesale pricing available for high-volume purchases.\\n"
        "• **Shipping:** Orders confirmed before 3:00 PM WIB are dispatched the same business day.\\n"
        "• **Operating Hours:** Mon–Sat (Closed on Sundays and Public Holidays).\\n\\n"
        "**CUSTOMER CARE & CLAIMS:**\\n"
        "To ensure a smooth resolution for any issues, a **complete unboxing video** (from sealed to open) is required. Claims without valid video proof or on repacked items cannot be processed. We appreciate your cooperation."
    )
    if "Note:" in text:
        text = text.split("Note:")[0].strip() + policy
    return text

def pro_copywriting_zh(text):
    if not text: return ""
    # Header
    text = text.replace("请仔细阅读说明", "### 产品详情与订购须知")
    # Specifications
    text = text.replace("规格:", "\n**产品规格：**")
    text = text.replace("- 材质:", "• **材质：**")
    text = text.replace("- Foodgrade", "• **安全标准：** 食品级认证")
    text = text.replace("纯白色", "• **颜色：** 简约高雅白")
    text = text.replace("尺寸详情:", "\n**规格尺寸：**")
    # Application
    text = text.replace("非常适合用于", "\n**推荐用途：**\n非常适合用于")
    
    policy = (
        "\\n---\\n"
        "### 订购指南\\n"
        "• **物流包装：** 扁平化发货，有效节省空间并防止运输途中的损坏。\\n"
        "• **产品组装：** 简单易用；无需工具，沿预设压痕即可轻松成型。\\n"
        "• **库存状态：** 现货供应，快速发货。\\n"
        "• **大宗采购：** 批发采购可享受更多折扣优惠。\\n"
        "• **发货时效：** 15:00 WIB 前确认的订单将于当天发出。\\n"
        "• **营业时间：** 周一至周六（周日及法定节假日休息）。\\n\\n"
        "**售后保障：**\\n"
        "为保障您的权益，请在收到货后拍摄**完整的开箱视频**（从包裹未拆封状态开始）。如无有效视频证明或包裹已拆封重新包装，将无法受理投诉。感谢您的理解与配合。"
    )
    if "注意：" in text:
        text = text.split("注意：")[0].strip() + policy
    return text

def run_pro_migration():
    file_path = 'src/data/products.ts'
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    def update_block(match):
        key = match.group(1)
        val = match.group(2)
        raw_val = val.replace("\\n", "\n").replace("\\'", "'")
        if '_en' in key:
            return f"    {key}: '{escape_js_string(pro_copywriting_en(raw_val))}',"
        if '_zh' in key:
            return f"    {key}: '{escape_js_string(pro_copywriting_zh(raw_val))}',"
        return match.group(0)

    pattern = re.compile(r'    (name_en|name_zh|variant_en|variant_zh|description_en|description_zh): \'(.*?)\',')
    new_content = pattern.sub(update_block, content)
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Parafrase Profesional v2 SELESAI!")

if __name__ == "__main__":
    run_pro_migration()