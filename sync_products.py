import pandas as pd
import re
import os

# === 1. LINE-BY-LINE PROFESSIONAL PARAPHRASER ===
# Menjaga struktur 'Enter' asli sambil memoles bahasa
def paraphrase_english(text):
    if not text or pd.isna(text): return ""
    lines = str(text).split('\n')
    new_lines = []
    
    # Map frasa untuk dipoles
    mapping = {
        "Note :": "### ORDERING POLICY",
        "Note:": "### ORDERING POLICY",
        "Price listed is for": "Pricing: Unit price for",
        "Sent in flat form": "Delivery: Shipped flat to prevent damage",
        "The box can be formed easily": "Assembly: User-friendly design; easily folds",
        "Ready stock items": "Status: Guaranteed Ready Stock",
        "Wholesale purchases have different prices": "Wholesale: Bulk order discounts available",
        "Orders before 15:00 WIB are shipped same day": "Shipping: Orders before 3:00 PM WIB are dispatched same-day",
        "Sundays and public holidays the shop is closed": "Operating Hours: Closed on Sundays and Holidays",
        "For Complaint Submissions, it is mandatory to include an unboxing VIDEO": "**Quality Assurance:** Mandatory unboxing video for claims.",
        "Very suitable for": "• Ideal for:",
        "Material:": "**Material:**",
        "Size:": "**Dimensions:**",
        "Color:": "**Color:**"
    }

    for line in lines:
        trimmed = line.strip()
        if not trimmed:
            new_lines.append("") # Jaga baris kosong agar tetap ada jarak
            continue
            
        processed_line = trimmed
        for old, new in mapping.items():
            if old.lower() in processed_line.lower():
                processed_line = processed_line.replace(old, new)
        
        new_lines.append(processed_line)
    
    return "\n".join(new_lines)

def zh_translate(text):
    if not text or pd.isna(text): return ""
    text = str(text)
    mapping = {
        "Note :": "### 订购须知",
        "Sangat cocok untuk": "• 推荐用途:",
        "Bahan:": "**材质:**",
        "Ukuran:": "**规格:**",
        "Kotak": "盒子", "Isi": "装", "Tempat": "盒子", "Kue": "蛋糕", "Nasi": "米饭"
    }
    res = text
    for id_text, trans_text in mapping.items():
        res = re.sub(re.escape(id_text), trans_text, res, flags=re.IGNORECASE)
    return res

def slugify(text):
    if not text: return ""
    text = str(text).lower()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[-\s]+', '-', text)
    return text.strip('-')

PUBLIC_DIR = 'public'
try:
    PUBLIC_FILES = [f for f in os.listdir(PUBLIC_DIR) if os.path.isfile(os.path.join(PUBLIC_DIR, f))]
except:
    PUBLIC_FILES = []

def process_image_list(img_str):
    if pd.isna(img_str) or str(img_str).strip() == '': return []
    raw_parts = str(img_str).split(',')
    processed_list = []
    for part in raw_parts:
        p = part.strip().lstrip('/')
        keyword = os.path.splitext(p)[0]
        matches = [f for f in PUBLIC_FILES if f.lower().startswith(keyword.lower())]
        matches.sort()
        if not matches:
            processed_list.append('/' + p.replace(' ', '%20'))
        else:
            for f in matches:
                path = '/' + f.replace(' ', '%20')
                if path not in processed_list: processed_list.append(path)
    return processed_list

def generate_ts():
    try:
        print("Reading Files and preserving exact spacing...")
        df_id = pd.read_excel('Book1.xlsx')
        df_en = pd.read_excel('Book1 - English.xlsx')

        df_id['id'] = df_id['id'].astype(str).str.strip()
        df_en['id'] = df_en['id'].astype(str).str.strip()
        df_id['Variasi'] = df_id['Variasi'].fillna('Standard').astype(str).str.strip()
        df_en['Variasi'] = df_en['Variasi'].fillna('Standard').astype(str).str.strip()

        grouped_id = df_id.groupby('id')
        final_products = []
        seen_slugs = {}

        for group_id, group in grouped_id:
            group_en = df_en[df_en['id'] == group_id]
            master_desc_id = ""
            for d in group['description']:
                if pd.notnull(d) and str(d).strip():
                    master_desc_id = str(d).strip()
                    break
            
            variant_count = 0
            for idx, row in group.iterrows():
                variant_count += 1
                row_en = group_en[group_en['Variasi'] == row['Variasi']]
                if row_en.empty and len(group) == len(group_en):
                    row_en = group_en.iloc[variant_count-1]
                elif not row_en.empty:
                    row_en = row_en.iloc[0]
                else:
                    row_en = None

                name_id = str(row['name']).strip()
                name_en = str(row_en['name']).strip() if row_en is not None else name_id
                
                desc_id = row['description'] if pd.notnull(row['description']) else master_desc_id
                desc_en_raw = row_en['description'] if (row_en is not None and pd.notnull(row_en['description'])) else desc_id
                
                # Gunakan fungsi baris-demi-baris yang baru
                desc_en = paraphrase_english(desc_en_raw)
                
                variant_id = row['Variasi']
                variant_en = str(row_en['Variasi']).strip() if row_en is not None else variant_id

                name_zh = zh_translate(name_id)
                desc_zh = zh_translate(desc_id)
                variant_zh = zh_translate(variant_id)

                base_slug = slugify(name_id)
                final_slug = base_slug
                if base_slug in seen_slugs:
                    final_slug = f"{base_slug}-{seen_slugs[base_slug]}"
                    seen_slugs[base_slug] += 1
                else:
                    seen_slugs[base_slug] = 1

                imgs = process_image_list(row['image'])
                if not imgs: imgs = ["/placeholder.png"]

                final_products.append({
                    "id": f"{group_id}-{variant_count}" if len(group) > 1 else group_id,
                    "productSlug": final_slug,
                    "name": name_id,
                    "name_en": name_en,
                    "name_zh": name_zh,
                    "variant": variant_id,
                    "variant_en": variant_en,
                    "variant_zh": variant_zh,
                    "description": desc_id,
                    "description_en": desc_en,
                    "description_zh": desc_zh,
                    "category": row['category'] if pd.notnull(row['category']) else "General",
                    "price": int(row['price']) if pd.notnull(row['price']) else 0,
                    "image": imgs[0],
                    "images": imgs,
                    "sold": int(row['sold']) if pd.notnull(row['sold']) else 0,
                    "slug": slugify(row['category']) if pd.notnull(row['category']) else "general"
                })

        ts_content = "export const products = [\n"
        for p in final_products:
            ts_content += "  {\n"
            for key, val in p.items():
                if isinstance(val, str):
                    safe_val = val.replace("\\", "\\\\").replace("'", "\\'").replace("\n", "\\n")
                    ts_content += f"    {key}: '{safe_val}',\n"
                elif isinstance(val, list):
                    imgs = ", ".join([f"'{img}'" for img in val])
                    ts_content += f"    {key}: [{imgs}],\n"
                else:
                    ts_content += f"    {key}: {val},\n"
            ts_content += "  },\n"
        ts_content += "];\n\n"
        
        ts_content += "export const getProductsByCategory = (categorySlug: string) => products.filter(p => p.slug === categorySlug);\n"
        ts_content += "export const searchProducts = (query: string) => products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) || p.category.toLowerCase().includes(query.toLowerCase()));\n"

        with open('src/data/products.ts', 'w', encoding='utf-8') as f:
            f.write(ts_content)
        print(f"Success! Spacing is now identical to Indonesian version.")

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    generate_ts()
