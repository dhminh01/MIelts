import prisma from "@/lib/db";
import Link from "next/link";
import React from "react";

export default async function ListeningPracticesList() {
  const listeningTests = await prisma.listeningTest.findMany();

  return (
    <main className="flex flex-col items-center px-4 py-4 text-center gap-y-5 sm:px-6 lg:px-8">
      <section className="w-full p-6 rounded-lg shadow-lg bg-blue-50">
        <h2 className="mb-4 text-2xl font-semibold text-blue-700">Listening</h2>
        <ul className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {listeningTests.map((test) => (
            <li
              key={test.id}
              className="p-4 transition-shadow border rounded-lg shadow-md hover:shadow-lg hover:border-blue-500"
            >
              <Link
                href={`/listening-test/${test.id}`}
                className="text-lg font-semibold text-blue-600"
              >
                {test.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
