import { model, models, Schema } from "mongoose";

const SocialLinkSchema = new Schema(
  {
    icon: { type: String, required: true, trim: true },
    url: { type: String, required: true, trim: true },
  },
  { _id: false },
);

const SiteContactSettingsSchema = new Schema(
  {
    /** Single global row */
    key: { type: String, required: true, unique: true, default: "global", trim: true },
    whatsappPhone: { type: String, default: "", trim: true },
    callPhone1: { type: String, default: "", trim: true },
    callPhone2: { type: String, default: "", trim: true },
    callPhone3: { type: String, default: "", trim: true },
    socialLinks: { type: [SocialLinkSchema], default: [] },
  },
  { timestamps: true },
);

export const SITE_CONTACT_SETTINGS_KEY = "global";

export const SiteContactSettingsModel =
  models.SiteContactSettings ||
  model("SiteContactSettings", SiteContactSettingsSchema);
