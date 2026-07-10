"use client";

import { useState } from "react";
import { Edit3 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { updateContactAction } from "@/app/dashboard/contact/actions/updateContact";

export type ContactRow = {
    id: string;
    title: string;
    name: string;
    department: string;
    position: string;
    phone: string;
    email: string;
};

export function ContactEditDialog({ item }: { item: ContactRow }) {
    const [open, setOpen] = useState(false);

    const [title, setTitle] = useState(item.title);
    const [name, setName] = useState(item.name);
    const [department, setDepartment] = useState(item.department);
    const [position, setPosition] = useState(item.position);
    const [phone, setPhone] = useState(item.phone);
    const [email, setEmail] = useState(item.email);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    className="text-[#6096b4] hover:text-[#4f7e97]"
                    title="Edit"
                >
                    <Edit3 className="size-4" />
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle>Edit contact</DialogTitle>
                    <DialogDescription>Update contact fields and save.</DialogDescription>
                </DialogHeader>

                <form action={updateContactAction} className="grid gap-4">
                    <input type="hidden" name="id" value={item.id} />

                    <div className="grid gap-2">
                        <label className="text-sm font-medium">Title</label>
                        <Input name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>

                    <div className="grid gap-2">
                        <label className="text-sm font-medium">Name</label>
                        <Input name="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div className="grid gap-2">
                        <label className="text-sm font-medium">Department</label>
                        <Input name="department" value={department} onChange={(e) => setDepartment(e.target.value)} />
                    </div>

                    <div className="grid gap-2">
                        <label className="text-sm font-medium">Position</label>
                        <Input name="position" value={position} onChange={(e) => setPosition(e.target.value)} />
                    </div>

                    <div className="grid gap-2">
                        <label className="text-sm font-medium">Phone</label>
                        <Input name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>

                    <div className="grid gap-2">
                        <label className="text-sm font-medium">Email</label>
                        <Input name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                            Close
                        </Button>
                        <Button type="submit">Save</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
