"use client"
import { Button } from "../ui/button";
import { Download, FileText, X } from "lucide-react";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { DepartmentStudyPlan } from "@/types/department";
import CourseContain from "./CoursContain";

type StudyDialogProps = {
    open?: boolean
    defaultOpen?: boolean
    onOpenChange?: (open: boolean) => void
    showTrigger?: boolean,
    studyPlan: DepartmentStudyPlan
}

export function StudyDialog({
    open,
    defaultOpen,
    onOpenChange,
    showTrigger = true,
    studyPlan
}: StudyDialogProps) {

    return (
        <Dialog
            open={open}
            defaultOpen={defaultOpen}
            onOpenChange={onOpenChange}
        >
            {showTrigger ? (
                <DialogTrigger asChild>
                    <Button className="w-full bg-gradient-to-l from-[#254151] to-[#6096b4] text-white hover:opacity-90">
                        <FileText className="size-5 ml-2" />
                        عرض الخطة الدراسية
                    </Button>
                </DialogTrigger>
            ) : null}
            <DialogContent
                showCloseButton={false}
                className=" w-[80%] min-w-[80%] max-w-7xl  max-h-[90vh] overflow-y-auto p-0 border-0 bg-white rounded-2xl"
            >
                {/* Modal Header */}
                <DialogHeader className="p-0">
                    <div className=" bg-gradient-to-l from-[#254151] to-[#6096b4] text-white p-6 rounded-t-2xl flex items-center justify-between z-10">
                        <div>
                            <DialogTitle className="text-3xl mb-2 text-white">
                                {studyPlan.PlanHeader.title}
                            </DialogTitle>
                            <DialogDescription className="text-xl text-white/90">
                                ({studyPlan.PlanHeader.totalHour} ساعة معتمدة)
                            </DialogDescription>
                        </div>

                        <DialogClose asChild>
                            <button className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors">
                                <X className="size-6" />
                            </button>
                        </DialogClose>
                    </div>
                </DialogHeader>

                {/* Modal Content */}
                <div className="p-8">
                    {/* Summary */}
                    <div className="grid gap-4 mb-10 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]">
                        {studyPlan?.PlanHeader?.generalRequirementsHours && <div className="bg-gradient-to-br from-[#254151]/10 to-[#6096b4]/10 rounded-xl p-6 border-2 border-[#c2a772]/20">
                            <h4 className="text-sm text-gray-600 mb-2">متطلبات الكلية العامة</h4>
                            <p className="text-3xl text-[#254151]">{studyPlan.PlanHeader.generalRequirementsHours}</p>
                            <p className="text-sm text-gray-500">ساعة معتمدة</p>
                        </div>}
                        {studyPlan?.PlanHeader?.departmentRequirementsHours &&

                            <div className="bg-gradient-to-br from-[#254151]/10 to-[#6096b4]/10 rounded-xl p-6 border-2 border-[#c2a772]/20">
                                <h4 className="text-sm text-gray-600 mb-2">متطلبات القسم</h4>
                                <p className="text-3xl text-[#254151]">
                                    {studyPlan?.PlanHeader?.departmentRequirementsHours}
                                </p>
                                <p className="text-sm text-gray-500">ساعة معتمدة</p>
                            </div>
                        }
                        {studyPlan?.PlanHeader?.majorRequirementsHours &&
                            <div className="bg-gradient-to-br from-[#254151]/10 to-[#6096b4]/10 rounded-xl p-6 border-2 border-[#c2a772]/20">
                                <h4 className="text-sm text-gray-600 mb-2">متطلبات التخصص</h4>
                                <p className="text-3xl text-[#254151]">
                                    {studyPlan?.PlanHeader?.majorRequirementsHours}
                                </p>
                                <p className="text-sm text-gray-500">ساعة معتمدة</p>
                            </div>
                        }
                        {studyPlan?.PlanHeader?.electiveRequirements &&
                            <div className="bg-gradient-to-br from-[#254151]/10 to-[#6096b4]/10 rounded-xl p-6 border-2 border-[#c2a772]/20">
                                <h4 className="text-sm text-gray-600 mb-2">المقررات الاختيارية</h4>
                                <p className="text-3xl text-[#254151]">{studyPlan?.PlanHeader?.electiveRequirements}</p>
                                <p className="text-sm text-gray-500">ساعات معتمدة</p>
                            </div>
                        }
                    </div>

                    {/* Tables */}
                    {(studyPlan.generalRequirements && studyPlan.PlanHeader.generalRequirementsHours) &&
                        <CourseContain
                            title={'I. متطلبات الكلية العامة (إجبارية)'}
                            data={studyPlan.generalRequirements}
                            totalCredits={studyPlan.PlanHeader.generalRequirementsHours}
                        />
                    }
                    {(studyPlan.departmentRequirements && studyPlan.PlanHeader.departmentRequirementsHours) &&
                        <CourseContain
                            title={'II. متطلبات القسم (إجبارية)'}
                            data={studyPlan.departmentRequirements}
                            totalCredits={studyPlan.PlanHeader.departmentRequirementsHours}
                        />
                    }
                    {(studyPlan.majorRequirements && studyPlan.PlanHeader.majorRequirementsHours) &&
                        <CourseContain
                            title={'II. متطلبات القسم (إجبارية)'}
                            data={studyPlan.majorRequirements}
                            totalCredits={studyPlan.PlanHeader.majorRequirementsHours}
                        />
                    }
                    {(studyPlan.electiveRequirements && studyPlan.PlanHeader.electiveRequirements) &&
                        <CourseContain
                            title={'VI. المقررات الاختيارية'}
                            data={studyPlan.electiveRequirements}
                            totalCredits={studyPlan.PlanHeader.electiveRequirements}
                        />
                    }

                    {/* Download Button */}
                    <div className="mt-8 text-center">
                        <Button size="lg" className="bg-gradient-to-l from-[#254151] to-[#6096b4] text-white hover:opacity-90 px-12 py-6 text-lg rounded-full shadow-xl">
                            <Download className="size-6 ml-2" />
                            تحميل الخطة الدراسية PDF
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
