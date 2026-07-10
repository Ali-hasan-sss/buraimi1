import Image from "next/image";
import Link from "next/link";
import { getLocale } from "next-intl/server";
import { ArrowLeft, ArrowRight, Calendar, MapPin } from "lucide-react";

import dbConnect from "@/lib/dbConnect";
import { EventModel } from "@/models/Event";

export const dynamic = "force-dynamic";

export default async function EventDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const locale = await getLocale();
  const isAr = locale === "ar";

  await dbConnect();
  const event = await EventModel.findOne({ slug }).lean();

  if (!event) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-center p-8">
        <div>
          <h1 className="text-2xl font-bold text-[#254151] mb-2">
            {isAr ? "الحدث غير موجود" : "Event not found"}
          </h1>
          <Link href="/main" className="text-[#6096b4] underline">
            {isAr ? "العودة للرئيسية" : "Back to home"}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-gradient-to-b from-gray-50 to-white min-h-screen pb-16">
      <div className="relative h-[320px] w-full overflow-hidden">
        <Image src={event.image} alt={isAr ? event.titleAr : event.titleEn} fill className="object-cover" />
        <div className="absolute inset-0 bg-[#254151]/50" />
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-10 -mt-16 relative z-10">
        <article className="rounded-2xl bg-white shadow-xl p-6 sm:p-10">
          <div className="mb-6">
            <h1 className="text-2xl sm:text-4xl font-bold text-[#254151] mb-4">
              {isAr ? event.titleAr : event.titleEn}
            </h1>
            <p className="text-gray-600 text-lg">
              {isAr ? event.summaryAr : event.summaryEn}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-8">
            <div className="inline-flex items-center gap-2">
              <Calendar className="size-4" />
              {new Date(event.date).toLocaleDateString(isAr ? "ar-SA" : "en-US")}
            </div>
            <div className="inline-flex items-center gap-2">
              <MapPin className="size-4" />
              {isAr ? event.locationAr : event.locationEn}
            </div>
          </div>

          <div className="prose max-w-none text-gray-700 whitespace-pre-line">
            {isAr ? event.contentAr : event.contentEn}
          </div>

          <div className="mt-10">
            <Link
              href="/main"
              className="inline-flex items-center gap-2 rounded-lg bg-[#254151] px-4 py-2 text-white"
            >
              {isAr ? <ArrowRight className="size-4" /> : <ArrowLeft className="size-4" />}
              {isAr ? "العودة للرئيسية" : "Back to home"}
            </Link>
          </div>
        </article>
      </div>
    </main>
  );
}
