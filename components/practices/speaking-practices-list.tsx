import prisma from "@/lib/db";
import Link from "next/link";
import React from "react";

export default async function SpeakingPracticesList() {
  const speakingTests = await prisma.test.findMany({
    where: {
      skill: "SPEAKING",
    },
  });
  return (
    <main className="flex flex-col items-center pt-24 text-center gap-y-5">
      <h1 className="text-3xl font-semibold">Speaking Practices:</h1>

      <ul>
        {speakingTests.map((test) => (
          <li key={test.id} className="flex items-center justify-between px-5">
            <Link href={`/tests/${test.id}`}>
              {test.title} - {test.skill}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
