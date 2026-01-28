"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <div className="pt-32 pb-16 bg-gray-900 text-white text-center">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-heading font-bold mb-4">Terms of Service</h1>
                </div>
            </div>
            <div className="container mx-auto px-4 py-16 max-w-4xl text-gray-600 space-y-6">
                <p>Last updated: January 2026</p>
                <h2 className="text-2xl font-bold text-gray-900">1. Acceptance of Terms</h2>
                <p>
                    By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
                </p>
                <h2 className="text-2xl font-bold text-gray-900">2. Rental Agreement</h2>
                <p>
                    All rental items remain the property of Nagor Rental & Decor. The renter assumes full responsibility for the items
                    upon delivery or pickup until they are returned.
                </p>
                <h2 className="text-2xl font-bold text-gray-900">3. Cancellations</h2>
                <p>
                    Cancellations made less than 48 hours before the event date may be subject to a cancellation fee.
                </p>
            </div>
            <Footer />
        </main>
    );
}
