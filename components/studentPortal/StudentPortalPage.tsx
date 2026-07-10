"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Calendar,
  CreditCard,
  FileText,
} from "lucide-react";

import StudentPortalHero from "@/components/studentPortal/StudentPortalHero";
import StudentPortalLoginForm from "@/components/studentPortal/StudentPortalLoginForm";
import StudentPortalQuickLinks, {
  type StudentPortalQuickLink,
} from "@/components/studentPortal/StudentPortalQuickLinks";
import StudentPortalSupportCard from "@/components/studentPortal/StudentPortalSupportCard";

export default function StudentPortalPage() {
  const quickLinks = useMemo<StudentPortalQuickLink[]>(
    () => [
      {
        icon: BookOpen,
        title: "الدروس والمواد",
        description: "الوصول إلى الدروس والمواد الدراسية",
        color: "#6096b4",
      },
      {
        icon: Calendar,
        title: "الجدول الدراسي",
        description: "عرض جدول المحاضرات والامتحانات",
        color: "#6096b4",
      },
      {
        icon: FileText,
        title: "النتائج والدرجات",
        description: "الاطلاع على النتائج الأكاديمية",
        color: "#6096b4",
      },
      {
        icon: CreditCard,
        title: "الرسوم الدراسية",
        description: "دفع الرسوم والمستحقات المالية",
        color: "#6096b4",
      },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50">
      <StudentPortalHero />

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 border border-gray-100"
          >
            <StudentPortalLoginForm />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl font-bold text-[#254151] mb-4">
                الخدمات المتاحة
              </h3>
              <p className="text-gray-600 mb-6">
                من خلال بوابة الطالب يمكنك الوصول إلى جميع الخدمات الأكاديمية
                والإدارية
              </p>
            </div>

            <StudentPortalQuickLinks links={quickLinks} />
            <StudentPortalSupportCard />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
