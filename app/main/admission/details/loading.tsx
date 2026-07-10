import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50" dir="rtl">
            <div className="relative bg-gradient-to-l from-[#254151] to-[#6096b4] text-white py-16 overflow-hidden">
                <div className="relative container mx-auto px-4 z-10 text-center">
                    <Skeleton className="h-10 w-72 mx-auto mb-4 bg-white/20" />
                    <Skeleton className="h-6 w-[40rem] max-w-full mx-auto bg-white/20" />
                </div>
            </div>

            <div className="sticky top-0 z-40 bg-white shadow-md border-b-2 border-[#c2a772]">
                <div className="container mx-auto px-4">
                    <div className="flex overflow-x-auto gap-2 py-4">
                        {Array.from({ length: 7 }).map((_, i) => (
                            <Skeleton key={i} className="h-12 w-40 rounded-full shrink-0" />
                        ))}
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                    <Skeleton className="h-8 w-56 mb-6" />
                    <Skeleton className="h-6 w-full mb-3" />
                    <Skeleton className="h-6 w-5/6 mb-8" />

                    <div className="grid md:grid-cols-3 gap-6">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="rounded-xl p-6 text-center border border-gray-200">
                                <Skeleton className="h-12 w-12 rounded-full mx-auto mb-4" />
                                <Skeleton className="h-6 w-20 mx-auto mb-2" />
                                <Skeleton className="h-4 w-28 mx-auto" />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <Skeleton className="h-8 w-72 mb-6" />
                    <div className="space-y-3">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="flex items-start gap-3 bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                                <Skeleton className="h-6 w-6 rounded-full mt-1" />
                                <Skeleton className="h-5 w-full" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
