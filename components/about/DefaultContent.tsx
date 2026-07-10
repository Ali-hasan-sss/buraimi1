"use client"
import { FileText } from "lucide-react";

export default function DefaultContent({ title }: { title: string }) {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4 pb-6 border-b-2">
                <div className="p-3 bg-gradient-to-br from-[#254151] to-[#2d4a5c] rounded-xl">
                    <FileText className="size-8 text-white" />
                </div>
                <div>
                    <h2 className="text-4xl font-bold bg-gradient-to-l from-[#254151] to-[#2d4a5c] bg-clip-text text-transparent">
                        {title}
                    </h2>
                </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-amber-50/30 p-8 rounded-2xl border border-blue-100/50">
                <p className="text-gray-600 text-center">المحتوى قيد الإضافة...</p>
            </div>
        </div>
    );
}