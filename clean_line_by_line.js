const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/data/products.ts');
const lines = fs.readFileSync(filePath, 'utf8').split('
');

const keysToRemove = [
    'name_en:', 'name_zh:', 
    'variant_en:', 'variant_zh:', 
    'description_en:', 'description_zh:'
];

const newLines = lines.filter(line => {
    const trimmed = line.trim();
    for (const key of keysToRemove) {
        if (trimmed.startsWith(key)) return false;
    }
    return true;
}).map(line => {
    // Fix the escaped quote source
    return line.split("D'Celup").join("D Celup").split("D'Celup").join("D Celup");
});

fs.writeFileSync(filePath, newLines.join('
'), 'utf8');
console.log("Successfully cleaned products.ts using line filtering.");
