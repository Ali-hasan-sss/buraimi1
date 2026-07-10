"use client"
import type { ComponentType } from "react";
import { useEffect, useState } from "react";
import Link from "next/link";

import { Briefcase, GraduationCap, Pencil, Shield, UserCheck, Users } from "lucide-react";

import { motion } from "framer-motion"
import { fetchBoardDirectors } from "@/store/contentSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import { CouncilMemberAvatar } from "@/components/about/CouncilMemberAvatar";

type BoardDirector = {
    _id: string;
    name: string;
    role: string;
    image?: string;
};

export default function BoardDirectorsContent() {

    const data: { title: string; icon: ComponentType<{ className?: string }>; color: string }[] = [
        { title: 'مجلس الإدارة', icon: Briefcase, color: 'from-[#254151] to-[#2d4a5c]' },
        { title: 'مجلس الأمناء', icon: Shield, color: 'from-[#6096b4] to-[#7aa5be]' },
        { title: 'المجلس الاستشاري', icon: Users, color: 'from-[#c2a772] to-[#d4b883]' },
        { title: 'مجلس الكلية', icon: GraduationCap, color: 'from-[#254151] to-[#6096b4]' }
    ]

    const dispatch = useAppDispatch();
    const boardDirectors = useAppSelector((state) => state.content.boardDirectors.items as BoardDirector[]);
    const loading = useAppSelector((state) => state.content.boardDirectors.loading);
    const error = useAppSelector((state) => state.content.boardDirectors.error);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if (!boardDirectors.length && !loading) {
            void dispatch(fetchBoardDirectors());
        }
    }, [boardDirectors.length, dispatch, loading]);

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
                    <Briefcase className="size-8 text-white" />
                </div>
                <div>
                    <h2 className="text-4xl font-bold bg-gradient-to-l from-[#254151] to-[#2d4a5c] bg-clip-text text-transparent">
                        مجلس الإدارة
                    </h2>
                </div>
                {isAdmin && (
                    <Link
                        href="/dashboard/council/board-directors"
                        className="ms-auto inline-flex items-center gap-2 rounded-lg bg-[#254151] px-4 py-2 text-sm font-semibold text-white shadow-lg"
                    >
                        <Pencil className="size-4" />
                        إدارة المجلس
                    </Link>
                )}
            </div>

            {/* نص تعريفي */}
            <div className="bg-gradient-to-br from-blue-50 to-amber-50/30 p-8 rounded-2xl border border-blue-100/50 shadow-sm">
                <p className="text-gray-700 leading-relaxed mb-4 text-lg">
                    <span className="font-bold text-[#254151]">The Board of Directors</span> is one of the key governance bodies at Al Buraimi University College. <span className="font-bold text-[#254151]">Sheikh Ahmed Bin Nasser Al Nuaimi</span> serves as the Chairman of the Board of Directors.
                </p>

                <div className="my-6 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

                <p className="text-gray-700 leading-relaxed text-lg mb-6">
                    مجلس الإدارة هو جزء من هيكلنا الإداري الشامل الذي يشمل:
                </p>

                {/* قائمة المجالس */}
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                    {data.map((council, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                        >
                            <div className={`p-2 bg-gradient-to-br ${council.color} rounded-lg`}>
                                <council.icon className="size-5 text-white" />
                            </div>
                            <span className="font-bold text-[#254151]">{council.title}</span>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* أعضاء مجلس الإدارة */}
            <div className="mt-12">
                <div className="flex items-center gap-3 mb-8 pb-4 border-b-2 border-[#c2a772]/30">
                    <div className="h-1 w-12 bg-gradient-to-r from-[#254151] to-[#6096b4] rounded-full"></div>
                    <h3 className="text-3xl font-bold text-[#254151]">أعضاء مجلس الإدارة</h3>
                </div>

                {loading ? (
                    <div className="text-[#254151] font-bold">Loading...</div>
                ) : error ? (
                    <div className="text-red-600 font-bold">{error}</div>
                ) : boardDirectors.length === 0 ? (
                    <div className="text-[#254151] font-bold">No data</div>
                ) : (
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* رئيس مجلس الإدارة */}
                        {boardDirectors.map((data, key) => {
                            return (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + key * 0.1 }}
                                    className="group "
                                    key={data._id}
                                >
                                    <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-2xl border-2 border-[#254151] shadow-lg hover:shadow-2xl transition-all duration-300 text-center">
                                        <div className="relative inline-block mb-6">
                                            <div className="absolute -inset-1 bg-gradient-to-r from-[#254151] to-[#6096b4] rounded-2xl blur-md opacity-40 group-hover:opacity-70 transition duration-300"></div>
                                            <CouncilMemberAvatar
                                                image={data.image}
                                                name={data.name}
                                                fallback={data.role === "عضو" ? UserCheck : Users}
                                                className="h-32 w-32 mx-auto bg-gradient-to-br from-[#254151] to-[#2d4a5c] rounded-2xl"
                                                iconClassName={data.role === "عضو" ? "size-14 text-white" : "size-16 text-white"}
                                            />
                                        </div>

                                        <div className="space-y-3">
                                            <h4 className="text-2xl min-h-[64px] font-bold text-[#254151]">{data.name}</h4>
                                            <div className="inline-block px-4 py-2 bg-gradient-to-r from-[#254151] to-[#2d4a5c] rounded-full">
                                                <p className="text-white font-bold">{data.role}</p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
