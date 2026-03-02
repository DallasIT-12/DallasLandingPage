const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const fs = require('fs');

dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
    console.log('Fetching products with popcorn in slug...');
    const { data, error } = await supabase.from('paperlisens_products_base').select('id, product_slug').ilike('product_slug', '%popcorn%');

    if (error) {
        console.error('Error:', error);
        process.exit(1);
    }

    console.log('Result:', data);
    fs.writeFileSync('debug_popcorn.json', JSON.stringify(data, null, 2));
    process.exit(0);
}

run();
