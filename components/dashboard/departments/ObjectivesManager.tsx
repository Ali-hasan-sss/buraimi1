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
    title?: string;
    data?: string[];
};

export default function ObjectivesManager({ departmentId, programId, title, data }: Props) {
    const router = useRouter();

    const items = useMemo(() => (Array.isArray(data) ? data : []), [data]);

    const [addOpen, setAddOpen] = useState(false);
    const [addText, setAddText] = useState("");
    const [addSaving, setAddSaving] = useState(false);

    const [editOpen, setEditOpen] = useState(false);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [editText, setEditText] = useState("");
    const [editSaving, setEditSaving] = useState(false);

    const [deletingIndex, setDeletingIndex] = useState<number | null>(null);

    async function callApi(body: unknown) {
        const res = await fetch(`/api/departments/${departmentId}/programs/${programId}/objective`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
        if (res.ok) {
            router.refresh();
        }
        return res.ok;
    }

    async function onAdd() {
        const text = addText.trim();
        if (!text) return;

        setAddSaving(true);
        try {
            const ok = await callApi({ action: "add", text });
            if (ok) {
                setAddText("");
                setAddOpen(false);
            }
        } finally {
            setAddSaving(false);
        }
    }

    function openEdit(idx: number) {
        setEditIndex(idx);
        setEditText(items[idx] ?? "");
        setEditOpen(true);
    }

    async function onEditSave() {
        if (editIndex === null) return;
        const text = editText.trim();
        if (!text) return;

        setEditSaving(true);
        try {
            const ok = await callApi({ action: "update", index: editIndex, text });
            if (ok) {
                setEditOpen(false);
                setEditIndex(null);
                setEditText("");
            }
        } finally {
            setEditSaving(false);
        }
    }

    async function onDelete(idx: number) {
        setDeletingIndex(idx);
        try {
            await callApi({ action: "delete", index: idx });
        } finally {
            setDeletingIndex(null);
        }
    }

    return (
        <div className="space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                    <h3 className="text-base font-semibold text-foreground">{title || "أهداف البرنامج"}</h3>
                    <p className="text-sm text-muted-foreground">Manage objectives (add / update / delete)</p>
                </div>

                <Dialog open={addOpen} onOpenChange={setAddOpen}>
                    <DialogTrigger asChild>
                        <Button size="sm" className="h-8">
                            Add objective
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add objective</DialogTitle>
                            <DialogDescription>Add a new objective for this program.</DialogDescription>
                        </DialogHeader>

                        <div className="space-y-2">
                            <label className="text-sm font-medium" htmlFor="obj-add">Objective</label>
                            <Input
                                id="obj-add"
                                value={addText}
                                onChange={(e) => setAddText(e.target.value)}
                                placeholder="Write the objective..."
                            />
                        </div>

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setAddOpen(false)} disabled={addSaving}>
                                Cancel
                            </Button>
                            <Button type="button" onClick={onAdd} disabled={addSaving}>
                                {addSaving ? "Saving..." : "Save"}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="rounded-xl border bg-background p-4">
                {items.length > 0 ? (
                    <ul className="space-y-3 list-point ">
                        {items.map((item, idx) => (
                            <li key={`${idx}-${item.slice(0, 12)}`} className="text-gray-700 text-sm ">
                                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                                    <div className="leading-relaxed pl-2">{item}</div>
                                    <div className="flex items-center gap-2 sm:pl-4">
                                        <Button
                                            type="button"
                                            size="sm"
                                            variant="outline"
                                            className="h-7 text-xs"
                                            onClick={() => openEdit(idx)}
                                        >
                                            Update
                                        </Button>
                                        <Button
                                            type="button"
                                            size="sm"
                                            variant="destructive"
                                            className="h-7 text-xs"
                                            disabled={deletingIndex === idx}
                                            onClick={() => onDelete(idx)}
                                        >
                                            {deletingIndex === idx ? "Deleting..." : "Delete"}
                                        </Button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="text-sm text-muted-foreground">No objectives set for this program.</div>
                )}
            </div>

            <Dialog open={editOpen} onOpenChange={setEditOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update objective</DialogTitle>
                        <DialogDescription>Edit the objective text.</DialogDescription>
                    </DialogHeader>

                    <div className="space-y-2">
                        <label className="text-sm font-medium" htmlFor="obj-edit">Objective</label>
                        <Input
                            id="obj-edit"
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                        />
                    </div>

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
