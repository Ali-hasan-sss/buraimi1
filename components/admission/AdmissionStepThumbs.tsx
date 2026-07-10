"use client"

import { useEffect, useRef, type CSSProperties } from "react"
import { Pencil, Plus, Trash2 } from "lucide-react"

import type { AdmissionStep } from "@/types/admission-page"

import "./admission-step-thumbs.css"

type Props = {
    steps: AdmissionStep[]
    activeIndex: number
    isAr: boolean
    isAdmin?: boolean
    onSelect: (index: number) => void
    onEdit?: (step: AdmissionStep) => void
    onDelete?: (stepId: string) => void
    onAdd?: () => void
}

export function AdmissionStepThumbs({
    steps,
    activeIndex,
    isAr,
    isAdmin,
    onSelect,
    onEdit,
    onDelete,
    onAdd,
}: Props) {
    const cardRefs = useRef<(HTMLDivElement | null)[]>([])

    useEffect(() => {
        const activeEl = cardRefs.current[activeIndex]
        if (!activeEl) return
        activeEl.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center",
        })
    }, [activeIndex, steps.length])

    const gridStyle = { "--step-count": steps.length } as CSSProperties

    return (
        <div className="admissionStepsTimeline" dir={isAr ? "rtl" : "ltr"} style={gridStyle}>
            <div className="admissionStepsTimeline__track">
                <div className="admissionStepsTimeline__dotsTrack">
                    <div className="admissionStepsTimeline__hlineFull" aria-hidden />
                    <div className="admissionStepsTimeline__dotsGrid">
                        {steps.map((step, index) => {
                            const isActive = index === activeIndex
                            const label = isAr ? step.titleAr : step.titleEn

                            return (
                                <div key={`dot-${step.id}`} className="admissionStepsTimeline__dotSlot">
                                    <button
                                        type="button"
                                        className={[
                                            "admissionStepsTimeline__dot",
                                            isActive ? "is-active" : "",
                                        ]
                                            .filter(Boolean)
                                            .join(" ")}
                                        aria-current={isActive ? "step" : undefined}
                                        aria-label={label}
                                        onClick={() => onSelect(index)}
                                    />
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className="admissionStepsTimeline__cardsGrid">
                    {steps.map((step, index) => {
                        const isActive = index === activeIndex
                        const label = isAr ? step.titleAr : step.titleEn

                        return (
                            <div
                                key={step.id}
                                ref={(el) => {
                                    cardRefs.current[index] = el
                                }}
                                className="admissionStepsTimeline__cardCol"
                            >
                                <div
                                    className={[
                                        "admissionStepsTimeline__connector",
                                        isActive ? "is-active" : "",
                                    ]
                                        .filter(Boolean)
                                        .join(" ")}
                                    aria-hidden
                                />

                                <div className="admissionStepsTimeline__cardWrap group">
                                    {isAdmin && (
                                        <div className="admissionStepsTimeline__adminActions">
                                            <button
                                                type="button"
                                                aria-label="تعديل الخطوة"
                                                className="admissionStepsTimeline__adminBtn admissionStepsTimeline__adminBtn--edit"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    onEdit?.(step)
                                                }}
                                            >
                                                <Pencil className="size-3" />
                                            </button>
                                            <button
                                                type="button"
                                                aria-label="حذف الخطوة"
                                                className="admissionStepsTimeline__adminBtn admissionStepsTimeline__adminBtn--delete"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    onDelete?.(step.id)
                                                }}
                                            >
                                                <Trash2 className="size-3" />
                                            </button>
                                        </div>
                                    )}

                                    <button
                                        type="button"
                                        className={[
                                            "admissionStepsTimeline__card",
                                            isActive ? "is-active" : "",
                                        ]
                                            .filter(Boolean)
                                            .join(" ")}
                                        onClick={() => onSelect(index)}
                                    >
                                        <span className="admissionStepsTimeline__number">{step.number}</span>
                                        <h5 className="admissionStepsTimeline__label">{label}</h5>
                                    </button>
                                </div>
                            </div>
                        )
                    })}

                    {isAdmin && onAdd && (
                        <div className="admissionStepsTimeline__cardCol admissionStepsTimeline__cardCol--add">
                            <div className="admissionStepsTimeline__connector admissionStepsTimeline__connector--placeholder" />
                            <button type="button" className="admissionStepsTimeline__addBtn" onClick={onAdd}>
                                <Plus className="mb-1 size-6" />
                                إضافة خطوة
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
