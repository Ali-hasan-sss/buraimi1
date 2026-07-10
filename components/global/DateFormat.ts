export function formatDateTime(value: string, locale = "en-US") {
    const d = new Date(value); // parses ISO string
    if (Number.isNaN(d.getTime())) return value; // fallback if invalid

    return new Intl.DateTimeFormat(locale, {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    }).format(d);
}