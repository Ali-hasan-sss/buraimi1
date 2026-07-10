import Link from "next/link";
import { getLocale } from "next-intl/server";
import { Button } from "@/components/ui/button";
import dbConnect from "@/lib/dbConnect";
import { EventModel } from "@/models/Event";
import { EventsTable } from "@/components/dashboard/events/EventsTable";
import { EventTypeKey } from "@/types/event";

const EVENT_TYPES: EventTypeKey[] = ["events", "conferences", "student"];

export default async function DashboardEventsPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const locale = await getLocale();
  const isAr = locale === "ar";
  const sp = await searchParams;
  const selectedType = EVENT_TYPES.includes(sp.type as EventTypeKey)
    ? (sp.type as EventTypeKey)
    : "all";
  await dbConnect();

  const query =
    selectedType === "all" ? {} : { type: selectedType };

  const docs = await EventModel.find(query).sort({ date: 1, createdAt: -1 }).lean();
  const data = docs.map((doc) => ({
    id: String(doc._id),
    slug: doc.slug,
    titleAr: doc.titleAr,
    titleEn: doc.titleEn,
    summaryAr: doc.summaryAr,
    summaryEn: doc.summaryEn,
    contentAr: doc.contentAr,
    contentEn: doc.contentEn,
    date: doc.date,
    locationAr: doc.locationAr,
    locationEn: doc.locationEn,
    image: doc.image,
    type: doc.type,
  }));

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          <Button asChild variant={selectedType === "all" ? "default" : "outline"} size="sm">
            <Link href="/dashboard/events">{isAr ? "الكل" : "All"}</Link>
          </Button>
          <Button asChild variant={selectedType === "events" ? "default" : "outline"} size="sm">
            <Link href="/dashboard/events?type=events">{isAr ? "فعاليات" : "Events"}</Link>
          </Button>
          <Button asChild variant={selectedType === "conferences" ? "default" : "outline"} size="sm">
            <Link href="/dashboard/events?type=conferences">{isAr ? "مؤتمرات" : "Conferences"}</Link>
          </Button>
          <Button asChild variant={selectedType === "student" ? "default" : "outline"} size="sm">
            <Link href="/dashboard/events?type=student">{isAr ? "أنشطة طلاب" : "Student Activities"}</Link>
          </Button>
        </div>

        <Button asChild>
          <Link href="/dashboard/events/create">
            {isAr ? "إضافة حدث" : "Create Event"}
          </Link>
        </Button>
      </div>
      <EventsTable data={data} isAr={isAr} />
    </div>
  );
}
