import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
    // Force local DB usage
    const { getDB } = await import('@/lib/db');
    const db = getDB();
    return NextResponse.json(db.settings || {
        siteName: "Nagor Rental & Decor",
        contactEmail: "info@nagordecor.com",
        paymentPaystack: true,
        paymentMomo: true,
        notifyEmail: true,
        notifyWhatsapp: false,
        notifyDaily: true,
        adminPassword: "admin" // Minimal mock, usually hashed
    });
}

export async function POST(request: Request) {
    const body = await request.json();

    const { getDB, saveDB } = await import('@/lib/db');
    const db = getDB();
    db.settings = { ...(db.settings || {}), ...body };
    saveDB(db);
    return NextResponse.json(db.settings);
}
