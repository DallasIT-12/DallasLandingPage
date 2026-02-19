import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { mergeProductsByName, getBaseId } from '@/lib/merge-products';
import { flattenBaseAndVariants } from '@/lib/paperlisens-schema';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

function getClient() {
  if (!supabaseUrl || !supabaseKey) return null;
  return createClient(supabaseUrl, supabaseKey);
}

function toProduct(row: any) {
  return {
    id: row.id,
    productSlug: row.product_slug ?? row.productSlug,
    name: row.name,
    name_en: row.name_en,
    name_zh: row.name_zh,
    variant: row.variant,
    variant_en: row.variant_en,
    variant_zh: row.variant_zh,
    description: row.description,
    description_en: row.description_en,
    description_zh: row.description_zh,
    category: row.category,
    price: row.price,
    image: row.image || '/placeholder.png',
    images: Array.isArray(row.images) ? row.images : (row.images ? JSON.parse(row.images) : []),
    sold: row.sold || 0,
    slug: row.slug,
  };
}

// GET /api/paperlisens/products/[slug]
export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const supabase = getClient();
    if (!supabase) return NextResponse.json({ error: 'DB not configured' }, { status: 503 });

    try {
      // Use JOIN to get base + variants in one call for New Schema
      // @ts-ignore
      const { data: bBySlug } = await supabase
        .from('paperlisens_products_base')
        .select('*, variants:paperlisens_product_variants(*)')
        .eq('product_slug', slug)
        .maybeSingle();

      let base = bBySlug;
      if (base) {
        // Variants are now embedded in base.variants
        // @ts-ignore
        const variants = base.variants || [];

        const byId = new Map<string, any[]>();
        byId.set(base.id, variants.map((v: any) => ({
          ...v,
          images: Array.isArray(v.images) ? v.images : (v.images ? JSON.parse(v.images) : [])
        })));

        const [flattened] = flattenBaseAndVariants([base], byId);
        if (flattened) {
          // Kirimkan thumbnail asli dari base agar tidak tertukar dengan foto varian di admin
          return NextResponse.json({
            ...flattened,
            baseImage: base.image,
            baseGallery: Array.isArray(base.images) ? base.images : (base.images ? JSON.parse(base.images) : [])
          });
        }
      }
    } catch (e) {
      console.error('New schema single fetch error:', e);
    }

    const { data, error } = await supabase.from('paperlisens_products').select('*').eq('product_slug', slug).single();
    if (!error && data) {
      const baseId = getBaseId(data.id);
      const { data: sameBase } = await supabase.from('paperlisens_products').select('*').or(`id.eq.${baseId},id.like.${baseId}-%`);
      const [merged] = mergeProductsByName((sameBase || [data]).map(row => toProduct(row)));
      if (merged) {
        return NextResponse.json({
          ...merged,
          baseImage: data.image,
          baseGallery: Array.isArray(data.images) ? data.images : (data.images ? JSON.parse(data.images) : [])
        });
      }
    }

    const { products } = await import('@/data/products');
    const staticProd = products.find((p: any) => p.productSlug === slug);
    if (staticProd) return NextResponse.json(toProduct({ ...staticProd, product_slug: staticProd.productSlug }));

    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  } catch (err) {
    return NextResponse.json({ error: 'Fetch failed' }, { status: 500 });
  }
}

// PUT /api/paperlisens/products/[slug] - FIXED UNIQUE ID
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const supabase = getClient();
    if (!supabase) return NextResponse.json({ error: 'DB not configured' }, { status: 503 });
    const body = await request.json();

    console.log(`--- API PUT (SECURE UNIQUE ID): ${slug} ---`);

    // 1. Cari Base berdasarkan SLUG (Slug adalah identitas paling unik)
    let { data: base } = await supabase.from('paperlisens_products_base').select('*').eq('product_slug', slug).maybeSingle();

    // 2. Jika tidak ada, buat baru dengan ID yang dijamin unik
    if (!base) {
      // JANGAN memotong ID lagi (pt-011 -> pt adalah kesalahan). 
      // Gunakan ID unik baru untuk setiap entitas produk utama.
      const uniqueBaseId = `prod-${slug.slice(0, 15)}-${Math.random().toString(36).substr(2, 5)}`;

      const { data: newBase, error: insErr } = await supabase.from('paperlisens_products_base').insert({
        id: uniqueBaseId,
        product_slug: slug,
        name: body.name,
        description: body.description || '',
        category: body.category || 'Lain-lain',
        slug: body.slug || 'lain-lain',
        image: body.image || '/placeholder.png',
        images: body.images || []
      }).select().single();

      if (insErr) {
        console.error('INSERT_ERROR:', insErr);
        return NextResponse.json({ error: insErr.message }, { status: 500 });
      }
      base = newBase;
    }

    if (base) {
      console.log(`UPDATING_BASE: ${base.id}`);

      // 1. UPDATE INFO UTAMA (BASE)
      const { error: updateErr } = await supabase.from('paperlisens_products_base').update({
        name: body.name,
        name_en: body.name_en || null,
        name_zh: body.name_zh || null,
        description: body.description,
        description_en: body.description_en || null,
        description_zh: body.description_zh || null,
        category: body.category,
        slug: body.slug,
        image: body.image || '/placeholder.png',
        images: Array.isArray(body.images) ? body.images : [],
        attr_label_1: body.attr_label_1 || 'Pilih Variasi',
        attr_label_2: body.attr_label_2 || null,
        updated_at: new Date().toISOString()
      }).eq('id', base.id);

      if (updateErr) {
        console.error('UPDATE_BASE_ERROR:', updateErr);
        return NextResponse.json({ error: updateErr.message }, { status: 500 });
      }

      // ... (kode penghapusan tabel lama tetap sama) ...

      // 3. UPDATE VARIAN
      if (Array.isArray(body.variants)) {
        await supabase.from('paperlisens_product_variants').delete().eq('product_id', base.id);
        for (let i = 0; i < body.variants.length; i++) {
          const v = body.variants[i];
          const variantId = `${base.id}-v${i + 1}-${Math.random().toString(36).substr(2, 3)}`;

          await supabase.from('paperlisens_product_variants').insert({
            id: variantId,
            product_id: base.id,
            variant_name: v.variant_name || null,
            variant_name_en: v.variant_name_en || null,
            variant_name_zh: v.variant_name_zh || null,
            variant_name_2: v.variant_name_2 || null,
            variant_name_2_en: v.variant_name_2_en || null,
            variant_name_2_zh: v.variant_name_2_zh || null,
            price: parseInt(String(v.price)) || 0,
            image: v.image || body.image || '/placeholder.png',
            images: [],
            variant_slug: v.variant_slug || `${slug}-v${i + 1}`,
            updated_at: new Date().toISOString(),
          });
        }
      }
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ error: 'Failed to process' }, { status: 500 });
  } catch (err) {
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}

// PATCH /api/paperlisens/products/[slug] - Increment Sold Count
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const { variant_id } = await request.json();
    const supabase = getClient();
    if (!supabase) return NextResponse.json({ error: 'DB not configured' }, { status: 503 });

    console.log(`--- INCREMENTING SOLD: ${slug} (Variant: ${variant_id || 'Base'}) ---`);

    if (variant_id) {
      // Increment variant sold count
      const { data: vData } = await supabase.from('paperlisens_product_variants').select('sold').eq('id', variant_id).single();
      await supabase.from('paperlisens_product_variants').update({ sold: (vData?.sold || 0) + 1 }).eq('id', variant_id);
    } else {
      // Fallback to base or old table
      const { data: bData } = await supabase.from('paperlisens_products_base').select('id').eq('product_slug', slug).maybeSingle();
      if (bData) {
        // If base has variants, increment the first one
        const { data: firstV } = await supabase.from('paperlisens_product_variants').select('id, sold').eq('product_id', bData.id).limit(1).maybeSingle();
        if (firstV) {
          await supabase.from('paperlisens_product_variants').update({ sold: (firstV.sold || 0) + 1 }).eq('id', firstV.id);
        }
      }

      // Also try old table
      const { data: oldData } = await supabase.from('paperlisens_products').select('sold').eq('product_slug', slug).maybeSingle();
      if (oldData) {
        await supabase.from('paperlisens_products').update({ sold: (oldData.sold || 0) + 1 }).eq('product_slug', slug);
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}

// DELETE
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const supabase = getClient();
    if (!supabase) return NextResponse.json({ error: 'DB not configured' }, { status: 503 });

    // Cari ID base sebelum hapus agar varian ikut terhapus (cascade)
    const { data: base } = await supabase.from('paperlisens_products_base').select('id').eq('product_slug', slug).maybeSingle();

    if (base) {
      await supabase.from('paperlisens_product_variants').delete().eq('product_id', base.id);
      await supabase.from('paperlisens_products_base').delete().eq('id', base.id);
    }

    // Hapus juga dari tabel lama
    await supabase.from('paperlisens_products').delete().eq('product_slug', slug);

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}
