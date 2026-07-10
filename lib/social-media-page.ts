import { DEFAULT_SITE_CONTACT_SETTINGS } from "@/lib/site-contact-settings-defaults";
import type { SiteContactSettingsPublic } from "@/types/site-contact-settings";

import { digitsOnlyPhone } from "./digits-only-phone";

/** Last-resort URLs if settings + defaults are empty (legacy static page). */
const LEGACY_CARD_URLS = {
  facebook: "https://www.facebook.com/bucoman",
  instagram: "https://www.instagram.com/buc.oman",
  youtube: "https://www.youtube.com/@BUCOman",
} as const;

function defaultUrlForSlug(slug: string): string {
  return (
    DEFAULT_SITE_CONTACT_SETTINGS.socialLinks.find((l) => l.icon === slug)
      ?.url ?? ""
  );
}

function urlForSlug(
  settings: SiteContactSettingsPublic,
  slug: string,
  legacy: string,
): string {
  const fromDoc = settings.socialLinks.find((l) => l.icon === slug)?.url?.trim();
  if (fromDoc) return fromDoc;
  const fromDefaults = defaultUrlForSlug(slug);
  if (fromDefaults) return fromDefaults;
  return legacy;
}

export function getSocialCardUrls(settings: SiteContactSettingsPublic): {
  facebook: string;
  instagram: string;
  youtube: string;
} {
  return {
    facebook: urlForSlug(settings, "facebook", LEGACY_CARD_URLS.facebook),
    instagram: urlForSlug(settings, "instagram", LEGACY_CARD_URLS.instagram),
    youtube: urlForSlug(settings, "youtube", LEGACY_CARD_URLS.youtube),
  };
}

function whatsappRowUrl(settings: SiteContactSettingsPublic): string {
  const fromLinks = settings.socialLinks.find((l) => l.icon === "whatsapp")?.url?.trim();
  if (fromLinks) return fromLinks;
  const d = digitsOnlyPhone(
    settings.whatsappPhone || DEFAULT_SITE_CONTACT_SETTINGS.whatsappPhone,
  );
  if (d) return `https://wa.me/${d}`;
  const fromDefaults = defaultUrlForSlug("whatsapp");
  if (fromDefaults) return fromDefaults;
  return "https://wa.me/96825650000";
}

/** Hero icon row: fixed order, URLs from contact settings. */
const ICON_ROW_SLUGS = [
  "facebook",
  "instagram",
  "youtube",
  "twitter",
  "whatsapp",
] as const;

export type SocialMediaIconRowItem = {
  icon: (typeof ICON_ROW_SLUGS)[number];
  url: string;
};

export function getSocialIconRowItems(
  settings: SiteContactSettingsPublic,
): SocialMediaIconRowItem[] {
  const out: SocialMediaIconRowItem[] = [];
  for (const slug of ICON_ROW_SLUGS) {
    const url =
      slug === "whatsapp"
        ? whatsappRowUrl(settings)
        : urlForSlug(
            settings,
            slug,
            slug === "twitter"
              ? defaultUrlForSlug("twitter") || "https://x.com/bucnewss"
              : "",
          );
    if (url) out.push({ icon: slug, url });
  }
  return out;
}

/** Brand color for Lucide / X row icons (matches previous static page). */
export function socialMediaRowIconColor(slug: string): string {
  switch (slug) {
    case "facebook":
      return "#1877F2";
    case "instagram":
      return "#E4405F";
    case "youtube":
      return "#FF0000";
    case "twitter":
      return "#000000";
    case "whatsapp":
      return "#25D366";
    default:
      return "#254151";
  }
}
