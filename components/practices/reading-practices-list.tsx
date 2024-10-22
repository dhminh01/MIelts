import prisma from "@/lib/db";
import Link from "next/link";
import React from "react";

export default async function ReadingPracticesList() {
  const readingTests = await prisma.ieltsTest.findMany({
    where: {
      skill: "READING",
    },
  });
  return (
    <main className="flex flex-col items-center pt-24 text-center gap-y-5">
      <h1 className="text-3xl font-semibold">Reading Practices:</h1>

      <ul>
        {readingTests.map((test) => (
          <li key={test.id} className="flex items-center justify-between px-5">
            <Link href={`/practice-libraries`}>
              {test.title} - {test.skill} (Part {test.part})
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
