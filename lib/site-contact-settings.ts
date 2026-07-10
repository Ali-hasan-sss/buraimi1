import dbConnect from "@/lib/dbConnect";
import {
  SITE_CONTACT_SETTINGS_KEY,
  SiteContactSettingsModel,
} from "@/models/SiteContactSettings";
import type {
  SiteContactSettingsPublic,
  SiteSocialLink,
} from "@/types/site-contact-settings";

import { DEFAULT_SITE_CONTACT_SETTINGS } from "./site-contact-settings-defaults";

export { digitsOnlyPhone } from "./digits-only-phone";

export {
  CONTACT_MAILTO,
  CONTACT_PUBLIC_EMAIL,
  DEFAULT_SITE_CONTACT_SETTINGS,
  DEFAULT_WHATSAPP_WA_ME,
  contactTelHref,
  resolveSidePanelContact,
  resolveSiteHeaderContact,
  type SideActionPanelContact,
  type SiteHeaderContact,
} from "./site-contact-settings-defaults";

type LeanDoc = {
  whatsappPhone?: string;
  callPhone1?: string;
  callPhone2?: string;
  callPhone3?: string;
  socialLinks?: { icon?: string; url?: string }[];
};

function mapDoc(doc: LeanDoc | null): SiteContactSettingsPublic {
  if (!doc) return { ...DEFAULT_SITE_CONTACT_SETTINGS };
  const links = Array.isArray(doc.socialLinks)
    ? doc.socialLinks
        .map((l) => ({
          icon: (l.icon ?? "").trim(),
          url: (l.url ?? "").trim(),
        }))
        .filter((l) => l.icon && l.url)
    : [];
  return {
    whatsappPhone: (doc.whatsappPhone ?? "").trim(),
    callPhone1: (doc.callPhone1 ?? "").trim(),
    callPhone2: (doc.callPhone2 ?? "").trim(),
    callPhone3: (doc.callPhone3 ?? "").trim(),
    socialLinks: links,
  };
}

/** For public layouts (footer, contact blocks, etc.) */
export async function getSiteContactSettings(): Promise<SiteContactSettingsPublic> {
  await dbConnect();
  const doc = (await SiteContactSettingsModel.findOne({
    key: SITE_CONTACT_SETTINGS_KEY,
  }).lean()) as LeanDoc | null;
  return mapDoc(doc);
}

/** Social strip on homepage: profile URLs only (excludes mail / generic website). */
export function socialProfileLinksForStrip(
  links: SiteSocialLink[],
): SiteSocialLink[] {
  return links.filter((l) => {
    const url = (l.url ?? "").trim();
    const icon = (l.icon ?? "").trim();
    if (!url || !icon) return false;
    if (icon === "mail" || icon === "globe") return false;
    return true;
  });
}
