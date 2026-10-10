
export default function Loading() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-black">
            <div className="flex flex-col items-center gap-3">
                <div className="w-10 h-10 border-4 border-neutral-700 border-t-[#C2F800] rounded-full animate-spin"></div>
                <p className="text-neutral-400 text-sm">Loading...</p>
            </div>
        </div>
    );
} 