import { getLocale } from "next-intl/server";
import { CreateEventForm } from "./CreateEventForm";

export default async function CreateEventPage() {
  const locale = await getLocale();
  return <CreateEventForm isAr={locale === "ar"} />;
}
