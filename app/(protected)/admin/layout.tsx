import Topbar from "@/components/layout/Topbar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Topbar />
      {children}
    </>
  );
};

export default AdminLayout;
