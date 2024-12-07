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
        {/* Writing Test Results */}
        {userAnswers.writing && (
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-slate-600">
              Writing Test
            </h3>
            {/* Writing Test Content */}
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
                  className="w-3/4 h-auto mx-auto mb-4 rounded-md shadow-sm"
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
                  className="w-3/4 h-auto mx-auto mb-4 rounded-md shadow-sm"
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

        {comments.length > 0 && (
          <div className="p-6 mt-8 bg-white rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-slate-600">
              Nhận xét của giảng viên:
            </h3>
            <div className="mt-4 space-y-4">
              {comments.map((comment, index) => (
                <HistoryComment key={index} comment={comment} /> // Use the new HistoryComment component
              ))}
            </div>
          </div>
        )}

        {/* Book Instructor Section */}
        <div className="p-6 mt-8 bg-white rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-slate-600">
            Đăng ký giảng viên chấm điểm
          </h3>
          <InstructorList
            instructors={instructors}
            testHistoryId={id}
            requestStatus={requestStatus} // Pass the status
          />
        </div>
      </div>
    </div>
  );
}
