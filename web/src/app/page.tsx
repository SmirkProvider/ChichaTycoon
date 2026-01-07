'use client'

import { signIn, useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { motion } from "framer-motion"
import { Flame, Star, Store } from "lucide-react"
import Link from "next/link"

export default function Home() {
  const { data: session } = useSession()

  if (session) {
    redirect('/dashboard')
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-[url('/bg-smoke.jpg')] bg-cover bg-center overflow-hidden">
      <div className="absolute inset-0 bg-black/80 z-0" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-4 rounded-full bg-primary/20 border border-primary/50 shadow-[0_0_50px_rgba(147,51,234,0.3)]"
        >
          <Flame size={64} className="text-secondary animate-pulse" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-300 to-secondary mb-4 drop-shadow-lg"
        >
          CHICHA TYCOON
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-300 mb-12"
        >
          Construis ton empire. Gère ton lounge. Deviens le Roi de la Chicha.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex gap-4"
        >
          <button
            onClick={() => signIn('discord')}
            className="group relative px-8 py-4 bg-primary text-white font-bold rounded-lg overflow-hidden transition-transform hover:scale-105"
          >
            <span className="absolute inset-0 bg-white/20 group-hover:translate-x-full transition-transform duration-500 skew-x-12" />
            <span className="flex items-center gap-2">
              <Store />
              Lancer mon Lounge (Discord Log)
            </span>
          </button>
        </motion.div>

        <div className="grid grid-cols-3 gap-8 mt-20 w-full text-center">
          <div className="glass-card flex flex-col items-center">
            <div className="text-secondary mb-2"><Star /></div>
            <div className="font-bold text-lg">VIP Lounge</div>
            <div className="text-xs text-gray-400">Décore ton espace</div>
          </div>
          <div className="glass-card flex flex-col items-center">
            <div className="text-purple-400 mb-2"><Flame /></div>
            <div className="font-bold text-lg">Saveurs Exotiques</div>
            <div className="text-xs text-gray-400">Unlock Love 66 & Hawaii</div>
          </div>
          <div className="glass-card flex flex-col items-center">
            <div className="text-green-400 mb-2">💎</div>
            <div className="font-bold text-lg">Trading</div>
            <div className="text-xs text-gray-400">Échange tes chichas</div>
          </div>
        </div>
      </div>
    </main>
  )
}
