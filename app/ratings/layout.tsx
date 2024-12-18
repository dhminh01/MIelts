import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Topbar from "@/components/layout/Topbar";

const RatingsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Topbar />
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default RatingsLayout;
