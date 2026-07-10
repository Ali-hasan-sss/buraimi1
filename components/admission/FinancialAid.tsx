"use client"
import { motion } from "framer-motion"
import { DollarSign } from "lucide-react"
import { Button } from "../ui/button"
import { AdmissionDiscount } from "@/types/admission"
import Link from "next/link"
export default function FinancialAid(
    { discounts }:
        { discounts: AdmissionDiscount[] }
) {
    return (
        < div className="py-20 bg-gradient-to-br from-gray-50 to-blue-50" >
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-block px-6 py-2 bg-gradient-to-l from-[#c2a772] to-[#254151] text-white rounded-full mb-6">
                        <DollarSign className="size-5 inline-block ml-2" />
                        <span className="font-bold">المساعدات المالية</span>
                    </div>
                    <h2 className="text-4xl text-[#254151] mb-4">المساعدات المالية (الخصومات) والرسوم الدراسية</h2>
                    <p className="text-xl text-gray-600">هدفنا هو جعل التعليم الممتاز ملائم أكثر</p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {discounts.map((discount, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 * index }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.03, y: -5 }}
                            className="bg-white rounded-2xl p-8 shadow-xl border-2 border-[#c2a772]/20 hover:border-[#6096b4] transition-all"
                        >
                            <div className="flex items-start gap-6">
                                <div className={`flex-shrink-0 w-24 h-24 rounded-2xl bg-gradient-to-br ${discount.color} flex items-center justify-center shadow-lg`}>
                                    <span className="text-3xl text-white">{discount.percentage}</span>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl text-[#254151] mb-4">{discount.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{discount.categories}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <Link href="/main/admission/details">
                        <Button size="lg" variant="outline" className="border-2 border-[#c2a772] text-[#c2a772] hover:bg-[#c2a772] hover:text-white px-10 py-6 text-lg rounded-full">
                            <DollarSign className="size-6 ml-2" />
                            المزيد عن الخصومات والمساعدات المالية
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </div >

    )
}