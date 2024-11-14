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

  const data = useMemo(() => {
    if (!history) return null;

    // Extract dates and ensure they're unique
    const allDates = [
      ...history.listening,
      ...history.reading,
      ...history.writing,
      ...history.speaking,
    ]
      .map((entry) => entry.date.toLocaleDateString()) // Should work now
      .filter((value, index, self) => self.indexOf(value) === index);

    allDates.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

    // Helper to calculate average scores for each date
    const getAverageScoreForDates = (skillData: ScoreData[]) => {
      return allDates.map((date) => {
        const entriesForDate = skillData.filter(
          (item) => item.date.toLocaleDateString() === date
        );
        if (entriesForDate.length > 0) {
          const totalScore = entriesForDate.reduce(
            (sum, item) => sum + item.score,
            0
          );
          return totalScore / entriesForDate.length;
        }
        return null;
      });
    };

    return {
      labels: allDates,
      datasets: [
        {
          label: "Listening",
          data: getAverageScoreForDates(history.listening),
          backgroundColor: "rgb(216 180 254)",
        },
        {
          label: "Reading",
          data: getAverageScoreForDates(history.reading),
          backgroundColor: "rgb(134 239 172)",
        },
        {
          label: "Writing",
          data: getAverageScoreForDates(history.writing),
          backgroundColor: "rgb(253 186 116)",
        },
        {
          label: "Speaking",
          data: getAverageScoreForDates(history.speaking),
          backgroundColor: "rgb(203 213 225)",
        },
      ],
    };
  }, [history]);

  return data ? <Bar data={data} /> : <p>Loading...</p>;
}
