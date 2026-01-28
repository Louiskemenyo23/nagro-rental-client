import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
    // Force local DB usage
    const { getDB } = await import('@/lib/db');
    return NextResponse.json(getDB().bookings);
}
// Removed Supabase block for now

export async function POST(request: Request) {
    const body = await request.json();

    const { getDB, saveDB } = await import('@/lib/db');
    const db = getDB();
    const newBooking = { ...body, _id: Math.random().toString(36).substr(2, 9), createdAt: new Date().toISOString() };
    db.bookings.unshift(newBooking);
    saveDB(db);
    return NextResponse.json(newBooking);
}
