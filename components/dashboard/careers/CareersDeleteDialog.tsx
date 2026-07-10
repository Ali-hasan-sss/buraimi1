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

import type { CareerRow } from "@/components/dashboard/careers/CareersTable";
import { deleteCareerAction } from "@/app/dashboard/careers/actions/deleteCareer";

type CareersDeleteDialogProps = {
    item: CareerRow;
    isAr: boolean;
    children: ReactNode;
};

export function CareersDeleteDialog({ item, isAr, children }: CareersDeleteDialogProps) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{isAr ? "حذف الوظيفة" : "Delete Career"}</DialogTitle>
                    <DialogDescription>
                        {isAr
                            ? `هل أنت متأكد من حذف "${item.titleAr}"؟`
                            : `Are you sure you want to delete "${item.titleEn}"?`}
                    </DialogDescription>
                </DialogHeader>

                <form action={deleteCareerAction}>
                    <input type="hidden" name="id" value={item.id} />

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                            {isAr ? "إلغاء" : "Cancel"}
                        </Button>
                        <Button type="submit" variant="destructive">
                            {isAr ? "حذف" : "Delete"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
