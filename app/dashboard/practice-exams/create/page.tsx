"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

interface ExamType {
  _id: string;
  nameAr: string;
  nameEn: string;
  icon: string;
  color: string;
}

const COLOR_OPTIONS = ["blue", "purple", "green", "amber", "teal", "indigo", "red"] as const;
const ICON_OPTIONS = ["FileText", "Calculator", "Monitor", "BookOpen"] as const;
const ADD_NEW_TYPE_VALUE = "__add_new_type__";

export default function CreateExamPage() {
  const t = useTranslations("practiceExams");
  const router = useRouter();
  const [examTypes, setExamTypes] = useState<ExamType[]>([]);
  const [loading, setLoading] = useState(false);
  const [creatingType, setCreatingType] = useState(false);
  const [newTypeData, setNewTypeData] = useState({
    nameAr: "",
    nameEn: "",
    icon: "FileText",
    color: "blue",
    order: 0,
  });
  const [formData, setFormData] = useState({
    code: "",
    titleAr: "",
    titleEn: "",
    subtitleAr: "",
    subtitleEn: "",
    descriptionAr: "",
    descriptionEn: "",
    examTypeId: "",
    language: "en" as "ar" | "en",
    duration: 50,
    examType: "computerized" as "computerized" | "paper",
    color: "blue",
    isActive: true,
    order: 0,
  });

  const fetchExamTypes = async () => {
    try {
      const res = await fetch("/api/exam-types");
      const data = await res.json();
      if (data.ok) {
        setExamTypes(data.data);
      }
    } catch (error) {
      console.error("Error fetching exam types:", error);
      toast.error(t("errorTypeFetch"));
    }
  };

  useEffect(() => {
    fetchExamTypes();
  }, []);

  const handleCreateType = async () => {
    if (!newTypeData.nameAr.trim() || !newTypeData.nameEn.trim()) {
      toast.error(t("errorTypeNameRequired"));
      return;
    }

    try {
      setCreatingType(true);
      const res = await fetch("/api/exam-types", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newTypeData, isActive: true }),
      });
      const data = await res.json();
      if (data.ok) {
        toast.success(t("successTypeCreate"));
        setFormData((prev) => ({ ...prev, examTypeId: data.data._id }));
        setNewTypeData({
          nameAr: "",
          nameEn: "",
          icon: "FileText",
          color: "blue",
          order: 0,
        });
        await fetchExamTypes();
      } else {
        toast.error(data.error || t("errorTypeCreate"));
      }
    } catch (error) {
      console.error("Error creating exam type:", error);
      toast.error(t("errorTypeCreate"));
    } finally {
      setCreatingType(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.examTypeId) {
      toast.error(t("errorSelectType"));
      return;
    }
    if (formData.examTypeId === ADD_NEW_TYPE_VALUE) {
      toast.error(t("errorSelectRealType"));
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/practice-placement-tests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.ok) {
        toast.success(t("successCreate"));
        router.push("/dashboard/practice-exams");
      } else {
        toast.error(data.error || t("errorCreate"));
      }
    } catch (error) {
      console.error("Error creating exam:", error);
      toast.error(t("errorCreate"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold">{t("createExam")}</h1>
        <p className="text-sm text-muted-foreground">
          {t("createExamDescription")}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="code">{t("code")}</Label>
            <Input
              id="code"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              placeholder="e.g., GFPM01"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="examTypeId">{t("examType")}</Label>
            <Select
              value={formData.examTypeId}
              onValueChange={(value) => setFormData({ ...formData, examTypeId: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder={t("selectExamType")} />
              </SelectTrigger>
              <SelectContent>
                {examTypes.map((type) => (
                  <SelectItem key={type._id} value={type._id}>
                    {type.nameAr} / {type.nameEn}
                  </SelectItem>
                ))}
                <SelectItem value={ADD_NEW_TYPE_VALUE}>
                  {t("addTypeInlineOption")}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {formData.examTypeId === ADD_NEW_TYPE_VALUE && (
        <div className="rounded-lg border p-4 space-y-3">
          <div>
            <h3 className="text-sm font-semibold">{t("addMissingTypeTitle")}</h3>
            <p className="text-xs text-muted-foreground">{t("addMissingTypeDescription")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="newTypeNameAr">{t("nameAr")}</Label>
              <Input
                id="newTypeNameAr"
                value={newTypeData.nameAr}
                onChange={(e) => setNewTypeData({ ...newTypeData, nameAr: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newTypeNameEn">{t("nameEn")}</Label>
              <Input
                id="newTypeNameEn"
                value={newTypeData.nameEn}
                onChange={(e) => setNewTypeData({ ...newTypeData, nameEn: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newTypeIcon">{t("icon")}</Label>
              <Select
                value={newTypeData.icon}
                onValueChange={(value) => setNewTypeData({ ...newTypeData, icon: value })}
              >
                <SelectTrigger id="newTypeIcon">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ICON_OPTIONS.map((icon) => (
                    <SelectItem key={icon} value={icon}>
                      {icon}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="newTypeColor">{t("color")}</Label>
              <Select
                value={newTypeData.color}
                onValueChange={(value) => setNewTypeData({ ...newTypeData, color: value })}
              >
                <SelectTrigger id="newTypeColor">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {COLOR_OPTIONS.map((color) => (
                    <SelectItem key={color} value={color}>
                      {color}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button type="button" variant="outline" onClick={handleCreateType} disabled={creatingType}>
            {creatingType ? t("savingType") : t("addTypeAndUse")}
          </Button>
        </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="titleAr">{t("titleAr")}</Label>
          <Input
            id="titleAr"
            value={formData.titleAr}
            onChange={(e) => setFormData({ ...formData, titleAr: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="titleEn">{t("titleEn")}</Label>
          <Input
            id="titleEn"
            value={formData.titleEn}
            onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="subtitleAr">{t("subtitleAr")}</Label>
            <Input
              id="subtitleAr"
              value={formData.subtitleAr}
              onChange={(e) => setFormData({ ...formData, subtitleAr: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subtitleEn">{t("subtitleEn")}</Label>
            <Input
              id="subtitleEn"
              value={formData.subtitleEn}
              onChange={(e) => setFormData({ ...formData, subtitleEn: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="descriptionAr">{t("descriptionAr")}</Label>
          <Input
            id="descriptionAr"
            value={formData.descriptionAr}
            onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="descriptionEn">{t("descriptionEn")}</Label>
          <Input
            id="descriptionEn"
            value={formData.descriptionEn}
            onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
            required
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="language">{t("language")}</Label>
            <Select
              value={formData.language}
              onValueChange={(value: "ar" | "en") =>
                setFormData({ ...formData, language: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ar">{t("arabic")}</SelectItem>
                <SelectItem value="en">{t("english")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="duration">{t("durationMinutes")}</Label>
            <Input
              id="duration"
              type="number"
              value={formData.duration}
              onChange={(e) =>
                setFormData({ ...formData, duration: parseInt(e.target.value) || 0 })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="examType">{t("examFormat")}</Label>
            <Select
              value={formData.examType}
              onValueChange={(value: "computerized" | "paper") =>
                setFormData({ ...formData, examType: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="computerized">{t("computerized")}</SelectItem>
                <SelectItem value="paper">{t("paper")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="color">{t("color")}</Label>
            <Select value={formData.color} onValueChange={(value) => setFormData({ ...formData, color: value })}>
              <SelectTrigger id="color">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {COLOR_OPTIONS.map((color) => (
                  <SelectItem key={color} value={color}>
                    {color}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="order">{t("order")}</Label>
            <Input
              id="order"
              type="number"
              value={formData.order}
              onChange={(e) =>
                setFormData({ ...formData, order: parseInt(e.target.value) || 0 })
              }
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="isActive"
            checked={formData.isActive}
            onCheckedChange={(checked) =>
              setFormData({ ...formData, isActive: checked })
            }
          />
          <Label htmlFor="isActive">{t("isActive")}</Label>
        </div>

        <div className="flex gap-4">
          <Button type="submit" disabled={loading}>
            {loading ? t("creatingExam") : t("createExamButton")}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/dashboard/practice-exams")}
          >
            {t("cancel")}
          </Button>
        </div>
      </form>
    </div>
  );
}
