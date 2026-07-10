import Link from "next/link";
import { getLocale } from "next-intl/server";
import { Button } from "@/components/ui/button";
import dbConnect from "@/lib/dbConnect";
import { ResearchHighlightModel } from "@/models/ResearchHighlight";
import { ResearchHighlightsTable } from "@/components/dashboard/research-highlights/ResearchHighlightsTable";
import { ResearchHighlightType } from "@/types/research-highlight";

const HIGHLIGHT_TYPES: ResearchHighlightType[] = ["research", "award"];

export default async function DashboardResearchHighlightsPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const locale = await getLocale();
  const isAr = locale === "ar";
  const sp = await searchParams;
  const selectedType = HIGHLIGHT_TYPES.includes(
    sp.type as ResearchHighlightType,
  )
    ? (sp.type as ResearchHighlightType)
    : "all";
  await dbConnect();
  const query = selectedType === "all" ? {} : { type: selectedType };
  const docs = await ResearchHighlightModel.find(query)
    .sort({ type: 1, order: 1, date: -1 })
    .lean();
  const data = docs.map((doc) => ({
    id: String(doc._id),
    slug: doc.slug,
    type: doc.type,
    titleAr: doc.titleAr,
    titleEn: doc.titleEn,
    summaryAr: doc.summaryAr,
    summaryEn: doc.summaryEn,
    contentAr: doc.contentAr,
    contentEn: doc.contentEn,
    date: doc.date,
    image: doc.image,
    order: doc.order,
  }));

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          <Button
            asChild
            variant={selectedType === "all" ? "default" : "outline"}
            size="sm"
          >
            <Link href="/dashboard/research-highlights">
              {isAr ? "الكل" : "All"}
            </Link>
          </Button>
          <Button
            asChild
            variant={selectedType === "research" ? "default" : "outline"}
            size="sm"
          >
            <Link href="/dashboard/research-highlights?type=research">
              {isAr ? "أبحاث" : "Research"}
            </Link>
          </Button>
          <Button
            asChild
            variant={selectedType === "award" ? "default" : "outline"}
            size="sm"
          >
            <Link href="/dashboard/research-highlights?type=award">
              {isAr ? "جوائز" : "Awards"}
            </Link>
          </Button>
        </div>

        <Button asChild>
          <Link href="/dashboard/research-highlights/create">
            {isAr ? "إضافة عنصر" : "Create Item"}
          </Link>
        </Button>
      </div>
      <ResearchHighlightsTable data={data} isAr={isAr} />
    </div>
  );
}
