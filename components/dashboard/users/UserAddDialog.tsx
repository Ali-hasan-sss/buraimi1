"use client";

import { ReactNode, useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, RefreshCw, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

type UserAddDialogProps = {
    children: ReactNode;
    onSuccess: () => void;
};

type AvailStatus = "idle" | "checking" | "available" | "taken";

export function UserAddDialog({ children, onSuccess }: UserAddDialogProps) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [name, setName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [role, setRole] = useState("admin");
    const [email, setEmail] = useState("");
    const [accessCode, setAccessCode] = useState("");
    const [password, setPassword] = useState("");

    const [generatingCode, setGeneratingCode] = useState(false);
    const [availStatus, setAvailStatus] = useState<AvailStatus>("idle");
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const translateError = (msg: string) => {
        if (msg === "Access code already in use") return "رمز الدخول مستخدم بالفعل";
        if (msg === "Email already in use") return "البريد الإلكتروني مستخدم بالفعل";
        if (msg === "Name is required") return "الاسم مطلوب";
        if (msg === "Email and password are required for admin") return "البريد الإلكتروني وكلمة المرور مطلوبان للمسؤول";
        if (msg === "Access code and password are required for student/staff") return "رمز الدخول وكلمة المرور مطلوبان";
        if (msg === "Access code, email and password are required for student/staff") return "رمز الدخول والبريد الإلكتروني وكلمة المرور مطلوبة";
        return msg;
    };

    const generateCode = useCallback(async (r: string) => {
        setGeneratingCode(true);
        setAvailStatus("idle");
        try {
            const res = await fetch(`/api/users/next-code?role=${r}`);
            const json = (await res.json()) as { ok: boolean; code?: string };
            if (json.ok && json.code) {
                setAccessCode(json.code);
                setAvailStatus("available");
            }
        } finally {
            setGeneratingCode(false);
        }
    }, []);

    useEffect(() => {
        if (open && (role === "student" || role === "staff")) {
            void generateCode(role);
        }
    }, [open, role, generateCode]);

    const handleAccessCodeChange = (val: string) => {
        setAccessCode(val);
        setAvailStatus("idle");
        if (debounceRef.current) clearTimeout(debounceRef.current);
        if (!val.trim()) return;
        debounceRef.current = setTimeout(async () => {
            setAvailStatus("checking");
            try {
                const res = await fetch(`/api/users/next-code?check=${encodeURIComponent(val.trim())}&role=${role}`);
                const json = (await res.json()) as { ok: boolean; available?: boolean };
                setAvailStatus(json.available ? "available" : "taken");
            } catch {
                setAvailStatus("idle");
            }
        }, 600);
    };

    const reset = () => {
        setName(""); setFirstName(""); setLastName(""); setRole("admin");
        setEmail(""); setAccessCode(""); setPassword(""); setError("");
        setAvailStatus("idle"); setShowPassword(false);
        if (debounceRef.current) clearTimeout(debounceRef.current);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (availStatus === "taken") return;
        setLoading(true);
        setError("");
        try {
            const body = role === "admin"
                ? { name, firstName, lastName, role, email, password }
                : { name, firstName, lastName, role, email, accessCode, password };

            const res = await fetch("/api/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            const json = (await res.json()) as { ok: boolean; message?: string };
            if (!json.ok) {
                const msg = json.message || "حدث خطأ";
                if (msg === "Access code already in use") {
                    setAvailStatus("taken");
                    setError(translateError(msg));
                } else {
                    setError(translateError(msg));
                }
                return;
            }
            reset();
            setOpen(false);
            onSuccess();
        } catch {
            setError("حدث خطأ غير متوقع");
        } finally {
            setLoading(false);
        }
    };

    const accessCodeBorder =
        availStatus === "taken" ? "border-red-500 focus-visible:ring-red-400" :
        availStatus === "available" ? "border-emerald-500 focus-visible:ring-emerald-400" : "";

    return (
        <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) reset(); }}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>إضافة مستخدم جديد</DialogTitle>
                    <DialogDescription>أدخل بيانات المستخدم الجديد</DialogDescription>
                </DialogHeader>

                <form onSubmit={(e) => void handleSubmit(e)} className="grid gap-4">
                    <div className="grid gap-2">
                        <label className="text-sm font-medium">الدور</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        >
                            <option value="admin">مسؤول (Admin)</option>
                            <option value="student">طالب (Student)</option>
                            <option value="staff">موظف (Staff)</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="grid gap-2">
                            <label className="text-sm font-medium">الاسم الأول</label>
                            <Input value={firstName} onChange={(e) => { setFirstName(e.target.value); setName(`${e.target.value} ${lastName}`.trim()); }} placeholder="أحمد" />
                        </div>
                        <div className="grid gap-2">
                            <label className="text-sm font-medium">الاسم الأخير</label>
                            <Input value={lastName} onChange={(e) => { setLastName(e.target.value); setName(`${firstName} ${e.target.value}`.trim()); }} placeholder="محمد" />
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <label className="text-sm font-medium">الاسم الكامل</label>
                        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="الاسم الكامل" required />
                    </div>

                    <div className="grid gap-2">
                        <label className="text-sm font-medium">البريد الإلكتروني</label>
                        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={role === "admin" ? "admin@example.com" : "student@example.com"} dir="ltr" required />
                    </div>

                    {role !== "admin" && (
                        <div className="grid gap-2">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium">{role === "student" ? "رقم الطالب" : "رقم الموظف"}</label>
                                <button
                                    type="button"
                                    onClick={() => void generateCode(role)}
                                    disabled={generatingCode}
                                    className="flex items-center gap-1 text-xs text-[#6096b4] hover:text-[#4f7e97] disabled:opacity-50"
                                >
                                    <RefreshCw className={`size-3 ${generatingCode ? "animate-spin" : ""}`} />
                                    توليد رقم جديد
                                </button>
                            </div>
                            <div className="relative">
                                <Input
                                    value={accessCode}
                                    onChange={(e) => handleAccessCodeChange(e.target.value)}
                                    placeholder={role === "student" ? "ST00001" : "EM00001"}
                                    dir="ltr"
                                    required
                                    className={`pr-9 ${accessCodeBorder}`}
                                />
                                <span className="absolute inset-y-0 right-0 flex items-center px-2.5 pointer-events-none">
                                    {availStatus === "checking" && <Loader2 className="size-4 animate-spin text-gray-400" />}
                                    {availStatus === "available" && <CheckCircle2 className="size-4 text-emerald-500" />}
                                    {availStatus === "taken" && <XCircle className="size-4 text-red-500" />}
                                </span>
                            </div>
                            {availStatus === "taken" && <p className="text-xs text-red-600">رمز الدخول مستخدم بالفعل</p>}
                            {availStatus === "available" && <p className="text-xs text-emerald-600">رمز الدخول متاح</p>}
                        </div>
                    )}

                    <div className="grid gap-2">
                        <label className="text-sm font-medium">كلمة المرور</label>
                        <div className="relative">
                            <Input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                dir="ltr"
                                required
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
                        <Button type="submit" disabled={loading || availStatus === "taken" || availStatus === "checking"}>
                            {loading ? "جاري الحفظ…" : "إضافة"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
