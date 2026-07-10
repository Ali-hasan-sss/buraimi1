import { getMessagesData } from "../actions/getMessages";
import { Crown, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ChairmanEditForm from "./ChairmanEditForm";
import { resolveUploadImageSrc } from "@/lib/upload-public-url";
import { getTranslations } from "next-intl/server";

export default async function ChairmanMessagesPage() {
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

    const { chairman } = data;

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
                    <Crown className="size-6 text-amber-500" />
                    <h1 className="text-2xl font-semibold tracking-tight">{chairman.positionAr}</h1>
                </div>
                <p className="text-sm text-muted-foreground">
                    {chairman.positionEn} - {chairman.nameEn}
                </p>
            </div>

            {/* Role Info Card */}
            <div className="rounded-xl border bg-background p-6 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gray-100">
                        {chairman.image ? (
                            <Image
                                src={resolveUploadImageSrc(chairman.image)}
                                alt={chairman.nameEn}
                                fill
                                sizes="80px"
                                className="object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                <Crown className="size-8" />
                            </div>
                        )}
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold">{chairman.nameAr}</h2>
                        <p className="text-sm text-muted-foreground">{chairman.nameEn}</p>
                    </div>
                </div>
            </div>

            {/* Edit Form */}
            <ChairmanEditForm
                initialNameAr={chairman.nameAr}
                initialNameEn={chairman.nameEn}
                initialImage={chairman.image}
                initialParagraphs={chairman.paragraphs}
            />

            {/* Preview */}
            <div className="rounded-xl border bg-background p-6 shadow-sm">
                <h2 className="text-lg font-semibold mb-4">{t("previewTitle")}</h2>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                    {chairman.paragraphs.map((para, index) => (
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
