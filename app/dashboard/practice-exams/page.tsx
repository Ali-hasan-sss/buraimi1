"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pencil, Trash2, Plus, Filter, Clock, Languages, Monitor, FileText, Calculator, BookOpen } from "lucide-react";
import { toast } from "sonner";

interface ExamType {
  _id: string;
  nameAr: string;
  nameEn: string;
  icon: string;
  color: string;
}

interface Exam {
  _id: string;
  code: string;
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  subtitleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  language: "ar" | "en";
  duration: number;
  examType: "computerized" | "paper";
  color: string;
  isActive: boolean;
  order: number;
  examTypeId: ExamType | string;
}

const colorClasses: Record<string, { border: string; text: string; gradient: string; lightBg: string }> = {
  blue: {
    border: "border-blue-200",
    text: "text-blue-600",
    gradient: "from-blue-600 to-blue-700",
    lightBg: "bg-blue-50",
  },
  purple: {
    border: "border-purple-200",
    text: "text-purple-600",
    gradient: "from-purple-600 to-purple-700",
    lightBg: "bg-purple-50",
  },
  green: {
    border: "border-green-200",
    text: "text-green-600",
    gradient: "from-green-600 to-green-700",
    lightBg: "bg-green-50",
  },
  amber: {
    border: "border-amber-200",
    text: "text-amber-600",
    gradient: "from-amber-600 to-amber-700",
    lightBg: "bg-amber-50",
  },
  teal: {
    border: "border-teal-200",
    text: "text-teal-600",
    gradient: "from-teal-600 to-teal-700",
    lightBg: "bg-teal-50",
  },
  indigo: {
    border: "border-indigo-200",
    text: "text-indigo-600",
    gradient: "from-indigo-600 to-indigo-700",
    lightBg: "bg-indigo-50",
  },
  red: {
    border: "border-red-200",
    text: "text-red-600",
    gradient: "from-red-600 to-red-700",
    lightBg: "bg-red-50",
  },
};

const iconComponents = {
  Calculator,
  Monitor,
  FileText,
  BookOpen,
};

export default function PracticeExamsPage() {
  const t = useTranslations("practiceExams");
  const [exams, setExams] = useState<Exam[]>([]);
  const [examTypes, setExamTypes] = useState<ExamType[]>([]);
  const [selectedType, setSelectedType] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  const fetchExamTypes = async () => {
    try {
      const res = await fetch("/api/exam-types");
      const data = await res.json();
      if (data.ok) {
        setExamTypes(data.data);
      }
    } catch (error) {
      console.error("Error fetching exam types:", error);
    }
  };

  const fetchExams = async (typeId?: string) => {
    try {
      setLoading(true);
      const url = typeId && typeId !== "all" 
        ? `/api/practice-placement-tests?examTypeId=${typeId}` 
        : "/api/practice-placement-tests";
      const res = await fetch(url);
      const data = await res.json();
      if (data.ok) {
        setExams(data.data);
      }
    } catch (error) {
      console.error("Error fetching exams:", error);
      toast.error(t("errorFetch"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExamTypes();
    fetchExams();
  }, []);

  const handleFilterChange = (value: string) => {
    setSelectedType(value);
    fetchExams(value);
  };

  const handleDelete = async (id: string) => {
    if (!confirm(t("confirmDelete"))) return;

    try {
      const res = await fetch(`/api/practice-placement-tests/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.ok) {
        toast.success(t("successDelete"));
        fetchExams(selectedType);
      } else {
        toast.error(data.error || t("errorDelete"));
      }
    } catch (error) {
      console.error("Error deleting exam:", error);
      toast.error(t("errorDelete"));
    }
  };

  const getExamTypeName = (examTypeId: ExamType | string) => {
    if (typeof examTypeId === "string") {
      const type = examTypes.find((t) => t._id === examTypeId);
      return type ? `${type.nameAr} / ${type.nameEn}` : t("unknown");
    }
    return `${examTypeId.nameAr} / ${examTypeId.nameEn}`;
  };

  const getExamType = (examTypeId: ExamType | string) => {
    if (typeof examTypeId === "string") {
      return examTypes.find((type) => type._id === examTypeId);
    }
    return examTypeId;
  };

  const getIconByType = (examType?: ExamType) => {
    const iconName = examType?.icon as keyof typeof iconComponents | undefined;
    return iconName ? iconComponents[iconName] || FileText : FileText;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-xl font-semibold">{t("title")}</h1>
          <p className="text-sm text-muted-foreground">
            {t("description")}
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter className="size-4 text-muted-foreground" />
            <Select value={selectedType} onValueChange={handleFilterChange}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder={t("filterByType")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("allTypes")}</SelectItem>
                {examTypes.map((type) => (
                  <SelectItem key={type._id} value={type._id}>
                    {type.nameAr} / {type.nameEn}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button asChild variant="outline">
            <Link href="/dashboard/practice-exams/exam-types">
              {t("manageTypes")}
            </Link>
          </Button>

          <Button asChild>
            <Link href="/dashboard/practice-exams/create">
              <Plus className="size-4 mr-2" />
              {t("addExam")}
            </Link>
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">{t("loading")}</div>
      ) : exams.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          {t("noExams")}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {exams.map((exam) => {
            const examType = getExamType(exam.examTypeId);
            const color = exam.color || examType?.color || "blue";
            const styles = colorClasses[color] || colorClasses.blue;
            const TypeIcon = getIconByType(examType);

            return (
              <div key={exam._id} className={`bg-white rounded-lg shadow-md border-2 ${styles.border} overflow-hidden`}>
                <div className={`bg-gradient-to-r ${styles.gradient} text-white p-5`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="bg-white/20 p-2 rounded-full">
                        <TypeIcon className="size-5" />
                      </div>
                      <div>
                        <div className="text-xs opacity-90">{t("code")}</div>
                        <div className="font-mono text-sm">{exam.code}</div>
                      </div>
                    </div>
                    <Badge variant={exam.isActive ? "default" : "secondary"}>
                      {exam.isActive ? t("active") : t("inactive")}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-bold mt-4">{exam.titleAr}</h3>
                  <p className="text-sm opacity-90">{exam.titleEn}</p>
                </div>

                <div className="p-5 space-y-3">
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {exam.descriptionAr}
                  </p>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {exam.descriptionEn}
                  </p>

                  <div className={`${styles.lightBg} rounded-lg p-3 flex items-center gap-3`}>
                    <FileText className={`size-4 ${styles.text}`} />
                    <div className="text-sm">
                      <span className="font-medium">{t("type")}: </span>
                      {getExamTypeName(exam.examTypeId)}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className={`${styles.lightBg} rounded-lg p-3 flex items-center gap-2`}>
                      <Languages className={`size-4 ${styles.text}`} />
                      <span className="text-sm">
                        {exam.language === "ar" ? t("arabic") : t("english")}
                      </span>
                    </div>
                    <div className={`${styles.lightBg} rounded-lg p-3 flex items-center gap-2`}>
                      <Clock className={`size-4 ${styles.text}`} />
                      <span className="text-sm">
                        {exam.duration} {t("minutes")}
                      </span>
                    </div>
                    <div className={`${styles.lightBg} rounded-lg p-3 flex items-center gap-2 sm:col-span-2`}>
                      <Monitor className={`size-4 ${styles.text}`} />
                      <span className="text-sm">
                        {exam.examType === "computerized" ? t("computerized") : t("paper")}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <Button variant="outline" className="flex-1" asChild>
                      <Link href={`/dashboard/practice-exams/edit/${exam._id}`}>
                        <Pencil className="size-4 mr-2" />
                        {t("editExam")}
                      </Link>
                    </Button>
                    <Button
                      variant="destructive"
                      className="flex-1"
                      onClick={() => handleDelete(exam._id)}
                    >
                      <Trash2 className="size-4 mr-2" />
                      {t("deleteExam")}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
