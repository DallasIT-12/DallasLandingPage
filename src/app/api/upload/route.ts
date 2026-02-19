import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

function getClient() {
  if (!supabaseUrl || !supabaseKey) return null;
  return createClient(supabaseUrl, supabaseKey);
}

export async function POST(request: NextRequest) {
  console.log('--- SUPABASE UPLOAD START ---');
  try {
    const supabase = getClient();
    if (!supabase) {
      console.error('UPLOAD_ERROR: Supabase client is not configured.');
      return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const bucket = formData.get('bucket') as string || 'products';

    if (!file) {
      console.warn('UPLOAD_WARNING: No file received in formData.');
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    console.log(`FILE_INFO: Name: ${file.name}, Type: ${file.type}, Size: ${file.size} bytes`);
    console.log(`TARGET_BUCKET: ${bucket}`);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
    const filePath = `${fileName}`;

    console.log(`UPLOADING_TO_SUPABASE: ${filePath}...`);

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: true
      });

    if (error) {
      console.error('SUPABASE_STORAGE_ERROR:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log('SUPABASE_UPLOAD_SUCCESS:', data);

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    console.log(`GENERATED_PUBLIC_URL: ${publicUrl}`);
    console.log('--- SUPABASE UPLOAD END ---');

    return NextResponse.json({ url: publicUrl });
  } catch (err) {
    console.error('UPLOAD_FATAL_ERROR:', err);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
