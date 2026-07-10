"use client"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { Menu } from "lucide-react"
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
                    className="rounded-md px-2 py-2 text-sm text-foreground hover:bg-muted break-words block"
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
                            "rounded-full",
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
                            <SheetTitle>Menu </SheetTitle>
                        </SheetHeader>
                        <div className="mt-6 space-y-6">

                            <Link
                                href="/"
                                onClick={closeSheet}
                                className="block rounded-md px-2 py-2 text-sm font-medium text-foreground hover:bg-muted"
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
                                href="/"
                                onClick={closeSheet}
                                className="block rounded-md px-2 py-2 text-sm font-medium text-foreground hover:bg-muted"

                            >
                                {t("news")}
                            </Link>
                            <Link
                                href="/main/contact-directory"
                                onClick={closeSheet}
                                className="block rounded-md px-2 py-2 text-sm font-medium text-foreground hover:bg-muted"
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