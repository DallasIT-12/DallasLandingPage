import os

def fix_dcelup():
    file_path = 'src/data/products.ts'
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace escaped and unescaped single quotes in D'Celup
    # We want to change D'Celup or D'Celup to D Celup
    new_content = content.replace("D'Celup", "D Celup")
    new_content = new_content.replace("D'Celup", "D Celup")
    
    # Also handle the cases where it might be in slugs or images if needed, 
    # but the user specifically mentioned the name error.
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Successfully fixed D'Celup to D Celup in products.ts")

if __name__ == "__main__":
    fix_dcelup()
