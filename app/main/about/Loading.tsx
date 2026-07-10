import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50" dir="rtl">
            <div className="relative bg-gradient-to-l from-[#254151] to-[#6096b4] text-white py-20 overflow-hidden">
                <div className="relative container mx-auto px-4 z-10 text-center">
                    <Skeleton className="h-12 w-72 mx-auto mb-4 bg-white/20" />
                    <Skeleton className="h-6 w-[40rem] max-w-full mx-auto bg-white/20" />
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <Skeleton className="h-8 w-64 mb-6" />
                    <Skeleton className="h-5 w-full mb-3" />
                    <Skeleton className="h-5 w-5/6 mb-3" />
                    <Skeleton className="h-5 w-2/3 mb-10" />

                    <div className="grid md:grid-cols-3 gap-6">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="bg-gradient-to-br from-white to-blue-50 p-6 border border-[#c2a772]/20">
                                <Skeleton className="h-12 w-12 rounded-full mb-4" />
                                <Skeleton className="h-6 w-40 mb-2" />
                                <Skeleton className="h-4 w-full mb-2" />
                                <Skeleton className="h-4 w-5/6" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}