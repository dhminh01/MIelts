import prisma from "@/lib/db";
import Link from "next/link";
import React from "react";

export default async function AllSkillsList() {
  // Fetch tests from each skill-specific model
  const listeningTests = await prisma.listeningTest.findMany({
    select: { id: true, title: true },
  });
  const readingTests = await prisma.readingTest.findMany({
    select: { id: true, title: true },
  });
  const writingTests = await prisma.writingTest.findMany({
    select: { id: true, title: true },
  });
  const speakingTests = await prisma.speakingTest.findMany({
    select: { id: true, title: true },
  });

  // Add skill type to each test
  const allTests = [
    ...listeningTests.map((test) => ({ ...test, skill: "listening" })),
    ...readingTests.map((test) => ({ ...test, skill: "reading" })),
    ...writingTests.map((test) => ({ ...test, skill: "writing" })),
    ...speakingTests.map((test) => ({ ...test, skill: "speaking" })),
  ];

  return (
    <main className="flex flex-col items-center pt-24 text-center gap-y-5">
      <h1 className="text-3xl font-semibold">All Skills:</h1>

      <ul>
        {allTests.map((test) => (
          <li key={test.id} className="flex items-center justify-between px-5">
            <Link
              href={`/${test.skill}-test/${test.id}`} // Dynamically create the path
            >
              {test.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
