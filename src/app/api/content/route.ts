import { NextResponse } from 'next/server';
import { getDB, saveDB } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
    const db = getDB();
    return NextResponse.json(db.content || {});
}

export async function POST(request: Request) {
    const body = await request.json();
    const db = getDB();

    db.content = {
        ...db.content,
        ...body
    };

    saveDB(db);
    return NextResponse.json(db.content);
}
