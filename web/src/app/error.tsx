'use client';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background text-red-500">
            <h2 className="text-2xl font-bold mb-4">Une erreur est survenue !</h2>
            <pre className="bg-black/20 p-4 rounded mb-4 max-w-lg overflow-auto">
                {error.message}
            </pre>
            <button
                onClick={() => reset()}
                className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
            >
                Réessayer
            </button>
        </div>
    );
}
