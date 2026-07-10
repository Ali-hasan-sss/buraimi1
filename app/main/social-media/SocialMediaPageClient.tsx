"use client";

import type { SocialMediaIconRowItem } from "@/lib/social-media-page";
import { socialMediaRowIconColor } from "@/lib/social-media-page";
import { Facebook, Instagram, MessageCircle, Youtube } from "lucide-react";
import Link from "next/link";
import { useLocale } from "next-intl";

function XBrandIcon({
  className,
  color,
}: {
  className?: string;
  color: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill={color}
      aria-hidden
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function RowPlatformIcon({
  slug,
  className,
}: {
  slug: SocialMediaIconRowItem["icon"];
  className: string;
}) {
  const color = socialMediaRowIconColor(slug);
  switch (slug) {
    case "facebook":
      return (
        <Facebook className={className} style={{ color }} />
      );
    case "instagram":
      return (
        <Instagram className={className} style={{ color }} />
      );
    case "youtube":
      return <Youtube className={className} style={{ color }} />;
    case "twitter":
      return <XBrandIcon className={className} color={color} />;
    case "whatsapp":
      return (
        <MessageCircle className={className} style={{ color }} />
      );
    default:
      return null;
  }
}

export default function SocialMediaPageClient({
  iconRow,
  cardUrls,
}: {
  iconRow: SocialMediaIconRowItem[];
  cardUrls: { facebook: string; instagram: string; youtube: string };
}) {
  const locale = useLocale();
  const isAr = locale === "ar";
  const dir = isAr ? "rtl" : "ltr";

  const t = isAr
    ? {
        breadcrumbHome: "الرئيسية",
        breadcrumbNews: "الأخبار والفعاليات",
        breadcrumbSocial: "وسائل التواصل الاجتماعي",
        pageTitle: "حسابات وسائل التواصل الاجتماعي الرسمية",
        followHeading: "تابعنا على وسائل التواصل الاجتماعي",
        followText:
          "ابقَ على اطلاع دائم بآخر أخبار وفعاليات كلية البريمي الجامعية من خلال متابعتنا على منصات التواصل الاجتماعي الرسمية. نشارك معكم يومياً الإنجازات الأكاديمية، الأنشطة الطلابية، الفعاليات القادمة، وكل ما يهم مجتمعنا الأكاديمي.",
        contactHeading: "تواصل معنا",
        contactText:
          "يمكنك التواصل معنا مباشرة عبر واتساب للاستفسارات السريعة أو متابعة صفحاتنا للحصول على آخر التحديثات.",
        videoHeading: "محتوى مرئي",
        videoText:
          "شاهد قناتنا على يوتيوب للاطلاع على الفيديوهات التعريفية، تسجيلات الفعاليات، والمحاضرات المسجلة.",
        facebookTitle: "فيسبوك",
        facebookText:
          "تابع صفحتنا على فيسبوك للحصول على التحديثات اليومية والتفاعل مع مجتمع الكلية.",
        facebookCta: "زيارة الصفحة",
        instagramTitle: "إنستغرام",
        instagramText:
          "استكشف لحظات الحياة الجامعية من خلال الصور والقصص على إنستغرام.",
        instagramCta: "زيارة الحساب",
        youtubeTitle: "يوتيوب",
        youtubeText:
          "اشترك في قناتنا لمشاهدة الفيديوهات التعليمية والفعاليات المباشرة.",
        youtubeCta: "زيارة القناة",
        labelFacebook: "فيسبوك",
        labelInstagram: "إنستغرام",
        labelYoutube: "يوتيوب",
        labelTwitter: "تويتر",
        labelWhatsapp: "واتساب",
      }
    : {
        breadcrumbHome: "Home",
        breadcrumbNews: "News & Events",
        breadcrumbSocial: "Social Media",
        pageTitle: "Official Social Media Accounts",
        followHeading: "Follow us on social media",
        followText:
          "Stay up to date with the latest news and events at Buraimi University College by following our official social media platforms. We share daily academic achievements, student activities, upcoming events, and everything that matters to our academic community.",
        contactHeading: "Contact us",
        contactText:
          "You can reach us directly via WhatsApp for quick inquiries or follow our pages to get the latest updates.",
        videoHeading: "Visual content",
        videoText:
          "Visit our YouTube channel to watch introductory videos, event recordings, and recorded lectures.",
        facebookTitle: "Facebook",
        facebookText:
          "Follow our Facebook page for daily updates and to engage with the college community.",
        facebookCta: "Visit page",
        instagramTitle: "Instagram",
        instagramText:
          "Explore campus life moments through photos and stories on Instagram.",
        instagramCta: "Visit profile",
        youtubeTitle: "YouTube",
        youtubeText:
          "Subscribe to our channel to watch educational videos and live events.",
        youtubeCta: "Visit channel",
        labelFacebook: "Facebook",
        labelInstagram: "Instagram",
        labelYoutube: "YouTube",
        labelTwitter: "Twitter/X",
        labelWhatsapp: "WhatsApp",
      };

  const rowLabel: Record<SocialMediaIconRowItem["icon"], string> = {
    facebook: t.labelFacebook,
    instagram: t.labelInstagram,
    youtube: t.labelYoutube,
    twitter: t.labelTwitter,
    whatsapp: t.labelWhatsapp,
  };

  const arrow = isAr ? "←" : "→";

  return (
    <div className="min-h-screen bg-white" dir={dir}>
      <div
        className="relative h-[320px] sm:h-[400px] bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1770827730835-221bd728c012?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2FtcHVzJTIwYnVpbGRpbmclMjBleHRlcmlvcnxlbnwxfHx8fDE3NzMwODA4Nzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/20" />

        <div className="absolute top-6 left-0 right-0 z-10">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-2 text-sm text-white">
              <Link
                href="/main"
                className="transition-colors hover:text-[#c2a772]"
              >
                {t.breadcrumbHome}
              </Link>
              <span>/</span>
              <Link
                href="/main/news"
                className="transition-colors hover:text-[#c2a772]"
              >
                {t.breadcrumbNews}
              </Link>
              <span>/</span>
              <span className="text-[#c2a772]">{t.breadcrumbSocial}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container relative z-10 mx-auto -mt-24 px-4 pb-20 sm:-mt-32 sm:px-6">
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-2xl text-white sm:text-4xl">{t.pageTitle}</h1>

          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="h-px w-32 bg-white/40" />
            <div className="size-2 rounded-full bg-[#c2a772]" />
            <div className="h-px w-32 bg-white/40" />
          </div>
        </div>

        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-6">
          {iconRow.map((account) => (
            <a
              key={account.icon}
              href={account.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
              aria-label={rowLabel[account.icon]}
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-lg border-2 border-gray-200 bg-white p-4 transition-all duration-300 hover:scale-110 hover:border-transparent hover:shadow-2xl sm:h-24 sm:w-24 sm:p-6">
                <RowPlatformIcon
                  slug={account.icon}
                  className="size-10 transition-colors sm:size-12"
                />
              </div>
            </a>
          ))}
        </div>

        <div className="mx-auto mt-20 max-w-4xl">
          <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-md sm:p-10">
            <h2 className="mb-6 text-center text-2xl text-[#254151]">
              {t.followHeading}
            </h2>
            <p className="mb-8 text-center leading-relaxed text-gray-700">
              {t.followText}
            </p>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-lg bg-gray-50 p-6">
                <h3 className="mb-3 flex items-center gap-2 text-lg text-[#254151]">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#6096b4]/10">
                    <MessageCircle className="size-4 text-[#6096b4]" />
                  </div>
                  {t.contactHeading}
                </h3>
                <p className="text-sm leading-relaxed text-gray-600">
                  {t.contactText}
                </p>
              </div>

              <div className="rounded-lg bg-gray-50 p-6">
                <h3 className="mb-3 flex items-center gap-2 text-lg text-[#254151]">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#c2a772]/10">
                    <Youtube className="size-4 text-[#c2a772]" />
                  </div>
                  {t.videoHeading}
                </h3>
                <p className="text-sm leading-relaxed text-gray-600">
                  {t.videoText}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          <div className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-xl">
            <div className="bg-[#1877F2] p-6 text-white">
              <Facebook className="mb-3 size-12" />
              <h3 className="text-xl">{t.facebookTitle}</h3>
            </div>
            <div className="p-6">
              <p className="mb-4 leading-relaxed text-gray-700">
                {t.facebookText}
              </p>
              <a
                href={cardUrls.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-semibold text-[#1877F2] transition-colors hover:text-[#0e5fc4]"
              >
                <span>{t.facebookCta}</span>
                <span>{arrow}</span>
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-xl">
            <div className="bg-gradient-to-br from-[#833AB4] via-[#E4405F] to-[#F77737] p-6 text-white">
              <Instagram className="mb-3 size-12" />
              <h3 className="text-xl">{t.instagramTitle}</h3>
            </div>
            <div className="p-6">
              <p className="mb-4 leading-relaxed text-gray-700">
                {t.instagramText}
              </p>
              <a
                href={cardUrls.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-semibold text-[#E4405F] transition-colors hover:text-[#c92d4a]"
              >
                <span>{t.instagramCta}</span>
                <span>{arrow}</span>
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-xl">
            <div className="bg-[#FF0000] p-6 text-white">
              <Youtube className="mb-3 size-12" />
              <h3 className="text-xl">{t.youtubeTitle}</h3>
            </div>
            <div className="p-6">
              <p className="mb-4 leading-relaxed text-gray-700">
                {t.youtubeText}
              </p>
              <a
                href={cardUrls.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-semibold text-[#FF0000] transition-colors hover:text-[#cc0000]"
              >
                <span>{t.youtubeCta}</span>
                <span>{arrow}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
