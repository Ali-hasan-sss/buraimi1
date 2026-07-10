import { getLocale } from "next-intl/server";
import { CreateNewsForm } from "./CreateNewsForm";

export default async function CreateNewsPage() {
    const locale = await getLocale();
    const isAr = locale === "ar";

    return <CreateNewsForm isAr={isAr} />;
}
