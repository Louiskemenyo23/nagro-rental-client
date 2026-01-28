import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data.json');

const INITIAL_DATA = {
    packages: [
        { _id: "1", name: "Luxury Wedding Package", description: "Complete wedding decoration", price: 5000, images: ["/images/wedding.png"], isFeatured: true },
        { _id: "2", name: "Corporate Event Setup", description: "Professional stage setup", price: 3500, images: ["/images/corporate.png"], isFeatured: true },
        { _id: "3", name: "Birthday Party Standard", description: "Fun and colorful decoration", price: 1500, images: ["/images/birthday.png"], isFeatured: false },
        { _id: "4", name: "Funeral Decor Service", description: "Respectful setting", price: 2000, images: ["/images/funeral.png"], isFeatured: false },
    ],
    items: [
        { _id: "1", name: "Gold Phoenix Chair", category: "Chairs", pricePerDay: 25, quantity: 200, images: ["/images/chair-gold.png"], isFeatured: true },
        { _id: "2", name: "Marquee Tent", category: "Tents", pricePerDay: 500, quantity: 5, images: ["/images/tent.png"], isFeatured: true },
        { _id: "3", name: "Flower Wall", category: "Backdrops", pricePerDay: 300, quantity: 2, images: ["/images/flower-wall.png"], isFeatured: true },
        { _id: "4", name: "LED Lights", category: "Lighting", pricePerDay: 50, quantity: 20, images: ["/images/lights.png"], isFeatured: false },
        { _id: "5", name: "Round Table", category: "Tables", pricePerDay: 40, quantity: 0, images: ["/images/table-round.png"], isFeatured: false },
    ],
    bookings: [],
    messages: [],
    users: [
        {
            _id: "admin_001",
            name: "Super Admin",
            email: "admin@nagor.com",
            password: "admin123", // In production, this must be hashed
            role: "Super Admin",
            isFirstLogin: true
        }
    ]
};

export function getDB() {
    console.log("Loading DB from:", DB_PATH);
    if (!fs.existsSync(DB_PATH)) {
        console.warn(`DB file not found at ${DB_PATH}. Using initial data.`);
        // In read-only environments (like Netlify build), we cannot write.
        // fs.writeFileSync(DB_PATH, JSON.stringify(INITIAL_DATA, null, 2));
        return INITIAL_DATA;
    }
    const fileContent = fs.readFileSync(DB_PATH, 'utf-8');
    try {
        const data = JSON.parse(fileContent);
        console.log(`DB loaded successfully. Bookings: ${data.bookings?.length}, Packages: ${data.packages?.length}`);
        return data;
    } catch (e) {
        console.error("Error parsing DB JSON:", e);
        return INITIAL_DATA;
    }
}

export function saveDB(data: any) {
    try {
        fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
    } catch (e) {
        console.error("Failed to save DB (ReadOnly FS?):", e);
    }
}
