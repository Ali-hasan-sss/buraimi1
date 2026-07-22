"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Download, Edit, Plus, Trash2, Save } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import {
    DepartmentProgram,
    DepartmentStudyPlan,
    DepartmentCourse,
    PlanHeader,
} from "@/types/department"

type Props = {
    program: DepartmentProgram
    isOpen: boolean
    onClose: () => void
    isAdmin: boolean
    departmentDomain: string
}

type CourseFormData = {
    seq: number
    code: string
    title: string
    credits: number
    oqf: number
    prerequisite: string
}

const emptyCourse: CourseFormData = {
    seq: 0,
    code: "",
    title: "",
    credits: 3,
    oqf: 0,
    prerequisite: "",
}

export default function StudyPlanModal({
    program,
    isOpen,
    onClose,
    isAdmin,
    departmentDomain,
}: Props) {
    const locale = useLocale()
    const t = useTranslations("departmentStudyPlan")
    const router = useRouter()

    const [isEditMode, setIsEditMode] = useState(false)
    const [saving, setSaving] = useState(false)
    const [activeLevelId, setActiveLevelId] = useState<string>(program.levels[0]?.id ?? "")

    // Find active level and its study plan
    const activeLevel = program.levels.find((l) => l.id === activeLevelId)
    const activeStudyPlan = program.studyPlan?.find((sp) => sp.id === activeLevelId)

    // Form states for editing
    const [planHeader, setPlanHeader] = useState<PlanHeader>(
        activeStudyPlan?.PlanHeader || { title: "" }
    )
    const [generalCourses, setGeneralCourses] = useState<DepartmentCourse[]>(
        activeStudyPlan?.generalRequirements || []
    )
    const [departmentCourses, setDepartmentCourses] = useState<DepartmentCourse[]>(
        activeStudyPlan?.departmentRequirements || []
    )
    const [majorCourses, setMajorCourses] = useState<DepartmentCourse[]>(
        activeStudyPlan?.majorRequirements || []
    )
    const [electiveCourses, setElectiveCourses] = useState<DepartmentCourse[]>(
        activeStudyPlan?.electiveRequirements || []
    )

    const handleLevelChange = (levelId: string) => {
        setActiveLevelId(levelId)
        const newStudyPlan = program.studyPlan?.find((sp) => sp.id === levelId)
        setPlanHeader(newStudyPlan?.PlanHeader || { title: "" })
        setGeneralCourses(newStudyPlan?.generalRequirements || [])
        setDepartmentCourses(newStudyPlan?.departmentRequirements || [])
        setMajorCourses(newStudyPlan?.majorRequirements || [])
        setElectiveCourses(newStudyPlan?.electiveRequirements || [])
    }

    const handleSave = async () => {
        setSaving(true)
        try {
            const payload = {
                id: activeLevelId,
                PlanHeader: planHeader,
                generalRequirements: generalCourses,
                departmentRequirements: departmentCourses,
                majorRequirements: majorCourses,
                electiveRequirements: electiveCourses,
            }

            const res = await fetch(
                `/api/departments/${departmentDomain}/programs/${program.id}/study-plan`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                }
            )

            const json = await res.json().catch(() => null)

            if (!res.ok || !json?.ok) {
                toast.error(json?.message || t("saveFailed"))
                return
            }

            toast.success(t("saveSuccess"))
            setIsEditMode(false)
            router.refresh()
        } catch {
            toast.error(t("saveFailed"))
        } finally {
            setSaving(false)
        }
    }

    const addCourse = (
        setter: React.Dispatch<React.SetStateAction<DepartmentCourse[]>>
    ) => {
        setter((prev) => [
            ...prev,
            { ...emptyCourse, seq: prev.length + 1 },
        ])
    }

    const removeCourse = (
        setter: React.Dispatch<React.SetStateAction<DepartmentCourse[]>>,
        index: number
    ) => {
        setter((prev) => prev.filter((_, i) => i !== index))
    }

    const updateCourse = (
        setter: React.Dispatch<React.SetStateAction<DepartmentCourse[]>>,
        index: number,
        field: keyof DepartmentCourse,
        value: string | number
    ) => {
        setter((prev) =>
            prev.map((course, i) =>
                i === index ? { ...course, [field]: value } : course
            )
        )
    }

    const degreeName =
        locale === "ar" ? activeLevel?.degreeNameAr : activeLevel?.degreeNameEn

    if (!isOpen) return null

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/50"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative z-10"
                    >
                        {/* Header */}
                        <div className="sticky top-0 bg-gradient-to-l from-[#254151] to-[#6096b4] text-white p-6 rounded-t-2xl z-10">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-2xl mb-2">
                                        {locale === "ar" ? program.titleAr : program.titleEn}
                                    </h3>
                                    <p className="text-white/90">{degreeName}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    {isAdmin && (
                                        <>
                                            {isEditMode ? (
                                                <Button
                                                    onClick={handleSave}
                                                    disabled={saving}
                                                    className="bg-white/20 hover:bg-white/30 text-white border-0"
                                                >
                                                    <Save className="size-4 ml-2" />
                                                    {saving ? t("saving") : t("save")}
                                                </Button>
                                            ) : (
                                                <Button
                                                    onClick={() => setIsEditMode(true)}
                                                    className="bg-white/20 hover:bg-white/30 text-white border-0"
                                                >
                                                    <Edit className="size-4 ml-2" />
                                                    {t("edit")}
                                                </Button>
                                            )}
                                        </>
                                    )}
                                    <button
                                        onClick={onClose}
                                        className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all"
                                    >
                                        <X className="size-6" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-8">
                            {/* Level Selector */}
                            {program.levels.length > 1 && (
                                <div className="mb-6">
                                    <label className="text-sm text-gray-600 mb-2 block">
                                        {t("selectLevel")}
                                    </label>
                                    <select
                                        value={activeLevelId}
                                        onChange={(e) => handleLevelChange(e.target.value)}
                                        disabled={isEditMode}
                                        className="w-full max-w-md px-4 py-2 border-2 border-[#c2a772]/30 focus:outline-none focus:border-[#6096b4] bg-white text-[#254151] rounded-md"
                                    >
                                        {program.levels.map((level) => (
                                            <option key={level.id} value={level.id}>
                                                {level.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            {/* Summary Cards */}
                            {!isEditMode && activeStudyPlan && (
                                <div className="bg-gradient-to-br from-blue-50 to-gray-50 rounded-xl p-6 mb-8">
                                    <h4 className="text-2xl text-[#254151] mb-4 text-center">
                                        {activeStudyPlan.PlanHeader.title}
                                    </h4>
                                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                                        <div className="bg-white rounded-lg p-4 shadow text-center border-2 border-[#254151]">
                                            <div className="text-3xl text-[#254151] mb-2">
                                                {generalCourses.length}
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                {t("generalRequirements")}
                                            </div>
                                        </div>
                                        <div className="bg-white rounded-lg p-4 shadow text-center border-2 border-[#6096b4]">
                                            <div className="text-3xl text-[#6096b4] mb-2">
                                                {departmentCourses.length}
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                {t("departmentRequirements")}
                                            </div>
                                        </div>
                                        <div className="bg-white rounded-lg p-4 shadow text-center border-2 border-[#c2a772]">
                                            <div className="text-3xl text-[#c2a772] mb-2">
                                                {majorCourses.length}
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                {t("majorRequirements")}
                                            </div>
                                        </div>
                                        <div className="bg-white rounded-lg p-4 shadow text-center border-2 border-[#254151]">
                                            <div className="text-3xl text-[#254151] mb-2">
                                                {electiveCourses.length}
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                {t("electiveRequirements")}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Edit Mode - Plan Header */}
                            {isEditMode && (
                                <div className="mb-6 space-y-4 border rounded-lg p-4 bg-muted/30">
                                    <h4 className="font-semibold text-[#254151]">{t("planHeader")}</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">{t("planTitle")}</label>
                                            <Input
                                                value={planHeader.title}
                                                onChange={(e) =>
                                                    setPlanHeader({ ...planHeader, title: e.target.value })
                                                }
                                                placeholder={t("planTitlePlaceholder")}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">{t("totalHours")}</label>
                                            <Input
                                                type="number"
                                                value={planHeader.totalHour || ""}
                                                onChange={(e) =>
                                                    setPlanHeader({
                                                        ...planHeader,
                                                        totalHour: parseInt(e.target.value) || 0,
                                                    })
                                                }
                                                placeholder={t("totalHoursPlaceholder")}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Course Tables */}
                            <CourseTable
                                title={t("generalRequirements")}
                                courses={generalCourses}
                                isEditMode={isEditMode}
                                borderColor="border-[#254151]"
                                headerGradient="from-[#254151] to-[#6096b4]"
                                onAdd={() => addCourse(setGeneralCourses)}
                                onRemove={(index) => removeCourse(setGeneralCourses, index)}
                                onUpdate={(index, field, value) =>
                                    updateCourse(setGeneralCourses, index, field, value)
                                }
                            />

                            <CourseTable
                                title={t("departmentRequirements")}
                                courses={departmentCourses}
                                isEditMode={isEditMode}
                                borderColor="border-[#6096b4]"
                                headerGradient="from-[#6096b4] to-[#254151]"
                                onAdd={() => addCourse(setDepartmentCourses)}
                                onRemove={(index) => removeCourse(setDepartmentCourses, index)}
                                onUpdate={(index, field, value) =>
                                    updateCourse(setDepartmentCourses, index, field, value)
                                }
                            />

                            <CourseTable
                                title={t("majorRequirements")}
                                courses={majorCourses}
                                isEditMode={isEditMode}
                                borderColor="border-[#c2a772]"
                                headerGradient="from-[#c2a772] to-[#254151]"
                                onAdd={() => addCourse(setMajorCourses)}
                                onRemove={(index) => removeCourse(setMajorCourses, index)}
                                onUpdate={(index, field, value) =>
                                    updateCourse(setMajorCourses, index, field, value)
                                }
                            />

                            <CourseTable
                                title={t("electiveRequirements")}
                                courses={electiveCourses}
                                isEditMode={isEditMode}
                                borderColor="border-[#254151]"
                                headerGradient="from-[#254151] to-[#6096b4]"
                                onAdd={() => addCourse(setElectiveCourses)}
                                onRemove={(index) => removeCourse(setElectiveCourses, index)}
                                onUpdate={(index, field, value) =>
                                    updateCourse(setElectiveCourses, index, field, value)
                                }
                            />
                        </div>

                        {/* Footer */}
                        <div className="flex justify-center gap-4 p-6 border-t">
                            <Button
                                variant="outline"
                                onClick={onClose}
                                className="border-2 border-[#c2a772] text-[#c2a772] hover:bg-[#c2a772] hover:text-white px-8 py-6 rounded-full"
                            >
                                {t("close")}
                            </Button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}

// Course Table Component
function CourseTable({
    title,
    courses,
    isEditMode,
    borderColor,
    headerGradient,
    onAdd,
    onRemove,
    onUpdate,
}: {
    title: string
    courses: DepartmentCourse[]
    isEditMode: boolean
    borderColor: string
    headerGradient: string
    onAdd: () => void
    onRemove: (index: number) => void
    onUpdate: (index: number, field: keyof DepartmentCourse, value: string | number) => void
}) {
    const t = useTranslations("departmentStudyPlan")
    const locale = useLocale()

    return (
        <div className="mb-8">
            <div
                className={`bg-gradient-to-l ${headerGradient} text-white p-4 rounded-t-xl flex items-center justify-between`}
            >
                <h5 className="text-xl">{title}</h5>
                {isEditMode && (
                    <Button
                        onClick={onAdd}
                        variant="secondary"
                        size="sm"
                        className="bg-white/20 hover:bg-white/30 text-white border-0"
                    >
                        <Plus className="size-4 ml-1" />
                        {t("addCourse")}
                    </Button>
                )}
            </div>
            <div className="overflow-x-auto">
                <table className={`w-full bg-white border-2 ${borderColor}`}>
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border border-gray-300 px-4 py-3 text-center w-16">
                                {t("seq")}
                            </th>
                            <th className="border border-gray-300 px-4 py-3 text-center">
                                {t("courseCode")}
                            </th>
                            <th className="border border-gray-300 px-4 py-3 text-center">
                                {t("courseTitle")}
                            </th>
                            <th className="border border-gray-300 px-4 py-3 text-center w-24">
                                {t("credits")}
                            </th>
                            <th className="border border-gray-300 px-4 py-3 text-center w-24">
                                {t("oqf")}
                            </th>
                            <th className="border border-gray-300 px-4 py-3 text-center">
                                {t("prerequisite")}
                            </th>
                            {isEditMode && (
                                <th className="border border-gray-300 px-4 py-3 text-center w-20">
                                    {t("actions")}
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {courses.length === 0 && !isEditMode && (
                            <tr>
                                <td
                                    colSpan={isEditMode ? 7 : 6}
                                    className="border border-gray-300 px-4 py-8 text-center text-gray-500"
                                >
                                    {t("noCourses")}
                                </td>
                            </tr>
                        )}
                        {courses.map((course, index) => (
                            <tr key={index} className="hover:bg-blue-50">
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    {isEditMode ? (
                                        <Input
                                            type="number"
                                            value={course.seq}
                                            onChange={(e) =>
                                                onUpdate(index, "seq", parseInt(e.target.value) || 0)
                                            }
                                            className="w-16 text-center"
                                        />
                                    ) : (
                                        course.seq
                                    )}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {isEditMode ? (
                                        <Input
                                            value={course.code}
                                            onChange={(e) => onUpdate(index, "code", e.target.value)}
                                            className="font-semibold text-[#254151]"
                                        />
                                    ) : (
                                        <span className="font-semibold text-[#254151]">
                                            {course.code}
                                        </span>
                                    )}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {isEditMode ? (
                                        <Input
                                            value={course.title}
                                            onChange={(e) => onUpdate(index, "title", e.target.value)}
                                        />
                                    ) : (
                                        course.title
                                    )}
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    {isEditMode ? (
                                        <Input
                                            type="number"
                                            value={course.credits}
                                            onChange={(e) =>
                                                onUpdate(index, "credits", parseInt(e.target.value) || 0)
                                            }
                                            className="w-20 text-center"
                                        />
                                    ) : (
                                        course.credits
                                    )}
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    {isEditMode ? (
                                        <Input
                                            type="number"
                                            value={course.oqf}
                                            onChange={(e) =>
                                                onUpdate(index, "oqf", parseInt(e.target.value) || 0)
                                            }
                                            className="w-20 text-center"
                                        />
                                    ) : (
                                        course.oqf || "-"
                                    )}
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    {isEditMode ? (
                                        <Input
                                            value={course.prerequisite}
                                            onChange={(e) =>
                                                onUpdate(index, "prerequisite", e.target.value)
                                            }
                                            placeholder="-"
                                        />
                                    ) : course.prerequisite ? (
                                        course.prerequisite
                                    ) : (
                                        "-"
                                    )}
                                </td>
                                {isEditMode && (
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        <Button
                                            onClick={() => onRemove(index)}
                                            variant="ghost"
                                            size="sm"
                                            className="text-destructive hover:text-destructive"
                                        >
                                            <Trash2 className="size-4" />
                                        </Button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
