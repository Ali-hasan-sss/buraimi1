import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
    return (
        <div className="min-h-screen bg-white" dir="rtl">
            <Skeleton className="h-[400px] md:h-[550px] w-full rounded-none" />

            <section className="bg-gray-100 py-12 sm:py-16 lg:py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <Skeleton className="h-10 w-80 max-w-full mb-4" />
                    <Skeleton className="h-5 w-[32rem] max-w-full mb-10" />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 max-w-5xl">
                        {Array.from({ length: 2 }).map((_, i) => (
                            <div key={i} className="bg-white overflow-hidden shadow-sm">
                                <Skeleton className="aspect-[420/247] w-full rounded-none" />
                                <div className="p-5 sm:p-6">
                                    <Skeleton className="h-6 w-32 mb-5" />
                                    <Skeleton className="h-10 w-28" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
