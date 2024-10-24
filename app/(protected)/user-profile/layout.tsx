import Navbar from "@/components/layout/Navbar";
import Topbar from "@/components/layout/Topbar";
import { UserProfileNavbar } from "@/app/(protected)/_components/userNav";

const UserProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Topbar />
      <Navbar />
      <UserProfileNavbar />
      {children}
    </div>
  );
};

export default UserProfileLayout;
