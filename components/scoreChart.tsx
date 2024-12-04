import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState, useMemo } from "react";
import { format, startOfWeek, startOfMonth, startOfDay } from "date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type ScoreData = { date: Date; score: number };

type ScoreChartProps = {
  userId: string;
};

export default function ScoreChart({ userId }: ScoreChartProps) {
  const [history, setHistory] = useState<{
    listening: ScoreData[];
    reading: ScoreData[];
    writing: ScoreData[];
    speaking: ScoreData[];
  }>({
    listening: [],
    reading: [],
    writing: [],
    speaking: [],
  });

  const [filter, setFilter] = useState<"week" | "month" | "day">("week"); // Default filter is by week

  useEffect(() => {
    if (!userId) {
      console.error("User ID is missing");
      return;
    }

    async function fetchUserHistory() {
      try {
        const response = await fetch(
          `/api/getUserScoreHistory?userId=${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user score history");
        }
        const userHistory = await response.json();

        // Ensure each date is a Date object
        const formattedHistory = {
          listening: userHistory.listening.map((item: any) => ({
            ...item,
            date: new Date(item.date),
          })),
          reading: userHistory.reading.map((item: any) => ({
            ...item,
            date: new Date(item.date),
          })),
          writing: userHistory.writing.map((item: any) => ({
            ...item,
            date: new Date(item.date),
          })),
          speaking: userHistory.speaking.map((item: any) => ({
            ...item,
            date: new Date(item.date),
          })),
        };

        setHistory(formattedHistory);
      } catch (error) {
        console.error("Error fetching user score history:", error);
      }
    }

    fetchUserHistory();
  }, [userId]);

  const groupByPeriod = (skillData: ScoreData[]) => {
    // Group by day, week, or month depending on the filter
    const groupedData: Record<string, ScoreData[]> = {};

    skillData.forEach((item) => {
      let periodKey;
      if (filter === "week") {
        periodKey = format(startOfWeek(item.date), "yyyy-MM-dd");
      } else if (filter === "month") {
        periodKey = format(startOfMonth(item.date), "yyyy-MM-dd");
      } else if (filter === "day") {
        periodKey = format(startOfDay(item.date), "yyyy-MM-dd");
      }

      if (!groupedData[periodKey]) {
        groupedData[periodKey] = [];
      }

      groupedData[periodKey].push(item);
    });

    return groupedData;
  };

  const data = useMemo(() => {
    if (!history) return null;

    const groupedListening = groupByPeriod(history.listening);
    const groupedReading = groupByPeriod(history.reading);
    const groupedWriting = groupByPeriod(history.writing);
    const groupedSpeaking = groupByPeriod(history.speaking);

    const allPeriods = [
      ...Object.keys(groupedListening),
      ...Object.keys(groupedReading),
      ...Object.keys(groupedWriting),
      ...Object.keys(groupedSpeaking),
    ]
      .filter((value, index, self) => self.indexOf(value) === index)
      .sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

    const getAverageScoreForPeriod = (
      groupedData: Record<string, ScoreData[]>
    ) => {
      return allPeriods.map((period) => {
        const entriesForPeriod = groupedData[period] || [];
        if (entriesForPeriod.length > 0) {
          const totalScore = entriesForPeriod.reduce(
            (sum, item) => sum + item.score,
            0
          );
          return totalScore / entriesForPeriod.length;
        }
        return null;
      });
    };

    return {
      labels: allPeriods,
      datasets: [
        {
          label: "Listening",
          data: getAverageScoreForPeriod(groupedListening),
          backgroundColor: "rgb(216 180 254)",
        },
        {
          label: "Reading",
          data: getAverageScoreForPeriod(groupedReading),
          backgroundColor: "rgb(134 239 172)",
        },
        {
          label: "Writing",
          data: getAverageScoreForPeriod(groupedWriting),
          backgroundColor: "rgb(253 186 116)",
        },
        {
          label: "Speaking",
          data: getAverageScoreForPeriod(groupedSpeaking),
          backgroundColor: "rgb(203 213 225)",
        },
      ],
    };
  }, [history, filter]);

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <h1 className="pb-5 text-3xl font-bold">Biểu đồ thống kê điểm số:</h1>
      <div className="flex mb-6 space-x-6">
        <button
          onClick={() => setFilter("day")}
          className={`px-6 py-2 text-lg rounded-lg transition-all duration-300 ease-in-out border ${
            filter === "day" ? "bg-green-400 text-black" : "bg-gray-200"
          } hover:bg-green-300`}
        >
          Ngày
        </button>
        <button
          onClick={() => setFilter("week")}
          className={`px-6 py-2 text-lg rounded-lg transition-all duration-300 ease-in-out border ${
            filter === "week" ? "bg-purple-400 text-black" : "bg-gray-200"
          } hover:bg-purple-300`}
        >
          Tuần
        </button>
        <button
          onClick={() => setFilter("month")}
          className={`px-6 py-2 text-lg rounded-lg transition-all duration-300 ease-in-out border ${
            filter === "month" ? "bg-yellow-400 text-black" : "bg-gray-200"
          } hover:bg-yellow-300`}
        >
          Tháng
        </button>
      </div>

      {data ? <Bar data={data} /> : <p>Loading...</p>}
    </div>
  );
}
