import SocialMediaPageClient from "./SocialMediaPageClient";

import {
  getSocialCardUrls,
  getSocialIconRowItems,
} from "@/lib/social-media-page";
import { getSiteContactSettings } from "@/lib/site-contact-settings";

export const dynamic = "force-dynamic";

export default async function SocialMediaPage() {
  const settings = await getSiteContactSettings();
  const iconRow = getSocialIconRowItems(settings);
  const cardUrls = getSocialCardUrls(settings);

  return (
    <SocialMediaPageClient iconRow={iconRow} cardUrls={cardUrls} />
  );
}
