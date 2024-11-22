// components/TestList.tsx
"use client";

import { useState } from "react";
import { deleteTest } from "@/actions/manage-tests";

interface TestListProps {
  tests: { id: string; title: string }[];
  skill: string;
}

export default function TestList({ tests, skill }: TestListProps) {
  const [localTests, setLocalTests] = useState(tests);

  const handleDelete = async (testId: string) => {
    try {
      await deleteTest(skill, testId);
      setLocalTests(localTests.filter((test) => test.id !== testId)); // Remove deleted test from the list
    } catch (error) {
      console.error("Error deleting test:", error);
    }
  };

  return (
    <div className="space-y-4">
      <ul className="space-y-2">
        {localTests.map((test) => (
          <li
            key={test.id}
            className="flex items-center justify-between p-2 bg-gray-100 rounded-md"
          >
            <span>{test.title}</span>
            <button
              onClick={() => handleDelete(test.id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
