import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

export default function BookkeepingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
