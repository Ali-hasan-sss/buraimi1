/**
 * Slugs stored in DB `socialLinks[].icon`.
 * Render with `SocialPlatformIcon` from `@/components/social/SocialPlatformIcon`.
 */
export const SITE_SOCIAL_ICON_OPTIONS = [
  { value: "facebook", label: "Facebook" },
  { value: "instagram", label: "Instagram" },
  { value: "twitter", label: "X (Twitter)" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "youtube", label: "YouTube" },
  { value: "tiktok", label: "TikTok" },
  { value: "snapchat", label: "Snapchat" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "telegram", label: "Telegram" },
  { value: "discord", label: "Discord" },
  { value: "github", label: "GitHub" },
  { value: "pinterest", label: "Pinterest" },
  { value: "reddit", label: "Reddit" },
  { value: "threads", label: "Threads" },
  { value: "twitch", label: "Twitch" },
  { value: "medium", label: "Medium" },
  { value: "behance", label: "Behance" },
  { value: "dribbble", label: "Dribbble" },
  { value: "line", label: "LINE" },
  { value: "messenger", label: "Messenger" },
  { value: "globe", label: "Website" },
  { value: "mail", label: "Email (mailto)" },
] as const;

export type SiteSocialIconSlug = (typeof SITE_SOCIAL_ICON_OPTIONS)[number]["value"];

export function siteSocialIconLabel(slug: string): string {
  const hit = SITE_SOCIAL_ICON_OPTIONS.find((o) => o.value === slug);
  return hit?.label ?? slug;
}
