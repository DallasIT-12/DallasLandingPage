import { NextRequest, NextResponse } from 'next/server';

const RAJAONGKIR_API_KEY = process.env.RAJAONGKIR_API_KEY || '';
const RAJAONGKIR_BASE_URL = 'https://rajaongkir.komerce.id/api/v1';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const type = searchParams.get('type') || 'provinsi';
        const id = searchParams.get('id');

        if (!RAJAONGKIR_API_KEY) {
            return NextResponse.json(
                { error: 'RajaOngkir API key belum dikonfigurasi' },
                { status: 500 }
            );
        }

        let apiUrl = '';
        if (type === 'search' || type === 'destination') {
            const q = searchParams.get('q') || searchParams.get('search') || '';
            apiUrl = `${RAJAONGKIR_BASE_URL}/destination/domestic-destination?search=${encodeURIComponent(q)}&limit=10`;
        } else if (type === 'provinsi') {
            apiUrl = `${RAJAONGKIR_BASE_URL}/destination/province`;
        } else if (type === 'kabupaten' && id) {
            apiUrl = `${RAJAONGKIR_BASE_URL}/destination/city/${id}`;
        } else {
            return NextResponse.json({ value: [] });
        }

        const response = await fetch(apiUrl, {
            headers: {
                'Accept': 'application/json',
                'key': RAJAONGKIR_API_KEY
            },
            next: { revalidate: 86400 },
        });

        const data = await response.json();

        console.log(`[Wilayah RajaOngkir] Request: ${type}, Status: ${response.status}`);

        const isSuccess = response.ok && (
            data.code === 200 ||
            data.status === 200 ||
            data.meta?.code === 200 ||
            data.meta?.status === "success"
        );

        if (!isSuccess) {
            console.error(`[Wilayah RajaOngkir] Error:`, JSON.stringify(data));
            return NextResponse.json(
                { error: data.meta?.message || data.message || 'Gagal mendapatkan data wilayah' },
                { status: 400 }
            );
        }

        const rawData = data.data || data.Data || [];
        const mappedData = rawData.map((item: any) => {
            // Priority for direct search results
            if (item.subdistrict_name) {
                return {
                    id: String(item.id || item.subdistrict_id),
                    name: `${item.subdistrict_name}, ${item.city_name}, ${item.province_name}`
                };
            }

            // Fallback for province/city lists
            const id = item.id || item.Id || item.province_id || item.Province_id || item.city_id || item.City_id || '';
            const typeLabel = item.type || item.Type ? `${item.type || item.Type} ` : '';
            const nameLabel = item.name || item.Name || item.province || item.Province || item.city_name || item.City_name || '';

            return {
                id: String(id),
                name: typeLabel && !nameLabel.includes(typeLabel) ? `${typeLabel}${nameLabel}` : nameLabel
            };
        });

        return NextResponse.json({ value: mappedData });
    } catch (error) {
        console.error('[Wilayah API] Error:', error);
        return NextResponse.json(
            { error: 'Terjadi kesalahan server' },
            { status: 500 }
        );
    }
}
