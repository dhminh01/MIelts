"use client"; // This marks the component as a Client Component

import React from "react";
import Link from "next/link";

// Client component to render the list of reading tests
export default function SpeakingTestList({ tests }: { tests: any[] }) {
  return (
    <ul className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {tests.map((test) => (
        <li
          key={test.id}
          className="p-4 transition-shadow border rounded-lg shadow-md hover:shadow-lg hover:border-purple-500"
        >
          <Link
            href={`/speaking-test/${test.id}`}
            className="text-lg font-semibold text-purple-600"
          >
            {test.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
