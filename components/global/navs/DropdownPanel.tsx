
"use client"

import { useLocale } from "next-intl"
import React from "react"
import { createPortal } from "react-dom"

import { cn } from "@/lib/utils"


import { motion, type Variants } from "framer-motion"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { NavCategory } from "./DetailNav"

type DropdownLink = NonNullable<NavCategory["links"]>[number]

export default function DropdownPanel({ category }: { category: NavCategory }) {
    const locale = useLocale()

    const [openSubmenuKey, setOpenSubmenuKey] = React.useState<string | null>(null)
    const [openSubmenuLinks, setOpenSubmenuLinks] = React.useState<DropdownLink[] | null>(null)
    const closeTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

    React.useEffect(() => {
        return () => {
            if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
        }
    }, [])

    const cancelClose = React.useCallback(() => {
        if (closeTimerRef.current) {
            clearTimeout(closeTimerRef.current)
            closeTimerRef.current = null
        }
    }, [])

    const scheduleClose = React.useCallback(() => {
        cancelClose()
        closeTimerRef.current = setTimeout(() => {
            setOpenSubmenuKey(null)
            setOpenSubmenuLinks(null)
        }, 120)
    }, [cancelClose])

    const canPortal = typeof document !== "undefined"

    const submenuPortal = React.useMemo(() => {
        if (!canPortal || !openSubmenuKey || !openSubmenuLinks) return null

        return createPortal(
            <div
                className={cn(
                    "overflow-y-auto max-h-[300px]",
                    "fixed top-[30%] z-[1000] min-w-64 rounded-xl border bg-white p-2 shadow-lg",
                    locale === "en" ? "right-[20px]" : "left-[20px]",
                    "opacity-100 visible pointer-events-auto translate-y-0",
                    "transition-all duration-150"
                )}
                onMouseEnter={() => {
                    cancelClose()
                }}
                onMouseLeave={() => {
                    scheduleClose()
                }}
            >
                <div className="grid grid-cols-1 gap-1">
                    {openSubmenuLinks.map((sub) => (
                        <Link
                            key={`${openSubmenuKey}-${sub.title}`}
                            href={sub.href}
                            className={cn(
                                "block rounded-md px-2 py-2 text-sm font-medium text-foreground transition-colors",
                                "hover:bg-foreground/5",
                                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2"
                            )}
                        >
                            {sub.title}
                        </Link>
                    ))}
                </div>
            </div>,
            document.body
        )
    }, [canPortal, cancelClose, locale, openSubmenuKey, openSubmenuLinks, scheduleClose])

    function renderLink(link: DropdownLink, nested: boolean) {
        const hasSubmenu = Array.isArray(link.submenu) && link.submenu.length > 0
        const submenuKey = `${link.title}-${link.href}`
        return (
            <div
                className={cn(nested ? "pl-6" : "", hasSubmenu ? "group " : '')}
                onMouseEnter={() => {
                    cancelClose()
                    if (hasSubmenu) {
                        setOpenSubmenuKey(submenuKey)
                        setOpenSubmenuLinks(link.submenu ?? null)
                    }
                }}
                onMouseLeave={() => {
                    if (hasSubmenu) scheduleClose()
                }}
            >
                <div >
                    <Link
                        href={link.href}
                        className={cn(
                            "group ",
                            "block rounded-md px-2 py-2 transition-colors",
                            "hover:bg-foreground/5",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2"
                        )}
                    >
                        <div className=" flex items-start gap-3">
                            <div className="" />
                            <div className="min-w-0 flex items-center gap-2">
                                <div className="bg-ring w-4 h-4 rounded-full"></div>
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center truncate text-sm font-semibold text-foreground transition-colors group-hover:text-[hsl(var(--ring))]">
                                        {link.title}
                                        {hasSubmenu ?
                                            locale == "ar" ?
                                                <ChevronLeft className="size-4 mx-5" />
                                                :
                                                <ChevronRight className="size-4 mx-5" />
                                            : <></>
                                        }
                                    </div>
                                </div>
                                {link.description ? (
                                    <div className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                                        {link.description}
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    </Link>


                </div>
            </div>
        )
    }

    const linkColumns = React.useMemo(() => {
        const links = category.links ?? []
        const perColumn = 7
        const cols: DropdownLink[][] = []
        for (let i = 0; i < links.length; i += perColumn) {
            cols.push(links.slice(i, i + perColumn))
        }
        return cols
    }, [category.links])

    const listVariants = React.useMemo(
        (): Variants => ({
            hidden: {},
            show: {
                transition: {
                    staggerChildren: 0.12,
                    delayChildren: 0.08,
                },
            },
        }),
        []
    )

    const itemVariants = React.useMemo(
        (): Variants => ({
            hidden: { opacity: 0, y: -10, scale: 0.98, filter: "blur(6px)" },
            show: {
                opacity: 1,
                y: 0,
                scale: 1,
                filter: "blur(0px)",
                transition: { duration: 0.38 },
            },
        }),
        []
    )

    return (
        <div className=" backdrop-blur-lg border-b bg-white/90  border-border/60 shadow-lg shadow-black/5 backdrop-blur-xl">
            {submenuPortal}
            <div className="mx-auto max-w-7xl px-3 sm:px-4 py-6 sm:py-8 text-foreground">
                <div className=" overflow-hidden rounded-2xl  ">
                    <div className="pointer-events-none absolute inset-0 " />

                    <div className=" grid grid-cols-1 gap-6 sm:gap-8 p-4 sm:p-6 md:grid-cols-2 md:p-8">
                        <div className={`space-y-3  ps-6 md:ps-8 
                            border-ring ${locale == "en" ? "border-r-2" : "border-l-2"} `}>

                            <h3 className="text-xl sm:text-2xl font-semibold text-foreground md:text-4xl break-words">
                                {category.title}
                            </h3>

                            <p className="text-xs sm:text-sm leading-relaxed text-foreground break-words">
                                {category.description}
                            </p>
                        </div>

                        <motion.div
                            className={cn(
                                "grid gap-6",
                                linkColumns.length <= 1
                                    ? "grid-cols-1"
                                    : linkColumns.length === 2
                                        ? "grid-cols-2"
                                        : "grid-cols-3"
                            )}
                            variants={listVariants}
                            initial="hidden"
                            animate="show"
                            key={category.label}
                        >
                            {linkColumns.map((col, colIdx) => (
                                <div key={colIdx} className="grid grid-cols-1 gap-1">
                                    {col.map((link) => (
                                        <motion.div key={link.title} variants={itemVariants}>
                                            {renderLink(link, false)}
                                        </motion.div>
                                    ))}
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    )
}
