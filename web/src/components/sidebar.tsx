'use client';

import { Home, ShoppingBag, Users, Settings, LogOut } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

const navItems = [
    { icon: Home, label: 'Lounge', href: '/dashboard' },
    { icon: ShoppingBag, label: 'Boutique', href: '/dashboard/shop' },
    { icon: Users, label: 'Employés', href: '/dashboard/staff' },
    { icon: Settings, label: 'Réglages', href: '/dashboard/settings' },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="w-64 h-screen bg-card border-r border-border p-4 flex flex-col">
            <div className="flex items-center gap-2 px-4 py-8">
                <div className="w-8 h-8 rounded-full bg-primary animate-pulse" />
                <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                    CHICHA TYCOON
                </h1>
            </div>

            <nav className="flex-1 space-y-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${isActive
                                    ? 'bg-primary/20 text-primary border border-primary/50 shadow-[0_0_15px_rgba(147,51,234,0.3)]'
                                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <item.icon size={20} />
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-border">
                <button
                    onClick={() => signOut()}
                    className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-xl w-full transition-colors"
                >
                    <LogOut size={20} />
                    <span className="font-medium">Déconnexion</span>
                </button>
            </div>
        </div>
    );
}
