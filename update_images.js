
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const TARGET_FILES = [
    path.join(process.cwd(), 'src/data/customBoxProducts.ts'),
    path.join(process.cwd(), 'src/app/[locale]/page.tsx'),
    path.join(process.cwd(), 'src/data/products.ts')
];

// Helper to get all webp files recursively
function getWebpFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            getWebpFiles(filePath, fileList);
        } else {
            if (file.toLowerCase().endsWith('.webp')) {
                // Store relative path from public root, e.g. "images/foo.webp" or just "foo.webp"
                fileList.push(path.relative(PUBLIC_DIR, filePath).replace(/\\/g, '/'));
            }
        }
    });
    return fileList;
}

const webpFiles = getWebpFiles(PUBLIC_DIR);
console.log(`Found ${webpFiles.length} .webp files.`);

TARGET_FILES.forEach(filePath => {
    if (!fs.existsSync(filePath)) {
        console.log(`Skipping missing file: ${filePath}`);
        return;
    }

    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    let count = 0;

    webpFiles.forEach(webpRelativePath => {
        // webpRelativePath is like "foo.webp" or "sub/foo.webp"
        const basePath = webpRelativePath.replace(/\.webp$/i, ''); // "foo" or "sub/foo"

        // Possible extensions to replace
        const extensions = ['.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG'];

        extensions.forEach(ext => {
            // Construct the old string we are looking for: e.g. "foo.jpg"
            const oldPath = basePath + ext;

            // Also handle URL encoded version: "foo%20bar.jpg"
            const oldPathEncoded = oldPath.split('/').map(encodeURIComponent).join('/');
            // But usually only the filename parts are encoded, slashes are kept.
            // Actually, usually it's just spaces -> %20
            const oldPathSpacesEncoded = oldPath.replace(/ /g, '%20');

            // We need to match these in the content. 
            // Content might have absolute path style "/foo.jpg" or relative "foo.jpg"
            // Usually in Next.js public folder ref starts with "/"

            // Patterns to look for:
            // 1. literal oldPath
            // 2. literal oldPathSpacesEncoded

            // We use a regex to replace global occurrences
            // Escape special chars for regex
            const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

            [oldPath, oldPathSpacesEncoded].forEach(target => {
                // We want to verify we are replacing the extension for this specific file
                // But simply replacing "foo.jpg" -> "foo.webp" is safe enough IF "foo.webp" exists.
                // We already know "foo.webp" exists because we are iterating over webpFiles.

                // Look for that string in the file content
                if (content.includes(target)) {
                    const replacement = basePath + '.webp';
                    // Maintain encoding if target was encoded
                    const replacementEncoded = target === oldPathSpacesEncoded ? basePath.replace(/ /g, '%20') + '.webp' : replacement;

                    // Perform global replacement
                    // console.log(`Replacing ${target} with ${replacementEncoded}`);
                    const regex = new RegExp(escapeRegExp(target), 'g');
                    content = content.replace(regex, replacementEncoded);
                    modified = true;
                    count++;
                }
            });
        });
    });

    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${filePath}: ${count} replacements.`);
    } else {
        console.log(`No changes needed for ${filePath}`);
    }
});
