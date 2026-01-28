import { NextResponse } from 'next/server';
import { getDB, saveDB } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
    const db = getDB();
    return NextResponse.json(db.testimonials || []);
}

export async function POST(request: Request) {
    const body = await request.json();
    const db = getDB();

    if (!db.testimonials) {
        db.testimonials = [];
    }

    const newTestimonial = {
        _id: Math.random().toString(36).substr(2, 9),
        name: body.name,
        role: body.role,
        content: body.content,
        initial: body.name.charAt(0).toUpperCase(),
        createdAt: new Date().toISOString()
    };

    db.testimonials.push(newTestimonial);
    saveDB(db);

    return NextResponse.json(newTestimonial);
}
