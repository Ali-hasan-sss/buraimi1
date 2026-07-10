"use client"

import type { SideActionPanelContact } from "@/lib/site-contact-settings-defaults";
import { X, User, Globe, Phone, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import LangSwitcher from '../global/toggleLang';

export function SideActionPanel({
  contact,
}: {
  contact: SideActionPanelContact;
}) {
    const [isOpen, setIsOpen] = useState(true);

    if (!isOpen) return null;

    return (
        <div className="absolute left-[8%] top-[55%] -translate-y-1/2 z-40 flex flex-col gap-3">
            {/* Close Button */}
            <button
                onClick={() => setIsOpen(false)}
                className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-all duration-300 group relative"
                aria-label="إغلاق"
            >
                <X className="w-5 h-5 text-gray-700 group-hover:rotate-90 transition-transform duration-300" />

                {/* Tooltip */}
                <div className="absolute left-full ml-3 px-4 py-2 bg-[#6096b4] text-white text-base font-bold whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 rounded-lg shadow-lg flex items-center gap-2">
                    <X className="w-5 h-5" />
                    <span>إغلاق</span>
                </div>
            </button>

            {/* Login Button */}
            <button
                className="w-12 h-12 bg-[#254151] rounded-full shadow-lg flex items-center justify-center hover:bg-[#6096b4] transition-all duration-300 group relative"
                aria-label="تسجيل الدخول"
            >
                <User className="w-5 h-5 text-white" />

                {/* Tooltip */}
                <Link
                    href={"/main/student-portal"}
                    className="absolute left-full ml-3 px-4 py-2 bg-[#6096b4] text-white text-base font-bold whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 rounded-lg shadow-lg flex items-center gap-2">
                    <User className="w-5 h-5" />
                    <span>تسجيل الدخول</span>
                </Link>
            </button>

            {/* Language Button */}
            <div
                className="w-12 h-12 bg-[#c2a772] rounded-full shadow-lg flex items-center justify-center hover:bg-[#d4b882] transition-all duration-300 group relative"
                aria-label="تغيير اللغة"
            >
                <Globe className="w-5 h-5 text-white" />

                {/* Tooltip */}
                <div className="absolute left-full ml-3  text-white text-base font-bold whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 rounded-lg shadow-lg flex items-center gap-2">
                    <LangSwitcher className="text-white bg-[#6096b4] rounded-[5px] px-4 py-2 text-base" />

                </div>
            </div>

            {/* Phone Button */}
            <button
                className="w-12 h-12 bg-[#254151] rounded-full shadow-lg flex items-center justify-center hover:bg-[#6096b4] transition-all duration-300 group relative"
                aria-label="اتصل بنا"
                onClick={() => {
                  window.location.href = contact.phoneHref;
                }}
            >
                <Phone className="w-5 h-5 text-white" />

                {/* Tooltip */}
                <div className="absolute left-full ml-3 px-4 py-2 bg-[#6096b4] text-white text-base font-bold whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 rounded-lg shadow-lg flex items-center gap-2">
                    <Phone className="w-5 h-5" />
                    <span dir="ltr">{contact.phoneDisplay}</span>
                </div>
            </button>

            {/* WhatsApp Button */}
            <button
                className="w-12 h-12 bg-[#25D366] rounded-full shadow-lg flex items-center justify-center hover:bg-[#20BA5A] transition-all duration-300 group relative"
                aria-label={`واتساب ${contact.whatsappLabel}`}
                onClick={() => window.open(contact.whatsappWaMeUrl, "_blank")}
            >
                <MessageCircle className="w-5 h-5 text-white" />

                {/* Tooltip */}
                <div className="absolute left-full ml-3 px-4 py-2 bg-[#6096b4] text-white text-base font-bold whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 rounded-lg shadow-lg flex items-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    <span dir="ltr">{contact.whatsappLabel}</span>
                </div>
            </button>
        </div>
    );
}