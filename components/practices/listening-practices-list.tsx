import prisma from "@/lib/db";
import Link from "next/link";
import React from "react";

export default async function ListeningPracticesList() {
  const listeningTests = await prisma.ieltsTest.findMany({
    where: {
      skill: "LISTENING",
    },
  });
  return (
    <main className="flex flex-col items-center pt-24 text-center gap-y-5">
      <h1 className="text-3xl font-semibold">Listening Practices:</h1>

      <ul>
        {listeningTests.map((test) => (
          <li key={test.id} className="flex items-center justify-between px-5">
            <Link href={`/practice-libraries/${test.id}`}>
              {test.title} - {test.skill} (Part {test.part})
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
