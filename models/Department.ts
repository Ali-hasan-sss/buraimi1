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

const DepartmentSchema = new Schema(
  {
    domain: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
    },
    titleAr: { type: String, required: true, trim: true },
    titleEn: { type: String, required: true, trim: true },
    subTitleAr: { type: String, required: true, trim: true },
    subTitleEn: { type: String, required: true, trim: true },
    headMessage: { type: Schema.Types.Mixed, default: {} },
    programs: { type: [Schema.Types.Mixed], default: [] },
    facultyMembers: { type: [Schema.Types.Mixed], default: [] },
    careerOpportunities: { type: [Schema.Types.Mixed], default: [] },
    showcaseImage: { type: String, trim: true, default: "" },
    applyLink: { type: String, trim: true, default: "" },
    // Organizational chart for department
    orgChartEnabled: { type: Boolean, default: false },
    orgChartTitleAr: { type: String, trim: true, default: "الهيكل التنظيمي" },
    orgChartTitleEn: { type: String, trim: true, default: "Organizational Structure" },
    orgChartNodes: { type: [OrgChartNodeSchema], default: [] },
    orgChartConnections: { type: [OrgChartConnectionSchema], default: [] },
  },
  { timestamps: true },
);

export const DepartmentModel =
  models.Department || model("Department", DepartmentSchema);
