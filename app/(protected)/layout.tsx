import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Topbar from "@/components/layout/Topbar";

const UserProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Topbar />
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default UserProfileLayout;