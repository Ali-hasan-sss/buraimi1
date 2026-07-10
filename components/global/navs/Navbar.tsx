import DetailNav from "./DetailNav";
import TopNavbar from "./top";

import { getSiteContactSettings, resolveSiteHeaderContact } from "@/lib/site-contact-settings";

export default async function Navbar() {
  const settings = await getSiteContactSettings();
  const contact = resolveSiteHeaderContact(settings);

  return (
    <>
      <TopNavbar contact={contact} />
      <DetailNav />
    </>
  );
}
