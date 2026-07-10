"use client";

import { Book, Database, ExternalLink, Mail, MapPin, Phone } from "lucide-react";

type NewItem = {
    title: string;
    author: string;
    year: string;
};

type Props = {
    newItems: NewItem[];
};

export default function LibrarySidebar({ newItems }: Props) {
    return (
        <aside className="space-y-6 sm:space-y-8">
            <div className="rounded-lg border-2 border-green-200 bg-white p-5 shadow-xl sm:p-6">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-[#254151] sm:text-2xl">
                    <Book className="size-6 text-green-600 sm:size-8" />
                    <span>المواد الجديدة</span>
                </h3>
                <div className="space-y-3">
                    {newItems.map((item, index: number) => (
                        <div
                            key={index}
                            className="rounded-lg border-r-4 border-green-500 bg-gradient-to-r from-green-50 to-white p-4 transition-all hover:shadow-lg"
                        >
                            <p className="mb-1 text-sm font-bold leading-relaxed text-gray-800 sm:text-base">{item.title}</p>
                            <p className="text-xs text-gray-600 sm:text-sm">{item.author}</p>
                            <p className="mt-1 text-xs font-semibold text-green-600">{item.year}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="rounded-lg border-2 border-blue-200 bg-white p-5 shadow-xl sm:p-6">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-[#254151] sm:text-2xl">
                    <Phone className="size-6 text-blue-600 sm:size-8" />
                    <span>اتصل بنا</span>
                </h3>
                <div className="space-y-4">
                    <p className="text-sm text-gray-700 sm:text-base">يمكنك التواصل مع المكتبة على:</p>

                    <div className="flex items-start gap-3 rounded-lg bg-blue-50 p-4">
                        <Mail className="mt-1 size-5 flex-shrink-0 text-blue-600 sm:size-6" />
                        <div>
                            <p className="mb-1 text-sm font-bold text-gray-800 sm:text-base">البريد الإلكتروني</p>
                            <a href="mailto:library@buc.edu.om" className="text-sm text-blue-600 hover:underline sm:text-base">
                                library@buc.edu.om
                            </a>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 rounded-lg bg-blue-50 p-4">
                        <Phone className="mt-1 size-5 flex-shrink-0 text-blue-600 sm:size-6" />
                        <div>
                            <p className="mb-1 text-sm font-bold text-gray-800 sm:text-base">الهاتف</p>
                            <a href="tel:+96825652222" className="text-sm text-blue-600 hover:underline sm:text-base" dir="ltr">
                                +968 2565 2222
                            </a>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 rounded-lg bg-blue-50 p-4">
                        <MapPin className="mt-1 size-5 flex-shrink-0 text-blue-600 sm:size-6" />
                        <div>
                            <p className="mb-1 text-sm font-bold text-gray-800 sm:text-base">الموقع</p>
                            <p className="text-sm text-gray-700 sm:text-base">مبنى المكتبة - الطابق الأول</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="rounded-lg border-2 border-amber-300 bg-gradient-to-br from-amber-100 to-orange-100 p-5 shadow-xl sm:p-6">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-[#254151] sm:text-2xl">
                    <Database className="size-6 text-amber-600 sm:size-8" />
                    <span>المجموعة الرقمية</span>
                </h3>
                <p className="mb-4 text-sm text-gray-700 sm:text-base">يمكنك الوصول إلى المجموعة الرقمية:</p>
                <a
                    href="#digital-library"
                    className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-amber-600 to-orange-600 px-6 py-3 text-sm font-bold text-white transition-all hover:shadow-xl sm:py-4 sm:text-base"
                >
                    <ExternalLink className="size-5" />
                    <span>المكتبة الرقمية</span>
                </a>
            </div>
        </aside>
    );
}
