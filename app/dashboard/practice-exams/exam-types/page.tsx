"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface ExamType {
  _id: string;
  nameAr: string;
  nameEn: string;
  icon: string;
  color: string;
  order: number;
  isActive: boolean;
}

const COLOR_OPTIONS = ["blue", "purple", "green", "amber", "teal", "indigo", "red"] as const;
const ICON_OPTIONS = ["FileText", "Calculator", "Monitor", "BookOpen"] as const;

export default function ExamTypesPage() {
  const t = useTranslations("practiceExams");
  const [examTypes, setExamTypes] = useState<ExamType[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingType, setEditingType] = useState<ExamType | null>(null);
  const [formData, setFormData] = useState({
    nameAr: "",
    nameEn: "",
    icon: "FileText",
    color: "blue",
    order: 0,
    isActive: true,
  });
  
  const fetchExamTypes = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/exam-types");
      const data = await res.json();
      if (data.ok) {
        setExamTypes(data.data);
      }
    } catch (error) {
      console.error("Error fetching exam types:", error);
      toast.error(t("errorTypeFetch"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExamTypes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingType ? `/api/exam-types/${editingType._id}` : "/api/exam-types";
      const method = editingType ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.ok) {
        toast.success(editingType ? t("successTypeUpdate") : t("successTypeCreate"));
        setIsDialogOpen(false);
        setEditingType(null);
        setFormData({
          nameAr: "",
          nameEn: "",
          icon: "FileText",
          color: "blue",
          order: 0,
          isActive: true,
        });
        fetchExamTypes();
      } else {
        toast.error(data.error || t("errorTypeCreate"));
      }
    } catch (error) {
      console.error("Error saving exam type:", error);
      toast.error(t("errorTypeCreate"));
    }
  };

  const handleEdit = (type: ExamType) => {
    setEditingType(type);
    setFormData({
      nameAr: type.nameAr,
      nameEn: type.nameEn,
      icon: type.icon,
      color: type.color,
      order: type.order,
      isActive: type.isActive,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm(t("confirmDeleteType"))) return;

    try {
      const res = await fetch(`/api/exam-types/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.ok) {
        toast.success(t("successTypeDelete"));
        fetchExamTypes();
      } else {
        toast.error(data.error || t("errorTypeDelete"));
      }
    } catch (error) {
      console.error("Error deleting exam type:", error);
      toast.error(t("errorTypeDelete"));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold">{t("examTypesTitle")}</h1>
          <p className="text-sm text-muted-foreground">
            {t("examTypesDescription")}
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingType(null);
                setFormData({
                  nameAr: "",
                  nameEn: "",
                  icon: "FileText",
                  color: "blue",
                  order: 0,
                  isActive: true,
                });
              }}
            >
              <Plus className="size-4 mr-2" />
              {t("addType")}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingType ? t("editType") : t("addType")}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nameAr">{t("nameAr")}</Label>
                <Input
                  id="nameAr"
                  value={formData.nameAr}
                  onChange={(e) =>
                    setFormData({ ...formData, nameAr: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nameEn">{t("nameEn")}</Label>
                <Input
                  id="nameEn"
                  value={formData.nameEn}
                  onChange={(e) =>
                    setFormData({ ...formData, nameEn: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="icon">{t("icon")} (Lucide)</Label>
                <Select
                  value={formData.icon}
                  onValueChange={(value) =>
                    setFormData({ ...formData, icon: value })
                  }
                >
                  <SelectTrigger id="icon">
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
                <Label htmlFor="color">{t("color")}</Label>
                <Select
                  value={formData.color}
                  onValueChange={(value) =>
                    setFormData({ ...formData, color: value })
                  }
                >
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
              <Button type="submit" className="w-full">
                {editingType ? t("update") : t("create")}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="text-center py-8">{t("loading")}</div>
      ) : examTypes.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          {t("noTypes")}
        </div>
      ) : (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-start">{t("order")}</TableHead>
                <TableHead className="text-start">{t("nameAr")} / {t("nameEn")}</TableHead>
                <TableHead className="text-start">{t("icon")}</TableHead>
                <TableHead className="text-start">{t("color")}</TableHead>
                <TableHead className="text-start">{t("status")}</TableHead>
                <TableHead className="text-start">{t("actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {examTypes.map((type) => (
                <TableRow key={type._id}>
                  <TableCell className="text-start align-middle">{type.order}</TableCell>
                  <TableCell className="text-start align-middle">
                    <div className="font-medium">{type.nameAr}</div>
                    <div className="text-sm text-muted-foreground">{type.nameEn}</div>
                  </TableCell>
                  <TableCell className="text-start align-middle">{type.icon}</TableCell>
                  <TableCell className="text-start align-middle">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-4 h-4 rounded bg-${type.color}-500`}
                        style={{ backgroundColor: type.color }}
                      />
                      {type.color}
                    </div>
                  </TableCell>
                  <TableCell className="text-start align-middle">
                    <Badge variant={type.isActive ? "default" : "secondary"}>
                      {type.isActive ? t("active") : t("inactive")}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-start align-middle">
                    <div className="flex items-center justify-start gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(type)}
                      >
                        <Pencil className="size-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(type._id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
