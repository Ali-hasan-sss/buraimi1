"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Eye, EyeOff, KeyRound, Check, X } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Props {
    open: boolean;
    onClose: () => void;
}

export function ChangePasswordDialog({ open, onClose }: Props) {
    const locale = useLocale();
    const isRtl = locale === "ar";

    const [current, setCurrent] = useState("");
    const [next, setNext] = useState("");
    const [confirm, setConfirm] = useState("");
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNext, setShowNext] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const reset = () => {
        setCurrent(""); setNext(""); setConfirm("");
        setError(""); setSuccess(false);
        setShowCurrent(false); setShowNext(false); setShowConfirm(false);
    };

    const handleClose = () => { reset(); onClose(); };

    const passwordsMatch = next === confirm && next.length > 0;
    const isValid = current.length > 0 && next.length >= 6 && passwordsMatch;

    const submit = async () => {
        if (!isValid) return;
        setLoading(true);
        setError("");
        try {
            const res = await fetch("/api/auth/change-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ currentPassword: current, newPassword: next }),
            });
            const data = await res.json() as { ok: boolean; message?: string };
            if (!data.ok) {
                setError(
                    isRtl
                        ? (data.message === "Current password is incorrect" ? "كلمة المرور الحالية غير صحيحة" : "حدث خطأ، حاول مجدداً")
                        : (data.message ?? "An error occurred")
                );
            } else {
                setSuccess(true);
                setTimeout(() => handleClose(), 1500);
            }
        } catch {
            setError(isRtl ? "حدث خطأ، حاول مجدداً" : "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    const PasswordInput = ({
        id, value, onChange, show, onToggle, placeholder,
    }: {
        id: string; value: string; onChange: (v: string) => void;
        show: boolean; onToggle: () => void; placeholder: string;
    }) => (
        <div className="relative">
            <input
                id={id}
                type={show ? "text" : "password"}
                dir="ltr"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                disabled={loading}
                className="w-full rounded-xl border border-[#d6e2eb] bg-white px-3 py-2.5 pr-10 text-sm text-slate-700 outline-none transition focus:border-[#6096b4] focus:ring-2 focus:ring-[#6096b433] disabled:bg-slate-50"
            />
            <button
                type="button"
                onClick={onToggle}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                tabIndex={-1}
            >
                {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
        </div>
    );

    return (
        <Dialog open={open} onOpenChange={(v) => { if (!v) handleClose(); }}>
            <DialogContent className="max-w-md" dir={isRtl ? "rtl" : "ltr"}>
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-[#254151]">
                        <KeyRound className="size-5" />
                        {isRtl ? "تغيير كلمة المرور" : "Change Password"}
                    </DialogTitle>
                </DialogHeader>

                {success ? (
                    <div className="flex flex-col items-center gap-3 py-6">
                        <div className="flex size-12 items-center justify-center rounded-full bg-emerald-100">
                            <Check className="size-6 text-emerald-600" />
                        </div>
                        <p className="text-sm font-medium text-emerald-700">
                            {isRtl ? "تم تغيير كلمة المرور بنجاح" : "Password changed successfully"}
                        </p>
                    </div>
                ) : (
                    <form
                        onSubmit={(e) => { e.preventDefault(); void submit(); }}
                        className="space-y-4 pt-2"
                    >
                        {/* Current password */}
                        <div className="space-y-1.5">
                            <label htmlFor="cp-current" className="block text-sm font-medium text-[#254151]">
                                {isRtl ? "كلمة المرور الحالية" : "Current Password"}
                            </label>
                            <PasswordInput
                                id="cp-current"
                                value={current}
                                onChange={setCurrent}
                                show={showCurrent}
                                onToggle={() => setShowCurrent((v) => !v)}
                                placeholder="••••••••"
                            />
                        </div>

                        {/* New password */}
                        <div className="space-y-1.5">
                            <label htmlFor="cp-new" className="block text-sm font-medium text-[#254151]">
                                {isRtl ? "كلمة المرور الجديدة" : "New Password"}
                            </label>
                            <PasswordInput
                                id="cp-new"
                                value={next}
                                onChange={setNext}
                                show={showNext}
                                onToggle={() => setShowNext((v) => !v)}
                                placeholder="••••••••"
                            />
                            {next.length > 0 && next.length < 6 && (
                                <p className="flex items-center gap-1 text-xs text-amber-600">
                                    <X className="size-3" />
                                    {isRtl ? "6 أحرف على الأقل" : "At least 6 characters"}
                                </p>
                            )}
                        </div>

                        {/* Confirm password */}
                        <div className="space-y-1.5">
                            <label htmlFor="cp-confirm" className="block text-sm font-medium text-[#254151]">
                                {isRtl ? "تأكيد كلمة المرور" : "Confirm New Password"}
                            </label>
                            <PasswordInput
                                id="cp-confirm"
                                value={confirm}
                                onChange={setConfirm}
                                show={showConfirm}
                                onToggle={() => setShowConfirm((v) => !v)}
                                placeholder="••••••••"
                            />
                            {confirm.length > 0 && !passwordsMatch && (
                                <p className="flex items-center gap-1 text-xs text-red-600">
                                    <X className="size-3" />
                                    {isRtl ? "كلمتا المرور غير متطابقتين" : "Passwords do not match"}
                                </p>
                            )}
                            {confirm.length > 0 && passwordsMatch && (
                                <p className="flex items-center gap-1 text-xs text-emerald-600">
                                    <Check className="size-3" />
                                    {isRtl ? "كلمتا المرور متطابقتان" : "Passwords match"}
                                </p>
                            )}
                        </div>

                        {error && (
                            <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>
                        )}

                        <div className="flex gap-2 pt-1">
                            <Button
                                type="submit"
                                disabled={loading || !isValid}
                                className="flex-1"
                            >
                                {loading
                                    ? (isRtl ? "جاري الحفظ..." : "Saving...")
                                    : (isRtl ? "حفظ كلمة المرور" : "Save Password")}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleClose}
                                disabled={loading}
                            >
                                {isRtl ? "إلغاء" : "Cancel"}
                            </Button>
                        </div>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}
