import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

export async function getGameData() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        return null;
    }

    // We need the Discord ID, which we stored in the session in auth.ts
    // @ts-ignore
    const userId = session.user.id;

    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
            lounge: {
                include: {
                    employees: true
                }
            }
        }
    });

    return user;
}
