import prisma from "@/lib/db";
import Link from "next/link";
import React from "react";

export default async function AllSkillsList() {
  const tests = await prisma.test.findMany();
  return (
    <main className="flex flex-col items-center pt-24 text-center gap-y-5">
      <h1 className="text-3xl font-semibold">All Skills:</h1>

      <ul>
        {tests.map((test) => (
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
