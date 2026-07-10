"use client"

import { useEffect, useState } from "react";
import { Mail } from "lucide-react";
import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { Pencil } from "lucide-react";
import { fetchAboutMessages } from "@/store/contentSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";


export default function DeanMessageContent() {
    const dispatch = useAppDispatch();
    const locale = useLocale()
    const messageData = useAppSelector((state) => state.content.aboutMessages.data);
    const loading = useAppSelector((state) => state.content.aboutMessages.loading);
    const error = useAppSelector((state) => state.content.aboutMessages.error);
    const [isAdmin, setIsAdmin] = useState(false);
    const data = messageData?.dean;
    const isRtl = locale == "ar" ? true : false

    useEffect(() => {
        if (!messageData && !loading) {
            void dispatch(fetchAboutMessages());
        }
    }, [dispatch, loading, messageData]);

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

    if (loading) {
        return <div className="text-[#254151] font-bold">Loading...</div>;
    }

    if (error) {
        return <div className="text-red-600 font-bold">{error}</div>;
    }

    if (!data) {
        return <div className="text-[#254151] font-bold">No message data found. Please seed the database first.</div>;
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center gap-4 pb-6 border-b-2 border-gray-200">
                <div className="p-3 bg-gradient-to-br from-[#254151] to-[#2d4a5c] rounded-xl">
                    <Mail className="size-8 text-white" />
                </div>
                <div>
                    <h2 className="text-4xl font-bold bg-gradient-to-l from-[#254151] to-[#2d4a5c] bg-clip-text text-transparent">
                        {isRtl ? data.positionAr : data.positionEn}
                    </h2>
                </div>
                {isAdmin && (
                    <Link
                        href="/dashboard/messages/dean"
                        className="ms-auto inline-flex items-center gap-2 rounded-lg bg-[#254151] px-4 py-2 text-sm font-semibold text-white shadow-lg"
                    >
                        <Pencil className="size-4" />
                        {isRtl ? "تعديل الرسالة" : "Edit Message"}
                    </Link>
                )}
            </div>

            {/* رسالة عميد الكلية */}
            <div className="bg-gradient-to-br from-amber-50/30 to-blue-50 md:p-8 p-2 rounded-2xl border border-blue-100/50 shadow-sm">
                <div className="flex items-center gap-2 mb-6 pb-4 border-b-2 border-[#c2a772]/30">
                    <div className="h-1 w-12 bg-gradient-to-r from-[#6096b4] to-[#c2a772] rounded-full"></div>
                    <h3 className="text-3xl font-bold text-[#254151]">
                        {isRtl ? data.positionAr : data.positionEn}
                    </h3>
                </div>

                <div className="grid md:grid-cols-[260px,1fr] gap-6 items-start">
                    {/* صورة عميد الكلية */}
                    <div className="mx-auto md:w-64 w-[100%]">
                        <div className="relative group">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6096b4] to-[#c2a772] rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
                            <div className="relative md:w-64 h-64 w-[100%]">
                                <Image
                                    fill
                                    src={data.image}
                                    alt="عميد الكلية"
                                    sizes="256px"
                                    className="object-cover rounded-xl shadow-lg"
                                />
                            </div>
                        </div>
                        <div className="mt-3 text-center">
                            <p className="font-bold text-[#254151] text-sm leading-tight">
                                {isRtl ? data.nameAr : data.nameEn}
                            </p>
                        </div>
                    </div>

                    {/* النص */}
                    <div className="space-y-4 max-h-[500px] overflow-y-auto custom-scrollbar px-4 ">
                        {
                            data.paragraphs.map(
                                (el, idx) => {
                                    const message = isRtl ? el.textAr : el.textEn
                                    return (
                                        <p key={idx} className="text-gray-700 leading-relaxed text-justify">
                                            {message}
                                        </p>

                                    )
                                }
                            )
                        }

                        <div className="mt-8 pt-6 border-t border-gray-200">
                            <p className="font-bold text-[#254151] text-lg">
                                {isRtl ? data.nameAr : data.nameEn}
                            </p>
                            <p className="text-gray-600">
                                {isRtl ? data.positionAr : data.positionEn}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
