"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Pencil, Trash2, Plus, Shield, GraduationCap, Briefcase } from "lucide-react";
import { UserAddDialog } from "@/components/dashboard/users/UserAddDialog";
import { UserEditDialog } from "@/components/dashboard/users/UserEditDialog";
import { UserDeleteDialog } from "@/components/dashboard/users/UserDeleteDialog";

export type UserRow = {
    id: string;
    name: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    accessCode: string;
};

const roleIcons: Record<string, React.ReactNode> = {
    admin: <Shield className="size-3" />,
    student: <GraduationCap className="size-3" />,
    staff: <Briefcase className="size-3" />,
};

const roleColors: Record<string, string> = {
    admin: "bg-purple-100 text-purple-700",
    student: "bg-blue-100 text-blue-700",
    staff: "bg-emerald-100 text-emerald-700",
};

type RoleFilter = "student" | "staff" | "admin" | "all";

const filterConfig: { key: RoleFilter; color: string; activeClass: string }[] = [
    { key: "student",  color: "border-blue-200 text-blue-700 hover:bg-blue-50",    activeClass: "bg-blue-600 text-white border-blue-600 hover:bg-blue-600" },
    { key: "staff",    color: "border-emerald-200 text-emerald-700 hover:bg-emerald-50", activeClass: "bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-600" },
    { key: "admin",    color: "border-purple-200 text-purple-700 hover:bg-purple-50",  activeClass: "bg-purple-600 text-white border-purple-600 hover:bg-purple-600" },
    { key: "all",      color: "border-gray-200 text-gray-600 hover:bg-gray-50",        activeClass: "bg-gray-700 text-white border-gray-700 hover:bg-gray-700" },
];

export function UsersTable() {
    const t = useTranslations("dashboardUsers");
    const locale = useLocale();
    const isRtl = locale === "ar";

    const [users, setUsers] = useState<UserRow[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<RoleFilter>("student");

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/users");
            const json = (await res.json()) as { ok: boolean; data: UserRow[] };
            if (json.ok) setUsers(json.data);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        void fetchUsers();
    }, [fetchUsers]);

    const roleLabel = (role: string) => {
        if (role === "admin") return t("roleAdmin");
        if (role === "student") return t("roleStudent");
        if (role === "staff") return t("roleStaff");
        return role;
    };

    const filterLabel = (key: RoleFilter) => {
        if (key === "student") return t("filterStudents");
        if (key === "staff") return t("filterStaff");
        if (key === "admin") return t("filterAdmins");
        return t("filterAll");
    };

    const filterIcon = (key: RoleFilter) => roleIcons[key] ?? null;

    const filtered = filter === "all" ? users : users.filter((u) => u.role === filter);

    const counts: Record<RoleFilter, number> = {
        student: users.filter((u) => u.role === "student").length,
        staff:   users.filter((u) => u.role === "staff").length,
        admin:   users.filter((u) => u.role === "admin").length,
        all:     users.length,
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-semibold text-[#254151]">{t("pageTitle")}</h1>
                    <p className="text-sm text-muted-foreground">{t("pageSubtitle")}</p>
                </div>
                <UserAddDialog onSuccess={fetchUsers}>
                    <Button className="gap-2">
                        <Plus className="size-4" />
                        {t("addUser")}
                    </Button>
                </UserAddDialog>
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap gap-2">
                {filterConfig.map(({ key, color, activeClass }) => (
                    <button
                        key={key}
                        type="button"
                        onClick={() => setFilter(key)}
                        className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                            filter === key ? activeClass : color
                        }`}
                    >
                        {filterIcon(key)}
                        {filterLabel(key)}
                        {!loading && (
                            <span className={`ms-0.5 rounded-full px-1.5 py-0.5 text-xs font-semibold ${
                                filter === key ? "bg-white/20" : "bg-gray-100 text-gray-500"
                            }`}>
                                {counts[key]}
                            </span>
                        )}
                    </button>
                ))}
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-50">
                            <TableHead className={`text-sm font-semibold text-gray-700 ${isRtl ? "text-right" : "text-left"}`}>{t("colName")}</TableHead>
                            <TableHead className={`text-sm font-semibold text-gray-700 ${isRtl ? "text-right" : "text-left"}`}>{t("colLoginId")}</TableHead>
                            <TableHead className={`text-sm font-semibold text-gray-700 ${isRtl ? "text-right" : "text-left"}`}>{t("colRole")}</TableHead>
                            <TableHead className="text-sm font-semibold text-gray-700 text-center">{t("colActions")}</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={4} className="py-12 text-center text-gray-400">
                                    {t("loading")}
                                </TableCell>
                            </TableRow>
                        ) : users.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="py-12 text-center text-gray-500">
                                    {t("empty")}
                                </TableCell>
                            </TableRow>
                        ) : filtered.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="py-12 text-center text-gray-500">
                                    {t("empty")}
                                </TableCell>
                            </TableRow>
                        ) : (
                            filtered.map((user) => {
                                const color = roleColors[user.role] ?? roleColors.admin;
                                return (
                                    <TableRow key={user.id} className="hover:bg-gray-50/50">
                                        <TableCell>
                                            <div className="font-semibold text-[#254151]">{user.name}</div>
                                            {user.role !== "admin" && user.email && (
                                                <div
                                                    className="text-xs text-gray-400 mt-0.5"
                                                    dir="ltr"
                                                    style={{ textAlign: isRtl ? "right" : "left", unicodeBidi: "plaintext" }}
                                                >
                                                    {user.email}
                                                </div>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {user.role === "admin" ? (
                                                <span className="text-sm text-gray-600" dir="ltr">{user.email}</span>
                                            ) : (
                                                <span
                                                    className={`inline-flex w-fit items-center rounded px-2 py-0.5 font-mono text-sm font-semibold tracking-wider ${user.role === "student" ? "bg-blue-50 text-blue-700" : "bg-emerald-50 text-emerald-700"}`}
                                                    dir="ltr"
                                                >
                                                    {user.accessCode || "—"}
                                                </span>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${color}`}>
                                                {roleIcons[user.role]}
                                                {roleLabel(user.role)}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center justify-center gap-2">
                                                <UserEditDialog user={user} onSuccess={fetchUsers}>
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon-sm"
                                                        className="text-[#6096b4] hover:text-[#4f7e97]"
                                                        title={t("edit")}
                                                    >
                                                        <Pencil className="size-4" />
                                                    </Button>
                                                </UserEditDialog>
                                                <UserDeleteDialog user={user} onSuccess={fetchUsers}>
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon-sm"
                                                        className="text-red-600 hover:text-red-700"
                                                        title={t("delete")}
                                                    >
                                                        <Trash2 className="size-4" />
                                                    </Button>
                                                </UserDeleteDialog>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
