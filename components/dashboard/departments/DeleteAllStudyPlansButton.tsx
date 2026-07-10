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
    disabled?: boolean;
};

export default function DeleteAllStudyPlansButton({ departmentId, programId, disabled }: Props) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);

    async function onDelete() {
        setDeleting(true);
        try {
            const res = await fetch(
                `/api/departments/${departmentId}/programs/${programId}/study-plan`,
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
                <Button variant="destructive" disabled={disabled}>
                    Delete all plans
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete all study plans</DialogTitle>
                    <DialogDescription>
                        This will remove all study plans for this program. This action cannot be undone.
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
