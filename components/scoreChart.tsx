'use client'

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface ScoreData {
  createdAt: string;
  score: number;
  skill: string;
}

const ScoreChart = () => {
  const [data, setData] = useState<ScoreData[]>([]);

  useEffect(() => {
    const fetchScores = async () => {
      const response = await fetch("/api/ielts/scores");
      if (response.ok) {
        const result = await response.json();
        setData(result.history);
      }
    };

    fetchScores();
  }, []);

  // Process data for chart
  const chartData = data.reduce(
    (acc: any, { createdAt, score, skill }: ScoreData) => {
      const date = new Date(createdAt).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = { date };
      }
      acc[date][skill] = score;
      return acc;
    },
    {}
  );

  const finalData = Object.values(chartData);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={finalData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        {["Listening", "Reading", "Writing", "Speaking"].map((skill) => (
          <Line key={skill} type="monotone" dataKey={skill} stroke="#8884d8" />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ScoreChart;
