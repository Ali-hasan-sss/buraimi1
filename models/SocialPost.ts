import { Schema, model, models } from "mongoose";

const SocialPostSchema = new Schema(
  {
    titleAr: { type: String, required: true, trim: true },
    titleEn: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    postUrl: { type: String, required: true, trim: true },
    platform: {
      type: String,
      required: true,
      enum: ["instagram", "facebook", "twitter"],
      default: "instagram",
    },
    pageName: { type: String, required: true, trim: true },
    order: { type: Number, required: true, min: 0, default: 0 },
  },
  { timestamps: true },
);

export const SocialPostModel =
  models.SocialPost || model("SocialPost", SocialPostSchema);
