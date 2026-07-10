import mongoose, { Schema, Document } from "mongoose";

// Course item interface
export interface ICourseItem {
  titleAr: string;
  titleEn: string;
  creditsAr: string;
  creditsEn: string;
  descriptionAr: string;
  descriptionEn: string;
  icon: string;
  color: "blue" | "green" | "purple" | "amber";
  topicsAr: string[];
  topicsEn: string[];
}

// Faculty member interface
export interface IFacultyMember {
  nameAr: string;
  nameEn: string;
  positionAr: string;
  positionEn: string;
  isHead: boolean;
  image?: string;
  email?: string;
  phone?: string;
  hasDoctorate?: boolean;
  color: "blue" | "green" | "purple" | "amber";
}

// Section interface
export interface ISection {
  id: string;
  titleAr: string;
  titleEn: string;
  descriptionAr?: string;
  descriptionEn?: string;
  icon: string;
  color: "blue" | "green" | "purple" | "amber" | "indigo" | "cyan" | "teal" | "red";
  items?: ICourseItem[];
  listItemsAr?: string[];
  listItemsEn?: string[];
  stats?: { labelAr: string; labelEn: string; value: string }[];
  facultyMembers?: IFacultyMember[];
  isActive: boolean;
  order: number;
}

// Hero section
export interface IHeroSection {
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  subtitleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  stats: { value: string; labelAr: string; labelEn: string }[];
  isActive: boolean;
}

// CTA section
export interface ICTASection {
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  buttonTextAr: string;
  buttonTextEn: string;
  buttonLink: string;
  isActive: boolean;
}

// Main interface
export interface IGeneralRequirements extends Document {
  hero: IHeroSection;
  sections: ISection[];
  cta: ICTASection;
  updatedAt: Date;
}

const CourseItemSchema = new Schema<ICourseItem>({
  titleAr: { type: String, required: true },
  titleEn: { type: String, required: true },
  creditsAr: { type: String, required: true },
  creditsEn: { type: String, required: true },
  descriptionAr: { type: String, required: true },
  descriptionEn: { type: String, required: true },
  icon: { type: String, default: "BookOpen" },
  color: { type: String, enum: ["blue", "green", "purple", "amber"], default: "blue" },
  topicsAr: [{ type: String }],
  topicsEn: [{ type: String }],
});

const FacultyMemberSchema = new Schema<IFacultyMember>({
  nameAr: { type: String, required: true },
  nameEn: { type: String, required: true },
  positionAr: { type: String, required: true },
  positionEn: { type: String, required: true },
  isHead: { type: Boolean, default: false },
  image: { type: String },
  email: { type: String },
  phone: { type: String },
  hasDoctorate: { type: Boolean, default: false },
  color: { type: String, enum: ["blue", "green", "purple", "amber"], default: "blue" },
});

const SectionSchema = new Schema<ISection>({
  id: { type: String, required: true },
  titleAr: { type: String, required: true },
  titleEn: { type: String, required: true },
  descriptionAr: { type: String },
  descriptionEn: { type: String },
  icon: { type: String, default: "BookOpen" },
  color: { 
    type: String, 
    enum: ["blue", "green", "purple", "amber", "indigo", "cyan", "teal", "red"],
    default: "blue" 
  },
  items: [CourseItemSchema],
  listItemsAr: [{ type: String }],
  listItemsEn: [{ type: String }],
  stats: [{
    labelAr: { type: String },
    labelEn: { type: String },
    value: { type: String }
  }],
  facultyMembers: [FacultyMemberSchema],
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
});

const GeneralRequirementsSchema = new Schema<IGeneralRequirements>({
  hero: {
    titleAr: { type: String, required: true },
    titleEn: { type: String, required: true },
    subtitleAr: { type: String, required: true },
    subtitleEn: { type: String, required: true },
    descriptionAr: { type: String, required: true },
    descriptionEn: { type: String, required: true },
    stats: [{
      value: { type: String },
      labelAr: { type: String },
      labelEn: { type: String }
    }],
    isActive: { type: Boolean, default: true },
  },
  sections: [SectionSchema],
  cta: {
    titleAr: { type: String, required: true },
    titleEn: { type: String, required: true },
    descriptionAr: { type: String, required: true },
    descriptionEn: { type: String, required: true },
    buttonTextAr: { type: String, required: true },
    buttonTextEn: { type: String, required: true },
    buttonLink: { type: String, default: "/academic-foundation/programs" },
    isActive: { type: Boolean, default: true },
  },
  updatedAt: { type: Date, default: Date.now },
});

// Create or get model
const GeneralRequirements = 
  mongoose.models.GeneralRequirements || 
  mongoose.model<IGeneralRequirements>("GeneralRequirements", GeneralRequirementsSchema);

export default GeneralRequirements;
