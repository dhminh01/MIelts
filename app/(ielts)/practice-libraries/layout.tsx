import PracticesFiter from "@/components/filter/practice-filter";
import SearchBar from "@/components/filter/search-bar";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <PracticesFiter />
      <SearchBar />
      {children}
    </>
  );
};

export default HomeLayout;
