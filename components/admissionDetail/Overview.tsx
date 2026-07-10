"use client"
import { Award, BookOpen, GraduationCap, Users } from "lucide-react";

import { motion } from "framer-motion"

export default function Overview() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                <h2 className="text-3xl text-[#254151] mb-6 flex items-center gap-3 justify-start">
                    <BookOpen className="size-8 text-[#6096b4]" />
                    نظرة عامة
                </h2>
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                    <p className="text-xl mb-6">
                        مرحباً بكم في صفحة القبول التفصيلية لكلية البريمي الجامعية. نحن ملتزمون بتوفير تعليم عالي الجودة يمكن الجميع من الوصول إليه.
                    </p>
                    <div className="grid md:grid-cols-3 gap-6 my-8">
                        <div className="bg-gradient-to-br from-[#254151] to-[#6096b4] text-white rounded-xl p-6 text-center">
                            <Users className="size-12 mx-auto mb-4" />
                            <h3 className="text-2xl mb-2">400+</h3>
                            <p>طالب جديد سنوياً</p>
                        </div>
                        <div className="bg-gradient-to-br from-[#6096b4] to-[#254151] text-white rounded-xl p-6 text-center">
                            <GraduationCap className="size-12 mx-auto mb-4" />
                            <h3 className="text-2xl mb-2">15+</h3>
                            <p>برنامج أكاديمي</p>
                        </div>
                        <div className="bg-gradient-to-br from-[#c2a772] to-[#254151] text-white rounded-xl p-6 text-center">
                            <Award className="size-12 mx-auto mb-4" />
                            <h3 className="text-2xl mb-2">32</h3>
                            <p>فئة خصم متاحة</p>
                        </div>
                    </div>
                    <p className="text-lg">
                        تقدم كلية البريمي الجامعية مجموعة واسعة من البرامج الأكاديمية في المرحلة الجامعية والدراسات العليا، مع توفير مساعدات مالية وخصومات متنوعة لجعل التعليم في متناول الجميع.
                    </p>
                </div>
            </div>
        </motion.div>
    )
}