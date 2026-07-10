"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type LevelDoc = {
    id: string;
    label: string;
    credits: string;
};

type Props = {
    departmentId: string;
    programId: string;
    levels: LevelDoc[];
};

type SectionKey =
    | "generalRequirements"
    | "departmentRequirements"
    | "majorRequirements"
    | "electiveRequirements";

const SECTION_LABELS: Record<SectionKey, string> = {
    generalRequirements: "General Requirements",
    departmentRequirements: "Department Requirements",
    majorRequirements: "Major Requirements",
    electiveRequirements: "Elective Requirements",
};

export default function AddStudyPlanForm({ departmentId, programId, levels }: Props) {
    const router = useRouter();

    const [levelId, setLevelId] = useState(levels[0]?.id ?? "");
    const [levelLabel, setLevelLabel] = useState("");

    const [sections, setSections] = useState<Record<SectionKey, boolean>>({
        generalRequirements: true,
        departmentRequirements: true,
        majorRequirements: true,
        electiveRequirements: false,
    });

    const [hours, setHours] = useState<Record<SectionKey, number>>({
        generalRequirements: 0,
        departmentRequirements: 0,
        majorRequirements: 0,
        electiveRequirements: 0,
    });

    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const existingLevel = useMemo(
        () => levels.find((l) => l.id === levelId) || null,
        [levels, levelId]
    );

    const totalHour = useMemo(() => {
        return (
            (sections.generalRequirements ? hours.generalRequirements : 0) +
            (sections.departmentRequirements ? hours.departmentRequirements : 0) +
            (sections.majorRequirements ? hours.majorRequirements : 0) +
            (sections.electiveRequirements ? hours.electiveRequirements : 0)
        );
    }, [hours, sections]);

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);

        if (!levelId) {
            setError("Please select a level");
            return;
        }

        if (!levelLabel.trim()) {
            setError("Please enter a level label");
            return;
        }

        if (existingLevel) {
            setError("This level ID already exists. Choose a new ID.");
            return;
        }

        const hasAny = Object.values(sections).some(Boolean);
        if (!hasAny) {
            setError("Select at least one section");
            return;
        }

        setSaving(true);
        try {
            const res = await fetch(
                `/api/departments/${departmentId}/programs/${programId}/study-plan`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        levelId,
                        levelLabel: levelLabel.trim(),
                        sections: {
                            generalRequirements: sections.generalRequirements,
                            departmentRequirements: sections.departmentRequirements,
                            majorRequirements: sections.majorRequirements,
                            electiveRequirements: sections.electiveRequirements,
                        },
                        hours: {
                            generalRequirementsHours: hours.generalRequirements,
                            departmentRequirementsHours: hours.departmentRequirements,
                            majorRequirementsHours: hours.majorRequirements,
                            electiveRequirementsHours: hours.electiveRequirements,
                        },
                    }),
                }
            );

            const json = (await res.json().catch(() => null)) as { ok?: boolean; message?: string } | null;
            if (!res.ok) {
                setError(json?.message || "Failed to create study plan");
                return;
            }

            router.push(`/dashboard/departments/${departmentId}/programs/${programId}/study-plan`);
            router.refresh();
        } finally {
            setSaving(false);
        }
    }

    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <div className="rounded-2xl border bg-white p-6 space-y-4">
                <div className="space-y-1">
                    <h2 className="text-lg font-semibold tracking-tight">Level</h2>
                    <p className="text-sm text-muted-foreground">Choose the level this study plan belongs to.</p>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="space-y-2">
                        <label className="text-sm font-medium" htmlFor="levelId">Level ID</label>
                        <Input
                            id="levelId"
                            value={levelId}
                            onChange={(e) => setLevelId(e.target.value)}
                            placeholder="e.g. bachelor"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium" htmlFor="levelLabel">Level Label</label>
                        <Input
                            id="levelLabel"
                            value={levelLabel}
                            onChange={(e) => setLevelLabel(e.target.value)}
                            placeholder="e.g. بكالوريوس"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Credits (calculated)</label>
                        <div className="h-10 w-full rounded-md border bg-muted px-3 flex items-center text-sm text-foreground">
                            {totalHour} ساعة معتمدة
                        </div>
                    </div>
                </div>

                {existingLevel ? (
                    <div className="text-xs text-red-600">
                        This level id already exists: {existingLevel.id} — {existingLevel.label}
                    </div>
                ) : null}
            </div>

            <div className="rounded-2xl border bg-white p-6 space-y-4">
                <div className="space-y-1">
                    <h2 className="text-lg font-semibold tracking-tight">Sections & Hours</h2>
                    <p className="text-sm text-muted-foreground">Choose sections then set hours for each selected one.</p>
                </div>

                <div className="space-y-4">
                    {(Object.keys(SECTION_LABELS) as SectionKey[]).map((key) => (
                        <div key={key} className="rounded-xl border p-4">
                            <div className="flex items-center justify-between gap-3">
                                <label className="flex items-center gap-2 text-sm font-medium">
                                    <input
                                        type="checkbox"
                                        checked={sections[key]}
                                        onChange={(e) =>
                                            setSections((prev) => ({ ...prev, [key]: e.target.checked }))
                                        }
                                    />
                                    {SECTION_LABELS[key]}
                                </label>

                                {sections[key] ? (
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-muted-foreground">Hours</span>
                                        <Input
                                            type="number"
                                            className="h-8 w-28"
                                            value={hours[key]}
                                            onChange={(e) =>
                                                setHours((prev) => ({
                                                    ...prev,
                                                    [key]: Number(e.target.value),
                                                }))
                                            }
                                        />
                                    </div>
                                ) : (
                                    <div className="text-xs text-muted-foreground">Not included</div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex items-center justify-between rounded-xl border bg-background px-4 py-3">
                    <div className="text-sm font-medium">Total hours</div>
                    <div className="text-sm font-semibold text-[#254151]">{totalHour} hrs</div>
                </div>

                {error ? <div className="text-sm text-red-600">{error}</div> : null}

                <div className="flex items-center justify-end gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.back()}
                        disabled={saving}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" disabled={saving}>
                        {saving ? "Saving..." : "Create study plan"}
                    </Button>
                </div>
            </div>
        </form>
    );
}
