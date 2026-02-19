
const fs = require('fs');
const path = require('path');

const list = [];
function scan(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const full = path.join(dir, file);
        if (fs.statSync(full).isDirectory()) {
            scan(full);
        } else if (file.toLowerCase().endsWith('.webp')) {
            list.push(path.relative(process.cwd(), full));
        }
    }
}
scan('public');
fs.writeFileSync('webp_files.json', JSON.stringify(list, null, 2));
console.log('Done');
