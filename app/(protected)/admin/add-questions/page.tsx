import { QuestionForm } from "@/components/admin/create-question-form";

export default function AddQuestionPage() {
  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-4 text-2xl font-bold">Add a New Test</h1>
      <QuestionForm />
    </div>
  );
}
