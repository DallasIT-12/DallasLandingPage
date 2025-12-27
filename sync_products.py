import pandas as pd
import json
import re

def slugify(text):
    if not text:
        return ""
    text = str(text).lower()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[-\s]+', '-', text)
    return text.strip('-')

def process_image_list(img_str):
    if pd.isna(img_str) or str(img_str).strip() == '':
        return []
    
    raw_parts = str(img_str).split(',')
    processed_list = []
    
    for part in raw_parts:
        p = part.strip()
        if not p:
            continue
        if not p.startswith('/'):
            p = '/' + p
        p = p.replace(' ', '%20')
        processed_list.append(p)
        
    return processed_list

def clean_string(s):
    if pd.isna(s):
        return None
    return str(s).strip()

def generate_ts():
    try:
        df = pd.read_excel('Book1.xlsx')
        
        # Filter rows that have an ID
        df = df[df['id'].notnull()]
        grouped = df.groupby('id')
        products = []
        
        # Track seen slugs to handle duplicates (e.g. different products with same name)
        seen_slugs = {}

        for group_id, group in grouped:
            master_desc = None
            master_images = []
            
            # Find master description from the group (first non-empty)
            for desc in group['description']:
                clean = clean_string(desc)
                if clean:
                    master_desc = clean
                    break
            
            # Find master images from the group (first non-empty)
            for img in group['image']:
                p_list = process_image_list(img)
                if p_list:
                    master_images = p_list
                    break
            
            # Sort to maintain order (if relevant)
            group = group.sort_index()
            variant_count = 0
            
            for _, row in group.iterrows():
                variant_count += 1
                
                # Generate unique ID for system (id-1, id-2)
                final_id = str(row['id']).strip()
                if len(group) > 1:
                    final_id = f"{final_id}-{variant_count}"
                
                # Name: Use raw name from Excel (User requested no variation in name)
                name = clean_string(row['name'])
                
                # Variant: Use Variasi column, default to "Standard" if empty
                variasi = clean_string(row['Variasi'])
                if not variasi:
                    variasi = "Standard"

                # Slug: Generate from Name
                base_slug = slugify(name)
                if base_slug in seen_slugs:
                    seen_slugs[base_slug] += 1
                    final_slug = f"{base_slug}-{seen_slugs[base_slug]}"
                else:
                    seen_slugs[base_slug] = 0
                    final_slug = base_slug

                # Images: Use row images, fallback to master, fallback to placeholder
                current_images = process_image_list(row['image'])
                if not current_images:
                    current_images = master_images
                if not current_images:
                    current_images = ["/placeholder.png"]
                
                main_image = current_images[0]
                
                # Description: Use row desc, fallback to master
                description = clean_string(row['description'])
                if not description:
                    description = master_desc
                if not description:
                     description = "" 
                
                product = {
                    "id": final_id,
                    "productSlug": final_slug,
                    "name": name,
                    "variant": variasi,
                    "category": row['category'] if pd.notnull(row['category']) else "Uncategorized",
                    "price": int(row['price']) if pd.notnull(row['price']) else 0,
                    "image": main_image,
                    "images": current_images,
                    "sold": int(row['sold']) if pd.notnull(row['sold']) else 0,
                    "description": description,
                    "categorySlug": row['slug'] if pd.notnull(row['slug']) else "uncategorized"
                }
                products.append(product)
        
        # Sort by ID to keep grouped items together
        products.sort(key=lambda x: x['id'])

        # Write TypeScript file
        ts_content = "export const products = [\n"
        for p in products:
            ts_content += "  {\n"
            ts_content += f"    id: '{p['id']}',\n"
            ts_content += f"    productSlug: '{p['productSlug']}',\n"
            
            bs = chr(92)
            # Escape for JS string
            safe_name = p['name'].replace(bs, bs+bs).replace("'", "\'\'")
            safe_variant = p['variant'].replace(bs, bs+bs).replace("'", "\'\'")
            safe_desc = p['description'].replace(bs, bs+bs).replace("'", "\'\'").replace("\n", "\\n")
            
            ts_content += f"    name: '{safe_name}',\n"
            ts_content += f"    variant: '{safe_variant}',\n"
            ts_content += f"    category: '{p['category']}',\n"
            ts_content += f"    price: {p['price']},\n"
            ts_content += f"    image: '{p['image']}',\n"
            
            ts_content += "    images: ["
            quoted_images = [f"'{img}'" for img in p['images']]
            ts_content += ", ".join(quoted_images)
            ts_content += "],\n"
            
            ts_content += f"    sold: {p['sold']},\n"
            ts_content += f"    description: '{safe_desc}',\n"
            ts_content += f"    slug: '{p['categorySlug']}'\n"
            ts_content += "  },\n"
        ts_content += "];\n\n"
        
        ts_content += """
export const getProductsByCategory = (categorySlug: string) => {
  return products.filter(product => product.slug === categorySlug);
};

export const searchProducts = (query: string) => {
  const lowerQuery = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(lowerQuery) || 
    product.category.toLowerCase().includes(lowerQuery)
  );
};
"""

        with open('src/data/products.ts', 'w', encoding='utf-8') as f:
            f.write(ts_content)
        print("Successfully wrote to src/data/products.ts")
        
    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    generate_ts()
