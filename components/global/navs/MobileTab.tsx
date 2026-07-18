"use client"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { MOODLE_URL } from "@/lib/external-links"

import { ArrowUpRight, Menu } from "lucide-react"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import Link from "next/link"
import { NavCategory } from "./DetailNav"
import { useTranslations } from "next-intl"
import React from "react"

type MobileNavLink = {
    title: string
    href: string
    submenu?: MobileNavLink[]
}

export default function MobileTab(
    { isSolid, CATEGORIES }: { isSolid: boolean; CATEGORIES: NavCategory[] }
) {
    const t = useTranslations("navbar")
    const [open, setOpen] = React.useState(false)

    const closeSheet = React.useCallback(() => {
        setOpen(false)
    }, [])

    const renderLink = (link: MobileNavLink, nested: boolean) => {
        return (
            <div className={nested ? "pl-4" : ""}>
                <Link
                    href={link.href}
                    onClick={closeSheet}
                    className="rounded-md px-2 py-2.5 text-sm text-foreground hover:bg-muted break-words block min-h-11"
                >
                    {link.title}
                </Link>
                {Array.isArray(link.submenu) && link.submenu.length > 0 ? (
                    <div className="mt-1 grid grid-cols-1 gap-1">
                        {link.submenu.map((sub) => (
                            <div key={`${link.title}-${sub.title}`}>{renderLink(sub, true)}</div>
                        ))}
                    </div>
                ) : null}
            </div>
        )
    }

    return (
        <div className="flex items-center gap-2 lg:hidden ">
            <Sheet open={open} onOpenChange={setOpen}>

                <SheetTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className={cn(
                            "size-11 rounded-full",
                            isSolid ? "text-foreground" : "text-white"
                        )}
                        aria-label="Open menu"
                        onClick={() => setOpen(true)}
                    >
                        <Menu className="h-5 w-5" />
                    </Button>
                </SheetTrigger>
                <SheetContent className="p-0 w-[90vw] max-w-[360px]">

                    <div className="p-4 sm:p-6 overflow-y-auto max-h-[100dvh]" >
                        <SheetHeader>
                            <SheetTitle>Menu</SheetTitle>
                        </SheetHeader>
                        <div className="mt-6 space-y-6">
                            <Link
                                href="/main/admission"
                                onClick={closeSheet}
                                className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-gradient-to-br from-[#e8d9bb] via-[#c9ac72] to-[#a68950] px-3 py-3 text-sm font-semibold text-[#1E3540] shadow-sm"
                            >
                                <span>{t("apply_now")}</span>
                                <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden />
                            </Link>

                            <div className="grid grid-cols-1 gap-1 rounded-lg border border-border/60 p-2">
                                <a
                                    href={MOODLE_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={closeSheet}
                                    className="rounded-md px-2 py-2.5 text-sm font-medium text-foreground hover:bg-muted min-h-11"
                                >
                                    {t("model")}
                                </a>
                                <Link
                                    href="/main/student-portal"
                                    onClick={closeSheet}
                                    className="rounded-md px-2 py-2.5 text-sm font-medium text-foreground hover:bg-muted min-h-11"
                                >
                                    {t("student_gateway")}
                                </Link>
                                <Link
                                    href="/main/academic-calendar"
                                    onClick={closeSheet}
                                    className="rounded-md px-2 py-2.5 text-sm font-medium text-foreground hover:bg-muted min-h-11"
                                >
                                    {t("aca_cal")}
                                </Link>
                            </div>

                            <Link
                                href="/main"
                                onClick={closeSheet}
                                className="block rounded-md px-2 py-2.5 text-sm font-medium text-foreground hover:bg-muted min-h-11"
                            >
                                {t("main")}
                            </Link>
                            {CATEGORIES.map((category) => (
                                <div key={category.label} className="space-y-2">
                                    <div className="text-sm font-semibold text-foreground break-words">
                                        {category.label}
                                    </div>
                                    {category?.links &&
                                        <div className="grid grid-cols-1 gap-1">
                                            {category?.links.map((link) => (
                                                <div key={link.title}>{renderLink(link, false)}</div>
                                            ))}
                                        </div>
                                    }
                                </div>
                            ))}

                            <Link
                                href="/main/news"
                                onClick={closeSheet}
                                className="block rounded-md px-2 py-2.5 text-sm font-medium text-foreground hover:bg-muted min-h-11"
                            >
                                {t("news")}
                            </Link>
                            <Link
                                href="/main/contact-directory"
                                onClick={closeSheet}
                                className="block rounded-md px-2 py-2.5 text-sm font-medium text-foreground hover:bg-muted min-h-11"
                            >
                                {t("contact")}
                            </Link>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    )
}
