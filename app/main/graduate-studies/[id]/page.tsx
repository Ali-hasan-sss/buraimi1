import { notFound } from "next/navigation";

import DetailPageComp from "@/components/graduateStudies/Detail";
import { getSession } from "@/lib/auth";
import { buildGraduateProgramDetailPayload } from "@/lib/graduate-program-detail-merge";
import { DEFAULT_CAROUSEL_BY_SLUG } from "@/lib/graduate-program-fallback";
import { carouselImageOverlayStyle } from "@/lib/graduate-program-gradient";
import dbConnect from "@/lib/dbConnect";
import { GraduateProgramModel } from "@/models/GraduateProgram";
import type { GraduateProgramDoc } from "@/types/graduate-program";

export default async function DetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  await dbConnect();
  const doc = (await GraduateProgramModel.findOne({ slug: id }).lean()) as GraduateProgramDoc | null;
  if (!doc) notFound();

  const session = await getSession();
  const raw = process.env.ADMIN_EMAILS || "";
  const allowed = raw
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
  const isAdmin =
    allowed.length === 0 ||
    (session?.email ? allowed.includes(session.email.toLowerCase()) : false);

  const detailsMerged = buildGraduateProgramDetailPayload(doc);

  const heroImageSrc =
    (doc.carouselImage && doc.carouselImage.trim()) ||
    DEFAULT_CAROUSEL_BY_SLUG[doc.slug] ||
    DEFAULT_CAROUSEL_BY_SLUG["phd-law"];

  const heroOverlayStyle = carouselImageOverlayStyle(
    doc.color?.trim() || "from-[#254151] to-[#6096b4]",
  );

  return (
    <div>
      <DetailPageComp
        programSlug={id}
        details={detailsMerged}
        isAdmin={isAdmin}
        heroImageSrc={heroImageSrc}
        heroOverlayStyle={heroOverlayStyle}
      />
    </div>
  );
}
