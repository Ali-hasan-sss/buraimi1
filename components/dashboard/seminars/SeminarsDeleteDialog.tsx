"use client";

import { ReactNode, useState } from "react";
import { useTranslations } from "next-intl";
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
import type { SeminarRow } from "@/components/dashboard/seminars/SeminarsTable";
import { deleteSeminarAction } from "@/app/dashboard/seminars/actions/deleteSeminar";

type SeminarsDeleteDialogProps = {
    item: SeminarRow;
    isAr: boolean;
    children: ReactNode;
};

export function SeminarsDeleteDialog({ item, isAr, children }: SeminarsDeleteDialogProps) {
    const t = useTranslations("dashboardSeminars");
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{t("delete")}</DialogTitle>
                    <DialogDescription>
                        {isAr
                            ? `${t("confirmDelete")} ${item.titleAr}. ${t("deleteWarning")}`
                            : `${t("confirmDelete")} ${item.titleEn}. ${t("deleteWarning")}`}
                    </DialogDescription>
                </DialogHeader>

                <form action={deleteSeminarAction} className="grid gap-4">
                    <input type="hidden" name="id" value={item.id} />

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                            {t("cancel")}
                        </Button>
                        <Button type="submit" variant="destructive">
                            {t("delete")}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
