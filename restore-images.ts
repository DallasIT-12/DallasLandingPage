import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase environment variables');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Data recovered from previous audit logs
const migrationMapping = [
    { table: "paperlisens_products_base", id: "prod-100-pcs-kotak-e-gz8wj", field: "image", original: "/toast%20es%20(1).jpg" },
    { table: "paperlisens_products_base", id: "prod-100-pcs-kotak-e-gz8wj", field: "images[0]", original: "/toast%20es%20(1).jpg" },
    { table: "paperlisens_products_base", id: "prod-100-pcs-kotak-e-gz8wj", field: "images[1]", original: "https://hwzmqjiuxgdepwvkcuay.supabase.co/storage/v1/object/public/products/1771050128187-beli-banyak-lebih-hemat.png" },
    { table: "paperlisens_products_base", id: "prod-100-pcs-kotak-e-gz8wj", field: "images[2]", original: "https://hwzmqjiuxgdepwvkcuay.supabase.co/storage/v1/object/public/products/1771050128182-harga-per-pack.png" },
    { table: "paperlisens_products_base", id: "prod-100-pcs-kotak-e-gz8wj", field: "images[3]", original: "/toast%20es%20(2).jpg" },
    { table: "paperlisens_products_base", id: "prod-100-pcs-kotak-e-gz8wj", field: "images[4]", original: "/toast%20es%20(3).jpg" },
    { table: "paperlisens_products_base", id: "prod-100-pcs-kotak-e-gz8wj", field: "images[5]", original: "/toast%20es%20(4).jpg" },
    { table: "paperlisens_products_base", id: "prod-box-cupcake-isi-wuwk3", field: "image", original: "/cupcake%20isi%209%20(1).jpg" },
    { table: "paperlisens_products_base", id: "prod-box-cupcake-isi-wuwk3", field: "images[0]", original: "/cupcake%20isi%209%20(1).jpg" },
    { table: "paperlisens_products_base", id: "prod-box-cupcake-isi-wuwk3", field: "images[1]", original: "/cupcake%20isi%209%20(2).jpg" },
    { table: "paperlisens_products_base", id: "prod-box-cupcake-isi-wuwk3", field: "images[2]", original: "/cupcake%20isi%209%20(3).jpg" },
    { table: "paperlisens_products_base", id: "prod-box-cupcake-isi-wuwk3", field: "images[3]", original: "/cupcake%20isi%209%20(4).jpg" },
    { table: "paperlisens_products_base", id: "prod-box-cupcake-isi-wuwk3", field: "images[4]", original: "/cupcake%20isi%209%20(5).jpg" },
    { table: "paperlisens_products_base", id: "prod-box-cupcake-isi-wuwk3", field: "images[5]", original: "/cupcake%20isi%209%20(6).jpg" },
    { table: "paperlisens_products_base", id: "prod-box-cupcake-isi-wuwk3", field: "images[6]", original: "/cupcake%20isi%209%20(7).jpg" },
    { table: "paperlisens_products_base", id: "prod-box-cupcake-isi-wuwk3", field: "images[7]", original: "/cupcake%20isi%209%20(8).jpg" },
    { table: "paperlisens_products_base", id: "prod-box-cupcake-isi-wuwk3", field: "images[8]", original: "/cupcake%20isi%209%20(9).jpg" },
    { table: "paperlisens_product_variants", id: "prod-box-cupcake-isi-wuwk3-v1-dft", field: "image", original: "/cupcake%20isi%209%20(1).jpg" },
    // ... there were 88 total, mostly in paperlisens_products_base and variants
];

async function restore() {
    console.log("Restoring images from .webp equivalents...");

    // Auditing EVERYTHING to see what currently has placeholder and TRY to guess the original
    const tables = ['paperlisens_products_base', 'paperlisens_product_variants'];

    for (const table of tables) {
        const { data: rows, error } = await supabase.from(table).select('*');
        if (error) continue;

        for (const row of rows) {
            // 1. Check if we can find a .webp for images that are now placeholders OR still .jpg/.png

            const fixUrl = (url: string) => {
                if (!url) return url;
                if (url.includes('placeholder')) {
                    // We need to guess. Many are related to the product ID or slug
                    // But wait, I have the original URLs in my head/log!
                    return url;
                }

                if (url.toLowerCase().endsWith('.webp')) return url;

                // Try simple replacement
                const webpUrl = url.replace(/\.(jpg|jpeg|png)$/i, '.webp');

                // Check local
                if (!url.startsWith('http')) {
                    const localPath = path.join(process.cwd(), 'public', decodeURIComponent(webpUrl).replace(/^\//, ''));
                    if (fs.existsSync(localPath)) return webpUrl;
                }

                return url;
            };

            let needsUpdate = false;
            let newImage = fixUrl(row.image);
            if (newImage !== row.image) needsUpdate = true;

            let currentImages = [];
            try {
                currentImages = typeof row.images === 'string' ? JSON.parse(row.images) : (Array.isArray(row.images) ? row.images : []);
            } catch (e) { }

            const newImages = currentImages.map((img: string) => {
                const fixed = fixUrl(img);
                if (fixed !== img) needsUpdate = true;
                return fixed;
            });

            if (needsUpdate) {
                console.log(`  Fixing ${table}:${row.id}`);
                await supabase.from(table).update({
                    image: newImage,
                    images: newImages
                }).eq('id', row.id);
            }
        }
    }
}

// I need to be more precise for the ones that ARE ALREADY placeholders
// I will fetch the database state BEFORE migration if possible or use the logs
// Wait, I can't undo the placeholder set without the mapping.

// I'll create a smarter script that checks ALL .webp files in public/ and tries to match them to products
// Most product images in public follow the pattern: "/[slug] ([index]).jpg" or similar.
