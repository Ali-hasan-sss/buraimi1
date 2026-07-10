"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader2 } from "lucide-react";

import { deleteNewsAction } from "@/components/dashboard/news/actions";
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

type NewsDeleteDialogProps = {
    id: string;
    isAr: boolean;
};

export function NewsDeleteDialog({ id, isAr }: NewsDeleteDialogProps) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const MAX_WAIT_MS = 20000;

    const withTimeout = async <T,>(promise: Promise<T>, ms: number) => {
        return await Promise.race([
            promise,
            new Promise<T>((_, reject) =>
                setTimeout(() => reject(new Error("timeout")), ms)
            ),
        ]);
    };

    const onDelete = async () => {
        setDeleting(true);
        setError(null);

        try {
            const result = await withTimeout(deleteNewsAction(id), MAX_WAIT_MS);
            if (!result.ok) {
                throw new Error(result.message);
            }

            setOpen(false);
            router.refresh();
        } catch (e) {
            const message = e instanceof Error ? e.message : "Unknown error";
            if (message === "timeout") {
                setError(
                    isAr
                        ? "انتهت مهلة الاستجابة من الخادم. حاول مرة أخرى."
                        : "Server took too long to respond. Please try again."
                );
            } else {
                setError(message);
            }
        } finally {
            setDeleting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    className="text-red-600 hover:text-red-700"
                    title={isAr ? "حذف" : "Delete"}
                >
                    <Trash2 className="size-4" />
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{isAr ? "حذف الخبر" : "Delete News"}</DialogTitle>
                    <DialogDescription>
                        {isAr
                            ? "هل أنت متأكد أنك تريد حذف هذا الخبر؟ لا يمكن التراجع عن هذا الإجراء."
                            : "Are you sure you want to delete this news item? This action cannot be undone."}
                    </DialogDescription>
                </DialogHeader>

                {error && <p className="text-sm text-red-600">{error}</p>}

                <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={deleting}>
                        {isAr ? "إلغاء" : "Cancel"}
                    </Button>
                    <Button type="button" variant="destructive" onClick={onDelete} disabled={deleting}>
                        {deleting ? (
                            <span className="inline-flex items-center gap-2">
                                <Loader2 className="size-4 animate-spin" />
                                {isAr ? "جارٍ الحذف" : "Deleting"}
                            </span>
                        ) : (
                            <span>{isAr ? "حذف" : "Delete"}</span>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
