import { getMessagesData } from "../actions/getMessages";
import { GraduationCap, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import DeanEditForm from "./DeanEditForm";
import { resolveUploadImageSrc } from "@/lib/upload-public-url";
import { getTranslations } from "next-intl/server";

export default async function DeanMessagesPage() {
    const t = await getTranslations("dashboardMessages");
    const data = await getMessagesData();

    if (!data) {
        return (
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Link
                        href="/dashboard/messages"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <ArrowLeft className="size-4" />
                        {t("backToMessages")}
                    </Link>
                </div>
                <div className="rounded-xl border bg-background p-6 shadow-sm">
                    <p className="text-muted-foreground">{t("emptyState")}</p>
                </div>
            </div>
        );
    }

    const { dean } = data;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link
                    href="/dashboard/messages"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                    <ArrowLeft className="size-4" />
                    {t("backToMessages")}
                </Link>
            </div>

            <div className="space-y-1">
                <div className="flex items-center gap-2">
                    <GraduationCap className="size-6 text-[#6096b4]" />
                    <h1 className="text-2xl font-semibold tracking-tight">{dean.positionAr}</h1>
                </div>
                <p className="text-sm text-muted-foreground">
                    {dean.positionEn} - {dean.nameEn}
                </p>
            </div>

            {/* Role Info Card */}
            <div className="rounded-xl border bg-background p-6 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gray-100">
                        {dean.image ? (
                            <Image
                                src={resolveUploadImageSrc(dean.image)}
                                alt={dean.nameEn}
                                fill
                                sizes="80px"
                                className="object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                <GraduationCap className="size-8" />
                            </div>
                        )}
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold">{dean.nameAr}</h2>
                        <p className="text-sm text-muted-foreground">{dean.nameEn}</p>
                    </div>
                </div>
            </div>

            {/* Edit Form */}
            <DeanEditForm
                initialNameAr={dean.nameAr}
                initialNameEn={dean.nameEn}
                initialImage={dean.image}
                initialParagraphs={dean.paragraphs}
            />

            {/* Preview */}
            <div className="rounded-xl border bg-background p-6 shadow-sm">
                <h2 className="text-lg font-semibold mb-4">{t("previewTitle")}</h2>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                    {dean.paragraphs.map((para, index) => (
                        <div key={index} className="space-y-2 p-4 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-600 leading-relaxed">{para.textAr}</p>
                            <p className="text-sm text-gray-500 leading-relaxed border-t border-gray-200 pt-2">
                                {para.textEn}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
