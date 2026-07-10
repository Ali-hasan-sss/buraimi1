"use client"
import { AdmissionFeature, AdmissionStats } from "@/types/admission"
import { motion } from "framer-motion"
import { Award, BookOpen, DollarSign, FileText, Globe, GraduationCap, User, Users } from "lucide-react"
import { Button } from "../ui/button"

export default function AdmissionStatsComp(
    { stat, undergraduateFeatures, postgraduatePrograms }:
        {
            stat: AdmissionStats,
            undergraduateFeatures: AdmissionFeature,
            postgraduatePrograms: AdmissionFeature

        }
) {
    return (
        <>
            <div className="container mx-auto px-4 -mt-16 relative z-20 mb-20">
                <div className="grid md:grid-cols-3 gap-8">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="bg-white rounded-2xl shadow-2xl p-8 text-center border-t-4 border-[#c2a772]"
                    >
                        <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#254151] to-[#6096b4] mb-6`}>
                            <Users className="size-10 text-white" />
                        </div>
                        <h3 className="text-5xl text-[#254151] mb-4">{stat.undergraduate}</h3>
                        <p className="text-lg text-gray-600">
                            طالب في المرحلة الجامعية الأولى
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="bg-white rounded-2xl shadow-2xl p-8 text-center border-t-4 border-[#c2a772]"
                    >
                        <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#6096b4] to-[#254151] mb-6`}>
                            <Globe className="size-10 text-white" />
                        </div>
                        <h3 className="text-5xl text-[#254151] mb-4">{stat.international}</h3>
                        <p className="text-lg text-gray-600">
                            الطلبة الدوليين
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="bg-white rounded-2xl shadow-2xl p-8 text-center border-t-4 border-[#c2a772]"
                    >
                        <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#c2a772] to-[#254151] mb-6`}>
                            <GraduationCap className="size-10 text-white" />
                        </div>
                        <h3 className="text-5xl text-[#254151] mb-4">{stat.Postgraduate}</h3>
                        <p className="text-lg text-gray-600">
                            طالب في الدراسات العليا
                        </p>
                    </motion.div>

                </div>
            </div>
            {/* Undergraduate Section */}
            <div className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <div className="mb-8">
                            <div className="inline-block px-6 py-2 bg-gradient-to-l from-[#254151] to-[#6096b4] text-white rounded-full mb-6">
                                <BookOpen className="size-5 inline-block ml-2" />
                                <span className="font-bold">المرحلة الجامعية</span>
                            </div>
                            <h2 className="text-4xl text-[#254151] mb-6">الشؤون في المرحلة الجامعية الأولى</h2>
                        </div>

                        <div className="bg-gradient-to-br from-blue-50 to-gray-50 rounded-2xl p-8 mb-8 border border-[#6096b4]/30">
                            <p className="text-lg text-gray-700 leading-relaxed mb-6">
                                تستقبل كلية البريمي الجامعية حوالي 400 طالب جديد و20 طالب منتقل سنويًا. يتم تقييم كل متقدم وفقًا لديناميكيته الفكرية وسجله الأكاديمي.
                            </p>

                            {undergraduateFeatures &&
                                <div className="bg-white rounded-xl p-6 shadow-md mb-4 last:mb-0">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-gradient-to-br from-[#c2a772] to-[#254151] rounded-lg">
                                            <DollarSign className="size-6 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl text-[#254151] mb-3">{undergraduateFeatures.title}</h3>
                                            <p className="text-gray-600 leading-relaxed">{undergraduateFeatures.description}</p>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>

                        <div className="flex gap-4">
                            <Button className="bg-gradient-to-l from-[#254151] to-[#6096b4] text-white hover:opacity-90 px-8 py-6 text-lg rounded-full shadow-lg">
                                <FileText className="size-5 ml-2" />
                                التقديم الآن
                            </Button>
                            <Button variant="outline" className="border-2 border-[#c2a772] text-[#c2a772] hover:bg-[#c2a772] hover:text-white px-8 py-6 text-lg rounded-full">
                                معرفة المزيد
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Postgraduate Section */}
            <div className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <div className="mb-8">
                            <div className="inline-block px-6 py-2 bg-gradient-to-l from-[#c2a772] to-[#254151] text-white rounded-full mb-6">
                                <GraduationCap className="size-5 inline-block ml-2" />
                                <span className="font-bold">الدراسات العليا</span>
                            </div>
                            <h2 className="text-4xl text-[#254151] mb-6">الشؤون في الدراسات العليا</h2>
                        </div>

                        <div className="bg-white rounded-2xl p-8 shadow-xl mb-8 border-2 border-[#c2a772]/30">
                            <div className="mb-6 pb-6 border-b border-gray-200">
                                <p className="text-lg text-gray-700 italic leading-relaxed">
                                    Al Buraimi University College provided us MBA program, a Master of Philosophy in law, and a Doctorate in philosophy. They differ widely in their requirements for admission.
                                </p>
                            </div>

                            {postgraduatePrograms &&
                                <div className="bg-gradient-to-l from-blue-50 to-gray-50 rounded-xl p-6 mb-4 last:mb-0 border border-[#6096b4]/20">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-gradient-to-br from-[#6096b4] to-[#254151] rounded-lg">
                                            <Award className="size-6 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl text-[#254151] mb-3">{postgraduatePrograms.title}</h3>
                                            <p className="text-gray-600 leading-relaxed">{postgraduatePrograms.description}</p>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>

                        <div className="flex gap-4">
                            <Button className="bg-gradient-to-l from-[#c2a772] to-[#254151] text-white hover:opacity-90 px-8 py-6 text-lg rounded-full shadow-lg">
                                <FileText className="size-5 ml-2" />
                                التقديم للدراسات العليا
                            </Button>
                            <Button variant="outline" className="border-2 border-[#6096b4] text-[#6096b4] hover:bg-[#6096b4] hover:text-white px-8 py-6 text-lg rounded-full">
                                البرامج المتاحة
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </div>

        </>
    )
}