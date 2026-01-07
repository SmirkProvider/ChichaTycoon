'use client';

import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { DollarSign, Wind, Users, Zap } from "lucide-react";

// Assuming getGameData is an async function that fetches user and lounge data
// This function would typically be defined elsewhere or imported.
// For the purpose of this edit, we'll assume its existence.
async function getGameData() {
    // Simulate an API call
    return new Promise(resolve => setTimeout(() => {
        resolve({
            balance: 1250.00,
            level: 1,
            username: "PlayerOne",
            lounge: {
                name: "Space Lounge",
                hookahCount: 12,
                seats: 10,
                reputation: 4.5
            }
        });
    }, 1000));
}

interface GameData {
    balance: number;
    level: number;
    username: string;
    lounge: {
        name: string;
        hookahCount: number;
        seats: number;
        reputation: number;
    }
}

export default async function Dashboard() {
    let userData: GameData | null = null;
    let errorMsg = null;

    try {
        userData = await getGameData() as GameData;
    } catch (e: any) {
        console.error("Dashboard Error:", e);
        errorMsg = e.message;
    }

    if (errorMsg) {
        return <div className="p-8 text-red-500">Erreur Chargement: {errorMsg}</div>;
    }

    if (!userData || !userData.lounge) {
        return <div className="p-8">Chargement de votre empire... (Ou erreur de compte)</div>;
    }

    const { balance, level, username } = userData;
    const { name, hookahCount, seats, reputation } = userData.lounge;

    return (
        <div>
            {/* Header */}
            <header className="flex justify-between items-end mb-8">
                <div>
                    <h2 className="text-3xl font-bold">Lounge Dashboard</h2>
                    <p className="text-gray-400">Bienvenue, {username}</p>
                </div>
                <div className="glass px-4 py-2 rounded-lg flex gap-4 text-sm font-mono">
                    <span className="text-purple-400 flex items-center gap-1"><Zap size={16} /> Lvl 1</span>
                </div>
            </header>

            {/* KPI Cloud */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatsCard icon={Wind} label="Chichas / Heure" value="12" color="from-purple-500 to-indigo-500" />
                <StatsCard icon={DollarSign} label="Revenu Est." value="$450/h" color="from-green-500 to-emerald-500" />
                <StatsCard icon={Users} label="Clients Actifs" value="8/10" color="from-orange-500 to-red-500" />
            </div>

            {/* Active Hookahs View */}
            <div className="glass-card">
                <h3 className="font-bold text-xl mb-4">Space Lounge</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="aspect-square bg-white/5 rounded-lg flex flex-col items-center justify-center border border-white/5 hover:border-primary/50 transition-colors group cursor-pointer relative overflow-hidden">
                            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors" />
                            <Wind className={`mb-2 ${i <= 2 ? 'text-primary animate-pulse' : 'text-gray-600'}`} size={32} />
                            <span className="text-sm font-medium z-10">{i <= 2 ? 'Active' : 'Empty'}</span>
                            {i <= 2 && <div className="text-xs text-green-400 mt-1 z-10">Running</div>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function StatsCard({ icon: Icon, label, value, color }: any) {
    return (
        <div className="glass-card relative overflow-hidden group">
            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${color} opacity-10 rounded-bl-full transition-transform group-hover:scale-110`} />
            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-2 text-gray-400">
                    <Icon size={20} />
                    <span>{label}</span>
                </div>
                <div className="text-3xl font-bold">{value}</div>
            </div>
        </div>
    )
}
