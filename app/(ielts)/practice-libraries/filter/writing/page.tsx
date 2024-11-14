import prisma from "@/lib/db";
import Link from "next/link";
import React from "react";

export default async function WritingPracticesList() {
  const writingTests = await prisma.writingTest.findMany();
  return (
    <main className="flex flex-col items-center pt-24 text-center gap-y-5">
      <h1 className="text-3xl font-semibold">Writing Practices:</h1>

      <ul>
        {writingTests.map((test) => (
          <li key={test.id} className="flex items-center justify-between px-5">
            <Link href={`/writing-test/${test.id}`}>{test.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
