"use client";

import { useEffect, useState } from "react";

interface SpeakingAnswer {
  title: string;
  answer: string;
  transcript: string;
  parts?: Array<{
    partTitle: string;
    questions: Array<{ questionText: string }>;
  }>;
}

interface WritingAnswer {
  title: string;
  task1Title: string;
  task1Description: string;
  task1ImageURL: string;
  task1: string;
  task2Title: string;
  task2Description: string;
  task2ImageURL: string;
  task2: string;
}

interface UserAnswers {
  writing?: WritingAnswer;
  speaking?: SpeakingAnswer;
}

interface Props {
  testHistoryId: string;
}

const UserAnswersByTestHistory = ({ testHistoryId }: Props) => {
  const [userAnswers, setUserAnswers] = useState<UserAnswers | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserAnswers = async () => {
      try {
        const response = await fetch(
          `/api/instructor/show-history/${testHistoryId}/answer`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user answers.");
        }

        const data = await response.json();
        setUserAnswers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAnswers();
  }, [testHistoryId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!userAnswers) {
    return <div>No answers found for the given test history ID.</div>;
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-center text-slate-600">
        User Answers
      </h1>
      <div className="mt-6 space-y-8">
        {/* Writing Test Results */}
        {userAnswers.writing && (
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-slate-600">
              Writing Test
            </h3>
            <h2 className="font-bold text-slate-600">
              {userAnswers.writing.title}
            </h2>
            {/* Writing Test Content */}
            <div className="mt-4">
              <h4 className="text-lg font-semibold text-slate-700">
                {userAnswers.writing.task1Title || "No title"}
              </h4>
              <h4 className="text-sm text-slate-500">
                {userAnswers.writing.task1Description || "No description"}
              </h4>
              {userAnswers.writing.task1ImageURL && (
                <img
                  src={userAnswers.writing.task1ImageURL}
                  alt="Task 1 image"
                  className="w-3/4 h-auto mx-auto mb-4 rounded-md shadow-sm"
                />
              )}
              <div className="p-4 mt-6 border-2 border-gray-300 rounded-md bg-gray-50">
                <p className="text-xl font-bold text-gray-800">User Answer:</p>
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
                {userAnswers.writing.task2Description || "No description"}
              </h4>
              {userAnswers.writing.task2ImageURL && (
                <img
                  src={userAnswers.writing.task2ImageURL}
                  alt="Task 2 image"
                  className="w-3/4 h-auto mx-auto mb-4 rounded-md shadow-sm"
                />
              )}
              <div className="p-4 mt-6 border-2 border-gray-300 rounded-md bg-gray-50">
                <p className="text-xl font-bold text-gray-800">User Answer:</p>
                <p className="py-3 text-lg text-gray-700">
                  {userAnswers.writing.task2 || "No answer provided"}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Speaking Test Results */}
        {userAnswers.speaking && (
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-slate-600">
              Speaking Test
            </h3>
            <p className="text-lg font-semibold text-slate-700">
              {userAnswers.speaking.answer?.title || "No title"}
            </p>
            {userAnswers.speaking.answer?.audioURL && (
              <div className="mt-4">
                <audio
                  controls
                  src={userAnswers.speaking.answer.audioURL}
                  className="w-full"
                >
                  Your browser does not support the audio element.
                </audio>
              </div>
            )}
            {/* Speaking Test Parts */}
            {userAnswers.speaking.parts && (
              <div className="mt-6 space-y-4">
                {userAnswers.speaking.parts.map((part, partIndex) => (
                  <div
                    key={partIndex}
                    className="p-4 border rounded-md bg-gray-50"
                  >
                    <h4 className="text-lg font-bold text-gray-700">
                      {part.partTitle}
                    </h4>
                    {part.questions.map((question, questionIndex) => (
                      <div
                        key={questionIndex}
                        className="p-3 mt-4 border-t border-gray-300"
                      >
                        <p className="text-gray-800">
                          <strong>Question:</strong> {question.questionText}
                        </p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserAnswersByTestHistory;
