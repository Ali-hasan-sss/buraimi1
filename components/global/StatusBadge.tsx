"use client";

import { Badge } from "@/components/ui/badge";
import { useStatusBadge } from "@/hooks/useStatusBadge";
import { useTranslations } from "next-intl";

export function StatusBadge({ status }: { status: string }) {
    const { className } = useStatusBadge(status);

    const t = useTranslations("status")

    return (
        <Badge variant="outline" className={className}>
            {t(`${status}`)}
        </Badge>
    );
}
