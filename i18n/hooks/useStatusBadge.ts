import { useMemo } from "react";

export function useStatusBadge(status: string) {
    const className = useMemo(() => {
        const s = (status ?? "").trim().toLowerCase();

        const base =
            "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium tracking-tight " +
            "border shadow-sm shadow-black/5 " +
            "transition-colors";

        const palette = {
            success:
                "bg-emerald-500/20 text-emerald-700 border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/30",
            danger:
                "bg-rose-500/20 text-rose-700 border-rose-500/40 dark:bg-rose-500/10 dark:text-rose-300 dark:border-rose-500/30",
            warning:
                "bg-amber-500/25 text-amber-800 border-amber-500/45 dark:bg-amber-500/10 dark:text-amber-200 dark:border-amber-500/30",
            info:
                "bg-sky-500/20 text-sky-800 border-sky-500/40 dark:bg-sky-500/10 dark:text-sky-200 dark:border-sky-500/30",
            neutral:
                "bg-zinc-500/15 text-zinc-800 border-zinc-500/30 dark:bg-zinc-500/10 dark:text-zinc-200 dark:border-zinc-500/25",
        } as const;

        const successStatuses = new Set([
            "active",
            "approved",
            "complete",
            "completed",
            "delivered",
            "done",
            "paid",
            "success",
        ]);

        const dangerStatuses = new Set([
            "blocked",
            "cancel",
            "cancelled",
            "canceled",
            "critical",
            "expired",
            "fail",
            "failed",
            "rejected",
            "error",
        ]);

        const warningStatuses = new Set(["pending", "warning", "processing", "in progress", "in_progress"]);

        const infoStatuses = new Set(["info", "new", "created", "draft"]);

        const pick = () => {
            if (!s) return "neutral" as const;
            if (successStatuses.has(s) || s.includes("complete") || s.includes("deliver")) return "success" as const;
            if (dangerStatuses.has(s) || s.includes("cancel") || s.includes("reject") || s.includes("fail")) return "danger" as const;
            if (warningStatuses.has(s) || s.includes("pend") || s.includes("process") || s.includes("progress")) {
                return "warning" as const;
            }
            if (infoStatuses.has(s)) return "info" as const;
            return "neutral" as const;
        };

        const key = pick();
        return `${base} ${palette[key]}`;
    }, [status]);

    return { className };
}
