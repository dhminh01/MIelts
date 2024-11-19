// app/user-answers/[id]/page.tsx

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
    <div className="p-4">
      <h1 className="text-3xl font-bold">User Answers</h1>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">
          Your Answers for Test ID: {id}
        </h2>
        {/* Display answers for the user */}
        <div className="mt-4">
          <h3 className="font-bold">Task 1 Answer</h3>
          <pre className="p-4 bg-gray-100">{userAnswers.task1_answer}</pre>
        </div>
        <div className="mt-4">
          <h3 className="font-bold">Task 2 Answer</h3>
          <pre className="p-4 bg-gray-100">{userAnswers.task2_answer}</pre>
        </div>
      </div>
    </div>
  );
}
