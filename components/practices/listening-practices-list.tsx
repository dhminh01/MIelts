import prisma from "@/lib/db";
import Link from "next/link";
import React from "react";

export default async function ListeningPracticesList() {
  const practices = await prisma.ieltsPractices.findMany({
    where: {
      skill: "LISTENING",
    },
  });
  return (
    <main className="flex flex-col items-center pt-24 text-center gap-y-5">
      <h1 className="text-3xl font-semibold">Listening Practices:</h1>

      <ul>
        {practices.map((practice) => (
          <li
            key={practice.id}
            className="flex items-center justify-between px-5"
          >
            <Link href={`/practice-libraries/${practice.skill}/${practice.id}`}>
              {practice.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
