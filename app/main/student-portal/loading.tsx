import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50">
      <div className="relative bg-gradient-to-l from-[#254151] to-[#2d4a5c] overflow-hidden">
        <div className="relative container mx-auto px-4 py-20 text-center">
          <div className="inline-block mb-6">
            <Skeleton className="h-24 w-24 rounded-2xl bg-white/15" />
          </div>
          <Skeleton className="mx-auto h-12 w-64 bg-white/15" />
          <Skeleton className="mx-auto mt-4 h-6 w-96 max-w-full bg-white/10" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-[#6096b4] via-[#c2a772] to-[#6096b4]" />
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 border border-gray-100">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="mt-3 h-4 w-72" />

            <div className="mt-8 space-y-6">
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-12 w-full" />
              </div>

              <div className="space-y-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-12 w-full" />
              </div>

              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-28" />
              </div>

              <Skeleton className="h-14 w-full rounded-md" />
              <Skeleton className="h-20 w-full rounded-xl" />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <Skeleton className="h-7 w-48" />
              <Skeleton className="mt-4 h-4 w-96 max-w-full" />
            </div>

            <div className="grid gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white border-2 border-gray-200 rounded-xl p-5 shadow-sm"
                >
                  <div className="flex items-start gap-4">
                    <Skeleton className="h-12 w-12 rounded-xl" />
                    <div className="flex-1">
                      <Skeleton className="h-5 w-40" />
                      <Skeleton className="mt-2 h-4 w-64 max-w-full" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-2xl p-6 bg-gradient-to-br from-[#254151] to-[#2d4a5c]">
              <Skeleton className="h-6 w-48 bg-white/15" />
              <Skeleton className="mt-4 h-4 w-80 max-w-full bg-white/10" />
              <Skeleton className="mt-4 h-4 w-56 bg-white/10" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
