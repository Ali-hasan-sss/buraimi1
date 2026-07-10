"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

type CourseDoc = {
    seq: number;
    code: string;
    title: string;
    credits: number;
    oqf: number;
    prerequisite: string;
};

type SectionKey =
    | "generalRequirements"
    | "departmentRequirements"
    | "majorRequirements"
    | "electiveRequirements";

type Props = {
    departmentId: string;
    programId: string;
    planId: string;
    section: SectionKey;
    title: string;
    courses: CourseDoc[];
};

export default function EditableStudyPlanTable({
    departmentId,
    programId,
    planId,
    section,
    title,
    courses,
}: Props) {
    const router = useRouter();

    const rows = useMemo(() => (Array.isArray(courses) ? courses : []), [courses]);

    const [addOpen, setAddOpen] = useState(false);
    const [addSaving, setAddSaving] = useState(false);

    const [editOpen, setEditOpen] = useState(false);
    const [editSaving, setEditSaving] = useState(false);
    const [editCode, setEditCode] = useState<string>("");

    const [form, setForm] = useState<CourseDoc>({
        seq: 1,
        code: "",
        title: "",
        credits: 0,
        oqf: 0,
        prerequisite: "",
    });

    const [deletingCode, setDeletingCode] = useState<string | null>(null);

    async function callApi(body: unknown) {
        const res = await fetch(`/api/departments/${departmentId}/programs/${programId}/study-plan`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });

        if (res.ok) {
            router.refresh();
        }

        return res;
    }

    function resetForm() {
        setForm({ seq: 1, code: "", title: "", credits: 0, oqf: 0, prerequisite: "" });
    }

    async function onAddSave() {
        setAddSaving(true);
        try {
            const res = await callApi({
                action: "add",
                planId,
                section,
                course: form,
            });

            if (res.ok) {
                resetForm();
                setAddOpen(false);
            }
        } finally {
            setAddSaving(false);
        }
    }

    function openEditRow(row: CourseDoc) {
        setEditCode(row.code);
        setForm({ ...row });
        setEditOpen(true);
    }

    async function onEditSave() {
        setEditSaving(true);
        try {
            const res = await callApi({
                action: "update",
                planId,
                section,
                code: editCode,
                course: {
                    seq: form.seq,
                    title: form.title,
                    credits: form.credits,
                    oqf: form.oqf,
                    prerequisite: form.prerequisite,
                },
            });

            if (res.ok) {
                resetForm();
                setEditOpen(false);
                setEditCode("");
            }
        } finally {
            setEditSaving(false);
        }
    }

    async function onDelete(code: string) {
        setDeletingCode(code);
        try {
            await callApi({ action: "delete", planId, section, code });
        } finally {
            setDeletingCode(null);
        }
    }

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
                <div className="text-sm font-semibold text-[#254151]">{title}</div>

                <Dialog open={addOpen} onOpenChange={setAddOpen}>
                    <DialogTrigger asChild>
                        <Button type="button" size="sm" className="h-8">
                            Add row
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-lg">
                        <DialogHeader>
                            <DialogTitle>Add course</DialogTitle>
                            <DialogDescription>Add a new row to this section.</DialogDescription>
                        </DialogHeader>

                        <CourseForm form={form} setForm={setForm} allowCode />

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setAddOpen(false)} disabled={addSaving}>
                                Cancel
                            </Button>
                            <Button type="button" onClick={onAddSave} disabled={addSaving}>
                                {addSaving ? "Saving..." : "Save"}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            {rows.length === 0 ? (
                <div className="text-sm text-muted-foreground">No courses in this section.</div>
            ) : (
                <div className="overflow-x-auto rounded-lg border">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-gray-50 text-left">
                                <th className="px-3 py-2 font-medium text-gray-600">#</th>
                                <th className="px-3 py-2 font-medium text-gray-600">Code</th>
                                <th className="px-3 py-2 font-medium text-gray-600">Title</th>
                                <th className="px-3 py-2 font-medium text-gray-600 text-center">Credits</th>
                                <th className="px-3 py-2 font-medium text-gray-600 text-center">OQF</th>
                                <th className="px-3 py-2 font-medium text-gray-600">Prerequisite</th>
                                <th className="px-3 py-2 font-medium text-gray-600 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((c) => (
                                <tr key={c.code} className="border-t hover:bg-gray-50/50">
                                    <td className="px-3 py-2 text-gray-500">{c.seq}</td>
                                    <td className="px-3 py-2 font-mono text-xs">{c.code}</td>
                                    <td className="px-3 py-2">{c.title}</td>
                                    <td className="px-3 py-2 text-center">{c.credits}</td>
                                    <td className="px-3 py-2 text-center">{c.oqf}</td>
                                    <td className="px-3 py-2 text-gray-500">{c.prerequisite}</td>
                                    <td className="px-3 py-2 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button
                                                type="button"
                                                size="sm"
                                                variant="outline"
                                                className="h-7 text-xs"
                                                onClick={() => openEditRow(c)}
                                            >
                                                Update
                                            </Button>
                                            <Button
                                                type="button"
                                                size="sm"
                                                variant="destructive"
                                                className="h-7 text-xs"
                                                disabled={deletingCode === c.code}
                                                onClick={() => onDelete(c.code)}
                                            >
                                                {deletingCode === c.code ? "Deleting..." : "Delete"}
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <Dialog open={editOpen} onOpenChange={setEditOpen}>
                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Update course</DialogTitle>
                        <DialogDescription>Update the selected row (code is fixed).</DialogDescription>
                    </DialogHeader>

                    <CourseForm form={form} setForm={setForm} allowCode={false} />

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setEditOpen(false)} disabled={editSaving}>
                            Cancel
                        </Button>
                        <Button type="button" onClick={onEditSave} disabled={editSaving}>
                            {editSaving ? "Saving..." : "Save"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

function CourseForm({
    form,
    setForm,
    allowCode,
}: {
    form: CourseDoc;
    setForm: (next: CourseDoc) => void;
    allowCode: boolean;
}) {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="sp-seq">Seq</label>
                <Input
                    id="sp-seq"
                    type="number"
                    value={form.seq}
                    onChange={(e) => setForm({ ...form, seq: Number(e.target.value) })}
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="sp-code">Code</label>
                <Input
                    id="sp-code"
                    value={form.code}
                    onChange={(e) => setForm({ ...form, code: e.target.value })}
                    disabled={!allowCode}
                />
            </div>

            <div className="space-y-2 sm:col-span-2">
                <label className="text-sm font-medium" htmlFor="sp-title">Title</label>
                <Input
                    id="sp-title"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="sp-credits">Credits</label>
                <Input
                    id="sp-credits"
                    type="number"
                    value={form.credits}
                    onChange={(e) => setForm({ ...form, credits: Number(e.target.value) })}
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="sp-oqf">OQF</label>
                <Input
                    id="sp-oqf"
                    type="number"
                    value={form.oqf}
                    onChange={(e) => setForm({ ...form, oqf: Number(e.target.value) })}
                />
            </div>

            <div className="space-y-2 sm:col-span-2">
                <label className="text-sm font-medium" htmlFor="sp-prereq">Prerequisite</label>
                <Input
                    id="sp-prereq"
                    value={form.prerequisite}
                    onChange={(e) => setForm({ ...form, prerequisite: e.target.value })}
                />
            </div>
        </div>
    );
}
