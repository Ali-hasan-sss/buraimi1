"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RichTextEditorField } from "@/components/RichTextEditorField";
import { createCareerAction } from "@/app/dashboard/careers/actions/createCareer";

type CreateCareerFormProps = {
    isAr: boolean;
};

export function CreateCareerForm({ isAr }: CreateCareerFormProps) {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [titleAr, setTitleAr] = useState("");
    const [titleEn, setTitleEn] = useState("");
    const [descriptionAr, setDescriptionAr] = useState("");
    const [descriptionEn, setDescriptionEn] = useState("");
    const [requirementsAr, setRequirementsAr] = useState("");
    const [requirementsEn, setRequirementsEn] = useState("");
    const [startDate, setStartDate] = useState("");
    const [edDate, setEdDate] = useState("");

    const [fieldErrors, setFieldErrors] = useState<
        Partial<Record<"titleAr" | "titleEn" | "descriptionAr" | "descriptionEn" | "requirementsAr" | "requirementsEn" | "startDate" | "edDate", string>>
    >({});

    const todayStr = useMemo(() => {
        const d = new Date();
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        return `${y}-${m}-${day}`;
    }, []);

    const toDateOnly = (iso: string) => {
        const [y, m, d] = iso.split("-").map((x) => Number(x));
        if (!Number.isFinite(y) || !Number.isFinite(m) || !Number.isFinite(d)) return null;
        const dt = new Date(y as number, (m as number) - 1, d as number);
        return Number.isNaN(dt.getTime()) ? null : dt;
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setFieldErrors({});

        const nextErrors: typeof fieldErrors = {};

        if (!titleAr.trim()) nextErrors.titleAr = isAr ? "العنوان (عربي) مطلوب" : "Title (Arabic) is required";
        if (!titleEn.trim()) nextErrors.titleEn = isAr ? "العنوان (إنجليزي) مطلوب" : "Title (English) is required";
        if (!descriptionAr.trim()) nextErrors.descriptionAr = isAr ? "الوصف (عربي) مطلوب" : "Description (Arabic) is required";
        if (!descriptionEn.trim()) nextErrors.descriptionEn = isAr ? "الوصف (إنجليزي) مطلوب" : "Description (English) is required";
        if (!requirementsAr.trim()) nextErrors.requirementsAr = isAr ? "المتطلبات (عربي) مطلوبة" : "Requirements (Arabic) are required";
        if (!requirementsEn.trim()) nextErrors.requirementsEn = isAr ? "المتطلبات (إنجليزي) مطلوبة" : "Requirements (English) are required";
        if (!startDate) nextErrors.startDate = isAr ? "تاريخ البداية مطلوب" : "Start date is required";
        if (!edDate) nextErrors.edDate = isAr ? "تاريخ النهاية مطلوب" : "End date is required";

        if (Object.keys(nextErrors).length > 0) {
            setFieldErrors(nextErrors);
            return;
        }

        const start = toDateOnly(startDate);
        const end = toDateOnly(edDate);
        const today = toDateOnly(todayStr);

        if (!start || !end || !today) {
            setError(isAr ? "تأكد من صحة التواريخ" : "Please provide valid dates.");
            return;
        }

        if (start.getTime() < today.getTime()) {
            setFieldErrors({
                startDate: isAr ? "تاريخ البداية لا يمكن أن يكون قبل اليوم" : "Start date can't be before today.",
            });
            return;
        }

        if (end.getTime() <= start.getTime()) {
            setFieldErrors({
                edDate: isAr ? "تاريخ النهاية يجب أن يكون بعد تاريخ البداية" : "End date must be after start date.",
            });
            return;
        }

        setIsSubmitting(true);
        try {
            const res = await createCareerAction({
                titleAr,
                titleEn,
                descriptionAr,
                descriptionEn,
                requirementsAr,
                requirementsEn,
                startDate,
                edDate,
            });
            if (!res.ok) {
                setError(res.message);
                return;
            }

            router.push("/dashboard/careers");
            router.refresh();
        } catch (e) {
            const message = e instanceof Error ? e.message : "Unknown error";
            setError(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl font-semibold">{isAr ? "إضافة وظيفة" : "Create Career"}</h1>
                    <p className="text-sm text-muted-foreground">
                        {isAr
                            ? "قم بإدخال البيانات ثم احفظ لإنشاء وظيفة جديدة."
                            : "Fill the form and save to create a new career."}
                    </p>
                </div>

                <Button type="button" variant="outline" onClick={() => router.push("/dashboard/careers")} disabled={isSubmitting}>
                    {isAr ? "رجوع" : "Back"}
                </Button>
            </div>

            <form onSubmit={onSubmit} className="grid gap-4 max-w-3xl">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="grid gap-2">
                        <label className="text-sm font-medium">{isAr ? "العنوان (عربي)" : "Title (Arabic)"}</label>
                        <Input aria-invalid={!!fieldErrors.titleAr} value={titleAr} onChange={(ev) => setTitleAr(ev.target.value)} />
                        {fieldErrors.titleAr && <p className="text-sm text-red-600">{fieldErrors.titleAr}</p>}
                    </div>

                    <div className="grid gap-2">
                        <label className="text-sm font-medium">{isAr ? "العنوان (إنجليزي)" : "Title (English)"}</label>
                        <Input aria-invalid={!!fieldErrors.titleEn} value={titleEn} onChange={(ev) => setTitleEn(ev.target.value)} />
                        {fieldErrors.titleEn && <p className="text-sm text-red-600">{fieldErrors.titleEn}</p>}
                    </div>
                </div>

                <div className="grid gap-2">
                    <label className="text-sm font-medium">{isAr ? "الوصف (عربي)" : "Description (Arabic)"}</label>
                    <div className={fieldErrors.descriptionAr ? "rounded-md ring-1 ring-red-600" : undefined}>
                        <RichTextEditorField
                            value={descriptionAr}
                            onChange={setDescriptionAr}
                            placeholder={isAr ? "اكتب وصف الوظيفة…" : "Write the career description…"}
                        />
                    </div>
                    {fieldErrors.descriptionAr && <p className="text-sm text-red-600">{fieldErrors.descriptionAr}</p>}
                </div>

                <div className="grid gap-2">
                    <label className="text-sm font-medium">{isAr ? "الوصف (إنجليزي)" : "Description (English)"}</label>
                    <div className={fieldErrors.descriptionEn ? "rounded-md ring-1 ring-red-600" : undefined}>
                        <RichTextEditorField
                            value={descriptionEn}
                            onChange={setDescriptionEn}
                            placeholder={isAr ? "اكتب وصف الوظيفة…" : "Write the career description…"}
                        />
                    </div>
                    {fieldErrors.descriptionEn && <p className="text-sm text-red-600">{fieldErrors.descriptionEn}</p>}
                </div>

                <div className="grid gap-2">
                    <label className="text-sm font-medium">{isAr ? "متطلبات الوظيفة (عربي)" : "Job Requirements (Arabic)"}</label>
                    <div className={fieldErrors.requirementsAr ? "rounded-md ring-1 ring-red-600" : undefined}>
                        <RichTextEditorField
                            value={requirementsAr}
                            onChange={setRequirementsAr}
                            placeholder={isAr ? "اكتب متطلبات الوظيفة…" : "Write job requirements…"}
                        />
                    </div>
                    {fieldErrors.requirementsAr && <p className="text-sm text-red-600">{fieldErrors.requirementsAr}</p>}
                </div>

                <div className="grid gap-2">
                    <label className="text-sm font-medium">{isAr ? "متطلبات الوظيفة (إنجليزي)" : "Job Requirements (English)"}</label>
                    <div className={fieldErrors.requirementsEn ? "rounded-md ring-1 ring-red-600" : undefined}>
                        <RichTextEditorField
                            value={requirementsEn}
                            onChange={setRequirementsEn}
                            placeholder={isAr ? "اكتب متطلبات الوظيفة…" : "Write job requirements…"}
                        />
                    </div>
                    {fieldErrors.requirementsEn && <p className="text-sm text-red-600">{fieldErrors.requirementsEn}</p>}
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="grid gap-2">
                        <label className="text-sm font-medium">{isAr ? "تاريخ البداية" : "Start date"}</label>
                        <Input
                            type="date"
                            min={todayStr}
                            aria-invalid={!!fieldErrors.startDate}
                            value={startDate}
                            onChange={(ev) => setStartDate(ev.target.value)}
                        />
                        {fieldErrors.startDate && <p className="text-sm text-red-600">{fieldErrors.startDate}</p>}
                    </div>

                    <div className="grid gap-2">
                        <label className="text-sm font-medium">{isAr ? "تاريخ النهاية" : "End date"}</label>
                        <Input
                            type="date"
                            min={startDate || todayStr}
                            aria-invalid={!!fieldErrors.edDate}
                            value={edDate}
                            onChange={(ev) => setEdDate(ev.target.value)}
                        />
                        {fieldErrors.edDate && <p className="text-sm text-red-600">{fieldErrors.edDate}</p>}
                    </div>
                </div>

                {error && <p className="text-sm text-red-600">{error}</p>}

                <div className="flex items-center justify-end gap-2">
                    <Button type="submit" disabled={isSubmitting}>
                        {isAr ? "حفظ" : "Save"}
                    </Button>
                </div>
            </form>
        </div>
    );
}
