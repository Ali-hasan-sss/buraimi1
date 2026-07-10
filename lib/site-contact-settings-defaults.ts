import type {
  SiteContactSettingsPublic,
} from "@/types/site-contact-settings";

/** Official contact email (also in `socialLinks` as `mail`). */
export const CONTACT_PUBLIC_EMAIL = "info@buc.edu.om";

export const CONTACT_MAILTO = `mailto:${CONTACT_PUBLIC_EMAIL}`;

/**
 * Canonical college contact + social URLs.
 * Used as DB seed, `getSiteContactSettings()` fallback when no document exists,
 * and static UI (navbar, footer, side panel) until wired to live DB on the client.
 */
export const DEFAULT_SITE_CONTACT_SETTINGS: SiteContactSettingsPublic = {
  whatsappPhone: "96825657666",
  callPhone1: "+968 2565 7666",
  callPhone2: "+968 2565 0000",
  callPhone3: "",
  socialLinks: [
    {
      icon: "instagram",
      url: "https://www.instagram.com/bucnewss/?hl=en",
    },
    {
      icon: "twitter",
      url: "https://x.com/bucnewss",
    },
    {
      icon: "facebook",
      url: "https://www.facebook.com/profile.php?id=100063702033637",
    },
    {
      icon: "youtube",
      url: "https://www.youtube.com/@alburaimiuniversitycollege2048",
    },
    {
      icon: "linkedin",
      url: "https://www.linkedin.com/feed/",
    },
    {
      icon: "mail",
      url: CONTACT_MAILTO,
    },
  ],
};

export function contactTelHref(phoneDisplayOrDigits: string): string {
  const d = phoneDisplayOrDigits.replace(/\D/g, "");
  if (!d) return "tel:";
  return d.startsWith("968") ? `tel:+${d}` : `tel:+968${d}`;
}

export const DEFAULT_WHATSAPP_WA_ME = `https://wa.me/${DEFAULT_SITE_CONTACT_SETTINGS.whatsappPhone.replace(/\D/g, "")}`;

/** Shaped for the top header (email + all call lines). */
export type SiteHeaderContact = {
  email: string;
  mailto: string;
  phones: { display: string; href: string }[];
};

/**
 * Builds header contact from saved settings, falling back to defaults when a field is empty.
 */
export function resolveSiteHeaderContact(
  s: SiteContactSettingsPublic,
): SiteHeaderContact {
  const mailEntry = s.socialLinks.find(
    (l) => l.icon === "mail" && (l.url ?? "").trim(),
  );
  const rawMail = (mailEntry?.url ?? "").trim();
  const mailto = rawMail.startsWith("mailto:")
    ? rawMail
    : rawMail
      ? `mailto:${rawMail}`
      : CONTACT_MAILTO;
  const email =
    rawMail.replace(/^mailto:/i, "").trim() || CONTACT_PUBLIC_EMAIL;

  const fromDoc = [s.callPhone1, s.callPhone2, s.callPhone3]
    .map((p) => (p ?? "").trim())
    .filter(Boolean)
    .map((display) => ({ display, href: contactTelHref(display) }));

  const fromDefaults = [
    DEFAULT_SITE_CONTACT_SETTINGS.callPhone1,
    DEFAULT_SITE_CONTACT_SETTINGS.callPhone2,
    DEFAULT_SITE_CONTACT_SETTINGS.callPhone3,
  ]
    .map((p) => p.trim())
    .filter(Boolean)
    .map((display) => ({ display, href: contactTelHref(display) }));

  return {
    email,
    mailto,
    phones: fromDoc.length ? fromDoc : fromDefaults,
  };
}

/** Hero side bar: first call line + WhatsApp from settings. */
export type SideActionPanelContact = {
  phoneDisplay: string;
  phoneHref: string;
  whatsappWaMeUrl: string;
  /** Shown in tooltip (e.g. +968 …) */
  whatsappLabel: string;
};

function formatOmanPhoneLabel(digits: string): string {
  const d = digits.replace(/\D/g, "");
  if (!d) return "";
  if (d.startsWith("968") && d.length >= 11) {
    const rest = d.slice(3);
    return `+968 ${rest.slice(0, 4)} ${rest.slice(4)}`.trim();
  }
  return `+${d}`;
}

export function resolveSidePanelContact(
  s: SiteContactSettingsPublic,
): SideActionPanelContact {
  const phone1 =
    (s.callPhone1 ?? "").trim() || DEFAULT_SITE_CONTACT_SETTINGS.callPhone1;
  const waRaw =
    (s.whatsappPhone ?? "").trim() ||
    DEFAULT_SITE_CONTACT_SETTINGS.whatsappPhone;
  const waDigits = waRaw.replace(/\D/g, "");
  const defaultWaDigits =
    DEFAULT_SITE_CONTACT_SETTINGS.whatsappPhone.replace(/\D/g, "");
  const whatsappWaMeUrl = waDigits
    ? `https://wa.me/${waDigits}`
    : defaultWaDigits
      ? `https://wa.me/${defaultWaDigits}`
      : DEFAULT_WHATSAPP_WA_ME;
  const whatsappLabel = formatOmanPhoneLabel(waDigits || defaultWaDigits);

  return {
    phoneDisplay: phone1,
    phoneHref: contactTelHref(phone1),
    whatsappWaMeUrl,
    whatsappLabel,
  };
}
