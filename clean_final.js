const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/data/products.ts');
let content = fs.readFileSync(filePath, 'utf8');

// 1. First, fix the source of the issue in the original 'name' field
content = content.split("D'Celup").join("D Celup");
content = content.split("D'Celup").join("D Celup");

// 2. Remove all broken translation lines that might have truncated content
// We look for lines starting with whitespace + name_en/name_zh and remove them
content = content.replace(/^\s+name_en: '.*?',
/gm, '');
content = content.replace(/^\s+name_zh: '.*?',
/gm, '');
content = content.replace(/^\s+variant_en: '.*?',
/gm, '');
content = content.replace(/^\s+variant_zh: '.*?',
/gm, '');
content = content.replace(/^\s+description_en: '.*?',
/gm, '');
content = content.replace(/^\s+description_zh: '.*?',
/gm, '');

fs.writeFileSync(filePath, content, 'utf8');
console.log("Successfully cleaned products.ts and removed all D'Celup quotes.");
