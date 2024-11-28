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
        {/* Listening Test Results */}
        {userAnswers.listening &&
          userAnswers.listening.user_answer.length > 0 && (
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-slate-600">
                Listening Test
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
                    {userAnswers.listening.user_answer.map((answer, index) => {
                      const correctAnswer =
                        userAnswers.listening.correct_answer[index];
                      const isCorrect = answer.trim() === correctAnswer?.trim();
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

        {/* Reading Test Results */}
        {userAnswers.reading && userAnswers.reading.user_answer.length > 0 && (
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
                    const isCorrect = answer.trim() === correctAnswer?.trim();
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

        {/* Writing Test Results */}
        {userAnswers.writing && (
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-slate-600">
              Writing Test
            </h3>
            <div className="mt-4">
              <h4 className="text-lg font-semibold text-slate-700">
                {userAnswers.writing.task1Title || "No title"}
              </h4>
              <h4 className="text-sm text-slate-500">
                {userAnswers.writing.task1_description || "No description"}
              </h4>
              {userAnswers.writing.task1_imageURL && (
                <img
                  src={userAnswers.writing.task1_imageURL}
                  alt="Task 1 image"
                  className="w-3/4 h-auto mx-auto mb-4 rounded-md shadow-sm" // Centered image with margin auto
                />
              )}
              <div className="p-4 mt-6 border-2 border-gray-300 rounded-md bg-gray-50">
                <p className="text-xl font-bold text-gray-800">User Answer: </p>
                <p className="py-3 text-lg text-gray-700">
                  {userAnswers.writing.task1 || "No answer provided"}
                </p>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="text-lg font-semibold text-slate-700">
                {userAnswers.writing.task2Title || "No title"}
              </h4>
              <h4 className="text-sm text-slate-500">
                {userAnswers.writing.task2_description || "No description"}
              </h4>
              {userAnswers.writing.task2_imageURL && (
                <img
                  src={userAnswers.writing.task2_imageURL}
                  alt="Task 2 image"
                  className="w-3/4 h-auto mx-auto mb-4 rounded-md shadow-sm" // Centered image with margin auto
                />
              )}
              <div className="p-4 mt-6 border-2 border-gray-300 rounded-md bg-gray-50">
                <p className="text-xl font-bold text-gray-800">User Answer: </p>
                <p className="py-3 text-lg text-gray-700">
                  {userAnswers.writing.task2 || "No answer provided"}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
