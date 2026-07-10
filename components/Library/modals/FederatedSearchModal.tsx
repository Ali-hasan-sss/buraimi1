"use client";

import { Search, X } from "lucide-react";
import type { FederatedSearchState } from "@/components/Library/LibraryPageClient";

type Props = {
    open: boolean;
    onClose: () => void;
    value: FederatedSearchState;
    onChange: (value: FederatedSearchState) => void;
    onSubmit: () => void;
};

export default function FederatedSearchModal({ open, onClose, value, onChange, onSubmit }: Props) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 sm:p-4">
            <div className="w-full max-w-3xl rounded-lg bg-white shadow-2xl">
                <div className="flex items-center justify-between bg-[#00a7e1] p-4 text-white sm:p-6">
                    <h2 className="text-lg font-bold sm:text-3xl">البحث الموحد - Federated Search</h2>
                    <button type="button" onClick={onClose} className="rounded-lg bg-white/20 p-2 transition-all hover:bg-white/30">
                        <X className="size-6 sm:size-8" />
                    </button>
                </div>

                <div className="p-4 sm:p-8">
                    <div className="mb-6">
                        <input
                            type="text"
                            placeholder="Enter your search here ..."
                            className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 text-sm sm:px-6 sm:py-4 sm:text-lg"
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div>
                            <div className="rounded-t-lg bg-[#00a7e1] p-4 text-base font-bold text-white sm:text-xl">
                                المكتبة المحلية - Local Library
                            </div>
                            <div className="rounded-b-lg border-2 border-blue-200 bg-blue-50 p-4 sm:p-6">
                                <label className="flex cursor-pointer items-center gap-3">
                                    <input
                                        type="checkbox"
                                        checked={value.localLibrary}
                                        onChange={(e) => onChange({ ...value, localLibrary: e.target.checked })}
                                        className="size-5 sm:size-6"
                                    />
                                    <span className="text-sm font-semibold sm:text-lg">BUC LAC</span>
                                </label>
                            </div>
                        </div>

                        <div>
                            <div className="rounded-t-lg bg-[#00a7e1] p-4 text-base font-bold text-white sm:text-xl">قواعد البيانات - Databases</div>
                            <div className="rounded-b-lg border-2 border-blue-200 bg-blue-50 p-4 sm:p-6">
                                <label className="flex cursor-pointer items-center gap-3">
                                    <input
                                        type="checkbox"
                                        checked={value.wikipedia}
                                        onChange={(e) => onChange({ ...value, wikipedia: e.target.checked })}
                                        className="size-5 sm:size-6"
                                    />
                                    <span className="text-sm font-semibold sm:text-lg">Wikipedia</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onSubmit}
                        className="mt-8 w-full rounded-lg bg-gradient-to-r from-[#00a7e1] to-blue-600 px-6 py-3 text-base font-bold text-white transition-all hover:shadow-xl sm:px-8 sm:py-4 sm:text-xl"
                    >
                        <span className="inline-flex items-center gap-2">
                            <Search className="size-5 sm:size-6" />
                            <span>بحث موحد - Federated Search</span>
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}
