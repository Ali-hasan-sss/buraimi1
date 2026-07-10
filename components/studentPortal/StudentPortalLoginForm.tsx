"use client";

import { useState } from "react";
import { AlertCircle, Eye, EyeOff, Lock, LogIn, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocale } from "next-intl";

const studentPortalLoginSchema = z.object({
  studentId: z.string().min(1, "الرجاء إدخال الرقم الجامعي"),
  password: z.string().min(1, "الرجاء إدخال كلمة المرور"),
});

type StudentPortalLoginFormValues = z.infer<typeof studentPortalLoginSchema>;

export default function StudentPortalLoginForm() {

  const locale = useLocale()
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<StudentPortalLoginFormValues>({
    defaultValues: {
      studentId: "",
      password: "",
    },
  });

  const onSubmit = async (values: StudentPortalLoginFormValues) => {
    const parsed = studentPortalLoginSchema.safeParse(values);
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        const field = issue.path[0];
        if (field === "studentId" || field === "password") {
          setError(field, { type: "manual", message: issue.message });
        }
      }
      return;
    }

    console.log("Login attempt:", parsed.data);
  };

  console.log(locale);
  return (
    <>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[#254151] mb-2">تسجيل الدخول</h2>
        <p className="text-gray-600">أدخل بيانات حسابك للدخول إلى البوابة</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
            <User className="size-4" />
            الرقم الجامعي
          </label>
          <Input
            type="text"
            placeholder="أدخل الرقم الجامعي"
            className="h-12 text-lg"
            required
            aria-invalid={!!errors.studentId}
            {...register("studentId")}
          />
          {errors.studentId?.message && (
            <p className="text-sm text-red-600">{errors.studentId.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
            <Lock className="size-4" />
            كلمة المرور
          </label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="أدخل كلمة المرور"
              className="h-12 text-lg pr-12"
              required
              aria-invalid={!!errors.password}
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className={`absolute top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600
                ${locale == "ar" ? "left-4" : " right-4 "}
                `}
            >
              {showPassword ? (
                <EyeOff className="size-5" />
              ) : (
                <Eye className="size-5" />
              )}
            </button>
          </div>
          {errors.password?.message && (
            <p className="text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="rounded" />
            <span className="text-gray-600">تذكرني</span>
          </label>
          <a href="#" className="text-[#6096b4] hover:text-[#254151] font-medium">
            نسيت كلمة المرور؟
          </a>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-14 text-lg bg-gradient-to-l from-[#254151] to-[#2d4a5c] hover:from-[#2d4a5c] hover:to-[#254151] text-white"
        >
          <LogIn className="size-5 ml-2" />
          تسجيل الدخول
        </Button>

        <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <AlertCircle className="size-5 text-[#6096b4] flex-shrink-0 mt-0.5" />
          <div className="text-sm text-gray-700">
            <p className="font-bold mb-1">للحصول على بيانات الدخول:</p>
            <p>يرجى التواصل مع قسم شؤون الطلبة أو مكتب القبول والتسجيل</p>
          </div>
        </div>
      </form>
    </>
  );
}
