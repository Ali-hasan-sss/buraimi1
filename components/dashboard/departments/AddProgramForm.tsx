"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {
    departmentId: string;
};

export default function AddProgramForm({ departmentId }: Props) {
    const router = useRouter();

    const [saving, setSaving] = useState(false);

    const [id, setId] = useState("");
    const [titleAr, setTitleAr] = useState("");
    const [titleEn, setTitleEn] = useState("");
    const [descriptionAr, setDescriptionAr] = useState("");
    const [descriptionEn, setDescriptionEn] = useState("");

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();

        const payload = {
            id: id.trim(),
            titleAr: titleAr.trim(),
            titleEn: titleEn.trim(),
            descriptionAr: descriptionAr.trim(),
            descriptionEn: descriptionEn.trim(),
        };

        if (!payload.id || !payload.titleAr || !payload.titleEn) {
            toast.error("Please fill required fields (ID, Title AR, Title EN)");
            return;
        }

        setSaving(true);
        try {
            const res = await fetch(`/api/departments/${departmentId}/programs`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const json = (await res.json().catch(() => null)) as { ok?: boolean; message?: string } | null;

            if (!res.ok || !json?.ok) {
                toast.error(json?.message || "Failed to add program");
                return;
            }

            toast.success("Program added successfully");
            router.push(`/dashboard/departments/${departmentId}`);
            router.refresh();
        } finally {
            setSaving(false);
        }
    }

    return (
        <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="id">ID</label>
                <Input id="id" name="id" value={id} onChange={(e) => setId(e.target.value)} required />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="titleAr">Title (AR)</label>
                <Input
                    id="titleAr"
                    name="titleAr"
                    value={titleAr}
                    onChange={(e) => setTitleAr(e.target.value)}
                    required
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="titleEn">Title (EN)</label>
                <Input
                    id="titleEn"
                    name="titleEn"
                    value={titleEn}
                    onChange={(e) => setTitleEn(e.target.value)}
                    required
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="descAr">Description (AR)</label>
                <textarea
                    id="descAr"
                    name="descriptionAr"
                    value={descriptionAr}
                    onChange={(e) => setDescriptionAr(e.target.value)}
                    rows={3}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="descEn">Description (EN)</label>
                <textarea
                    id="descEn"
                    name="descriptionEn"
                    value={descriptionEn}
                    onChange={(e) => setDescriptionEn(e.target.value)}
                    rows={3}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
            </div>

            <div className="flex items-center justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => router.back()} disabled={saving}>
                    Cancel
                </Button>
                <Button type="submit" disabled={saving}>
                    {saving ? "Saving..." : "Add program"}
                </Button>
            </div>
        </form>
    );
}
