import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import dbConnect from "@/lib/dbConnect";
import { DEFAULT_SITE_CONTACT_SETTINGS } from "@/lib/site-contact-settings-defaults";
import {
  SITE_CONTACT_SETTINGS_KEY,
  SiteContactSettingsModel,
} from "@/models/SiteContactSettings";

async function seed() {
  await dbConnect();

  await SiteContactSettingsModel.findOneAndUpdate(
    { key: SITE_CONTACT_SETTINGS_KEY },
    {
      $set: {
        whatsappPhone: DEFAULT_SITE_CONTACT_SETTINGS.whatsappPhone,
        callPhone1: DEFAULT_SITE_CONTACT_SETTINGS.callPhone1,
        callPhone2: DEFAULT_SITE_CONTACT_SETTINGS.callPhone2,
        callPhone3: DEFAULT_SITE_CONTACT_SETTINGS.callPhone3,
        socialLinks: DEFAULT_SITE_CONTACT_SETTINGS.socialLinks,
      },
    },
    { upsert: true, new: true },
  );

  revalidatePath("/dashboard/contact");
  revalidatePath("/main", "layout");
  revalidatePath("/main/contact-directory");

  return NextResponse.json({ ok: true });
}

export async function GET(request: Request) {
  const seedKey = process.env.ADMIN_SEED_KEY;
  const providedKey = request.headers.get("x-seed-key") || "";
  if (!seedKey || providedKey !== seedKey) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, {
      status: 401,
    });
  }
  return seed();
}

export async function POST(request: Request) {
  const seedKey = process.env.ADMIN_SEED_KEY;
  const providedKey = request.headers.get("x-seed-key") || "";
  if (!seedKey || providedKey !== seedKey) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, {
      status: 401,
    });
  }
  return seed();
}
