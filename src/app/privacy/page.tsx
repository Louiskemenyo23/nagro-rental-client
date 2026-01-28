"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <div className="pt-32 pb-16 bg-gray-900 text-white text-center">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-heading font-bold mb-4">Privacy Policy</h1>
                </div>
            </div>
            <div className="container mx-auto px-4 py-16 max-w-4xl text-gray-600 space-y-6">
                <p>Last updated: January 2026</p>
                <p>
                    At Nagor Rental & Decor, we respect your privacy and are committed to protecting your personal data.
                    This privacy policy will inform you as to how we look after your personal data when you visit our website
                    and tell you about your privacy rights.
                </p>
                <h2 className="text-2xl font-bold text-gray-900">1. Information We Collect</h2>
                <p>
                    We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
                    Identity Data (name), Contact Data (email, phone, address), and Transaction Data (details of payments).
                </p>
                <h2 className="text-2xl font-bold text-gray-900">2. How We Use Your Data</h2>
                <p>
                    We will only use your personal data when the law allows us to. Most commonly, we will use your personal data
                    to process your bookings and communicate with you regarding our services.
                </p>
            </div>
            <Footer />
        </main>
    );
}
