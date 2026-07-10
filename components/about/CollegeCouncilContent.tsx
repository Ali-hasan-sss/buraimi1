"use client"
import { Briefcase, GraduationCap, Pencil, Users } from "lucide-react";
import Link from "next/link";

import { motion } from "framer-motion"
import { useEffect, useState } from "react";

import { CouncilMemberAvatar } from "@/components/about/CouncilMemberAvatar";

type CollegeCouncil = {
    name: string;
    role: string;
    description: string;
    _id: string;
    image?: string;
};

export default function CollegeCouncilContent() {


    const [member, setMember] = useState<CollegeCouncil[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        let cancelled = false;

        async function load() {
            try {
                const res = await fetch("/api/college-council", {
                    method: "GET",
                },

                )
                if (!res.ok) {
                    setError(`Request failed: ${res.status}`);
                    return
                }

                const json = (await res.json()) as { ok: boolean; data?: CollegeCouncil[] };
                if (!cancelled) {
                    if (json.ok && Array.isArray(json.data)) {
                        setMember(json.data);
                    } else {
                        setError('Invalid API response');
                    }
                }
            } catch {
                setError('Network error')
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        void load()
        return () => {
            cancelled = true;
        };
    }, [])

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

    const headeMember = member.filter((m) => m.role !== 'عضو' && m.role !== 'industry')
    const academicMembers = member.filter((m) => m.role === 'عضو')
    const industryMembers = member.filter((m) => m.role === 'industry')

    if (loading)
        return <div className="text-[#254151] font-bold">Loading...</div>
    if (error)
        return <div className="text-red-600 font-bold">{error}</div>

    return (
        <div className="space-y-8">
            <div className="flex items-center gap-4 pb-6 border-b-2 border-gray-200">
                <div className="p-3 bg-gradient-to-br from-[#254151] to-[#2d4a5c] rounded-xl">
                    <GraduationCap className="size-8 text-white" />
                </div>
                <div>
                    <h2 className="text-4xl font-bold bg-gradient-to-l from-[#254151] to-[#2d4a5c] bg-clip-text text-transparent">
                        مجلس الكلية
                    </h2>
                </div>
                {isAdmin && (
                    <Link
                        href="/dashboard/council/college-council"
                        className="ms-auto inline-flex items-center gap-2 rounded-lg bg-[#254151] px-4 py-2 text-sm font-semibold text-white shadow-lg"
                    >
                        <Pencil className="size-4" />
                        إدارة المجلس
                    </Link>
                )}
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {headeMember && headeMember.map((member, idx) => {
                    return (
                        <motion.div key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 + idx * 0.1 }}
                            className="group"
                        >
                            <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-2xl border-2 border-[#254151] shadow-lg hover:shadow-2xl transition-all duration-300 text-center">
                                <div className="relative inline-block mb-6">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-[#254151] to-[#6096b4] rounded-2xl blur-md opacity-40 group-hover:opacity-70 transition duration-300"></div>
                                    <CouncilMemberAvatar
                                        image={member.image}
                                        name={member.name}
                                        fallback={Users}
                                        className="h-32 w-32 mx-auto bg-gradient-to-br from-[#254151] to-[#2d4a5c] rounded-2xl"
                                        iconClassName="size-16 text-white"
                                    />
                                </div>

                                <div className="space-y-3">
                                    <h4 className="text-2xl font-bold text-[#254151]">
                                        {member.name}
                                    </h4>
                                    <div className="inline-block px-4 py-2 bg-gradient-to-r from-[#254151] to-[#2d4a5c] rounded-full mb-2">
                                        <p className="text-white font-bold text-sm">
                                            {member.role}
                                        </p>
                                    </div>
                                    {member.description &&
                                        <p className="text-gray-600 text-sm">
                                            {member.description}
                                        </p>
                                    }
                                </div>
                            </div>
                        </motion.div>
                    )
                })}

            </div>

            <div className="mt-12">
                <div className="flex items-center gap-3 mb-8 pb-4 border-b-2 border-[#c2a772]/30">
                    <div className="h-1 w-12 bg-gradient-to-r from-[#254151] to-[#6096b4] rounded-full"></div>
                    <h3 className="text-3xl font-bold text-[#254151]">الأعضاء الأكاديميون</h3>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {academicMembers.map((member, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + idx * 0.05 }}
                            className="group"
                        >
                            <div className="bg-gradient-to-br from-white to-blue-50/50 p-5 rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 text-center h-full">
                                <div className="relative inline-block mb-4">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-[#6096b4] to-[#c2a772] rounded-xl blur-sm opacity-30 group-hover:opacity-60 transition duration-300"></div>
                                    <CouncilMemberAvatar
                                        image={member.image}
                                        name={member.name}
                                        fallback={GraduationCap}
                                        className="mx-auto h-20 w-20 bg-gradient-to-br from-[#6096b4] to-[#7aa5be] rounded-xl"
                                        iconClassName="size-10 text-white"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <h4 className="font-bold text-[#254151] text-sm leading-tight">{member.name}</h4>
                                    <div className="inline-block px-3 py-1 bg-gradient-to-r from-[#6096b4] to-[#7aa5be] rounded-full">
                                        <p className="text-white text-xs font-medium">{member.role}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="mt-12">
                <div className="flex items-center gap-3 mb-8 pb-4 border-b-2 border-[#c2a772]/30">
                    <div className="h-1 w-12 bg-gradient-to-r from-[#6096b4] to-[#c2a772] rounded-full"></div>
                    <h3 className="text-3xl font-bold text-[#254151]">أعضاء من القطاع الصناعي</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {industryMembers.map((member, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + idx * 0.05 }}
                            className="group"
                        >
                            <div className="bg-gradient-to-br from-white to-amber-50/30 p-5 rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300">
                                <div className="flex items-start gap-4">
                                    <div className="relative shrink-0">
                                        <div className="absolute -inset-1 bg-gradient-to-r from-[#c2a772] to-[#6096b4] rounded-lg blur-sm opacity-30 group-hover:opacity-60 transition duration-300"></div>
                                        <CouncilMemberAvatar
                                            image={member.image}
                                            name={member.name}
                                            fallback={Briefcase}
                                            className="h-16 w-16 bg-gradient-to-br from-[#c2a772] to-[#d4b883] rounded-lg"
                                            iconClassName="size-8 text-white"
                                        />
                                    </div>

                                    <div className="flex-1">
                                        <h4 className="font-bold text-[#254151] mb-2">{member.name}</h4>
                                        <div className="inline-block px-3 py-1 bg-gradient-to-r from-[#c2a772] to-[#d4b883] rounded-full mb-2">
                                            <p className="text-white text-xs font-medium">عضو</p>
                                        </div>
                                        <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
