// app/admin/tests/manage-tests/page.tsx
import { fetchTestsBySkill } from "@/actions/manage-tests";
import TestList from "@/components/TestList";

export default async function ManageTestsPage() {
  const skills = ["LISTENING", "READING", "WRITING", "SPEAKING"];

  // Fetch tests for all skills
  const testsPromises = skills.map((skill) => fetchTestsBySkill(skill));
  const tests = await Promise.all(testsPromises);

  return (
    <div className="p-6 space-y-8">
      <h1 className="mb-6 text-2xl font-bold">Quản lý bài luyện thi</h1>
      {skills.map((skill, index) => (
        <div key={skill} className="space-y-4">
          <h2 className="text-xl font-semibold">{skill} Tests</h2>
          <TestList tests={tests[index]} skill={skill} />
        </div>
      ))}
    </div>
  );
}
