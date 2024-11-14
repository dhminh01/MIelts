
import Topbar from "@/components/layout/Topbar";

const TestLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Topbar />
      {children}
    </div>
  );
};

export default TestLayout;
