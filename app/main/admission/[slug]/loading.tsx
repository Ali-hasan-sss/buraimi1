import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
    return (
        <div className="min-h-screen bg-white" dir="rtl">
            <Skeleton className="h-[400px] md:h-[550px] w-full rounded-none" />
            <section className="bg-gray-100 py-12 sm:py-16">
                <div className="container mx-auto px-4">
                    <Skeleton className="h-10 w-48 mx-auto mb-10" />
                    <div className="flex gap-8 justify-center mb-10">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <Skeleton key={i} className="h-16 w-32" />
                        ))}
                    </div>
                    <Skeleton className="h-80 max-w-4xl mx-auto" />
                </div>
            </section>
        </div>
    )
}
