import { fetchUserAnswers } from "@/actions/fetchUserAnswers";
import { getInstructors } from "@/actions/getInstructors";
import { fetchRequestStatus } from "@/actions/fetchRequestStatus";
import InstructorList from "@/components/test-history-booking/InstructorList";
import { notFound } from "next/navigation";
import HistoryComment from "@/components/test-history-booking/HistoryComment";

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

  // Fetch instructors and the request status
  const [instructors, requestStatus] = await Promise.all([
    getInstructors(),
    fetchRequestStatus(id), // Fetch review request status using testHistoryId
  ]);

  const comments = userAnswers.comments || [];
  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-center text-slate-600">
        User Answers
      </h1>
      <div className="mt-6 space-y-8">
        {/* Speaking Test Results */}
        {userAnswers.speaking?.answer && (
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-slate-600">
              Speaking Test
            </h3>
            <p>{userAnswers.speaking.answer?.title}</p>
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
            {userAnswers.speaking?.parts && (
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

        {/* Instructors List and Comments */}
        {comments.length > 0 && (
          <div className="mt-6 space-y-4">
            {comments.map((comment, index) => (
              <HistoryComment key={index} comment={comment} />
            ))}
          </div>
        )}

        {/* Instructor List */}
        {instructors.length > 0 && (
          <InstructorList
            instructors={instructors}
            testHistoryId={id}
            requestStatus={requestStatus}
          />
        )}
      </div>
    </div>
  );
}
