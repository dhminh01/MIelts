import Topbar from "@/components/layout/Topbar";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Topbar />
      {children}
    </div>
  );
};

export default AuthLayout;
