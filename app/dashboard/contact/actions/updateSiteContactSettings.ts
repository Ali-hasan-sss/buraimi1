"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import dbConnect from "@/lib/dbConnect";
import {
  SITE_CONTACT_SETTINGS_KEY,
  SiteContactSettingsModel,
} from "@/models/SiteContactSettings";
import type { SiteSocialLink } from "@/types/site-contact-settings";

function parseSocialJson(raw: string): SiteSocialLink[] {
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    const out: SiteSocialLink[] = [];
    for (const item of parsed) {
      if (!item || typeof item !== "object") continue;
      const icon = String((item as { icon?: string }).icon ?? "").trim();
      const url = String((item as { url?: string }).url ?? "").trim();
      if (icon && url) out.push({ icon, url });
    }
    return out;
  } catch {
    return [];
  }
}

export async function updateSiteContactSettingsAction(formData: FormData) {
  const whatsappPhone = String(formData.get("whatsappPhone") ?? "").trim();
  const callPhone1 = String(formData.get("callPhone1") ?? "").trim();
  const callPhone2 = String(formData.get("callPhone2") ?? "").trim();
  const callPhone3 = String(formData.get("callPhone3") ?? "").trim();
  const socialLinksJson = String(formData.get("socialLinksJson") ?? "").trim();
  const socialLinks = parseSocialJson(socialLinksJson);

  await dbConnect();
  await SiteContactSettingsModel.findOneAndUpdate(
    { key: SITE_CONTACT_SETTINGS_KEY },
    {
      $set: {
        whatsappPhone,
        callPhone1,
        callPhone2,
        callPhone3,
        socialLinks,
      },
    },
    { upsert: true, new: true },
  );

  revalidatePath("/dashboard/contact");
  revalidatePath("/main", "layout");
  revalidatePath("/main/contact-directory");
  redirect("/dashboard/contact");
}
