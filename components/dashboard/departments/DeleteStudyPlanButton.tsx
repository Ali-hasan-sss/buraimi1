"use client";

import { useState } from "react";
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

type Props = {
    departmentId: string;
    programId: string;
    planId: string;
};

export default function DeleteStudyPlanButton({ departmentId, programId, planId }: Props) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);

    async function onDelete() {
        setDeleting(true);
        try {
            const res = await fetch(
                `/api/departments/${departmentId}/programs/${programId}/study-plan?planId=${encodeURIComponent(
                    planId
                )}`,
                { method: "DELETE" }
            );
            if (res.ok) {
                setOpen(false);
                router.refresh();
            }
        } finally {
            setDeleting(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button type="button" size="sm" variant="destructive" className="h-8">
                    Delete plan
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete study plan</DialogTitle>
                    <DialogDescription>
                        This will delete this study plan only. You can add it again later.
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={deleting}>
                        Cancel
                    </Button>
                    <Button type="button" variant="destructive" onClick={onDelete} disabled={deleting}>
                        {deleting ? "Deleting..." : "Delete"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
