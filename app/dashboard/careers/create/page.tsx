import { getLocale } from "next-intl/server";
import { CreateCareerForm } from "./CreateCareerForm";

export default async function CreateCareerPage() {
    const locale = await getLocale();
    const isAr = locale === "ar";

    return <CreateCareerForm isAr={isAr} />;
}
