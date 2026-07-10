"use client";

import { Search, X } from "lucide-react";
import type { AdvancedSearchState } from "@/components/Library/LibraryPageClient";

type Props = {
    open: boolean;
    onClose: () => void;
    value: AdvancedSearchState;
    onChange: (value: AdvancedSearchState) => void;
    onSubmit: () => void;
};

export default function AdvancedSearchModal({ open, onClose, value, onChange, onSubmit }: Props) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 sm:p-4">
            <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg bg-white shadow-2xl">
                <div className="sticky top-0 z-10 flex items-center justify-between bg-[#00a7e1] p-4 text-white sm:p-6">
                    <h2 className="text-lg font-bold sm:text-3xl">البحث المتقدم - Advanced Search</h2>
                    <button type="button" onClick={onClose} className="rounded-lg bg-white/20 p-2 transition-all hover:bg-white/30">
                        <X className="size-6 sm:size-8" />
                    </button>
                </div>

                <div className="p-4 sm:p-8">
                    <div className="space-y-5 sm:space-y-6">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm font-bold text-gray-700 sm:text-base">البحث عبر - Search Across</label>
                                <select
                                    className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 text-sm sm:text-base"
                                    value={value.searchAcross}
                                    onChange={(e) => onChange({ ...value, searchAcross: e.target.value as AdvancedSearchState["searchAcross"] })}
                                >
                                    <option value="match">Find best match</option>
                                    <option value="all">All fields</option>
                                </select>
                            </div>

                            <div className="flex items-center gap-3">
                                <label className="flex items-center gap-2 text-sm font-semibold sm:text-base">
                                    <input
                                        type="checkbox"
                                        checked={value.availableCopies}
                                        onChange={(e) => onChange({ ...value, availableCopies: e.target.checked })}
                                        className="size-4 sm:size-5"
                                    />
                                    <span>Available copies only</span>
                                </label>
                            </div>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-bold text-gray-700 sm:text-base">العنوان ... أدخل هنا - Title ... enter here</label>
                            <input
                                type="text"
                                className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 text-sm sm:text-base"
                                value={value.title}
                                onChange={(e) => onChange({ ...value, title: e.target.value })}
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm font-bold text-gray-700 sm:text-base">المؤلف ... أدخل هنا - Author ... enter here</label>
                                <input
                                    type="text"
                                    className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 text-sm sm:text-base"
                                    value={value.author}
                                    onChange={(e) => onChange({ ...value, author: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-bold text-gray-700 sm:text-base">النوع ... أدخل هنا - Genre ... enter here</label>
                                <input
                                    type="text"
                                    className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 text-sm sm:text-base"
                                    value={value.genre}
                                    onChange={(e) => onChange({ ...value, genre: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm font-bold text-gray-700 sm:text-base">الناشر ... أدخل هنا - Publisher ... enter here</label>
                                <input
                                    type="text"
                                    className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 text-sm sm:text-base"
                                    value={value.publisher}
                                    onChange={(e) => onChange({ ...value, publisher: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-bold text-gray-700 sm:text-base">الموضوع ... أدخل هنا - Subject ... enter here</label>
                                <input
                                    type="text"
                                    className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 text-sm sm:text-base"
                                    value={value.subject}
                                    onChange={(e) => onChange({ ...value, subject: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            <div>
                                <label className="mb-2 block text-sm font-bold text-gray-700 sm:text-base">السلسلة - Series</label>
                                <input
                                    type="text"
                                    className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 text-sm sm:text-base"
                                    value={value.series}
                                    onChange={(e) => onChange({ ...value, series: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-bold text-gray-700 sm:text-base">من سنة - Year From</label>
                                <input
                                    type="text"
                                    className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 text-sm sm:text-base"
                                    value={value.yearFrom}
                                    onChange={(e) => onChange({ ...value, yearFrom: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-bold text-gray-700 sm:text-base">إلى - To</label>
                                <input
                                    type="text"
                                    className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 text-sm sm:text-base"
                                    value={value.yearTo}
                                    onChange={(e) => onChange({ ...value, yearTo: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="button"
                                onClick={onSubmit}
                                className="w-full rounded-lg bg-gradient-to-r from-[#00a7e1] to-blue-600 px-6 py-3 text-base font-bold text-white transition-all hover:shadow-xl sm:px-8 sm:py-4 sm:text-xl"
                            >
                                <span className="inline-flex items-center gap-2">
                                    <Search className="size-5 sm:size-6" />
                                    <span>بحث - Search</span>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
