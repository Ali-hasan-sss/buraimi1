"use client"

import Link from "next/link"
import { NavCategory } from "./DetailNav"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Dispatch, SetStateAction } from "react"
import { useTranslations } from "next-intl"

export default function DesktopTab(
    {
        isSolid,
        CATEGORIES,
        cancelClose, setActiveCategory, activeCategory }
        :
        {
            isSolid: boolean,
            CATEGORIES: NavCategory[],
            cancelClose: () => void,
            setActiveCategory: Dispatch<SetStateAction<NavCategory | null>>,
            activeCategory: NavCategory | null
        }
) {

    const t = useTranslations("navbar")
    return (

        <div className="hidden items-center lg:flex ">
            <nav
                className="flex items-center re"
                onKeyDown={(e) => {
                    if (e.key === "Escape") setActiveCategory(null)
                }}
            >
                <Link
                    href="/"
                    className={cn(
                        "inline-flex h-9 items-center rounded-md px-3 text-sm font-medium transition-colors",
                        isSolid ? "text-foreground hover:bg-muted" : "text-white hover:bg-white/10"
                    )}
                    onMouseEnter={() => {
                        cancelClose()
                        setActiveCategory(null)
                    }}
                    onFocus={() => setActiveCategory(null)}
                >
                    {t("main")}
                </Link>

                {CATEGORIES.map((category) => {
                    const hasLinks = Array.isArray(category.links) && category.links.length > 0

                    if (!hasLinks && category.href) {
                        return (
                            <Link
                                key={category.label}
                                href={category.href}
                                className={cn(
                                    "group relative inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm font-semibold transition-all",
                                    isSolid
                                        ? "text-foreground hover:bg-foreground/5"
                                        : "text-white hover:bg-white/10",
                                    "hover:text-[hsl(var(--ring))]",
                                    "after:absolute after:inset-x-4 after:bottom-2 after:h-px after:origin-center after:scale-x-0 after:bg-[hsl(var(--ring))] after:transition-transform after:duration-200 group-hover:after:scale-x-100"
                                )}
                                onMouseEnter={() => {
                                    cancelClose()
                                    setActiveCategory(null)
                                }}
                                onFocus={() => setActiveCategory(null)}
                            >
                                <span className="relative">

                                    {category.label}</span>
                            </Link>
                        )
                    }

                    return (
                        <Link
                            href={category.href ?? "/main"}
                            key={category.label}
                            type="button"
                            className={cn(
                                "group relative inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm font-semibold transition-all",
                                isSolid
                                    ? "text-foreground hover:bg-foreground/5"
                                    : "text-white hover:bg-white/10",
                                activeCategory?.label === category.label && isSolid
                                    ? "bg-foreground/5"
                                    : null,
                                "hover:text-[hsl(var(--ring))]",
                                "after:absolute after:inset-x-4 after:bottom-2 after:h-px after:origin-center after:scale-x-0 after:bg-[hsl(var(--ring))] after:transition-transform after:duration-200 group-hover:after:scale-x-100",
                                activeCategory?.label === category.label
                                    ? "after:scale-x-100"
                                    : null
                            )}
                            onMouseEnter={() => {
                                cancelClose()
                                setActiveCategory(hasLinks ? category : null)
                            }}
                            onFocus={() => setActiveCategory(hasLinks ? category : null)}
                        >
                            <span className="relative">{category.label}</span>
                            {hasLinks ? (
                                <ChevronDown
                                    className={cn(
                                        "h-4 w-4 transition-transform duration-200",
                                        activeCategory?.label === category.label
                                            ? "rotate-180"
                                            : "rotate-0"
                                    )}
                                />
                            ) : null}
                        </Link>
                    )
                })}


                <Link
                    href="/main/contact-directory"
                    className={cn(
                        "inline-flex h-9 items-center rounded-md px-3 text-sm font-medium transition-colors",
                        isSolid ? "text-foreground hover:bg-muted" : "text-white hover:bg-white/10"
                    )}
                    onMouseEnter={() => {
                        cancelClose()
                        setActiveCategory(null)
                    }}
                    onFocus={() => setActiveCategory(null)}
                >
                    {t("contact")}
                </Link>
            </nav>
        </div>
    )
}