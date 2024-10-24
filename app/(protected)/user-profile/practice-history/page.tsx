"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react"; // Assuming you're using next-auth for authentication

const PracticeHistory = () => {
  const { data: session } = useSession(); // Get the session data
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!session?.user?.id) return; // Ensure user is logged in and user ID is available

      try {
        const response = await fetch(
          `/api/user/history?userId=${session.user.id}`
        );
        if (response.ok) {
          const data = await response.json();
          setHistory(data.history || []);
        } else {
          console.error("Error fetching practice history");
        }
      } catch (error) {
        console.error("Error fetching history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [session]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold">Practice History</h1>
      {history.length === 0 ? (
        <p>No practice history available.</p>
      ) : (
        <div className="w-full pt-5 overflow-x-auto">
          <table className="min-w-full border border-collapse border-gray-200">
            <thead>
              <tr>
                <th className="p-2 border border-gray-300">Test Title</th>
                <th className="p-2 border border-gray-300">Date</th>
                <th className="p-2 border border-gray-300">Score</th>
                <th className="p-2 border border-gray-300">User Answers</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item) => (
                <tr key={item.id} className="bg-white even:bg-gray-100">
                  <td className="p-2 border border-gray-300">
                    {item.test.title}
                  </td>
                  <td className="p-2 border border-gray-300">
                    {new Date(item.createdAt).toLocaleString("en-US", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      hour12: true,
                    })}
                  </td>
                  <td className="p-2 border border-gray-300">{item.score}</td>
                  <td className="p-2 border border-gray-300">
                    {item.userAnswers}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PracticeHistory;
