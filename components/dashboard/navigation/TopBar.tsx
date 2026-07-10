"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import LangSwitcher from "@/components/global/toggleLang";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem,
    DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ChangePasswordDialog } from "@/components/dashboard/navigation/ChangePasswordDialog";

import { ExternalLink, KeyRound, LogOut, Menu, User } from "lucide-react";
import Image from "next/image";

import logo from "@/public/logo.webp";

export default function TopBar() {
    const pathname = usePathname();
    const router = useRouter();
    const [pwOpen, setPwOpen] = useState(false);
    const [loggingOut, setLoggingOut] = useState(false);

    const handleLogout = async () => {
        setLoggingOut(true);
        await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
        router.push("/login");
        router.refresh();
    };

    return (
        <>
            <ChangePasswordDialog open={pwOpen} onClose={() => setPwOpen(false)} />

            <header className="sticky top-0 z-40 w-full border-b bg-primary">
                <div className="mx-auto flex h-14 max-w-screen-2xl items-center gap-3 px-4">
                    <div className="flex items-center gap-2">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button type="button" variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
                                    <Menu className="size-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent className="w-72 p-0">
                                <SheetHeader className="border-b px-4 py-3">
                                    <SheetTitle>Dashboard</SheetTitle>
                                </SheetHeader>
                                <nav className="px-2 py-2">
                                    {[
                                        { title: "Dashboard", href: "/dashboard" },
                                        { title: "Users", href: "/dashboard/users" },
                                        { title: "Partners", href: "/dashboard/partners" },
                                    ].map((item) => {
                                        const active = pathname === item.href || pathname?.startsWith(item.href + "/");
                                        return (
                                            <Button key={item.href} asChild variant={active ? "secondary" : "ghost"} className="w-full justify-start">
                                                <Link href={item.href}>{item.title}</Link>
                                            </Button>
                                        );
                                    })}
                                </nav>
                            </SheetContent>
                        </Sheet>

                        <Link href="/dashboard" className="group flex items-center gap-2 text-white">
                            <div className="grid size-14 place-items-center">
                                <Image src={logo} width={500} height={100} alt="Buraimi logo" />
                            </div>
                            <div className="hidden sm:block">
                                <div className="text-sm font-semibold leading-none">Buraimi</div>
                                <div className="text-xs text-muted-foreground">Dashboard</div>
                            </div>
                        </Link>

                        <Button asChild variant="outline" size="sm" className="hidden sm:inline-flex">
                            <Link href="/main">
                                <ExternalLink className="me-2 size-4" />
                                View website
                            </Link>
                        </Button>
                    </div>

                    <div className="ms-auto flex items-center gap-2">
                        <LangSwitcher />

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button type="button" variant="outline" size="icon" aria-label="Account menu">
                                    <User className="size-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-52">
                                <DropdownMenuItem
                                    onSelect={() => setPwOpen(true)}
                                    className="cursor-pointer"
                                >
                                    <KeyRound className="me-2 size-4" />
                                    تغيير كلمة المرور
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onSelect={() => void handleLogout()}
                                    disabled={loggingOut}
                                    variant="destructive"
                                    className="cursor-pointer"
                                >
                                    <LogOut className="me-2 size-4" />
                                    {loggingOut ? "جاري الخروج..." : "تسجيل الخروج"}
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </header>
        </>
    );
}