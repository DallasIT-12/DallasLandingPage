import re
import json

def extract_unique_content():
    try:
        with open('src/data/products.ts', 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Extract names and descriptions
        names = re.findall(r"name: '(.*?)'", content)
        # Description can be multi-line, using a more robust regex
        descriptions = re.findall(r"description: '(.*?)',", content, re.DOTALL)
        
        unique_names = sorted(list(set(names)))
        unique_descriptions = sorted(list(set(descriptions)))
        
        print(f"Total Unique Names: {len(unique_names)}")
        print(f"Total Unique Descriptions: {len(unique_descriptions)}")
        
        # Save to a temporary file for the agent to read
        result = {
            "names": unique_names,
            "descriptions": unique_descriptions
        }
        
        with open('unique_content.json', 'w', encoding='utf-8') as f:
            json.dump(result, f, ensure_ascii=False, indent=2)
            
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    extract_unique_content()
