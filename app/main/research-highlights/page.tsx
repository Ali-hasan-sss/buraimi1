import Link from "next/link";
import { getLocale } from "next-intl/server";
import dbConnect from "@/lib/dbConnect";
import { ResearchHighlightModel } from "@/models/ResearchHighlight";

export const dynamic = "force-dynamic";

export default async function ResearchHighlightsPage() {
  const locale = await getLocale();
  const isAr = locale === "ar";
  await dbConnect();
  const docs = await ResearchHighlightModel.find({}).sort({ type: 1, order: 1, date: -1 }).lean();

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white px-4 sm:px-6 lg:px-16 py-10">
      <h1 className={`text-3xl font-bold text-[#254151] mb-8 ${isAr ? "text-right" : "text-left"}`}>
        {isAr ? "الأبحاث والجوائز" : "Research & Awards"}
      </h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {docs.map((item) => (
          <Link key={String(item._id)} href={`/main/research-highlights/${item.slug}`} className="rounded-xl border bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-xs text-gray-500 mb-2">{new Date(item.date).toLocaleDateString(isAr ? "ar-SA" : "en-US")}</div>
            <h2 className={`text-lg font-semibold text-[#254151] ${isAr ? "text-right" : "text-left"}`}>
              {isAr ? item.titleAr : item.titleEn}
            </h2>
          </Link>
        ))}
      </div>
    </main>
  );
}
