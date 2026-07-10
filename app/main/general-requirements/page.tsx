"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
// @ts-ignore - TypeScript path alias issue
import { useCustomSession } from "@/hooks/useCustomSession";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Pencil, Save, X } from "lucide-react";
import type { IHeroSection, ISection, ICTASection, IFacultyMember } from "@/models/GeneralRequirements";
import ImageUploadField from "@/components/admin/ImageUploadField";
import { FacultyAvatarUpload } from "@/components/admin/FacultyAvatarUpload";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  BookOpen: require("lucide-react").BookOpen,
  Award: require("lucide-react").Award,
  Globe: require("lucide-react").Globe,
  GraduationCap: require("lucide-react").GraduationCap,
  Eye: require("lucide-react").Eye,
  Target: require("lucide-react").Target,
  ListChecks: require("lucide-react").ListChecks,
  Sparkles: require("lucide-react").Sparkles,
  Users: require("lucide-react").Users,
  BookMarked: require("lucide-react").BookMarked,
  Heart: require("lucide-react").Heart,
  Star: require("lucide-react").Star,
  Mail: require("lucide-react").Mail,
  Phone: require("lucide-react").Phone,
  CircleCheckBig: require("lucide-react").CircleCheckBig,
  ChevronLeft: require("lucide-react").ChevronLeft,
  CircleUser: require("lucide-react").CircleUser,
  MessageCircle: require("lucide-react").MessageCircle,
};

const getIcon = (iconName: string) => iconMap[iconName] || iconMap.BookOpen;

type ColorKey = "blue" | "green" | "purple" | "amber" | "indigo" | "cyan" | "teal" | "red";

const colorStyles: Record<ColorKey, {
  border200: string;
  border500: string;
  bg50: string;
  from600: string;
  to700: string;
  text600: string;
  text700: string;
  bg600: string;
}> = {
  blue: {
    border200: "border-blue-200",
    border500: "border-blue-500",
    bg50: "bg-blue-50",
    from600: "from-blue-600",
    to700: "to-blue-700",
    text600: "text-blue-600",
    text700: "text-blue-700",
    bg600: "bg-blue-600",
  },
  green: {
    border200: "border-green-200",
    border500: "border-green-500",
    bg50: "bg-green-50",
    from600: "from-green-600",
    to700: "to-green-700",
    text600: "text-green-600",
    text700: "text-green-700",
    bg600: "bg-green-600",
  },
  purple: {
    border200: "border-purple-200",
    border500: "border-purple-500",
    bg50: "bg-purple-50",
    from600: "from-purple-600",
    to700: "to-purple-700",
    text600: "text-purple-600",
    text700: "text-purple-700",
    bg600: "bg-purple-600",
  },
  amber: {
    border200: "border-amber-200",
    border500: "border-amber-500",
    bg50: "bg-amber-50",
    from600: "from-amber-600",
    to700: "to-amber-700",
    text600: "text-amber-600",
    text700: "text-amber-700",
    bg600: "bg-amber-600",
  },
  indigo: {
    border200: "border-indigo-200",
    border500: "border-indigo-500",
    bg50: "bg-indigo-50",
    from600: "from-indigo-600",
    to700: "to-indigo-700",
    text600: "text-indigo-600",
    text700: "text-indigo-700",
    bg600: "bg-indigo-600",
  },
  cyan: {
    border200: "border-cyan-200",
    border500: "border-cyan-500",
    bg50: "bg-cyan-50",
    from600: "from-cyan-600",
    to700: "to-cyan-700",
    text600: "text-cyan-600",
    text700: "text-cyan-700",
    bg600: "bg-cyan-600",
  },
  teal: {
    border200: "border-teal-200",
    border500: "border-teal-500",
    bg50: "bg-teal-50",
    from600: "from-teal-600",
    to700: "to-teal-700",
    text600: "text-teal-600",
    text700: "text-teal-700",
    bg600: "bg-teal-600",
  },
  red: {
    border200: "border-red-200",
    border500: "border-red-500",
    bg50: "bg-red-50",
    from600: "from-red-600",
    to700: "to-red-700",
    text600: "text-red-600",
    text700: "text-red-700",
    bg600: "bg-red-600",
  },
};

export default function GeneralRequirementsPage() {
  const locale = useLocale() as "ar" | "en";
  const { data: session } = useCustomSession();
  const isAdmin = session?.isAdmin;

  const [loading, setLoading] = useState(true);
  const [hero, setHero] = useState<IHeroSection | null>(null);
  const [sections, setSections] = useState<ISection[]>([]);
  const [cta, setCta] = useState<ICTASection | null>(null);

  const [editingSectionId, setEditingSectionId] = useState<string | null>(null);
  const [editingHero, setEditingHero] = useState(false);
  const [editingCta, setEditingCta] = useState(false);
  const [editForm, setEditForm] = useState<any>({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/general-requirements");
      const data = await res.json();
      if (data.ok) {
        setHero(data.data.hero);
        setSections(data.data.sections || []);
        setCta(data.data.cta);
      }
    } catch (error) {
      toast.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const saveChanges = async (updatedData: any) => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/general-requirements", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      const data = await res.json();
      if (data.ok) {
        toast.success("Changes saved successfully");
        await fetchData();
      } else {
        toast.error("Failed to save changes");
      }
    } catch (error) {
      toast.error("Failed to save changes");
    } finally {
      setIsSaving(false);
      setEditingSectionId(null);
      setEditingHero(false);
      setEditingCta(false);
    }
  };

  const startEditingHero = () => {
    setEditForm({ ...hero });
    setEditingHero(true);
  };

  const startEditingSection = (section: ISection) => {
    setEditForm({ ...section });
    setEditingSectionId(section.id);
  };

  const startEditingCta = () => {
    setEditForm({ ...cta });
    setEditingCta(true);
  };

  const updateFormField = (field: string, value: any) => {
    setEditForm((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSaveHero = () => {
    saveChanges({ hero: editForm, sections, cta });
  };

  const handleSaveSection = () => {
    const updatedSections = sections.map((s) =>
      s.id === editForm.id ? editForm : s
    );
    saveChanges({ hero, sections: updatedSections, cta });
  };

  const handleSaveCta = () => {
    saveChanges({ hero, sections, cta: editForm });
  };

  // Hero Section
  const HeroSection = () => {
    if (!hero) return null;
    const Icon = getIcon("BookMarked");

    return (
      <section className="relative bg-gradient-to-r from-[#6096b4] via-[#254151] to-[#6096b4] text-white py-16">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 backdrop-blur-sm p-5 rounded-full">
                <Icon className="size-16" />
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-4">{locale === "ar" ? hero.titleAr : hero.titleEn}</h1>
            <h2 className="text-2xl font-bold mb-6 opacity-90">{locale === "ar" ? hero.subtitleAr : hero.subtitleEn}</h2>
            <p className="text-xl opacity-95 leading-relaxed">{locale === "ar" ? hero.descriptionAr : hero.descriptionEn}</p>
          </div>
        </div>
        {isAdmin && (
          <Button onClick={startEditingHero} className="absolute top-4 right-4 bg-white/20 hover:bg-white/30" size="sm">
            <Pencil className="size-4 mr-2" />
            {locale === "ar" ? "تعديل" : "Edit"}
          </Button>
        )}
      </section>
    );
  };

  // About Section with Inline Editing
  const AboutSection = ({ section }: { section: ISection }) => {
    const Icon = getIcon(section.icon);
    const AwardIcon = getIcon("Award");
    const BookOpenIcon = getIcon("BookOpen");
    const UsersIcon = getIcon("Users");
    const GraduationCapIcon = getIcon("GraduationCap");

    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState<any>({});

    const startEditing = () => {
      setEditForm({
        titleAr: section.titleAr,
        titleEn: section.titleEn,
        descriptionAr: section.descriptionAr,
        descriptionEn: section.descriptionEn,
        stats: section.stats || [
          { labelAr: "تأسست عام", labelEn: "Founded in", value: "2008" },
          { labelAr: "المواد المطروحة", labelEn: "Courses Offered", value: "3" },
          { labelAr: "أعضاء الهيئة التدريسية", labelEn: "Faculty Members", value: "4" }
        ]
      });
      setIsEditing(true);
    };

    const saveAbout = () => {
      const updatedSection = { ...section, ...editForm };
      const updatedSections = sections.map((s) => s.id === section.id ? updatedSection : s);
      saveChanges({ hero, sections: updatedSections, cta });
      setIsEditing(false);
      setEditForm({});
    };

    const cancelEdit = () => {
      setIsEditing(false);
      setEditForm({});
    };

    const updateField = (field: string, value: any) => {
      setEditForm((prev: any) => ({ ...prev, [field]: value }));
    };

    const updateStat = (index: number, field: string, value: string) => {
      const newStats = [...editForm.stats];
      newStats[index] = { ...newStats[index], [field]: value };
      setEditForm((prev: any) => ({ ...prev, stats: newStats }));
    };

    return (
      <div className="mb-12 relative">
        <div className="bg-white rounded-lg shadow-xl p-10 border-2 border-blue-200">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-blue-600 text-white p-4 rounded-full"><Icon className="size-8" /></div>
            <h2 className="text-3xl font-bold text-[#254151]">{locale === "ar" ? section.titleAr : section.titleEn}</h2>
            {isAdmin && !isEditing && (
              <Button onClick={startEditing} variant="outline" size="sm" className="mr-auto">
                <Pencil className="size-4 mr-2" />{locale === "ar" ? "تعديل" : "Edit"}
              </Button>
            )}
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-8 border-2 border-blue-200">
            {isEditing ? (
              <div className="space-y-6">
                <div className="flex items-start gap-4 mb-6">
                  <div className="bg-yellow-500 text-white size-16 rounded-full flex items-center justify-center flex-shrink-0">
                    <AwardIcon className="size-8" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-yellow-800 mb-3">{locale === "ar" ? "تعديل نبذة عنا" : "Edit About Section"}</h3>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div><Label className="text-xs">{locale === "ar" ? "العنوان (ع)" : "Title (AR)"}</Label><Input value={editForm.titleAr} onChange={(e) => updateField("titleAr", e.target.value)} className="text-sm" /></div>
                      <div><Label className="text-xs">{locale === "ar" ? "العنوان (EN)" : "Title (EN)"}</Label><Input value={editForm.titleEn} onChange={(e) => updateField("titleEn", e.target.value)} className="text-sm" /></div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div><Label className="text-xs">{locale === "ar" ? "الوصف (ع)" : "Description (AR)"}</Label><Textarea value={editForm.descriptionAr} onChange={(e) => updateField("descriptionAr", e.target.value)} className="text-sm" rows={3} /></div>
                      <div><Label className="text-xs">{locale === "ar" ? "الوصف (EN)" : "Description (EN)"}</Label><Textarea value={editForm.descriptionEn} onChange={(e) => updateField("descriptionEn", e.target.value)} className="text-sm" rows={3} /></div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {editForm.stats?.map((stat: any, idx: number) => (
                    <div key={idx} className="bg-white p-4 rounded-lg shadow-md border-2 border-yellow-300">
                      <div className="space-y-2">
                        <div><Label className="text-xs">{locale === "ar" ? "التسمية (ع)" : "Label (AR)"}</Label><Input value={stat.labelAr} onChange={(e) => updateStat(idx, "labelAr", e.target.value)} className="text-sm" /></div>
                        <div><Label className="text-xs">{locale === "ar" ? "التسمية (EN)" : "Label (EN)"}</Label><Input value={stat.labelEn} onChange={(e) => updateStat(idx, "labelEn", e.target.value)} className="text-sm" /></div>
                        <div><Label className="text-xs">{locale === "ar" ? "القيمة" : "Value"}</Label><Input value={stat.value} onChange={(e) => updateStat(idx, "value", e.target.value)} className="text-sm" /></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 pt-4">
                  <Button onClick={saveAbout} className="flex-1 bg-green-600 hover:bg-green-700" size="sm"><Save className="size-4 mr-1" />{locale === "ar" ? "حفظ" : "Save"}</Button>
                  <Button onClick={cancelEdit} variant="outline" className="flex-1" size="sm"><X className="size-4 mr-1" />{locale === "ar" ? "إلغاء" : "Cancel"}</Button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-start gap-4 mb-6">
                  <div className="bg-blue-600 text-white size-16 rounded-full flex items-center justify-center flex-shrink-0">
                    <AwardIcon className="size-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[#254151] mb-3">{locale === "ar" ? "وحدة المتطلبات العامة" : "General Requirements Unit"}</h3>
                    <p className="text-gray-700 text-lg leading-relaxed">{locale === "ar" ? section.descriptionAr : section.descriptionEn}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {(section.stats || [
                    { labelAr: "تأسست عام", labelEn: "Founded in", value: "2008" },
                    { labelAr: "المواد المطروحة", labelEn: "Courses Offered", value: "3" },
                    { labelAr: "أعضاء الهيئة التدريسية", labelEn: "Faculty Members", value: "4" }
                  ]).map((stat, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-lg shadow-md border-2 border-blue-200 text-center">
                      <div className="bg-blue-600 text-white size-16 rounded-full flex items-center justify-center mx-auto mb-3">
                        {idx === 0 ? <BookOpenIcon className="size-8" /> : idx === 1 ? <GraduationCapIcon className="size-8" /> : <UsersIcon className="size-8" />}
                      </div>
                      <h4 className="font-bold text-[#254151] mb-2">{locale === "ar" ? stat.labelAr : stat.labelEn}</h4>
                      <p className="text-3xl font-bold text-blue-700">{stat.value}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Vision/Mission Section
  const VisionMissionSection = ({ section }: { section: ISection }) => {
    const color = colorStyles[section.color as ColorKey] || colorStyles.green;
    const Icon = getIcon(section.icon);
    const InnerIcon = section.id === "vision" ? getIcon("Star") : getIcon("MessageCircle");

    return (
      <div className="mb-12 relative">
        <div className={`bg-white rounded-lg shadow-xl p-10 border-2 ${color.border200}`}>
          <div className="flex items-center gap-4 mb-6">
            <div className={`${color.bg600} text-white p-4 rounded-full`}><Icon className="size-8" /></div>
            <h2 className="text-3xl font-bold text-[#254151]">{locale === "ar" ? section.titleAr : section.titleEn}</h2>
            {isAdmin && (
              <Button onClick={() => startEditingSection(section)} variant="outline" size="sm" className="mr-auto">
                <Pencil className="size-4 mr-2" />{locale === "ar" ? "تعديل" : "Edit"}
              </Button>
            )}
          </div>
          <div className={`bg-gradient-to-br ${section.id === "vision" ? "from-green-50 to-green-100" : "from-purple-50 to-purple-100"} rounded-lg p-8 border-2 ${color.border200}`}>
            <div className="flex items-start gap-4">
              <div className={`${color.bg600} text-white size-16 rounded-full flex items-center justify-center flex-shrink-0`}><InnerIcon className="size-8" /></div>
              <p className="text-gray-700 text-xl leading-relaxed pt-3">{locale === "ar" ? section.descriptionAr : section.descriptionEn}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Objectives Section with Inline Editing
  const ObjectivesSection = ({ section }: { section: ISection }) => {
    const color = colorStyles.amber;
    const Icon = getIcon(section.icon);

    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState<any>({});

    const items = locale === "ar" ? (editForm.listItemsAr || []) : (editForm.listItemsEn || []);
    const displayItems = locale === "ar" ? (section.listItemsAr || []) : (section.listItemsEn || []);

    const startEditing = () => {
      setEditForm({
        titleAr: section.titleAr,
        titleEn: section.titleEn,
        listItemsAr: [...(section.listItemsAr || [])],
        listItemsEn: [...(section.listItemsEn || [])]
      });
      setIsEditing(true);
    };

    const saveObjectives = () => {
      const updatedSection = { ...section, ...editForm };
      const updatedSections = sections.map((s) => s.id === section.id ? updatedSection : s);
      saveChanges({ hero, sections: updatedSections, cta });
      setIsEditing(false);
      setEditForm({});
    };

    const cancelEdit = () => {
      setIsEditing(false);
      setEditForm({});
    };

    const addObjective = () => {
      const newItemsAr = [...(editForm.listItemsAr || []), ""];
      const newItemsEn = [...(editForm.listItemsEn || []), ""];
      setEditForm((prev: any) => ({ ...prev, listItemsAr: newItemsAr, listItemsEn: newItemsEn }));
    };

    const deleteObjective = (index: number) => {
      const newItemsAr = editForm.listItemsAr.filter((_: any, i: number) => i !== index);
      const newItemsEn = editForm.listItemsEn.filter((_: any, i: number) => i !== index);
      setEditForm((prev: any) => ({ ...prev, listItemsAr: newItemsAr, listItemsEn: newItemsEn }));
    };

    const updateObjective = (index: number, lang: "Ar" | "En", value: string) => {
      const field = lang === "Ar" ? "listItemsAr" : "listItemsEn";
      const newItems = [...editForm[field]];
      newItems[index] = value;
      setEditForm((prev: any) => ({ ...prev, [field]: newItems }));
    };

    return (
      <div className="mb-12 relative">
        <div className={`bg-white rounded-lg shadow-xl p-10 border-2 ${color.border200}`}>
          <div className="flex items-center gap-4 mb-8">
            <div className={`${color.bg600} text-white p-4 rounded-full`}><Icon className="size-8" /></div>
            <h2 className="text-3xl font-bold text-[#254151]">{locale === "ar" ? section.titleAr : section.titleEn}</h2>
            {isAdmin && !isEditing && (
              <Button onClick={startEditing} variant="outline" size="sm" className="mr-auto">
                <Pencil className="size-4 mr-2" />{locale === "ar" ? "تعديل" : "Edit"}
              </Button>
            )}
          </div>

          {isEditing ? (
            <div className="space-y-4">
              <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-300 mb-6">
                <h3 className="font-bold text-yellow-800 mb-3">{locale === "ar" ? "تعديل الأهداف" : "Edit Objectives"}</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div><Label className="text-xs">{locale === "ar" ? "العنوان (ع)" : "Title (AR)"}</Label><Input value={editForm.titleAr} onChange={(e) => setEditForm((p: any) => ({ ...p, titleAr: e.target.value }))} className="text-sm" /></div>
                  <div><Label className="text-xs">{locale === "ar" ? "العنوان (EN)" : "Title (EN)"}</Label><Input value={editForm.titleEn} onChange={(e) => setEditForm((p: any) => ({ ...p, titleEn: e.target.value }))} className="text-sm" /></div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {items.map((item: string, idx: number) => (
                  <div key={idx} className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-4 border-2 border-yellow-300 shadow-md">
                    <div className="flex items-start gap-3">
                      <div className={`${color.bg600} text-white size-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold`}>{idx + 1}</div>
                      <div className="flex-1 space-y-2">
                        <Textarea value={editForm.listItemsAr?.[idx] || ""} onChange={(e) => updateObjective(idx, "Ar", e.target.value)} placeholder={locale === "ar" ? "النص (ع)" : "Text (AR)"} className="text-sm" rows={2} />
                        <Textarea value={editForm.listItemsEn?.[idx] || ""} onChange={(e) => updateObjective(idx, "En", e.target.value)} placeholder={locale === "ar" ? "النص (EN)" : "Text (EN)"} className="text-sm" rows={2} />
                      </div>
                      <Button onClick={() => deleteObjective(idx)} variant="outline" size="sm" className="text-red-600 hover:bg-red-50"><span className="text-lg">×</span></Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={addObjective} variant="outline" className="bg-white"><span className="text-lg mr-1">+</span>{locale === "ar" ? "إضافة هدف" : "Add Objective"}</Button>
                <Button onClick={saveObjectives} className="bg-green-600 hover:bg-green-700"><Save className="size-4 mr-1" />{locale === "ar" ? "حفظ" : "Save"}</Button>
                <Button onClick={cancelEdit} variant="outline"><X className="size-4 mr-1" />{locale === "ar" ? "إلغاء" : "Cancel"}</Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {displayItems.map((item, idx) => (
                <div key={idx} className={`bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg p-6 border-2 ${color.border200} shadow-md`}>
                  <div className="flex items-start gap-4">
                    <div className={`${color.bg600} text-white size-12 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-lg`}>{idx + 1}</div>
                    <p className="text-gray-700 leading-relaxed pt-2">{item}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  // Courses Section with Inline Editing
  const CoursesSection = ({ section }: { section: ISection }) => {
    const Icon = getIcon(section.icon);
    const CheckIcon = getIcon("CircleCheckBig");
    const [editingCourseId, setEditingCourseId] = useState<string | null>(null);
    const [courseForm, setCourseForm] = useState<any>({});
    const [isAddingCourse, setIsAddingCourse] = useState(false);

    const colorOptions: ColorKey[] = ["blue", "green", "purple", "amber", "indigo", "cyan", "teal", "red"];

    const startEditingCourse = (course: any) => {
      setEditingCourseId(course.id);
      setCourseForm({ ...course });
    };

    const startAddingCourse = () => {
      const newId = `course-${Date.now()}`;
      setCourseForm({
        id: newId,
        titleAr: "",
        titleEn: "",
        creditsAr: "",
        creditsEn: "",
        descriptionAr: "",
        descriptionEn: "",
        topicsAr: [],
        topicsEn: [],
        icon: "BookOpen",
        color: "blue",
      });
      setIsAddingCourse(true);
      setEditingCourseId(newId);
    };

    const saveCourse = () => {
      const updatedItems = isAddingCourse
        ? [...(section.items || []), courseForm]
        : section.items?.map((item: any) => item.id === courseForm.id ? courseForm : item);

      const updatedSection = { ...section, items: updatedItems };
      const updatedSections = sections.map((s) => s.id === section.id ? updatedSection : s);
      saveChanges({ hero, sections: updatedSections, cta });
      setEditingCourseId(null);
      setIsAddingCourse(false);
      setCourseForm({});
    };

    const deleteCourse = (courseId: string) => {
      if (!confirm(locale === "ar" ? "هل أنت متأكد من حذف هذه المادة؟" : "Are you sure you want to delete this course?")) return;
      const updatedItems = section.items?.filter((item: any) => item.id !== courseId);
      const updatedSection = { ...section, items: updatedItems };
      const updatedSections = sections.map((s) => s.id === section.id ? updatedSection : s);
      saveChanges({ hero, sections: updatedSections, cta });
    };

    const cancelEdit = () => {
      setEditingCourseId(null);
      setIsAddingCourse(false);
      setCourseForm({});
    };

    const updateCourseField = (field: string, value: any) => {
      setCourseForm((prev: any) => ({ ...prev, [field]: value }));
    };

    const updateTopics = (lang: "Ar" | "En", value: string) => {
      setCourseForm((prev: any) => ({ ...prev, [`topics${lang}`]: value.split("\n").filter(Boolean) }));
    };

    return (
      <div className="mb-12 relative">
        <div className="bg-white rounded-lg shadow-xl p-10 border-2 border-indigo-200">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-indigo-600 text-white p-4 rounded-full"><Icon className="size-8" /></div>
            <h2 className="text-3xl font-bold text-[#254151]">{locale === "ar" ? section.titleAr : section.titleEn}</h2>
            {isAdmin && (
              <Button onClick={startAddingCourse} className="mr-auto bg-green-600 hover:bg-green-700" size="sm">
                {locale === "ar" ? "+ إضافة مادة" : "+ Add Course"}
              </Button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {isAddingCourse && (
              <div className="bg-white rounded-lg shadow-xl border-2 border-yellow-400 overflow-hidden">
                <div className="bg-yellow-50 p-6 space-y-4">
                  <h3 className="font-bold text-lg text-yellow-800">
                    {locale === "ar" ? "إضافة مادة جديدة" : "Add New Course"}
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div><Label className="text-xs">{locale === "ar" ? "العنوان (ع)" : "Title (AR)"}</Label><Input value={courseForm.titleAr} onChange={(e) => updateCourseField("titleAr", e.target.value)} className="text-sm" /></div>
                    <div><Label className="text-xs">{locale === "ar" ? "العنوان (EN)" : "Title (EN)"}</Label><Input value={courseForm.titleEn} onChange={(e) => updateCourseField("titleEn", e.target.value)} className="text-sm" /></div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div><Label className="text-xs">{locale === "ar" ? "الساعات (ع)" : "Credits (AR)"}</Label><Input value={courseForm.creditsAr} onChange={(e) => updateCourseField("creditsAr", e.target.value)} className="text-sm" /></div>
                    <div><Label className="text-xs">{locale === "ar" ? "الساعات (EN)" : "Credits (EN)"}</Label><Input value={courseForm.creditsEn} onChange={(e) => updateCourseField("creditsEn", e.target.value)} className="text-sm" /></div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div><Label className="text-xs">{locale === "ar" ? "الأيقونة" : "Icon"}</Label><Input value={courseForm.icon} onChange={(e) => updateCourseField("icon", e.target.value)} className="text-sm" /></div>
                    <div><Label className="text-xs">{locale === "ar" ? "اللون" : "Color"}</Label><select value={courseForm.color} onChange={(e) => updateCourseField("color", e.target.value)} className="w-full border rounded px-2 py-1 text-sm">
                      {colorOptions.map(c => <option key={c} value={c}>{c}</option>)}
                    </select></div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div><Label className="text-xs">{locale === "ar" ? "الوصف (ع)" : "Description (AR)"}</Label><Textarea value={courseForm.descriptionAr} onChange={(e) => updateCourseField("descriptionAr", e.target.value)} className="text-sm" rows={2} /></div>
                    <div><Label className="text-xs">{locale === "ar" ? "الوصف (EN)" : "Description (EN)"}</Label><Textarea value={courseForm.descriptionEn} onChange={(e) => updateCourseField("descriptionEn", e.target.value)} className="text-sm" rows={2} /></div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div><Label className="text-xs">{locale === "ar" ? "المواضيع (ع)" : "Topics (AR)"}</Label><Textarea value={courseForm.topicsAr?.join("\n")} onChange={(e) => updateTopics("Ar", e.target.value)} className="text-sm" rows={3} /></div>
                    <div><Label className="text-xs">{locale === "ar" ? "المواضيع (EN)" : "Topics (EN)"}</Label><Textarea value={courseForm.topicsEn?.join("\n")} onChange={(e) => updateTopics("En", e.target.value)} className="text-sm" rows={3} /></div>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button onClick={saveCourse} className="flex-1 bg-green-600 hover:bg-green-700" size="sm"><Save className="size-4 mr-1" />{locale === "ar" ? "حفظ" : "Save"}</Button>
                    <Button onClick={cancelEdit} variant="outline" className="flex-1" size="sm"><X className="size-4 mr-1" />{locale === "ar" ? "إلغاء" : "Cancel"}</Button>
                  </div>
                </div>
              </div>
            )}
            {section.items?.map((item: any, idx: number) => {
              const itemColor = colorStyles[item.color as ColorKey] || colorStyles.blue;
              const ItemIcon = getIcon(item.icon);
              const isEditing = editingCourseId === item.id;

              if (isEditing) {
                return (
                  <div key={idx} className="bg-white rounded-lg shadow-xl border-2 border-yellow-400 overflow-hidden">
                    <div className="bg-yellow-50 p-6 space-y-4">
                      <h3 className="font-bold text-lg text-yellow-800">
                        {locale === "ar" ? "تعديل المادة" : "Edit Course"}
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        <div><Label className="text-xs">{locale === "ar" ? "العنوان (ع)" : "Title (AR)"}</Label><Input value={courseForm.titleAr} onChange={(e) => updateCourseField("titleAr", e.target.value)} className="text-sm" /></div>
                        <div><Label className="text-xs">{locale === "ar" ? "العنوان (EN)" : "Title (EN)"}</Label><Input value={courseForm.titleEn} onChange={(e) => updateCourseField("titleEn", e.target.value)} className="text-sm" /></div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div><Label className="text-xs">{locale === "ar" ? "الساعات (ع)" : "Credits (AR)"}</Label><Input value={courseForm.creditsAr} onChange={(e) => updateCourseField("creditsAr", e.target.value)} className="text-sm" /></div>
                        <div><Label className="text-xs">{locale === "ar" ? "الساعات (EN)" : "Credits (EN)"}</Label><Input value={courseForm.creditsEn} onChange={(e) => updateCourseField("creditsEn", e.target.value)} className="text-sm" /></div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div><Label className="text-xs">{locale === "ar" ? "الأيقونة" : "Icon"}</Label><Input value={courseForm.icon} onChange={(e) => updateCourseField("icon", e.target.value)} className="text-sm" /></div>
                        <div><Label className="text-xs">{locale === "ar" ? "اللون" : "Color"}</Label><select value={courseForm.color} onChange={(e) => updateCourseField("color", e.target.value)} className="w-full border rounded px-2 py-1 text-sm">
                          {colorOptions.map(c => <option key={c} value={c}>{c}</option>)}
                        </select></div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div><Label className="text-xs">{locale === "ar" ? "الوصف (ع)" : "Description (AR)"}</Label><Textarea value={courseForm.descriptionAr} onChange={(e) => updateCourseField("descriptionAr", e.target.value)} className="text-sm" rows={2} /></div>
                        <div><Label className="text-xs">{locale === "ar" ? "الوصف (EN)" : "Description (EN)"}</Label><Textarea value={courseForm.descriptionEn} onChange={(e) => updateCourseField("descriptionEn", e.target.value)} className="text-sm" rows={2} /></div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div><Label className="text-xs">{locale === "ar" ? "المواضيع (ع)" : "Topics (AR)"}</Label><Textarea value={courseForm.topicsAr?.join("\n")} onChange={(e) => updateTopics("Ar", e.target.value)} className="text-sm" rows={3} /></div>
                        <div><Label className="text-xs">{locale === "ar" ? "المواضيع (EN)" : "Topics (EN)"}</Label><Textarea value={courseForm.topicsEn?.join("\n")} onChange={(e) => updateTopics("En", e.target.value)} className="text-sm" rows={3} /></div>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button onClick={saveCourse} className="flex-1 bg-green-600 hover:bg-green-700" size="sm"><Save className="size-4 mr-1" />{locale === "ar" ? "حفظ" : "Save"}</Button>
                        <Button onClick={cancelEdit} variant="outline" className="flex-1" size="sm"><X className="size-4 mr-1" />{locale === "ar" ? "إلغاء" : "Cancel"}</Button>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <div key={idx} className={`bg-white rounded-lg shadow-xl border-2 ${itemColor.border200} overflow-hidden hover:shadow-2xl transition-all relative group`}>
                  {isAdmin && (
                    <div className="absolute top-2 right-2 z-10 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button onClick={() => startEditingCourse(item)} variant="outline" size="sm" className="bg-white hover:bg-yellow-50"><Pencil className="size-4" /></Button>
                      <Button onClick={() => deleteCourse(item.id)} variant="outline" size="sm" className="bg-white hover:bg-red-50 text-red-600"><span className="text-lg">×</span></Button>
                    </div>
                  )}
                  <div className={`bg-gradient-to-r ${itemColor.from600} ${itemColor.to700} text-white p-6 text-center`}>
                    <div className="bg-white/20 backdrop-blur-sm size-20 rounded-full flex items-center justify-center mx-auto mb-4"><ItemIcon className="size-12" /></div>
                    <h3 className="text-2xl font-bold mb-2">{locale === "ar" ? item.titleAr : item.titleEn}</h3>
                    <p className="text-sm opacity-90 mb-3">{locale === "ar" ? item.titleEn : item.titleAr}</p>
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 inline-block">
                      <p className="font-bold">{locale === "ar" ? item.creditsAr : item.creditsEn}</p>
                      <p className="text-xs opacity-90">{locale === "ar" ? item.creditsEn : item.creditsAr}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className={`text-gray-700 leading-relaxed mb-6 border-r-4 ${itemColor.border500} pr-4`}>{locale === "ar" ? item.descriptionAr : item.descriptionEn}</p>
                    <div className={`${itemColor.bg50} rounded-lg p-6 border-2 ${itemColor.border200}`}>
                      <h4 className="font-bold text-[#254151] mb-3">{locale === "ar" ? "المواضيع الرئيسية:" : "Main Topics:"}</h4>
                      <ul className="space-y-2">
                        {(locale === "ar" ? item.topicsAr : item.topicsEn).map((topic: string, tidx: number) => (
                          <li key={tidx} className="flex items-start gap-2">
                            <CheckIcon className={`size-5 ${itemColor.text600} flex-shrink-0 mt-0.5`} />
                            <span className="text-gray-700">{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // Faculty Section with Inline Editing
  const FacultySection = ({ section }: { section: ISection }) => {
    const color = colorStyles.teal;
    const Icon = getIcon(section.icon);
    const MailIcon = getIcon("Mail");
    const PhoneIcon = getIcon("Phone");
    const AwardIcon = getIcon("Award");
    const CircleUserIcon = getIcon("CircleUser");

    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState<any>({});

    const facultyMembers = section.facultyMembers || [];
    const headMember = facultyMembers.find(m => m.isHead);
    const otherMembers = facultyMembers.filter(m => !m.isHead);

    const colorOptions: ColorKey[] = ["blue", "green", "purple", "amber", "indigo", "cyan", "teal", "red"];

    const startEditing = () => {
      setEditForm({
        titleAr: section.titleAr,
        titleEn: section.titleEn,
        facultyMembers: [...(section.facultyMembers || [])]
      });
      setIsEditing(true);
    };

    const saveFaculty = () => {
      const updatedSection = { ...section, ...editForm };
      const updatedSections = sections.map((s) => s.id === section.id ? updatedSection : s);
      saveChanges({ hero, sections: updatedSections, cta });
      setIsEditing(false);
      setEditForm({});
    };

    const cancelEdit = () => {
      setIsEditing(false);
      setEditForm({});
    };

    const addMember = () => {
      const newMember = {
        nameAr: "",
        nameEn: "",
        positionAr: "",
        positionEn: "",
        isHead: editForm.facultyMembers?.length === 0,
        image: "",
        email: "",
        phone: "",
        hasDoctorate: false,
        color: "blue"
      };
      setEditForm((prev: any) => ({ ...prev, facultyMembers: [...(prev.facultyMembers || []), newMember] }));
    };

    const deleteMember = (index: number) => {
      const newMembers = editForm.facultyMembers.filter((_: any, i: number) => i !== index);
      setEditForm((prev: any) => ({ ...prev, facultyMembers: newMembers }));
    };

    const updateMember = (index: number, field: string, value: any) => {
      const newMembers = [...editForm.facultyMembers];
      newMembers[index] = { ...newMembers[index], [field]: value };
      setEditForm((prev: any) => ({ ...prev, facultyMembers: newMembers }));
    };

    const headEditMember = editForm.facultyMembers?.find((m: any) => m.isHead);
    const otherEditMembers = editForm.facultyMembers?.filter((m: any) => !m.isHead);

    return (
      <div className="mb-12 relative">
        <div className={`bg-white rounded-lg shadow-xl p-10 border-2 ${color.border200}`}>
          <div className="flex items-center gap-4 mb-8">
            <div className={`${color.bg600} text-white p-4 rounded-full`}><Icon className="size-8" /></div>
            <h2 className="text-3xl font-bold text-[#254151]">{locale === "ar" ? section.titleAr : section.titleEn}</h2>
            {isAdmin && !isEditing && (
              <Button onClick={startEditing} variant="outline" size="sm" className="mr-auto">
                <Pencil className="size-4 mr-2" />{locale === "ar" ? "تعديل" : "Edit"}
              </Button>
            )}
          </div>

          {isEditing ? (
            <div className="space-y-6">
              <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-300">
                <h3 className="font-bold text-yellow-800 mb-3">{locale === "ar" ? "تعديل أعضاء الهيئة التدريسية" : "Edit Faculty Members"}</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div><Label className="text-xs">{locale === "ar" ? "العنوان (ع)" : "Title (AR)"}</Label><Input value={editForm.titleAr} onChange={(e) => setEditForm((p: any) => ({ ...p, titleAr: e.target.value }))} className="text-sm" /></div>
                  <div><Label className="text-xs">{locale === "ar" ? "العنوان (EN)" : "Title (EN)"}</Label><Input value={editForm.titleEn} onChange={(e) => setEditForm((p: any) => ({ ...p, titleEn: e.target.value }))} className="text-sm" /></div>
                </div>
              </div>

              {headEditMember && (
                <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-300">
                  <div className="flex items-center gap-2 mb-3">
                    <AwardIcon className="size-5 text-blue-600" />
                    <h4 className="font-bold text-blue-800">{locale === "ar" ? "رئيس القسم" : "Head of Department"}</h4>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <div><Label className="text-xs">{locale === "ar" ? "الاسم (ع)" : "Name (AR)"}</Label><Input value={headEditMember.nameAr} onChange={(e) => updateMember(editForm.facultyMembers.findIndex((m: any) => m.isHead), "nameAr", e.target.value)} className="text-sm" /></div>
                    <div><Label className="text-xs">{locale === "ar" ? "الاسم (EN)" : "Name (EN)"}</Label><Input value={headEditMember.nameEn} onChange={(e) => updateMember(editForm.facultyMembers.findIndex((m: any) => m.isHead), "nameEn", e.target.value)} className="text-sm" /></div>
                    <div><Label className="text-xs">{locale === "ar" ? "المنصب (ع)" : "Position (AR)"}</Label><Input value={headEditMember.positionAr} onChange={(e) => updateMember(editForm.facultyMembers.findIndex((m: any) => m.isHead), "positionAr", e.target.value)} className="text-sm" /></div>
                    <div><Label className="text-xs">{locale === "ar" ? "المنصب (EN)" : "Position (EN)"}</Label><Input value={headEditMember.positionEn} onChange={(e) => updateMember(editForm.facultyMembers.findIndex((m: any) => m.isHead), "positionEn", e.target.value)} className="text-sm" /></div>
                    <div><Label className="text-xs">{locale === "ar" ? "البريد" : "Email"}</Label><Input value={headEditMember.email} onChange={(e) => updateMember(editForm.facultyMembers.findIndex((m: any) => m.isHead), "email", e.target.value)} className="text-sm" /></div>
                    <div><Label className="text-xs">{locale === "ar" ? "الهاتف" : "Phone"}</Label><Input value={headEditMember.phone} onChange={(e) => updateMember(editForm.facultyMembers.findIndex((m: any) => m.isHead), "phone", e.target.value)} className="text-sm" /></div>
                    <div className="flex flex-col items-center">
                      <Label className="text-xs mb-2">{locale === "ar" ? "الصورة (انقر للتغيير)" : "Image (click to change)"}</Label>
                      <FacultyAvatarUpload
                        path={headEditMember.image}
                        onUploaded={(relPath) => updateMember(editForm.facultyMembers.findIndex((m: any) => m.isHead), "image", relPath)}
                        size="lg"
                      />
                    </div>
                    <div><Label className="text-xs">{locale === "ar" ? "اللون" : "Color"}</Label><select value={headEditMember.color} onChange={(e) => updateMember(editForm.facultyMembers.findIndex((m: any) => m.isHead), "color", e.target.value)} className="w-full border rounded px-2 py-1 text-sm">{colorOptions.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
                  </div>
                </div>
              )}

              <div>
                <h4 className="font-bold text-gray-700 mb-3">{locale === "ar" ? "أعضاء الهيئة" : "Faculty Members"}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {otherEditMembers?.map((member: any, idx: number) => {
                    const actualIndex = editForm.facultyMembers.findIndex((m: any) => m === member);
                    return (
                      <div key={idx} className="bg-white p-4 rounded-lg border-2 border-gray-200 shadow-sm">
                        <div className="flex justify-between items-center mb-3">
                          <span className="font-bold text-sm text-gray-600">#{idx + 1}</span>
                          <Button onClick={() => deleteMember(actualIndex)} variant="outline" size="sm" className="text-red-600 hover:bg-red-50"><span className="text-lg">×</span></Button>
                        </div>
                        <div className="space-y-2">
                          <div><Label className="text-xs">{locale === "ar" ? "الاسم (ع)" : "Name (AR)"}</Label><Input value={member.nameAr} onChange={(e) => updateMember(actualIndex, "nameAr", e.target.value)} className="text-sm" /></div>
                          <div><Label className="text-xs">{locale === "ar" ? "الاسم (EN)" : "Name (EN)"}</Label><Input value={member.nameEn} onChange={(e) => updateMember(actualIndex, "nameEn", e.target.value)} className="text-sm" /></div>
                          <div><Label className="text-xs">{locale === "ar" ? "المنصب (ع)" : "Position (AR)"}</Label><Input value={member.positionAr} onChange={(e) => updateMember(actualIndex, "positionAr", e.target.value)} className="text-sm" /></div>
                          <div><Label className="text-xs">{locale === "ar" ? "المنصب (EN)" : "Position (EN)"}</Label><Input value={member.positionEn} onChange={(e) => updateMember(actualIndex, "positionEn", e.target.value)} className="text-sm" /></div>
                          <div><Label className="text-xs">{locale === "ar" ? "البريد" : "Email"}</Label><Input value={member.email} onChange={(e) => updateMember(actualIndex, "email", e.target.value)} className="text-sm" /></div>
                          <div><Label className="text-xs">{locale === "ar" ? "الهاتف" : "Phone"}</Label><Input value={member.phone} onChange={(e) => updateMember(actualIndex, "phone", e.target.value)} className="text-sm" /></div>
                          <div className="flex flex-col items-center">
                            <Label className="text-xs mb-2">{locale === "ar" ? "الصورة" : "Image"}</Label>
                            <FacultyAvatarUpload
                              path={member.image}
                              onUploaded={(relPath) => updateMember(actualIndex, "image", relPath)}
                              size="md"
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <input type="checkbox" checked={member.hasDoctorate} onChange={(e) => updateMember(actualIndex, "hasDoctorate", e.target.checked)} className="size-4" />
                            <Label className="text-xs mb-0">{locale === "ar" ? "دكتوراه" : "Doctorate"}</Label>
                          </div>
                          <div><Label className="text-xs">{locale === "ar" ? "اللون" : "Color"}</Label><select value={member.color} onChange={(e) => updateMember(actualIndex, "color", e.target.value)} className="w-full border rounded px-2 py-1 text-sm">{colorOptions.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={addMember} variant="outline" className="bg-white"><span className="text-lg mr-1">+</span>{locale === "ar" ? "إضافة عضو" : "Add Member"}</Button>
                <Button onClick={saveFaculty} className="bg-green-600 hover:bg-green-700"><Save className="size-4 mr-1" />{locale === "ar" ? "حفظ" : "Save"}</Button>
                <Button onClick={cancelEdit} variant="outline"><X className="size-4 mr-1" />{locale === "ar" ? "إلغاء" : "Cancel"}</Button>
              </div>
            </div>
          ) : (
            <>
              {facultyMembers.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                  <CircleUserIcon className="size-16 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500 text-lg mb-2">{locale === "ar" ? "لا يوجد أعضاء مسجلين" : "No members registered"}</p>
                  {isAdmin && <p className="text-gray-400 text-sm">{locale === "ar" ? "اضغط تعديل لإضافة أعضاء" : "Click Edit to add members"}</p>}
                </div>
              ) : (
                <>
                  {headMember && (
                    <div className="mb-8">
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-xl border-2 border-blue-200 overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8">
                          <div className="flex items-center gap-6">
                            {headMember.image ? (
                              <img src={headMember.image} alt={locale === "ar" ? headMember.nameAr : headMember.nameEn} className="size-32 rounded-full object-cover border-4 border-white shadow-xl" />
                            ) : (
                              <div className="bg-white/20 backdrop-blur-sm size-32 rounded-full flex items-center justify-center border-4 border-white shadow-xl"><CircleUserIcon className="size-16" /></div>
                            )}
                            <div>
                              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-3">
                                <AwardIcon className="size-5" />
                                <span className="font-bold">{locale === "ar" ? headMember.positionAr : headMember.positionEn}</span>
                              </div>
                              <h3 className="text-3xl font-bold mb-1">{locale === "ar" ? headMember.nameAr : headMember.nameEn}</h3>
                              <p className="text-lg opacity-90">{locale === "ar" ? headMember.nameEn : headMember.nameAr}</p>
                            </div>
                          </div>
                        </div>
                        <div className="p-8">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {headMember.email && (
                              <div className="bg-white p-6 rounded-lg border-2 border-blue-200 shadow-md">
                                <div className="flex items-center gap-4">
                                  <div className="bg-blue-600 text-white size-14 rounded-full flex items-center justify-center flex-shrink-0"><MailIcon className="size-7" /></div>
                                  <div>
                                    <p className="text-sm text-gray-600 mb-1">{locale === "ar" ? "البريد الإلكتروني" : "Email"}</p>
                                    <a href={`mailto:${headMember.email}`} className="font-bold text-lg text-blue-700 hover:underline">{headMember.email}</a>
                                  </div>
                                </div>
                              </div>
                            )}
                            {headMember.phone && (
                              <div className="bg-white p-6 rounded-lg border-2 border-blue-200 shadow-md">
                                <div className="flex items-center gap-4">
                                  <div className="bg-blue-600 text-white size-14 rounded-full flex items-center justify-center flex-shrink-0"><PhoneIcon className="size-7" /></div>
                                  <div>
                                    <p className="text-sm text-gray-600 mb-1">{locale === "ar" ? "رقم الهاتف" : "Phone"}</p>
                                    <a href={`tel:${headMember.phone}`} className="font-bold text-lg text-blue-700 hover:underline" dir="ltr">{headMember.phone}</a>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {otherMembers?.map((member, idx) => {
                      const memberColor = colorStyles[member.color as ColorKey] || colorStyles.green;
                      return (
                        <div key={idx} className={`bg-white rounded-lg shadow-xl border-2 ${memberColor.border200} overflow-hidden hover:shadow-2xl transition-all`}>
                          <div className={`bg-gradient-to-r ${memberColor.from600} ${memberColor.to700} text-white p-6 text-center`}>
                            {member.image ? (
                              <img src={member.image} alt={locale === "ar" ? member.nameAr : member.nameEn} className="size-24 rounded-full object-cover border-4 border-white shadow-xl mx-auto mb-4" />
                            ) : (
                              <div className="bg-white/20 backdrop-blur-sm size-24 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-xl"><CircleUserIcon className="size-12" /></div>
                            )}
                            <h3 className="text-xl font-bold mb-1">{locale === "ar" ? member.nameAr : member.nameEn}</h3>
                            <p className="text-sm opacity-90 mb-3">{locale === "ar" ? member.nameEn : member.nameAr}</p>
                            {member.hasDoctorate && (
                              <div className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                                <AwardIcon className="size-4" /><span className="text-xs">Doctor</span>
                              </div>
                            )}
                          </div>
                          <div className="p-6">
                            <div className={`${memberColor.bg50} p-4 rounded-lg border-2 ${memberColor.border200} mb-4 text-center`}>
                              <p className="font-bold text-[#254151] mb-1">{locale === "ar" ? member.positionAr : member.positionEn}</p>
                              <p className="text-sm text-gray-600">{locale === "ar" ? member.positionEn : member.positionAr}</p>
                            </div>
                            <div className="space-y-3">
                              {member.email && (
                                <div className={`${memberColor.bg50} p-3 rounded-lg border-2 ${memberColor.border200}`}>
                                  <div className="flex items-center gap-2 mb-1"><MailIcon className={`size-4 ${memberColor.text600}`} /><p className="text-xs text-gray-600">{locale === "ar" ? "البريد الإلكتروني" : "Email"}</p></div>
                                  <a href={`mailto:${member.email}`} className={`text-sm font-semibold ${memberColor.text700} hover:underline break-all`}>{member.email}</a>
                                </div>
                              )}
                              {member.phone && (
                                <div className={`${memberColor.bg50} p-3 rounded-lg border-2 ${memberColor.border200}`}>
                                  <div className="flex items-center gap-2 mb-1"><PhoneIcon className={`size-4 ${memberColor.text600}`} /><p className="text-xs text-gray-600">{locale === "ar" ? "رقم الهاتف" : "Phone"}</p></div>
                                  <a href={`tel:${member.phone}`} className={`text-sm font-semibold ${memberColor.text700} hover:underline`} dir="ltr">{member.phone}</a>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    );
  };

  // Additional Features Section with Inline Editing
  const AdditionalSection = ({ section }: { section: ISection }) => {
    const color = colorStyles.blue;
    const Icon = getIcon(section.icon);

    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState<any>({});

    const items = locale === "ar" ? (editForm.listItemsAr || []) : (editForm.listItemsEn || []);
    const displayItems = locale === "ar" ? (section.listItemsAr || []) : (section.listItemsEn || []);

    const startEditing = () => {
      setEditForm({
        titleAr: section.titleAr,
        titleEn: section.titleEn,
        listItemsAr: [...(section.listItemsAr || [])],
        listItemsEn: [...(section.listItemsEn || [])]
      });
      setIsEditing(true);
    };

    const saveAdditional = () => {
      const updatedSection = { ...section, ...editForm };
      const updatedSections = sections.map((s) => s.id === section.id ? updatedSection : s);
      saveChanges({ hero, sections: updatedSections, cta });
      setIsEditing(false);
      setEditForm({});
    };

    const cancelEdit = () => {
      setIsEditing(false);
      setEditForm({});
    };

    const addItem = () => {
      const newItemsAr = [...(editForm.listItemsAr || []), ""];
      const newItemsEn = [...(editForm.listItemsEn || []), ""];
      setEditForm((prev: any) => ({ ...prev, listItemsAr: newItemsAr, listItemsEn: newItemsEn }));
    };

    const deleteItem = (index: number) => {
      const newItemsAr = editForm.listItemsAr.filter((_: any, i: number) => i !== index);
      const newItemsEn = editForm.listItemsEn.filter((_: any, i: number) => i !== index);
      setEditForm((prev: any) => ({ ...prev, listItemsAr: newItemsAr, listItemsEn: newItemsEn }));
    };

    const updateItem = (index: number, lang: "Ar" | "En", value: string) => {
      const field = lang === "Ar" ? "listItemsAr" : "listItemsEn";
      const newItems = [...editForm[field]];
      newItems[index] = value;
      setEditForm((prev: any) => ({ ...prev, [field]: newItems }));
    };

    return (
      <div className="mb-12 relative">
        <div className={`bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-xl p-10 border-2 ${color.border200}`}>
          <div className="flex items-start gap-4 mb-6">
            <div className={`${color.bg600} text-white size-16 rounded-full flex items-center justify-center flex-shrink-0`}><Icon className="size-8" /></div>
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <h3 className="font-bold text-[#254151] text-2xl">{locale === "ar" ? section.titleAr : section.titleEn}</h3>
                {isAdmin && !isEditing && (
                  <Button onClick={startEditing} variant="outline" size="sm">
                    <Pencil className="size-4 mr-2" />{locale === "ar" ? "تعديل" : "Edit"}
                  </Button>
                )}
              </div>

              {isEditing ? (
                <div className="space-y-4">
                  <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-300">
                    <h4 className="font-bold text-yellow-800 mb-3">{locale === "ar" ? "تعديل المميزات" : "Edit Features"}</h4>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div><Label className="text-xs">{locale === "ar" ? "العنوان (ع)" : "Title (AR)"}</Label><Input value={editForm.titleAr} onChange={(e) => setEditForm((p: any) => ({ ...p, titleAr: e.target.value }))} className="text-sm" /></div>
                      <div><Label className="text-xs">{locale === "ar" ? "العنوان (EN)" : "Title (EN)"}</Label><Input value={editForm.titleEn} onChange={(e) => setEditForm((p: any) => ({ ...p, titleEn: e.target.value }))} className="text-sm" /></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {items.map((item: string, idx: number) => (
                      <div key={idx} className="bg-white p-4 rounded-lg border-2 border-yellow-300 shadow-sm">
                        <div className="flex items-start gap-3">
                          <div className={`${color.bg600} text-white size-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold`}>{idx + 1}</div>
                          <div className="flex-1 space-y-2">
                            <Textarea value={editForm.listItemsAr?.[idx] || ""} onChange={(e) => updateItem(idx, "Ar", e.target.value)} placeholder={locale === "ar" ? "النص (ع)" : "Text (AR)"} className="text-sm" rows={2} />
                            <Textarea value={editForm.listItemsEn?.[idx] || ""} onChange={(e) => updateItem(idx, "En", e.target.value)} placeholder={locale === "ar" ? "النص (EN)" : "Text (EN)"} className="text-sm" rows={2} />
                          </div>
                          <Button onClick={() => deleteItem(idx)} variant="outline" size="sm" className="text-red-600 hover:bg-red-50"><span className="text-lg">×</span></Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button onClick={addItem} variant="outline" className="bg-white"><span className="text-lg mr-1">+</span>{locale === "ar" ? "إضافة ميزة" : "Add Feature"}</Button>
                    <Button onClick={saveAdditional} className="bg-green-600 hover:bg-green-700"><Save className="size-4 mr-1" />{locale === "ar" ? "حفظ" : "Save"}</Button>
                    <Button onClick={cancelEdit} variant="outline"><X className="size-4 mr-1" />{locale === "ar" ? "إلغاء" : "Cancel"}</Button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {displayItems.map((item, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-lg shadow-md border-2 border-blue-200">
                      <div className="flex items-start gap-3"><Icon className={`size-6 ${color.text600} flex-shrink-0 mt-0.5`} /><p className="text-gray-700">{item}</p></div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Section Router
  const SectionCard = ({ section }: { section: ISection }) => {
    switch (section.id) {
      case "about": return <AboutSection section={section} />;
      case "vision":
      case "mission": return <VisionMissionSection section={section} />;
      case "objectives": return <ObjectivesSection section={section} />;
      case "courses": return <CoursesSection section={section} />;
      case "faculty": return <FacultySection section={section} />;
      case "additional": return <AdditionalSection section={section} />;
      default: return null;
    }
  };

  // CTA Section
  const CTASection = () => {
    if (!cta) return null;
    const ctaData = cta as any;
    const buttons = ctaData.buttons || [
      { textAr: "دليل التواصل", textEn: "Contact Directory", link: "/main/contact-directory" },
      { textAr: "الشؤون الأكاديمية", textEn: "Academic Affairs", link: "/main/academic-affairs" },
      { textAr: "العودة للرئيسية", textEn: "Back to Home", link: "/" }
    ];
    const PhoneIcon = getIcon("Phone");
    const GraduationCapIcon = getIcon("GraduationCap");
    const ChevronLeftIcon = getIcon("ChevronLeft");

    return (
      <section className="py-16 bg-gradient-to-r from-[#254151] to-[#6096b4] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">{locale === "ar" ? cta.titleAr : cta.titleEn}</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">{locale === "ar" ? cta.descriptionAr : cta.descriptionEn}</p>
          <div className="flex flex-wrap justify-center gap-4">
            {isAdmin && (
              <Button onClick={startEditingCta} variant="outline" className="bg-white/20 border-white text-white hover:bg-white hover:text-[#254151]" size="sm">
                <Pencil className="size-4 mr-2" />{locale === "ar" ? "تعديل" : "Edit"}
              </Button>
            )}
            <a href={buttons[0]?.link || "/contact-directory"} className="inline-flex items-center gap-2 bg-white text-[#254151] px-8 py-4 rounded-lg font-bold hover:shadow-2xl transition-all text-lg">
              <PhoneIcon className="size-6" /><span>{locale === "ar" ? buttons[0]?.textAr : buttons[0]?.textEn}</span>
            </a>
            <a href={buttons[1]?.link || "/academic-affairs"} className="inline-flex items-center gap-2 bg-[#c2a772] text-white px-8 py-4 rounded-lg font-bold hover:shadow-2xl transition-all text-lg">
              <GraduationCapIcon className="size-6" /><span>{locale === "ar" ? buttons[1]?.textAr : buttons[1]?.textEn}</span>
            </a>
            <a href={buttons[2]?.link || "/"} className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-[#254151] transition-all text-lg">
              <ChevronLeftIcon className="size-6" /><span>{locale === "ar" ? buttons[2]?.textAr : buttons[2]?.textEn}</span>
            </a>
          </div>
        </div>
      </section>
    );
  };

  // Edit Dialogs
  const HeroEditDialog = () => {
    if (!editingHero) return null;
    return (
      <Dialog open={editingHero} onOpenChange={setEditingHero}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{locale === "ar" ? "تعديل الهيدر" : "Edit Hero"}</DialogTitle></DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Title (AR)</Label><Input value={editForm.titleAr} onChange={(e) => updateFormField("titleAr", e.target.value)} /></div>
              <div><Label>Title (EN)</Label><Input value={editForm.titleEn} onChange={(e) => updateFormField("titleEn", e.target.value)} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Subtitle (AR)</Label><Input value={editForm.subtitleAr} onChange={(e) => updateFormField("subtitleAr", e.target.value)} /></div>
              <div><Label>Subtitle (EN)</Label><Input value={editForm.subtitleEn} onChange={(e) => updateFormField("subtitleEn", e.target.value)} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Description (AR)</Label><Textarea value={editForm.descriptionAr} onChange={(e) => updateFormField("descriptionAr", e.target.value)} /></div>
              <div><Label>Description (EN)</Label><Textarea value={editForm.descriptionEn} onChange={(e) => updateFormField("descriptionEn", e.target.value)} /></div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingHero(false)}><X className="size-4 mr-2" />{locale === "ar" ? "إلغاء" : "Cancel"}</Button>
            <Button onClick={handleSaveHero} disabled={isSaving}><Save className="size-4 mr-2" />{isSaving ? (locale === "ar" ? "جاري الحفظ..." : "Saving...") : (locale === "ar" ? "حفظ" : "Save")}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  const SectionEditDialog = () => {
    if (!editingSectionId) return null;
    return (
      <Dialog open={!!editingSectionId} onOpenChange={() => setEditingSectionId(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{locale === "ar" ? "تعديل القسم" : "Edit Section"}</DialogTitle></DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Title (AR)</Label><Input value={editForm.titleAr} onChange={(e) => updateFormField("titleAr", e.target.value)} /></div>
              <div><Label>Title (EN)</Label><Input value={editForm.titleEn} onChange={(e) => updateFormField("titleEn", e.target.value)} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Description (AR)</Label><Textarea value={editForm.descriptionAr || ""} onChange={(e) => updateFormField("descriptionAr", e.target.value)} /></div>
              <div><Label>Description (EN)</Label><Textarea value={editForm.descriptionEn || ""} onChange={(e) => updateFormField("descriptionEn", e.target.value)} /></div>
            </div>
            {editForm.listItemsAr && (
              <div className="grid grid-cols-2 gap-4">
                <div><Label>List Items (AR)</Label><Textarea value={editForm.listItemsAr.join("\n")} onChange={(e) => updateFormField("listItemsAr", e.target.value.split("\n").filter(Boolean))} rows={5} /></div>
                <div><Label>List Items (EN)</Label><Textarea value={editForm.listItemsEn.join("\n")} onChange={(e) => updateFormField("listItemsEn", e.target.value.split("\n").filter(Boolean))} rows={5} /></div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingSectionId(null)}><X className="size-4 mr-2" />{locale === "ar" ? "إلغاء" : "Cancel"}</Button>
            <Button onClick={handleSaveSection} disabled={isSaving}><Save className="size-4 mr-2" />{isSaving ? (locale === "ar" ? "جاري الحفظ..." : "Saving...") : (locale === "ar" ? "حفظ" : "Save")}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  const CTAEditDialog = () => {
    if (!editingCta) return null;
    return (
      <Dialog open={editingCta} onOpenChange={setEditingCta}>
        <DialogContent className="max-w-2xl">
          <DialogHeader><DialogTitle>{locale === "ar" ? "تعديل دعوة للعمل" : "Edit CTA"}</DialogTitle></DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Title (AR)</Label><Input value={editForm.titleAr} onChange={(e) => updateFormField("titleAr", e.target.value)} /></div>
              <div><Label>Title (EN)</Label><Input value={editForm.titleEn} onChange={(e) => updateFormField("titleEn", e.target.value)} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Description (AR)</Label><Textarea value={editForm.descriptionAr} onChange={(e) => updateFormField("descriptionAr", e.target.value)} /></div>
              <div><Label>Description (EN)</Label><Textarea value={editForm.descriptionEn} onChange={(e) => updateFormField("descriptionEn", e.target.value)} /></div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingCta(false)}><X className="size-4 mr-2" />{locale === "ar" ? "إلغاء" : "Cancel"}</Button>
            <Button onClick={handleSaveCta} disabled={isSaving}><Save className="size-4 mr-2" />{isSaving ? (locale === "ar" ? "جاري الحفظ..." : "Saving...") : (locale === "ar" ? "حفظ" : "Save")}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#254151]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection />
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          {sections.sort((a, b) => a.order - b.order).map((section) => (
            <SectionCard key={section.id} section={section} />
          ))}
        </div>
      </section>
      <CTASection />
      <HeroEditDialog />
      <SectionEditDialog />
      <CTAEditDialog />
    </div>
  );
}
