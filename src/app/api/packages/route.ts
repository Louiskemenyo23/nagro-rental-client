import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
    // Force local DB usage for now to fix 'loading slowly/empty' issues
    const { getDB } = await import('@/lib/db');
    return NextResponse.json(getDB().packages);
}

export async function POST(request: Request) {
    const body = await request.json();

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
        const { getDB, saveDB } = await import('@/lib/db');
        const db = getDB();
        const newPkg = { ...body, _id: Math.random().toString(36).substr(2, 9) };
        db.packages.push(newPkg);
        saveDB(db);
        return NextResponse.json(newPkg);
    }

    const dbPayload = {
        name: body.name,
        description: body.description,
        price: body.price,
        images: body.images || [],
        is_featured: body.isFeatured || false
    };

    const { data, error } = await supabase.from('packages').insert(dbPayload).select().single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ ...data, isFeatured: data.is_featured, _id: data.id });
}
