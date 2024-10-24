import ScoreChart from "@/components/scoreChart";

const DashboardPage = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className="pb-4 text-xl font-bold">Biểu đồ điểm số qua thời gian</h1>
      <ScoreChart />
    </div>
  );
};

export default DashboardPage;
