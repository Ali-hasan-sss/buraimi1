import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            <div className="relative bg-gradient-to-l from-[#254151] to-[#6096b4] text-white py-20 overflow-hidden">
                <div className="relative container mx-auto px-4">
                    <div className="text-center mb-12">
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <Skeleton className="h-16 w-16 rounded-full bg-white/20" />
                        </div>
                        <Skeleton className="h-12 w-64 mx-auto bg-white/20" />
                        <Skeleton className="h-7 w-[32rem] max-w-full mx-auto mt-4 bg-white/20" />
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-16 relative z-20 mb-20">
                <div className="grid md:grid-cols-3 gap-8">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="bg-white rounded-2xl shadow-2xl p-8 text-center border-t-4 border-[#c2a772]">
                            <Skeleton className="h-20 w-20 rounded-full mx-auto mb-6" />
                            <Skeleton className="h-12 w-24 mx-auto mb-4" />
                            <Skeleton className="h-5 w-48 mx-auto" />
                        </div>
                    ))}
                </div>
            </div>

            <div className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <Skeleton className="h-9 w-72 mb-6" />
                    <Skeleton className="h-6 w-[40rem] max-w-full mb-10" />

                    <div className="grid md:grid-cols-2 gap-8">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="bg-gradient-to-br from-white to-blue-50 p-6 border border-[#c2a772]/20">
                                <div className="flex items-start gap-4">
                                    <Skeleton className="h-14 w-14" />
                                    <div className="flex-1">
                                        <Skeleton className="h-5 w-40 mb-2" />
                                        <Skeleton className="h-4 w-full mb-2" />
                                        <Skeleton className="h-4 w-5/6" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}