import { LucideIcon } from "lucide-react";

export type IntlRequirement = {
    icon: LucideIcon;
    titleAr: string;
    titleEn: string;
    itemsAr: string[];
    itemsEn: string[];
    color: string;
};

export type IntlProcedure = {
    step: string;
    titleAr: string;
    titleEn: string;
    descriptionAr: string;
    descriptionEn: string;
    icon: LucideIcon;
};

export type IntlGuide = {
    titleAr: string;
    titleEn: string;
    icon: LucideIcon;
    color: string;
    link: string;
};

export type IntlService = {
    icon: LucideIcon;
    titleAr: string;
    titleEn: string;
    descriptionAr: string;
    descriptionEn: string;
};
