import { NextResponse } from 'next/server';
import { getDB, saveDB } from '@/lib/db';

export async function POST(request: Request) {
    const { email, password } = await request.json();
    const db = getDB();

    // Ensure users array exists (migration for existing data.json)
    if (!db.users) {
        db.users = [{
            _id: "admin_001",
            name: "Super Admin",
            email: "admin@nagor.com",
            password: "admin123",
            role: "Super Admin",
            isFirstLogin: true
        }];
        saveDB(db);
    }

    const user = db.users.find((u: any) => u.email === email && u.password === password);

    if (user) {
        // Return user info sans password
        const { password, ...userInfo } = user;
        return NextResponse.json({
            success: true,
            user: userInfo,
            requirePasswordChange: user.isFirstLogin
        });
    }

    return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
}

export async function PUT(request: Request) {
    // Change Password Endpoint
    const { email, newPassword } = await request.json();
    const db = getDB();

    const index = db.users.findIndex((u: any) => u.email === email);
    if (index !== -1) {
        db.users[index].password = newPassword;
        db.users[index].isFirstLogin = false;
        saveDB(db);
        return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
}
