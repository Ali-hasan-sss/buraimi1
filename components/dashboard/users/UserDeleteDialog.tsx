"use client";

import { ReactNode, useState } from "react";
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
import type { UserRow } from "@/components/dashboard/users/UsersTable";

type UserDeleteDialogProps = {
    user: UserRow;
    children: ReactNode;
    onSuccess: () => void;
};

const roleLabels: Record<string, string> = {
    admin: "المسؤول",
    student: "الطالب",
    staff: "الموظف",
};

export function UserDeleteDialog({ user, children, onSuccess }: UserDeleteDialogProps) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        setLoading(true);
        try {
            await fetch(`/api/users/${user.id}`, { method: "DELETE" });
            setOpen(false);
            onSuccess();
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>حذف المستخدم</DialogTitle>
                    <DialogDescription>
                        هل أنت متأكد من حذف {roleLabels[user.role] ?? "المستخدم"} &ldquo;{user.name}&rdquo;؟ لا يمكن التراجع عن هذا الإجراء.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setOpen(false)}>إلغاء</Button>
                    <Button type="button" variant="destructive" disabled={loading} onClick={() => void handleDelete()}>
                        {loading ? "جاري الحذف…" : "حذف"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
