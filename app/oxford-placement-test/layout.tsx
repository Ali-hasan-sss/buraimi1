import { Footer } from "@/components/global/footer/Footer";
import Navbar from "@/components/global/navs/Navbar";


export default function OxfordPlacementTestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
