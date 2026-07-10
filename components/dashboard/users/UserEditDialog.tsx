"use client";

import { ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
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

type UserEditDialogProps = {
    user: UserRow;
    children: ReactNode;
    onSuccess: () => void;
};

export function UserEditDialog({ user, children, onSuccess }: UserEditDialogProps) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [accessCodeError, setAccessCodeError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [name, setName] = useState(user.name);
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [email, setEmail] = useState(user.email);
    const [accessCode, setAccessCode] = useState(user.accessCode);
    const [password, setPassword] = useState("");

    const translateError = (msg: string) => {
        if (msg === "Access code already in use") return "رمز الدخول مستخدم بالفعل";
        if (msg === "Email already in use") return "البريد الإلكتروني مستخدم بالفعل";
        if (msg === "User not found") return "المستخدم غير موجود";
        return msg;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const body: Record<string, string> = { name, firstName, lastName, role: user.role, email };
            if (user.role !== "admin") {
                body.accessCode = accessCode;
            }
            if (password.trim()) body.password = password;

            const res = await fetch(`/api/users/${user.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            const json = (await res.json()) as { ok: boolean; message?: string };
            if (!json.ok) {
                const msg = json.message || "حدث خطأ";
                if (msg === "Access code already in use") {
                    setAccessCodeError(translateError(msg));
                } else {
                    setError(translateError(msg));
                }
                return;
            }
            setOpen(false);
            onSuccess();
        } catch {
            setError("حدث خطأ غير متوقع");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>تعديل المستخدم</DialogTitle>
                    <DialogDescription>قم بتعديل البيانات ثم احفظ</DialogDescription>
                </DialogHeader>

                <form onSubmit={(e) => void handleSubmit(e)} className="grid gap-4">
                    <div className="grid grid-cols-2 gap-3">
                        <div className="grid gap-2">
                            <label className="text-sm font-medium">الاسم الأول</label>
                            <Input value={firstName} onChange={(e) => { setFirstName(e.target.value); setName(`${e.target.value} ${lastName}`.trim()); }} />
                        </div>
                        <div className="grid gap-2">
                            <label className="text-sm font-medium">الاسم الأخير</label>
                            <Input value={lastName} onChange={(e) => { setLastName(e.target.value); setName(`${firstName} ${e.target.value}`.trim()); }} />
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <label className="text-sm font-medium">الاسم الكامل</label>
                        <Input value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>

                    <div className="grid gap-2">
                        <label className="text-sm font-medium">البريد الإلكتروني</label>
                        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} dir="ltr" required />
                    </div>

                    {user.role !== "admin" && (
                        <div className="grid gap-2">
                            <label className="text-sm font-medium">{user.role === "student" ? "رقم الطالب" : "رقم الموظف"}</label>
                            <Input
                                value={accessCode}
                                onChange={(e) => { setAccessCode(e.target.value); setAccessCodeError(""); }}
                                dir="ltr"
                                required
                                className={accessCodeError ? "border-red-500 focus-visible:ring-red-400" : ""}
                            />
                            {accessCodeError && <p className="text-xs text-red-600">{accessCodeError}</p>}
                        </div>
                    )}

                    <div className="grid gap-2">
                        <label className="text-sm font-medium">كلمة المرور الجديدة <span className="text-gray-400 font-normal">(اتركها فارغة لعدم التغيير)</span></label>
                        <div className="relative">
                            <Input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                dir="ltr"
                                className="pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((v) => !v)}
                                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-gray-600"
                                tabIndex={-1}
                            >
                                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                            </button>
                        </div>
                    </div>

                    {error && <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>}

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>إلغاء</Button>
                        <Button type="submit" disabled={loading}>{loading ? "جاري الحفظ…" : "حفظ"}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
