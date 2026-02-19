const fs = require('fs');
const path = require('path');

const publicDir = 'c:\\dallas_company\\public';
const files = fs.readdirSync(publicDir);

const categories = [
    { slug: "kotak-hampers", keywords: ["hampers", "gable box", "box hampers", "hardbox"] },
    { slug: "kotak-bakery", keywords: ["cake", "roti", "bakery", "donat", "cupcake", "tart", "brownies", "sus", "bolu", "lapis", "pudding", "dessert"] },
    { slug: "rokok", keywords: ["rokok", "cigarette"] },
    { slug: "kotak-nasi", keywords: ["nasi", "rice", "lunch", "catering", "food box", "meal"] },
    { slug: "buku", keywords: ["buku", "book", "agenda", "notebook", "yasin", "majalah"] },
    { slug: "kalender", keywords: ["kalender", "calendar"] },
    { slug: "paperbag", keywords: ["paperbag", "tas kertas", "shopping bag"] },
    { slug: "map", keywords: ["map", "folder"] },
    { slug: "brosur", keywords: ["brosur", "brochure", "flyer", "pamflet"] }
];

const results = {};

categories.forEach(cat => {
    results[cat.slug] = files.filter(file => {
        const lowerFile = file.toLowerCase();
        // Filter out non-image files if any (simple check)
        if (!lowerFile.endsWith('.jpg') && !lowerFile.endsWith('.jpeg') && !lowerFile.endsWith('.png') && !lowerFile.endsWith('.webp')) return false;

        return cat.keywords.some(kw => lowerFile.includes(kw));
    }).map(file => '/' + file);
});

fs.writeFileSync('c:\\dallas_company\\portfolio_images.json', JSON.stringify(results, null, 2));
console.log("Done writing to portfolio_images.json");
