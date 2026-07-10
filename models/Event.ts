import { Schema, model, models } from "mongoose";

const EventSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    titleAr: { type: String, required: true, trim: true },
    titleEn: { type: String, required: true, trim: true },
    summaryAr: { type: String, required: true, trim: true },
    summaryEn: { type: String, required: true, trim: true },
    contentAr: { type: String, required: true, trim: true },
    contentEn: { type: String, required: true, trim: true },
    date: { type: String, required: true, trim: true },
    locationAr: { type: String, required: true, trim: true },
    locationEn: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    type: {
      type: String,
      required: true,
      enum: ["events", "conferences", "student"],
      default: "events",
    },
  },
  { timestamps: true },
);

export const EventModel = models.Event || model("Event", EventSchema);
