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

type Props = {
    departmentId: string;
    programId: string;
    planId: string;
    planTitle: string;
    generalRequirementsHours?: number | null;
    departmentRequirementsHours?: number | null;
    majorRequirementsHours?: number | null;
    electiveRequirements?: number | null;
};

export default function EditPlanHeaderHoursDialog({
    departmentId,
    programId,
    planId,
    planTitle,
    generalRequirementsHours,
    departmentRequirementsHours,
    majorRequirementsHours,
    electiveRequirements,
}: Props) {
    const router = useRouter();

    const initial = useMemo(
        () => ({
            generalRequirementsHours: generalRequirementsHours ?? 0,
            departmentRequirementsHours: departmentRequirementsHours ?? 0,
            majorRequirementsHours: majorRequirementsHours ?? 0,
            electiveRequirements: electiveRequirements ?? 0,
        }),
        [
            generalRequirementsHours,
            departmentRequirementsHours,
            majorRequirementsHours,
            electiveRequirements,
        ]
    );

    const [open, setOpen] = useState(false);
    const [saving, setSaving] = useState(false);

    const [form, setForm] = useState(initial);

    const total =
        Number(form.generalRequirementsHours || 0) +
        Number(form.departmentRequirementsHours || 0) +
        Number(form.majorRequirementsHours || 0) +
        Number(form.electiveRequirements || 0);

    async function onSave() {
        setSaving(true);
        try {
            const res = await fetch(
                `/api/departments/${departmentId}/programs/${programId}/study-plan`,
                {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        planId,
                        hours: {
                            generalRequirementsHours: Number(form.generalRequirementsHours || 0),
                            departmentRequirementsHours: Number(form.departmentRequirementsHours || 0),
                            majorRequirementsHours: Number(form.majorRequirementsHours || 0),
                            electiveRequirements: Number(form.electiveRequirements || 0),
                        },
                    }),
                }
            );

            if (res.ok) {
                setOpen(false);
                router.refresh();
            }
        } finally {
            setSaving(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={(v) => {
            setOpen(v);
            if (v) setForm(initial);
        }}>
            <DialogTrigger asChild>
                <Button type="button" size="sm" variant="outline" className="h-8">
                    Edit hours
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Edit Plan Hours</DialogTitle>
                    <DialogDescription>{planTitle}</DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                        <label className="text-sm font-medium" htmlFor="ph-general">General</label>
                        <Input
                            id="ph-general"
                            type="number"
                            value={form.generalRequirementsHours}
                            onChange={(e) =>
                                setForm((p) => ({ ...p, generalRequirementsHours: Number(e.target.value) }))
                            }
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium" htmlFor="ph-dept">Department</label>
                        <Input
                            id="ph-dept"
                            type="number"
                            value={form.departmentRequirementsHours}
                            onChange={(e) =>
                                setForm((p) => ({ ...p, departmentRequirementsHours: Number(e.target.value) }))
                            }
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium" htmlFor="ph-major">Major</label>
                        <Input
                            id="ph-major"
                            type="number"
                            value={form.majorRequirementsHours}
                            onChange={(e) =>
                                setForm((p) => ({ ...p, majorRequirementsHours: Number(e.target.value) }))
                            }
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium" htmlFor="ph-elec">Elective</label>
                        <Input
                            id="ph-elec"
                            type="number"
                            value={form.electiveRequirements}
                            onChange={(e) =>
                                setForm((p) => ({ ...p, electiveRequirements: Number(e.target.value) }))
                            }
                        />
                    </div>
                </div>

                <div className="rounded-xl border bg-background px-4 py-3 flex items-center justify-between">
                    <div className="text-sm font-medium">Total (auto)</div>
                    <div className="text-sm font-semibold text-[#254151]">{total} hrs</div>
                </div>

                <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={saving}>
                        Cancel
                    </Button>
                    <Button type="button" onClick={onSave} disabled={saving}>
                        {saving ? "Saving..." : "Save"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
