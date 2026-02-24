import os

def clean_products_final():
    file_path = 'src/data/products.ts'
    if not os.path.exists(file_path):
        print("File not found")
        return

    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    keys_to_remove = [
        'name_en:', 'name_zh:', 
        'variant_en:', 'variant_zh:', 
        'description_en:', 'description_zh:'
    ]

    new_lines = []
    for line in lines:
        trimmed = line.strip()
        # Skip lines that start with our problematic translation keys
        should_skip = False
        for key in keys_to_remove:
            if trimmed.startswith(key):
                should_skip = True
                break
        
        if not should_skip:
            # Fix the escaped quote source if it exists
            fixed_line = line.replace("D'Celup", "D Celup").replace("D'Celup", "D Celup")
            new_lines.append(fixed_line)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.writelines(new_lines)
    print("Successfully cleaned products.ts from broken columns and fixed D Celup.")

if __name__ == "__main__":
    clean_products_final()
