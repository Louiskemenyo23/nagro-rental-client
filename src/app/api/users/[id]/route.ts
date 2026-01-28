import { NextResponse } from 'next/server';
import { getDB, saveDB } from '@/lib/db';

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params;
    const body = await request.json();
    const db = getDB();

    const index = db.users.findIndex((u: any) => u._id === id);
    if (index === -1) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Role Update or Password Reset
    if (body.resetPassword) {
        db.users[index].password = body.newPassword;
        db.users[index].isFirstLogin = true; // Force change again
    } else {
        // General update (role, name, etc)
        db.users[index] = { ...db.users[index], ...body };
    }

    saveDB(db);
    const { password, ...rest } = db.users[index];
    return NextResponse.json(rest);
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params;
    const db = getDB();

    const newUsers = db.users.filter((u: any) => u._id !== id);
    if (newUsers.length === db.users.length) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    db.users = newUsers;
    saveDB(db);

    return NextResponse.json({ success: true });
}
