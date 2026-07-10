"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { SideActionPanel } from "@/components/main/SideActionPanel";
import type { SideActionPanelContact } from "@/lib/site-contact-settings-defaults";

/** شريط لامع يمر فوق العناصر — ألوان الموقع (#254151، #6096b4) */
function ShimmerBlock({
  className,
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  return (
    <div className={`relative overflow-hidden rounded-md bg-white/15 ${className ?? ""}`}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{
          duration: 1.6,
          repeat: Infinity,
          ease: "linear",
          repeatDelay: 0.35,
          delay,
        }}
      />
    </div>
  );
}

/**
 * هيكل تحميل يطابق الهيرو: خلفية، تدرج، بطاقة إعلان يساراً، عنوان ووصف وزر يميناً، نقاط، أسهم.
 */
export function HeroSkeleton({
  sidePanelContact,
}: {
  sidePanelContact: SideActionPanelContact;
}) {
  const t = useTranslations("heroAdmin");

  return (
    <section
      className="relative w-full overflow-hidden -mt-[112px] pt-[112px]"
      style={{ height: "calc(100vh + 3cm)", minHeight: "600px" }}
      aria-busy="true"
      aria-label={t("loading")}
    >
      <span className="sr-only">{t("loading")}</span>

      {/* خلفية بنفس نطاق ألوان الهيرو */}
      <div className="absolute inset-0 bg-[#1a2f3d]">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#254151] via-[#2d4a5a] to-[#1e3544]"
          animate={{ opacity: [0.88, 1, 0.88] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(37, 65, 81, 0.88) 0%, rgba(37, 65, 81, 0.5) 25%, rgba(37, 65, 81, 0) 50%)",
          }}
        />
      </div>

      <SideActionPanel contact={sidePanelContact} />

      <div className="absolute inset-0 px-16">
        {/* بطاقة إعلان — أسفل يسار */}
        <div className="absolute bottom-16 left-16 z-20 max-w-md">
          <div className="flex gap-4 rounded-2xl bg-white/95 p-6 shadow-2xl ring-1 ring-[#254151]/10">
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-[#c5d0d8]">
              <ShimmerBlock className="h-full w-full rounded-xl" delay={0.1} />
            </div>
            <div className="flex min-w-0 flex-1 flex-col justify-center gap-3">
              <ShimmerBlock className="h-5 w-[85%]" />
              <ShimmerBlock className="h-4 w-[55%]" delay={0.15} />
            </div>
          </div>
        </div>

        {/* عنوان + وصف + زر — أسفل يمين */}
        <div className="absolute bottom-0 right-16 max-w-3xl pb-16">
          <div className="space-y-4">
            <ShimmerBlock className="h-10 w-full max-w-xl md:h-12" />
            <ShimmerBlock className="h-6 w-full max-w-2xl" delay={0.08} />
            <ShimmerBlock className="h-6 w-4/5 max-w-xl" delay={0.16} />
            <div className="pt-1">
              <div className="relative h-14 w-48 overflow-hidden rounded-lg bg-[#6096b4]/45 shadow-xl">
                <ShimmerBlock className="h-full w-full rounded-lg" delay={0.2} />
              </div>
            </div>
          </div>
        </div>

        {/* مؤشرات الشرائح */}
        <div className="absolute bottom-8 right-16 z-20 flex items-center gap-2">
          <div className="h-2 w-12 rounded-full bg-white/35" />
          <div className="h-2 w-2 rounded-full bg-white/25" />
          <div className="h-2 w-2 rounded-full bg-white/25" />
        </div>
      </div>

      {/* أزرار التنقل الجانبية — نفس موضع الهيرو */}
      <div
        className="absolute left-8 top-1/2 z-20 h-12 w-12 -translate-y-1/2 rounded-full bg-white/20 backdrop-blur-sm"
        aria-hidden
      />
      <div
        className="absolute right-8 top-1/2 z-20 h-12 w-12 -translate-y-1/2 rounded-full bg-white/20 backdrop-blur-sm"
        aria-hidden
      />
    </section>
  );
}
