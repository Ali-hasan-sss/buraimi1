import Navbar from "@/components/global/navs/Navbar";

export default function PracticePlacementTestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
