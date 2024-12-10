import { fetchUserAnswers } from "@/actions/fetchUserAnswers";
import { notFound } from "next/navigation";

interface UserAnswerProps {
  params: {
    id: string;
  };
}

export default async function UserAnswers({ params }: UserAnswerProps) {
  const { id } = params;

  // Fetch the user's answers for the given history ID
  const userAnswers = await fetchUserAnswers(id);

  if (!userAnswers) {
    notFound(); // If no answers are found, show a 404 page
  }
  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-center text-slate-600">
        User Answers
      </h1>
      <div className="mt-6 space-y-8">
        {userAnswers.reading.user_answer.length > 0 && (
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-slate-600">
              Reading Test
            </h3>
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full border border-gray-300 table-auto">
                <thead className="bg-blue-100">
                  <tr>
                    <th className="px-4 py-2 text-left text-gray-600">
                      Question
                    </th>
                    <th className="px-4 py-2 text-left text-gray-600">
                      Your Answer
                    </th>
                    <th className="px-4 py-2 text-left text-gray-600">
                      Correct Answer
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {userAnswers.reading.user_answer.map((answer, index) => {
                    const correctAnswer =
                      userAnswers.reading.correct_answer[index];
                    const isCorrect =
                      answer.trim().toLowerCase() ===
                      correctAnswer?.trim().toLowerCase();
                    return (
                      <tr
                        key={index}
                        className={`${
                          index % 2 === 0 ? "bg-gray-50" : "bg-white"
                        } hover:bg-gray-100`}
                      >
                        <td className="px-4 py-2 border border-gray-300">
                          {index + 1}
                        </td>
                        <td
                          className={`px-4 py-2 border border-gray-300 ${
                            isCorrect ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {answer.trim()}
                        </td>
                        <td
                          className={`px-4 py-2 border border-gray-300 ${
                            isCorrect ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          <span className="font-semibold">
                            {correctAnswer || "N/A"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
