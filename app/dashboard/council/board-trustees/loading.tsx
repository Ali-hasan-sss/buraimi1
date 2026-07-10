import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-2">
                    <Skeleton className="h-7 w-64" />
                    <Skeleton className="h-4 w-40" />
                </div>
                <Skeleton className="h-9 w-full sm:w-40" />
            </div>

            <div className="overflow-hidden rounded-xl border bg-background">
                <div className="w-full overflow-x-auto">
                    <table className="w-max min-w-full">
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
