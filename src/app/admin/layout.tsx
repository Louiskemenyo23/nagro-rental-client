"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, ShoppingBag, Calendar, Settings, LogOut, Mail, Menu, Bell, MapPin, BarChart2, User, ChevronDown, MessageCircle, FileText } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileRef = useRef<HTMLDivElement>(null);

    // Close profile dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Auth Protection
    const [user, setUser] = useState({ name: "User", email: "", role: "Admin" });

    // Auth Protection & User Load
    useEffect(() => {
        if (pathname === "/admin/login") return;
        const session = localStorage.getItem("nagor_admin_session");
        if (!session) {
            window.location.href = "/admin/login";
        } else {
            const email = localStorage.getItem("nagor_admin_email") || "admin@nagor.com";
            // Mock name extraction or use saved name if available.
            // In a real app, we'd fetch full user profile here.
            const role = localStorage.getItem("nagor_user_role") || "Admin";
            // Simple name derivation or fallback
            const derivedName = email.split('@')[0].replace(/[._]/g, ' ');
            setUser({ name: derivedName, email, role });
        }
    }, [pathname]);

    const allLinks = [
        { name: "home", href: "/admin/dashboard", icon: LayoutDashboard },
        { name: "service", href: "/admin/services", icon: Package },
        { name: "messages", href: "/admin/messages", icon: Mail },
        { name: "testimonials", href: "/admin/testimonials", icon: MessageCircle },
        { name: "content", href: "/admin/content", icon: FileText },
        { name: "booking", href: "/admin/bookings", icon: Calendar },
        { name: "inventory", href: "/admin/inventory", icon: ShoppingBag },
        { name: "settings", href: "/admin/settings", icon: Settings },
    ];

    const links = user.role === 'Editor'
        ? allLinks.filter(l => ["messages", "testimonials", "content"].includes(l.name))
        : allLinks;

    if (pathname === "/admin/login") {
        return <>{children}</>;
    }

    return (
        <div className="flex h-screen bg-gray-50 font-sans text-slate-800">
            {/* Sidebar - Old Theme (Secondary Dark Blue + Gold Accents) */}
            <aside
                className={`fixed md:sticky top-0 left-0 w-64 h-full z-40 transition-transform duration-300 ease-in-out
                ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
                bg-[#0F172A] text-white flex flex-col shadow-2xl overflow-y-auto scrollbar-none border-r border-white/5`}
            >
                {/* Profile Section (Top) */}
                <div className="pt-12 pb-8 flex flex-col items-center border-b border-white/5 mx-6 relative z-50">
                    <div
                        ref={profileRef}
                        className="relative mb-4 group cursor-pointer"
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                    >
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#996515] p-1 shadow-lg ring-4 ring-[#0F172A]/50 overflow-hidden transition-transform transform group-hover:scale-105">
                            {/* Initials or Image */}
                            <div className="w-full h-full bg-[#0F172A] flex items-center justify-center rounded-full">
                                <span className="text-[#D4AF37] font-bold text-2xl font-heading uppercase">{user.name.substring(0, 2)}</span>
                            </div>
                        </div>
                        <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#0F172A]"></div>

                        {/* Profile Dropdown */}
                        {isProfileOpen && (
                            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-white text-gray-800 rounded-xl shadow-xl overflow-hidden z-50 animate-fade-in-up origin-top border border-gray-100">
                                <div className="p-3 border-b border-gray-100 bg-gray-50">
                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Account Actions</p>
                                </div>
                                <Link
                                    href="/admin/settings"
                                    onClick={() => { setIsProfileOpen(false); setIsMobileMenuOpen(false); }}
                                    className="w-full text-left px-4 py-3 text-gray-600 hover:bg-gray-50 text-sm font-medium flex items-center gap-2 transition-colors"
                                >
                                    <User size={16} />
                                    Profile
                                </Link>
                                <button
                                    onClick={() => {
                                        localStorage.removeItem("nagor_admin_session");
                                        localStorage.removeItem("nagor_admin_email");
                                        localStorage.removeItem("nagor_user_role");
                                        window.location.href = "/admin/login";
                                    }}
                                    className="w-full text-left px-4 py-3 text-red-500 hover:bg-red-50 text-sm font-medium flex items-center gap-2 transition-colors border-t border-gray-50"
                                >
                                    <LogOut size={16} />
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>

                    <div onClick={() => setIsProfileOpen(!isProfileOpen)} className="text-center cursor-pointer group px-2">
                        <h3 className="text-white font-heading font-bold text-lg tracking-wide uppercase group-hover:text-[#D4AF37] transition-colors truncate w-full">{user.name}</h3>
                        <p className="text-xs text-gray-400 font-light mt-1 truncate">{user.email}</p>
                    </div>
                </div>

                {/* Navigation (unchanged) */}
                <nav className="p-4 space-y-1 flex-1 mt-4">
                    {links.map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href;

                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`flex items-center px-4 py-3.5 rounded-xl transition-all duration-300 group relative overflow-hidden ${isActive
                                    ? "text-[#D4AF37] bg-white/5 shadow-inner"
                                    : "text-gray-400 hover:text-white hover:bg-white/5"
                                    }`}
                            >
                                {isActive && (
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-[#D4AF37] rounded-r-full"></div>
                                )}
                                <div className={`w-8 flex justify-center mr-3 z-10 transition-transform group-hover:scale-110 ${isActive ? "text-[#D4AF37]" : "text-gray-500 group-hover:text-white"}`}>
                                    <Icon size={20} className={isActive ? "fill-current opacity-20" : ""} />
                                </div>
                                <span className={`text-sm tracking-wide capitalize z-10 ${isActive ? "font-bold" : "font-medium"}`}>{link.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-6 mt-auto">
                    <div className="bg-gradient-to-br from-[#D4AF37]/10 to-transparent p-4 rounded-2xl border border-[#D4AF37]/20">
                        <p className="text-[10px] text-[#D4AF37] uppercase tracking-widest font-bold mb-2">System Status</p>
                        <div className="flex items-center gap-2 text-xs text-gray-300">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                            Operational
                        </div>
                    </div>
                </div>
            </aside>

            {/* Mobile Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-gray-50">
                {/* Header */}
                <header className="h-20 flex items-center justify-between px-8 bg-white sticky top-0 z-20 shadow-sm border-b border-gray-100">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="md:hidden text-gray-500 hover:text-black transition-colors p-2 hover:bg-gray-100 rounded-lg"
                        >
                            <Menu size={24} />
                        </button>
                        <h2 className="text-xl font-bold text-gray-800 tracking-tight capitalize">
                            {links.find(l => l.href === pathname)?.name || "Dashboard User"}
                        </h2>
                    </div>

                    <div className="flex items-center gap-6">
                        <button className="relative text-gray-400 hover:text-[#0F172A] transition-colors p-2 hover:bg-gray-50 rounded-full">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>

                        <div className="flex items-center gap-3 pl-6 border-l border-gray-100">
                            <div className="text-right hidden md:block">
                                <p className="text-sm font-bold text-gray-800 capitalize">{user.name}</p>
                                <p className="text-[10px] text-gray-400 font-medium">{user.role}</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white shadow-sm overflow-hidden group cursor-pointer" onClick={() => setIsProfileOpen(true)}>
                                {/* Avatar */}
                                <div className="w-full h-full bg-[#0F172A] flex items-center justify-center text-[#D4AF37] font-bold text-xs ring-2 ring-transparent group-hover:ring-[#D4AF37]/50 transition-all uppercase">{user.name.substring(0, 2)}</div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-auto p-6 md:p-8 scroll-smooth">
                    {children}
                </main>
            </div>
        </div>
    );
}
