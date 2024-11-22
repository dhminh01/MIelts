import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Topbar from "@/components/layout/Topbar";
import { UserProfileNavbar } from "./_components/userNav";

const UserProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Topbar />
      <Navbar />
      <UserProfileNavbar />
      {children}
      <Footer />
    </div>
  );
};

export default UserProfileLayout;
