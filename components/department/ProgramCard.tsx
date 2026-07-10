"use client"
import { DepartmentProgram } from "@/types/department"
import { motion } from "framer-motion"
import {
    Award,
    BookOpen,
    Briefcase,
    ChartColumn,
    DollarSign,
    GraduationCap,
    ShoppingCart,
    Target,
    UserCheck,
} from "lucide-react"
import { useState } from "react"
import { useLocale } from "next-intl"
import StudyPlanModal from "./StudyPlanModal"

const programIcons = [UserCheck, Briefcase, BookOpen, DollarSign, ShoppingCart, ChartColumn]

export default function ProgramCard(
    { program, index, isAdmin, departmentDomain }: { program: DepartmentProgram, index: number, isAdmin?: boolean, departmentDomain?: string }
) {
    const [selectedLevelId, setSelectedLevelId] = useState<string>(program.levels[0]?.id ?? "")
    const [isModalOpen, setIsModalOpen] = useState(false)

    const locale = useLocale()
    const titleAr = program.titleAr
    const titleEn = program.titleEn
    const description = locale == "ar" ? program.descriptionAr : program.descriptionEn
    const Icon = programIcons[index % programIcons.length]

    const selectedLevel = program.levels.find((l) => l.id === selectedLevelId)

    const handleLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedLevelId(e.target.value)
    }

    const degreeName = locale === "ar" ? selectedLevel?.degreeNameAr : selectedLevel?.degreeNameEn
    const duration = locale === "ar" ? selectedLevel?.durationAr : selectedLevel?.durationEn

    return (
        <div>
            <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 border-2 border-[#c2a772]/20 hover:border-[#6096b4] transition-all flex flex-col"
            >
                {/* Header */}
                <div className="flex items-start gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#254151] to-[#6096b4] flex items-center justify-center flex-shrink-0">
                        <Icon className="size-8 text-white" />
                    </div>
                    <div className="flex-1 min-h-[64px] flex flex-col justify-center">
                        <h3 className="text-xl text-[#254151] mb-1 leading-tight">{titleAr}</h3>
                        <p className="text-sm text-gray-500 leading-tight">{titleEn}</p>
                    </div>
                </div>

                {/* Description */}
                <div
                    className="text-gray-600 mb-6 leading-relaxed min-h-[48px] prose prose-sm max-w-none [&_p]:m-0"
                    dangerouslySetInnerHTML={{ __html: description || "" }}
                />

                {/* Level Selector */}
                {program.levels.length > 0 && (
                    <div className="mb-6">
                        <label className="text-sm text-gray-600 mb-2 block">
                            {locale === "ar" ? "اختر المستوى الدراسي:" : "Select study level:"}
                        </label>
                        <select
                            value={selectedLevelId}
                            onChange={handleLevelChange}
                            className="w-full px-4 py-2 border-2 border-[#c2a772]/30 focus:outline-none focus:border-[#6096b4] bg-white text-[#254151]"
                        >
                            {program.levels.map((level) => (
                                <option key={level.id} value={level.id}>
                                    {level.label}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Level Info Box */}
                {selectedLevel && (
                    <div className="bg-gradient-to-br from-blue-50 to-gray-50 p-4 mb-6 min-h-[120px] flex flex-col justify-center">
                        <div className="flex items-center gap-2 text-[#254151] mb-2">
                            <Award className="size-5 text-[#c2a772]" />
                            <span className="font-bold">{degreeName}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700 mb-2">
                            <BookOpen className="size-5 text-[#6096b4]" />
                            <span>{selectedLevel.hours}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                            <Target className="size-5 text-[#254151]" />
                            <span>
                                {locale === "ar" ? "مدة البرنامج: " : "Program duration: "}
                                {duration}
                            </span>
                        </div>
                    </div>
                )}

                {/* Study Plan Button */}
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 w-full bg-gradient-to-l from-[#254151] to-[#6096b4] text-white hover:shadow-lg transition-all py-6"
                >
                    <GraduationCap className="size-5 ml-2" />
                    {locale === "ar" ? "عرض الخطة الدراسية" : "View Study Plan"}
                </button>
            </motion.div>

            {/* Study Plan Modal */}
            <StudyPlanModal
                program={program}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                isAdmin={isAdmin || false}
                departmentDomain={departmentDomain || ""}
            />
        </div>
    )
}