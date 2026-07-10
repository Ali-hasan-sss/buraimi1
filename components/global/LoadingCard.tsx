export default function LoadingCard({ className }: { className?: string }) {
    return (
        <div className={`bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 ${className || ''}`.trim()}>
            <div className="bg-gradient-to-r from-[#254151] to-[#6096b4] p-6">
                <div className="h-5 w-2/3 rounded bg-white/20" />
                <div className="mt-3 h-4 w-1/2 rounded bg-white/15" />
            </div>
            <div className="p-6 space-y-4">
                <div className="h-9 w-40 rounded-full bg-gray-100" />
                <div className="space-y-2">
                    <div className="h-4 w-full rounded bg-gray-100" />
                    <div className="h-4 w-5/6 rounded bg-gray-100" />
                </div>
                <div className="h-4 w-1/3 rounded bg-gray-100" />
            </div>
        </div>
    )
}