export function formatRelativeTime(createdAt: string, locale: string = "en"): string {
    const d = new Date(createdAt);
    if (Number.isNaN(d.getTime())) return "";

    const diffMs = Date.now() - d.getTime();
    const diffMin = Math.floor(diffMs / (1000 * 60));
    const isAr = (locale ?? "").toLowerCase().startsWith("ar");

    if (diffMin < 1) return isAr ? "الآن" : "now";
    if (diffMin < 60) {
        if (!isAr) return `${diffMin} minute${diffMin === 1 ? "" : "s"} ago`;
        if (diffMin === 1) return "منذ دقيقة";
        if (diffMin === 2) return "منذ دقيقتين";
        if (diffMin <= 10) return `منذ ${diffMin} دقائق`;
        return `منذ ${diffMin} دقيقة`;
    }

    const diffHr = Math.floor(diffMin / 60);
    if (diffHr < 24) {
        if (!isAr) return `${diffHr} hour${diffHr === 1 ? "" : "s"} ago`;
        if (diffHr === 1) return "منذ ساعة";
        if (diffHr === 2) return "منذ ساعتين";
        if (diffHr <= 10) return `منذ ${diffHr} ساعات`;
        return `منذ ${diffHr} ساعة`;
    }

    const diffDay = Math.floor(diffHr / 24);
    if (!isAr) return `${diffDay} day${diffDay === 1 ? "" : "s"} ago`;
    if (diffDay === 1) return "منذ يوم";
    if (diffDay === 2) return "منذ يومين";
    if (diffDay <= 10) return `منذ ${diffDay} أيام`;
    return `منذ ${diffDay} يوم`;
}
