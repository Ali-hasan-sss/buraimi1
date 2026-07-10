"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import { GraduationCap, Pencil, Shield, UserCheck } from "lucide-react";

import { motion } from "framer-motion"
import { fetchBoardTrustees } from "@/store/contentSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import { CouncilMemberAvatar } from "@/components/about/CouncilMemberAvatar";

export default function AccreditationCouncilContent() {
    type Trustee = {
        _id: string;
        name: string;
        role: string;
        image?: string;
    };

    const dispatch = useAppDispatch();
    const trustees = useAppSelector((state) => state.content.boardTrustees.items as Trustee[]);
    const loading = useAppSelector((state) => state.content.boardTrustees.loading);
    const error = useAppSelector((state) => state.content.boardTrustees.error);
    const [isAdmin, setIsAdmin] = useState(false);

    const specialRoleConfig: Record<
        string,
        {
            containerClassName: string;
            glowClassName: string;
            avatarClassName: string;
            roleClassName: string;
            icon: typeof Shield | typeof GraduationCap;
        }
    > = {
        "رئيس مجلس الأمناء": {
            containerClassName:
                "bg-gradient-to-br from-blue-50 to-white p-6 rounded-2xl border-2 border-[#254151] shadow-lg hover:shadow-2xl transition-all duration-300 text-center",
            glowClassName:
                "absolute -inset-1 bg-gradient-to-r from-[#254151] to-[#6096b4] rounded-2xl blur-md opacity-40 group-hover:opacity-70 transition duration-300",
            avatarClassName:
                "h-32 w-32 mx-auto bg-gradient-to-br from-[#254151] to-[#2d4a5c] rounded-2xl",
            roleClassName: "inline-block px-4 py-2 bg-gradient-to-r from-[#254151] to-[#2d4a5c] rounded-full",
            icon: Shield,
        },
        "نائب رئيس مجلس الأمناء": {
            containerClassName:
                "bg-gradient-to-br from-amber-50/50 to-white p-6 rounded-2xl border-2 border-[#6096b4] shadow-lg hover:shadow-2xl transition-all duration-300 text-center",
            glowClassName:
                "absolute -inset-1 bg-gradient-to-r from-[#6096b4] to-[#c2a772] rounded-2xl blur-md opacity-40 group-hover:opacity-70 transition duration-300",
            avatarClassName:
                "h-32 w-32 mx-auto bg-gradient-to-br from-[#6096b4] to-[#7aa5be] rounded-2xl",
            roleClassName: "inline-block px-4 py-2 bg-gradient-to-r from-[#6096b4] to-[#7aa5be] rounded-full",
            icon: Shield,
        },
        "عميد كلية البريمي الجامعية": {
            containerClassName:
                "bg-gradient-to-br from-white to-amber-50/50 p-6 rounded-2xl border-2 border-[#c2a772] shadow-lg hover:shadow-2xl transition-all duration-300 text-center",
            glowClassName:
                "absolute -inset-1 bg-gradient-to-r from-[#c2a772] to-[#6096b4] rounded-2xl blur-md opacity-40 group-hover:opacity-70 transition duration-300",
            avatarClassName:
                "h-32 w-32 mx-auto bg-gradient-to-br from-[#c2a772] to-[#d4b883] rounded-2xl",
            roleClassName: "inline-block px-4 py-2 bg-gradient-to-r from-[#c2a772] to-[#d4b883] rounded-full",
            icon: GraduationCap,
        },
    };

    useEffect(() => {
        if (!trustees.length && !loading) {
            void dispatch(fetchBoardTrustees());
        }
    }, [dispatch, loading, trustees.length]);

    useEffect(() => {
        async function checkAdmin() {
            try {
                const res = await fetch("/api/auth/me", {
                    method: "GET",
                    credentials: "include",
                    cache: "no-store",
                });
                const json = (await res.json()) as { ok: boolean; isAdmin?: boolean };
                setIsAdmin(Boolean(json.ok && json.isAdmin));
            } catch {
                setIsAdmin(false);
            }
        }
        void checkAdmin();
    }, []);

    return (
        <div className="space-y-8">
            <div className="flex items-center gap-4 pb-6 border-b-2 border-gray-200">
                <div className="p-3 bg-gradient-to-br from-[#254151] to-[#2d4a5c] rounded-xl">
                    <Shield className="size-8 text-white" />
                </div>
                <div>
                    <h2 className="text-4xl font-bold bg-gradient-to-l from-[#254151] to-[#2d4a5c] bg-clip-text text-transparent">
                        مجلس الأمناء
                    </h2>
                </div>
                {isAdmin && (
                    <Link
                        href="/dashboard/council/board-trustees"
                        className="ms-auto inline-flex items-center gap-2 rounded-lg bg-[#254151] px-4 py-2 text-sm font-semibold text-white shadow-lg"
                    >
                        <Pencil className="size-4" />
                        إدارة المجلس
                    </Link>
                )}
            </div>

            {/* نص تعريفي */}
            <div className=" bg-gradient-to-br from-blue-50 to-amber-50/30 p-8 rounded-2xl border border-blue-100/50 shadow-sm">
                <p className="text-gray-700 leading-relaxed text-lg">
                    مجلس الأمناء هو أحد الهيئات الإدارية الرئيسية في كلية البريمي الجامعية. فيما يلي أعضاء مجلس الأمناء الحاليون:
                </p>
            </div>

            {/* أعضاء مجلس الأمناء */}
            <div className="mt-12">
                <div className="flex items-center gap-3 mb-8 pb-4 border-b-2 border-[#c2a772]/30">
                    <div className="h-1 w-12 bg-gradient-to-r from-[#254151] to-[#6096b4] rounded-full"></div>
                    <h3 className="text-3xl font-bold text-[#254151]">أعضاء مجلس الأمناء</h3>
                </div>

                {loading ? (
                    <div className="text-[#254151] font-bold">Loading...</div>
                ) : error ? (
                    <div className="text-red-600 font-bold">{error}</div>
                ) : trustees.length === 0 ? (
                    <div className="text-[#254151] font-bold">No data</div>
                ) : (
                    <div className="grid md:grid-cols-3 gap-8">
                        {trustees.map((m, idx) => {
                            const isMember = m.role === "عضو";
                            const special = specialRoleConfig[m.role];
                            const Icon = isMember ? UserCheck : special?.icon || Shield;

                            return (
                                <motion.div
                                    key={m._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + idx * 0.05 }}
                                    className="group"
                                >
                                    <div
                                        className={
                                            isMember
                                                ? "bg-gradient-to-br from-white to-blue-50/50 p-6 rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 text-center"
                                                : (special?.containerClassName || "bg-gradient-to-br from-blue-50 to-white p-6 rounded-2xl border-2 border-[#254151] shadow-lg hover:shadow-2xl transition-all duration-300 text-center")
                                        }
                                    >
                                        <div className="relative inline-block mb-6">
                                            <div
                                                className={
                                                    isMember
                                                        ? "absolute -inset-1 bg-gradient-to-r from-[#6096b4] to-[#c2a772] rounded-2xl blur-md opacity-30 group-hover:opacity-60 transition duration-300"
                                                        : (special?.glowClassName || "absolute -inset-1 bg-gradient-to-r from-[#254151] to-[#6096b4] rounded-2xl blur-md opacity-40 group-hover:opacity-70 transition duration-300")
                                                }
                                            ></div>
                                            <CouncilMemberAvatar
                                                image={m.image}
                                                name={m.name}
                                                fallback={Icon}
                                                className={
                                                    isMember
                                                        ? "h-28 w-28 mx-auto bg-gradient-to-br from-[#6096b4] to-[#7aa5be] rounded-2xl"
                                                        : (special?.avatarClassName || "h-32 w-32 mx-auto bg-gradient-to-br from-[#254151] to-[#2d4a5c] rounded-2xl")
                                                }
                                                iconClassName={isMember ? "size-14 text-white" : "size-16 text-white"}
                                            />
                                        </div>

                                        <div className="space-y-3">
                                            <h4 className={isMember ? "text-xl font-bold text-[#254151]" : "text-2xl font-bold text-[#254151]"}>{m.name}</h4>
                                            <div
                                                className={
                                                    isMember
                                                        ? "inline-block px-4 py-2 bg-gradient-to-r from-[#6096b4] to-[#7aa5be] rounded-full"
                                                        : (special?.roleClassName || "inline-block px-4 py-2 bg-gradient-to-r from-[#254151] to-[#2d4a5c] rounded-full")
                                                }
                                            >
                                                <p className={isMember ? "text-white font-medium" : "text-white font-bold"}>{m.role}</p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}