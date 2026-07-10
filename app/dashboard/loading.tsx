import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-2">
                    <Skeleton className="h-7 w-56" />
                    <Skeleton className="h-4 w-40" />
                </div>
                <Skeleton className="h-9 w-full sm:w-40" />
            </div>

            <div className="rounded-xl border bg-background p-4">
                <div className="space-y-3">
                    <Skeleton className="h-5 w-48" />
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        <Skeleton className="h-20 w-full" />
                        <Skeleton className="h-20 w-full" />
                        <Skeleton className="h-20 w-full" />
                    </div>
                </div>
            </div>

            <div className="overflow-hidden rounded-xl border bg-background">
                <div className="p-4">
                    <Skeleton className="h-5 w-48" />
                </div>
                <div className="w-full overflow-x-auto">
                    <table className="min-w-[720px] w-full">
                        <thead className="bg-muted/50">
                            <tr>
                                <th className="px-4 py-3"><Skeleton className="h-4 w-20" /></th>
                                <th className="px-4 py-3"><Skeleton className="h-4 w-24" /></th>
                                <th className="px-4 py-3"><Skeleton className="h-4 w-24" /></th>
                                <th className="px-4 py-3"><Skeleton className="h-4 w-20" /></th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.from({ length: 6 }).map((_, i) => (
                                <tr key={i} className="border-t">
                                    <td className="px-4 py-3"><Skeleton className="h-4 w-56" /></td>
                                    <td className="px-4 py-3"><Skeleton className="h-4 w-40" /></td>
                                    <td className="px-4 py-3"><Skeleton className="h-4 w-32" /></td>
                                    <td className="px-4 py-3">
                                        <div className="flex flex-col gap-2 sm:flex-row">
                                            <Skeleton className="h-8 w-full sm:w-20" />
                                            <Skeleton className="h-8 w-full sm:w-20" />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
