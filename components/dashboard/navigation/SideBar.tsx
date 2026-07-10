"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState, type ComponentType } from "react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { Award, BookOpen, CalendarDays, Contact2, GraduationCap, Handshake, Landmark, LayoutDashboard, Mail, Newspaper, Package, PanelLeftClose, PanelLeftOpen, Presentation, Users, FileText, ShieldCheck } from "lucide-react";

type NavItem = {
    title: string;
    href: string;
    icon: ComponentType<{ className?: string }>;
};

export default function SideBar() {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);
    const tCouncil = useTranslations("dashboardCouncil");
    const tNav = useTranslations("dashboardNav");

    const navItems = useMemo<NavItem[]>(
        () => [
            { title: tNav("dashboard"), href: "/dashboard", icon: LayoutDashboard },
            { title: tNav("users"), href: "/dashboard/users", icon: Users },
            { title: tCouncil("sidebarNav"), href: "/dashboard/council", icon: Landmark },
            { title: tNav("messages"), href: "/dashboard/messages", icon: Mail },
            { title: tNav("partners"), href: "/dashboard/partners", icon: Handshake },
            { title: tNav("departments"), href: "/dashboard/departments", icon: BookOpen },
            { title: tNav("graduatePrograms"), href: "/dashboard/graduate-programs", icon: GraduationCap },
            { title: tNav("news"), href: "/dashboard/news", icon: Newspaper },
            { title: tNav("events"), href: "/dashboard/events", icon: CalendarDays },
            { title: tNav("researchHighlights"), href: "/dashboard/research-highlights", icon: Award },
            { title: tNav("careers"), href: "/dashboard/careers", icon: Package },
            { title: tNav("seminars"), href: "/dashboard/seminars", icon: Presentation },
            { title: "Practice Placement Tests", href: "/dashboard/practice-exams", icon: FileText },
            { title: tNav("contact"), href: "/dashboard/contact", icon: Contact2 },
            { title: tNav("privacyPolicy"), href: "/dashboard/privacy-policy", icon: ShieldCheck },
        ],
        [tCouncil, tNav],
    );

    return (
        <aside
            className={cn(
                "sticky top-0 flex h-full min-h-0 w-full flex-col border-r bg-background",
                "transition-[width] duration-200 ease-in-out",
                collapsed ? "w-16" : "w-64"
            )}
        >
            <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
                <div className={cn("flex items-center gap-2 border-b px-3 py-3", collapsed ? "justify-center" : "justify-between")}>
                    {!collapsed && (
                        <div className="flex items-center gap-2">
                            <div className="size-8 rounded-md border bg-muted" />
                            <div className="text-sm font-semibold">{tNav("dashboard")}</div>
                        </div>
                    )}

                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="shrink-0"
                        onClick={() => setCollapsed((v) => !v)}
                        aria-label={collapsed ? tNav("expandSidebar") : tNav("collapseSidebar")}
                    >
                        {collapsed ? <PanelLeftOpen className="size-5" /> : <PanelLeftClose className="size-5" />}
                    </Button>
                </div>

                <nav className="flex-1 px-2 py-3">
                    <div className="space-y-1">
                        {navItems.map((item) => {
                            const active = pathname === item.href;
                            const Icon = item.icon;

                            return (
                                <Button
                                    key={item.href}
                                    asChild
                                    variant={active ? "secondary" : "ghost"}
                                    className={cn(
                                        "w-full justify-start gap-2",
                                        collapsed && "justify-center px-0"
                                    )}
                                >
                                    <Link href={item.href}>
                                        <Icon className="size-4" />
                                        {!collapsed && <span className="truncate">{item.title}</span>}
                                    </Link>
                                </Button>
                            );
                        })}
                    </div>
                </nav>

                {!collapsed && (
                    <div className="border-t px-3 py-3 text-xs text-muted-foreground">
                        {tNav("signedIn")}
                    </div>
                )}
            </div>
        </aside>
    );
}