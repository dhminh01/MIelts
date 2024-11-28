"use server"; // Ensure this file is using server actions

import { fetchHistory } from "@/actions/fetchHistory";
import Link from "next/link";

export default async function UserProfile() {
  // Call the server action to fetch history
  const history = await fetchHistory();

  if (!history || history.length === 0) {
    return <div>No practice history available.</div>;
  }

  // Filter history by each skill
  const listeningHistory = history.filter((item) => item.listeningTest);
  const readingHistory = history.filter((item) => item.readingTest);
  const writingHistory = history.filter((item) => item.writingTest);
  const speakingHistory = history.filter((item) => item.speakingTest);

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold text-slate-600">
        ~~~ Practice History ~~~
      </h1>

      {/* Listening History */}
      {listeningHistory.length > 0 && (
        <div className="w-full p-4 mb-8 bg-white rounded-lg shadow-md">
          <h2 className="pb-2 mb-4 text-2xl font-semibold border-b text-slate-700">
            Listening
          </h2>
          <table className="min-w-full border-collapse table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3 border border-gray-300">Test Title</th>
                <th className="p-3 border border-gray-300">Date</th>
                <th className="p-3 border border-gray-300">Score</th>
                <th className="p-3 border border-gray-300">User Answers</th>
              </tr>
            </thead>
            <tbody>
              {listeningHistory.map((item) => (
                <tr key={item.id} className="bg-white even:bg-gray-100">
                  <td className="p-3 border border-gray-300">
                    {item.listeningTest?.title}
                  </td>
                  <td className="p-3 border border-gray-300">
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
                  <td className="p-3 border border-gray-300">{item.score}</td>
                  <td className="p-3 border border-gray-300">
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
      )}

      {/* Reading History */}
      {readingHistory.length > 0 && (
        <div className="w-full p-4 mb-8 bg-white rounded-lg shadow-md">
          <h2 className="pb-2 mb-4 text-2xl font-semibold border-b text-slate-700">
            Reading
          </h2>
          <table className="min-w-full border-collapse table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3 border border-gray-300">Test Title</th>
                <th className="p-3 border border-gray-300">Date</th>
                <th className="p-3 border border-gray-300">Score</th>
                <th className="p-3 border border-gray-300">User Answers</th>
              </tr>
            </thead>
            <tbody>
              {readingHistory.map((item) => (
                <tr key={item.id} className="bg-white even:bg-gray-100">
                  <td className="p-3 border border-gray-300">
                    {item.readingTest?.title}
                  </td>
                  <td className="p-3 border border-gray-300">
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
                  <td className="p-3 border border-gray-300">{item.score}</td>
                  <td className="p-3 border border-gray-300">
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
      )}

      {/* Writing History */}
      {writingHistory.length > 0 && (
        <div className="w-full p-4 mb-8 bg-white rounded-lg shadow-md">
          <h2 className="pb-2 mb-4 text-2xl font-semibold border-b text-slate-700">
            Writing
          </h2>
          <table className="min-w-full border-collapse table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3 border border-gray-300">Test Title</th>
                <th className="p-3 border border-gray-300">Date</th>
                <th className="p-3 border border-gray-300">Score</th>
                <th className="p-3 border border-gray-300">User Answers</th>
              </tr>
            </thead>
            <tbody>
              {writingHistory.map((item) => (
                <tr key={item.id} className="bg-white even:bg-gray-100">
                  <td className="p-3 border border-gray-300">
                    {item.writingTest?.title}
                  </td>
                  <td className="p-3 border border-gray-300">
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
                  <td className="p-3 border border-gray-300">{item.score}</td>
                  <td className="p-3 border border-gray-300">
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
      )}

      {/* Speaking History */}
      {speakingHistory.length > 0 && (
        <div className="w-full p-4 mb-8 bg-white rounded-lg shadow-md">
          <h2 className="pb-2 mb-4 text-2xl font-semibold border-b text-slate-700">
            Speaking
          </h2>
          <table className="min-w-full border-collapse table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3 border border-gray-300">Test Title</th>
                <th className="p-3 border border-gray-300">Date</th>
                <th className="p-3 border border-gray-300">Score</th>
                <th className="p-3 border border-gray-300">User Answers</th>
              </tr>
            </thead>
            <tbody>
              {speakingHistory.map((item) => (
                <tr key={item.id} className="bg-white even:bg-gray-100">
                  <td className="p-3 border border-gray-300">
                    {item.speakingTest?.title}
                  </td>
                  <td className="p-3 border border-gray-300">
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
                  <td className="p-3 border border-gray-300">{item.score}</td>
                  <td className="p-3 border border-gray-300">
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
      )}
    </div>
  );
}
