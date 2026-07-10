import { getLocale } from "next-intl/server";
import { CreateResearchHighlightForm } from "./CreateResearchHighlightForm";

export default async function CreateResearchHighlightPage() {
  const locale = await getLocale();
  return <CreateResearchHighlightForm isAr={locale === "ar"} />;
}
