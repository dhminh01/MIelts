import PracticesFiter from "@/components/practices/practice-filter";
import PracticeLists from "@/components/practices/practice-lists";
import SearchPractices from "@/components/practices/practice-search";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <PracticesFiter />
      <SearchPractices />
      <PracticeLists />
    </>
  );
};

export default HomeLayout;
