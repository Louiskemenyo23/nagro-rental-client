import { NextResponse } from 'next/server';
import { getDB, saveDB } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
    const db = getDB();
    // Return users without passwords
    const users = (db.users || []).map((u: any) => {
        const { password, ...rest } = u;
        return rest;
    });
    return NextResponse.json(users);
}

export async function POST(request: Request) {
    const body = await request.json();
    const db = getDB();

    if (!db.users) db.users = [];

    // Check if email exists
    if (db.users.find((u: any) => u.email === body.email)) {
        return NextResponse.json({ error: "Email already exists" }, { status: 400 });
    }

    const newUser = {
        _id: Math.random().toString(36).substr(2, 9),
        name: body.name,
        email: body.email,
        role: body.role || "Editor",
        password: body.password, // Preset or auto-generated
        isFirstLogin: true, // Always force change for new users
        createdAt: new Date().toISOString()
    };

    db.users.push(newUser);
    saveDB(db);

    const { password, ...rest } = newUser;
    return NextResponse.json(rest);
}
