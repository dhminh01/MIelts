import PracticesFiter from "@/components/filter/practice-filter";
import SearchPractices from "@/components/practices/practice-search";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <PracticesFiter />
      <SearchPractices />
      {children}
    </>
  );
};

export default HomeLayout;
