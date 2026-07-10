import { Schema, model, models } from "mongoose";

const VisionValueSchema = new Schema(
  {
    id: { type: String, required: true, trim: true },
    titleAr: { type: String, required: true, trim: true },
    titleEn: { type: String, required: true, trim: true },
    contentAr: { type: String, required: true, trim: true },
    contentEn: { type: String, required: true, trim: true },
    iconKey: { type: String, required: true, trim: true },
    order: { type: Number, required: true, min: 0, default: 0 },
  },
  { _id: false },
);

const VisionMissionSchema = new Schema(
  {
    visionAr: { type: String, required: true, trim: true },
    visionEn: { type: String, required: true, trim: true },
    missionAr: { type: String, required: true, trim: true },
    missionEn: { type: String, required: true, trim: true },
    values: { type: [VisionValueSchema], required: true, default: [] },
  },
  { timestamps: true },
);

export const VisionMissionModel =
  models.VisionMission || model("VisionMission", VisionMissionSchema);
