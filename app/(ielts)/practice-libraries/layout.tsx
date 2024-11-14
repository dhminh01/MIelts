import PracticesFiter from "@/components/filter/practice-filter";
import SearchBar from "@/components/filter/search-bar";

const IeltsTestLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <h1 className="flex items-center justify-center pt-3 text-3xl font-bold text-slate-600">
        ~~~ Thư viện đề thi Ielts ~~~
      </h1>
      <div className="pt-5 pb-3">
        <PracticesFiter />
      </div>
      <SearchBar />
      {children}
    </>
  );
};

export default IeltsTestLayout;
