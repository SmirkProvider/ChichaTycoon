import { Sidebar } from "@/components/sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen overflow-hidden bg-background">
            <Sidebar />
            <main className="flex-1 overflow-y-auto p-8 relative">
                <div className="max-w-7xl mx-auto space-y-8">
                    {children}
                </div>
                {/* Background Ambient Effects */}
                <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none -z-10" />
                <div className="fixed bottom-0 left-64 w-[500px] h-[500px] bg-secondary/5 blur-[100px] rounded-full pointer-events-none -z-10" />
            </main>
        </div>
    );
}
