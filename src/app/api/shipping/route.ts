import { NextRequest, NextResponse } from 'next/server';

const RAJAONGKIR_API_KEY = process.env.RAJAONGKIR_API_KEY || '';
const RAJAONGKIR_BASE_URL = 'https://rajaongkir.komerce.id/api/v1';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const origin = searchParams.get('origin'); // This should now be ID
        const destination = searchParams.get('destination'); // This should now be ID
        const weight = searchParams.get('weight') || '1000'; // grams
        const courier = searchParams.get('courier') || 'jne,sicepat,pos';

        if (!origin || !destination) {
            return NextResponse.json(
                { error: 'Origin dan destination ID wajib diisi' },
                { status: 400 }
            );
        }

        if (!RAJAONGKIR_API_KEY) {
            return NextResponse.json(
                { error: 'RajaOngkir API key belum dikonfigurasi' },
                { status: 500 }
            );
        }

        const apiUrl = `${RAJAONGKIR_BASE_URL}/calculate/domestic-cost`;

        const body = new URLSearchParams();
        body.append('origin', String(origin));
        body.append('destination', String(destination));
        body.append('weight', String(weight));
        body.append('courier', String(courier));

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'key': RAJAONGKIR_API_KEY
            },
            body: body.toString(),
            next: { revalidate: 3600 },
        });

        const data = await response.json();
        console.log('[Shipping API] Raw Response Data:', JSON.stringify(data, null, 2));

        const isSuccess = response.ok && (
            data.code === 200 ||
            data.status === 200 ||
            data.meta?.code === 200 ||
            data.meta?.status === "success"
        );

        if (!isSuccess) {
            console.error('[Shipping API] RajaOngkir error:', response.status, data);
            return NextResponse.json(
                { error: data.meta?.message || data.message || 'Gagal mendapatkan data ongkir dari RajaOngkir' },
                { status: 400 }
            );
        }

        // Standardize output for CekOngkirClient
        const rawData = data.data || data.Data || [];

        const costs = rawData.flatMap((item: any) => {
            // Case 1: Nested structure (Standard RajaOngkir)
            if (item.costs || item.Costs) {
                const courierCosts = item.costs || item.Costs || [];
                return courierCosts.map((s: any) => {
                    const sCost = s.cost || s.Cost || [];
                    const costDetail = sCost[0] || { value: 0, etd: '-' };
                    return {
                        code: item.code || item.Code || 'unknown',
                        name: item.name || item.Name || 'Unknown',
                        service: s.service || s.Service || 'Service',
                        type: s.description || s.Description || '',
                        price: String(costDetail.value || 0),
                        estimated: costDetail.etd || '-'
                    };
                });
            }

            // Case 2: Flat structure (RajaOngkir Komerce)
            return [{
                code: item.code || item.Code || 'unknown',
                name: item.name || item.Name || 'Unknown',
                service: item.service || item.Service || 'Service',
                type: item.description || item.Description || '',
                price: String(item.cost || item.Cost || 0),
                estimated: item.etd || item.Etd || '-'
            }];
        });

        return NextResponse.json({
            status: 200,
            data: {
                summary: {
                    courier: courier.split(',').map(c => c.trim()),
                    origin: origin,
                    destination: destination,
                    weight: weight + 'g'
                },
                costs: costs
            }
        });
    } catch (error) {
        console.error('[Shipping API] Error:', error);
        return NextResponse.json(
            { error: 'Terjadi kesalahan server' },
            { status: 500 }
        );
    }
}
