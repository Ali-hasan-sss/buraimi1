import { Schema, model, models } from "mongoose";

const OrgChartNodeSchema = new Schema({
  id: { type: String, required: true },
  labelAr: { type: String, required: true, trim: true },
  labelEn: { type: String, required: true, trim: true },
  x: { type: Number, required: true, default: 0 },
  y: { type: Number, required: true, default: 0 },
  width: { type: Number, required: true, default: 150 },
  height: { type: Number, required: true, default: 60 },
  backgroundColor: { type: String, required: true, default: "#254151" },
  textColor: { type: String, required: true, default: "#ffffff" },
  shape: { type: String, enum: ["rectangle", "rounded", "circle"], default: "rounded" },
  level: { type: Number, required: true, default: 0 },
}, { _id: false });

const OrgChartConnectionSchema = new Schema({
  id: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  color: { type: String, default: "#254151" },
  style: { type: String, enum: ["solid", "dashed", "dotted"], default: "solid" },
}, { _id: false });

const OrganizationalStructureSchema = new Schema(
  {
    sectionTitleAr: { type: String, required: true, trim: true },
    sectionTitleEn: { type: String, required: true, trim: true },
    sectionSubtitleAr: { type: String, required: true, trim: true },
    sectionSubtitleEn: { type: String, required: true, trim: true },
    chartTitleAr: { type: String, required: true, trim: true },
    chartTitleEn: { type: String, required: true, trim: true },
    // Legacy image fields - keep for backward compatibility
    chartImageAr: { type: String, trim: true, default: "" },
    chartImageEn: { type: String, trim: true, default: "" },
    // New node-based chart fields
    chartNodes: { type: [OrgChartNodeSchema], default: [] },
    chartConnections: { type: [OrgChartConnectionSchema], default: [] },
    aboutTitleAr: { type: String, required: true, trim: true },
    aboutTitleEn: { type: String, required: true, trim: true },
    aboutTextAr: { type: String, required: true, trim: true },
    aboutTextEn: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

export const OrganizationalStructureModel =
  models.OrganizationalStructure ||
  model("OrganizationalStructure", OrganizationalStructureSchema);
