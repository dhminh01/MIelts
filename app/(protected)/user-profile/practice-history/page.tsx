// app/(protected)/user-profile/page.tsx

"use server"; // Ensure this file is using server actions

import { fetchHistory } from "@/actions/fetchHistory";
import Link from "next/link";

export default async function UserProfile() {
  // Call the server action to fetch history
  const history = await fetchHistory();

  if (!history || history.length === 0) {
    return <div>No practice history available.</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold">Practice History</h1>
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
                  {item.listeningTest?.title ||
                    item.readingTest?.title ||
                    item.writingTest?.title ||
                    item.speakingTest?.title}
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
                  {/* Link to user answers page */}
                  <Link
                    href={`/user-answers/${item.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    View Answers
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
