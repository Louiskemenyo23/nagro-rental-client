import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
// import { getDB, saveDB } from '@/lib/db'; // Legacy

export const dynamic = 'force-dynamic';

export async function GET() {
    // Force local DB usage to ensure data visibility
    const { getDB } = await import('@/lib/db');
    return NextResponse.json(getDB().items);
}

export async function POST(request: Request) {
    const body = await request.json();

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
        // Fallback
        const { getDB, saveDB } = await import('@/lib/db');
        const db = getDB();
        const newItem = { ...body, _id: Math.random().toString(36).substr(2, 9) };
        db.items.push(newItem);
        saveDB(db);
        return NextResponse.json(newItem);
    }

    // Map to snake_case
    const dbPayload = {
        name: body.name,
        category: body.category,
        price_per_day: body.pricePerDay,
        quantity: body.quantity,
        images: body.images || [],
        is_featured: body.isFeatured || false
    };

    const { data, error } = await supabase.from('items').insert(dbPayload).select().single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ...data, pricePerDay: data.price_per_day, _id: data.id });
}
