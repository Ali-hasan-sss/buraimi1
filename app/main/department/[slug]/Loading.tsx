import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
    return (
        <div className="min-h-screen" dir="rtl">
            <div className="relative bg-gradient-to-l from-[#254151] to-[#6096b4] text-white py-20 overflow-hidden">
                <div className="relative container mx-auto px-4 z-10 text-center">
                    <Skeleton className="h-12 w-[36rem] max-w-full mx-auto mb-4 bg-white/20" />
                    <Skeleton className="h-7 w-[28rem] max-w-full mx-auto bg-white/20" />
                </div>
            </div>

            <div className="py-12 bg-white">
                <div className="container mx-auto px-4">
                    <Skeleton className="h-6 w-full mb-3" />
                    <Skeleton className="h-6 w-5/6 mb-3" />
                    <Skeleton className="h-6 w-2/3" />
                </div>
            </div>

            <div className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <Skeleton className="h-10 w-56 mx-auto mb-6" />
                        <Skeleton className="h-10 w-48 mx-auto" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="bg-white p-8 border-2 border-[#c2a772]/20">
                                <div className="flex items-start gap-4 mb-6">
                                    <Skeleton className="h-16 w-16" />
                                    <div className="flex-1">
                                        <Skeleton className="h-7 w-56 mb-2" />
                                        <Skeleton className="h-4 w-full" />
                                    </div>
                                </div>

                                <Skeleton className="h-5 w-40 mb-4" />
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {Array.from({ length: 3 }).map((_, j) => (
                                        <Skeleton key={j} className="h-9 w-24" />
                                    ))}
                                </div>

                                <Skeleton className="h-11 w-full" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <Skeleton className="h-10 w-64 mx-auto mb-6" />
                        <Skeleton className="h-10 w-52 mx-auto mb-4" />
                        <Skeleton className="h-6 w-[40rem] max-w-full mx-auto" />
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="bg-gradient-to-br from-white to-blue-50 p-6 border border-[#c2a772]/20">
                                <div className="flex items-start gap-4 mb-4">
                                    <Skeleton className="h-14 w-14" />
                                    <div className="flex-1">
                                        <Skeleton className="h-5 w-40 mb-2" />
                                        <Skeleton className="h-4 w-32 mb-2" />
                                        <Skeleton className="h-4 w-24" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-5/6" />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16">
                        <div className="bg-gradient-to-l from-[#254151] to-[#6096b4] text-white p-10 text-center">
                            <Skeleton className="h-10 w-80 mx-auto mb-6 bg-white/20" />
                            <Skeleton className="h-12 w-52 mx-auto bg-white/20" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}