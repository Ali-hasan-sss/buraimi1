"use client"
import { motion } from "framer-motion"
import { Download, FileText, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

type Guide = {
    title: string
    icon: React.ComponentType<{ className?: string }>
}

export default function Guides({ guides }: { guides: Guide[] }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-3xl text-[#254151] mb-8 flex items-center gap-3">
                    <FileText className="size-8 text-[#6096b4]" />
                    دليل الطالب
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                    {guides.map((guide, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 * index }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.03, y: -5 }}
                            className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 shadow-lg border-2 border-[#c2a772]/30 hover:border-[#6096b4] transition-all cursor-pointer"
                        >
                            <div className="flex items-start gap-4">
                                <div className="w-16 h-16 bg-gradient-to-br from-[#254151] to-[#6096b4] rounded-xl flex items-center justify-center flex-shrink-0">
                                    <guide.icon className="size-8 text-white" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl text-[#254151] mb-4">{guide.title}</h3>
                                    <Button className="w-full bg-gradient-to-l from-[#c2a772] to-[#254151] text-white hover:opacity-90 rounded-full">
                                        <Download className="size-5 ml-2" />
                                        تحميل الدليل (PDF)
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-8 bg-gradient-to-br from-blue-50 to-gray-50 rounded-xl p-6 border-2 border-[#6096b4]/30">
                    <p className="text-lg text-gray-700 text-center mb-4">
                        <strong>هل تحتاج إلى مساعدة؟</strong> فريق القبول والتسجيل متاح لمساعدتك
                    </p>
                    <div className="flex gap-4 justify-center flex-wrap">
                        <Button size="lg" className="bg-gradient-to-l from-[#254151] to-[#6096b4] text-white hover:opacity-90 px-8 py-4 rounded-full">
                            <Users className="size-5 ml-2" />
                            تواصل مع فريق القبول
                        </Button>
                        <Button size="lg" variant="outline" className="border-2 border-[#c2a772] text-[#c2a772] hover:bg-[#c2a772] hover:text-white px-8 py-4 rounded-full">
                            <FileText className="size-5 ml-2" />
                            الأسئلة الشائعة
                        </Button>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
