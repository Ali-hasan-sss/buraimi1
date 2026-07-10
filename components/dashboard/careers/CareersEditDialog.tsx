"use client";

import { ReactNode, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import type { CareerRow } from "@/components/dashboard/careers/CareersTable";
import { RichTextEditorField } from "@/components/RichTextEditorField";
import { updateCareerAction } from "@/app/dashboard/careers/actions/updateCareer";

type CareersEditDialogProps = {
    item: CareerRow;
    isAr: boolean;
    children: ReactNode;
};

export function CareersEditDialog({ item, isAr, children }: CareersEditDialogProps) {
    const [open, setOpen] = useState(false);

    const todayStr = useMemo(() => {
        const d = new Date();
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        return `${y}-${m}-${day}`;
    }, []);

    const toInputDate = (value: string) => {
        const d = new Date(value);
        if (Number.isNaN(d.getTime())) return "";
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        return `${y}-${m}-${day}`;
    };

    const [titleAr, setTitleAr] = useState(item.titleAr);
    const [titleEn, setTitleEn] = useState(item.titleEn);
    const [descriptionAr, setDescriptionAr] = useState(item.descriptionAr);
    const [descriptionEn, setDescriptionEn] = useState(item.descriptionEn);
    const [requirementsAr, setRequirementsAr] = useState(item.requirementsAr);
    const [requirementsEn, setRequirementsEn] = useState(item.requirementsEn);
    const [startDate, setStartDate] = useState(toInputDate(item.startDate));
    const [edDate, setEdDate] = useState(toInputDate(item.edDate));

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>

            <DialogContent className="sm:max-w-2xl max-h-[90dvh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{isAr ? "تعديل الوظيفة" : "Edit Career"}</DialogTitle>
                    <DialogDescription>
                        {isAr ? "قم بتعديل البيانات ثم حفظ." : "Edit fields and save."}
                    </DialogDescription>
                </DialogHeader>

                <form action={updateCareerAction} className="grid gap-4">
                    <input type="hidden" name="id" value={item.id} />

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="grid gap-2">
                            <label className="text-sm font-medium">{isAr ? "العنوان (عربي)" : "Title (Arabic)"}</label>
                            <Input name="titleAr" value={titleAr} onChange={(e) => setTitleAr(e.target.value)} />
                        </div>
                        <div className="grid gap-2">
                            <label className="text-sm font-medium">{isAr ? "العنوان (إنجليزي)" : "Title (English)"}</label>
                            <Input name="titleEn" value={titleEn} onChange={(e) => setTitleEn(e.target.value)} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="grid gap-2">
                            <label className="text-sm font-medium">{isAr ? "تاريخ البداية" : "Start date"}</label>
                            <Input
                                type="date"
                                min={todayStr}
                                name="startDate"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </div>
                        <div className="grid gap-2">
                            <label className="text-sm font-medium">{isAr ? "تاريخ النهاية" : "End date"}</label>
                            <Input
                                type="date"
                                min={startDate || todayStr}
                                name="edDate"
                                value={edDate}
                                onChange={(e) => setEdDate(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <label className="text-sm font-medium">{isAr ? "الوصف (عربي)" : "Description (Arabic)"}</label>
                        <input type="hidden" name="descriptionAr" value={descriptionAr} readOnly />
                        <RichTextEditorField
                            value={descriptionAr}
                            onChange={setDescriptionAr}
                            placeholder={isAr ? "اكتب وصف الوظيفة…" : "Write the career description…"}
                        />
                    </div>

                    <div className="grid gap-2">
                        <label className="text-sm font-medium">{isAr ? "الوصف (إنجليزي)" : "Description (English)"}</label>
                        <input type="hidden" name="descriptionEn" value={descriptionEn} readOnly />
                        <RichTextEditorField
                            value={descriptionEn}
                            onChange={setDescriptionEn}
                            placeholder={isAr ? "اكتب وصف الوظيفة…" : "Write the career description…"}
                        />
                    </div>

                    <div className="grid gap-2">
                        <label className="text-sm font-medium">{isAr ? "متطلبات الوظيفة (عربي)" : "Job Requirements (Arabic)"}</label>
                        <input type="hidden" name="requirementsAr" value={requirementsAr} readOnly />
                        <RichTextEditorField
                            value={requirementsAr}
                            onChange={setRequirementsAr}
                            placeholder={isAr ? "اكتب متطلبات الوظيفة…" : "Write job requirements…"}
                        />
                    </div>

                    <div className="grid gap-2">
                        <label className="text-sm font-medium">{isAr ? "متطلبات الوظيفة (إنجليزي)" : "Job Requirements (English)"}</label>
                        <input type="hidden" name="requirementsEn" value={requirementsEn} readOnly />
                        <RichTextEditorField
                            value={requirementsEn}
                            onChange={setRequirementsEn}
                            placeholder={isAr ? "اكتب متطلبات الوظيفة…" : "Write job requirements…"}
                        />
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                            {isAr ? "إغلاق" : "Close"}
                        </Button>
                        <Button type="submit">
                            {isAr ? "حفظ" : "Save"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
