import { UserProfileNavbar } from "@/app/(protected)/_components/userNav";

const UserProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <UserProfileNavbar />
      {children}
    </div>
  );
};

export default UserProfileLayout;
