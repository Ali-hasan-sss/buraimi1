"use client";

import { useMemo } from 'react';
import { Briefcase, Building2, Mail, Phone, Search, User } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ContactRow } from '../dashboard/contact/ContactEditDialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import TablePaginationController from '../dashboard/TablePaginationController';
import { useEffect, useState } from 'react';

export default function ContactDirectoryClient({ contacts, meta }: {
    contacts: ContactRow[], meta: {
        limit: number, page: number, total: number
    }
}) {

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const searchTerm = useMemo(() => searchParams.get('search') ?? '', [searchParams]);
    const [draftSearchTerm, setDraftSearchTerm] = useState(searchTerm);

    useEffect(() => {
        setDraftSearchTerm(searchTerm);
    }, [searchTerm]);

    const pushParams = (updates: Record<string, string | null>) => {
        const params = new URLSearchParams(searchParams.toString());
        for (const [key, value] of Object.entries(updates)) {
            if (value === null) params.delete(key);
            else params.set(key, value);
        }
        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                {/* Controls Section */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        {/* Entries Per Page */}

                        <TablePaginationController limit={meta.limit} page={meta.page} total={meta.total} />
                        {/* Search Box */}
                        <div className="relative w-full md:w-96">
                            <Search className="absolute right-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="ابحث عن موظف، قسم، وظيفة، أو بريد إلكتروني..."
                                value={draftSearchTerm}
                                onChange={(e) => setDraftSearchTerm(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key !== 'Enter') return;
                                    const next = draftSearchTerm.trim();
                                    pushParams({ search: next ? next : null, page: "1" });
                                }}
                                className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6096b4] focus:border-transparent transition-all"
                            />

                        </div>
                    </div>

                    {/* Results Count */}
                    <div className="mt-4 text-gray-600">
                        عرض{' '}
                        <span className="font-bold text-[#254151]">
                            {contacts.length}
                        </span>{' '}
                        من أصل{' '}
                        <span className="font-bold text-[#254151]">{meta.total}</span> مدخلات
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gradient-to-l from-[#254151] to-[#6096b4]">
                                    <th className="px-6 py-4 text-right text-white font-bold border-l border-white/20">
                                        <div className="flex items-center gap-2">
                                            <User className="size-5" />
                                            عنوان
                                        </div>
                                    </th>
                                    <th className="px-6 py-4 text-right text-white font-bold border-l border-white/20">
                                        <div className="flex items-center gap-2">
                                            <User className="size-5" />
                                            اسم الموظف
                                        </div>
                                    </th>
                                    <th className="px-6 py-4 text-right text-white font-bold border-l border-white/20">
                                        <div className="flex items-center gap-2">
                                            <Building2 className="size-5" />
                                            القسم الأكاديمي / الدائرة
                                        </div>
                                    </th>
                                    <th className="px-6 py-4 text-right text-white font-bold border-l border-white/20">
                                        <div className="flex items-center gap-2">
                                            <Briefcase className="size-5" />
                                            الوظيفة
                                        </div>
                                    </th>
                                    <th className="px-6 py-4 text-right text-white font-bold border-l border-white/20">
                                        <div className="flex items-center gap-2">
                                            <Phone className="size-5" />
                                            رقم الهاتف
                                        </div>
                                    </th>
                                    <th className="px-6 py-4 text-right text-white font-bold">
                                        <div className="flex items-center gap-2">
                                            <Mail className="size-5" />
                                            البريد الإلكتروني
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {contacts.map((contact, index) => (
                                    <tr
                                        key={index}
                                        className={`border-b border-gray-200 hover:bg-[#6096b4]/5 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                                            }`}
                                    >
                                        <td className="px-6 py-4 text-gray-700 font-medium border-l border-gray-200">
                                            {contact.title}
                                        </td>
                                        <td className="px-6 py-4 text-gray-900 font-semibold border-l border-gray-200">
                                            {contact.name}
                                        </td>
                                        <td className="px-6 py-4 text-gray-700 border-l border-gray-200">
                                            {contact.department}
                                        </td>
                                        <td className="px-6 py-4 text-gray-700 border-l border-gray-200">
                                            {contact.position}
                                        </td>
                                        <td className="px-6 py-4 text-gray-700 border-l border-gray-200">
                                            {contact.phone && (
                                                <a
                                                    href={`tel:${contact.phone}`}
                                                    className="flex items-center gap-2 text-[#6096b4] hover:text-[#254151] transition-colors"
                                                >
                                                    <Phone className="size-4" />
                                                    {contact.phone}
                                                </a>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-gray-700">
                                            {contact.email && contact.email !== '-' && (
                                                <a
                                                    href={`mailto:${contact.email}`}
                                                    className="flex items-center gap-2 text-[#6096b4] hover:text-[#254151] transition-colors break-all"
                                                >
                                                    <Mail className="size-4 flex-shrink-0" />
                                                    <span className="text-sm">{contact.email}</span>
                                                </a>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* No Results Message */}
                {contacts.length === 0 && (
                    <div className="bg-white rounded-xl shadow-lg p-12 text-center border border-gray-200">
                        <Search className="size-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-2xl text-gray-600 mb-2">لا توجد نتائج</h3>
                        <p className="text-gray-500">
                            لم يتم العثور على نتائج تطابق بحثك. حاول استخدام كلمات مفتاحية مختلفة.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}
