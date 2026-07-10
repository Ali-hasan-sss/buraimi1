"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";

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

import { deleteContactAction } from "@/app/dashboard/contact/actions/deleteContact";

export function ContactDeleteDialog({ id }: { id: string }) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    className="text-red-600 hover:text-red-700"
                    title="Delete"
                >
                    <Trash2 className="size-4" />
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Delete contact</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this contact? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                    <form action={deleteContactAction}>
                        <input type="hidden" name="id" value={id} />
                        <Button type="submit" variant="destructive">
                            Delete
                        </Button>
                    </form>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
