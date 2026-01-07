import { NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import prisma from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
    providers: [
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID || "",
            clientSecret: process.env.DISCORD_CLIENT_SECRET || "",
            authorization: { params: { scope: 'identify guilds' } }, // Add guilds if we want to check server membership
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            if (!user.email && !user.id) return false;

            // Sync user to DB
            try {
                await prisma.user.upsert({
                    where: { id: user.id },
                    create: {
                        id: user.id,
                        username: user.name || "Unknown Tycoon",
                        avatarUrl: user.image,
                        // Create a default lounge for new users
                        lounge: {
                            create: {
                                name: `${user.name}'s Lounge`
                            }
                        }
                    },
                    update: {
                        username: user.name || "Unknown Tycoon",
                        avatarUrl: user.image,
                    },
                });
                return true;
            } catch (error) {
                console.error("Error syncing user to DB:", error);
                return true; // Use true to allow login even if DB sync fails, but ideally should fail safely.
            }
        },
        async session({ session, token }) {
            if (session?.user) {
                // @ts-ignore
                session.user.id = token.sub;
            }
            return session;
        },
    },
    pages: {
        signIn: '/login', // We'll build a custom login page
    },
    session: {
        strategy: "jwt",
    },
};
