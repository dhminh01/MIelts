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

  return (
    <main className="flex flex-col items-center px-4 pt-4 text-center gap-y-5 sm:px-6 lg:px-8">
      {/* Listening Tests Section */}
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

      {/* Reading Tests Section */}
      <section className="w-full p-6 mt-10 rounded-lg shadow-lg bg-green-50">
        <h2 className="mb-4 text-2xl font-semibold text-green-700">Reading</h2>
        <ul className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {readingTests.map((test) => (
            <li
              key={test.id}
              className="p-4 transition-shadow border rounded-lg shadow-md hover:shadow-lg hover:border-green-500"
            >
              <Link
                href={`/reading-test/${test.id}`}
                className="text-lg font-semibold text-green-600"
              >
                {test.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Writing Tests Section */}
      <section className="w-full p-6 mt-10 rounded-lg shadow-lg bg-yellow-50">
        <h2 className="mb-4 text-2xl font-semibold text-yellow-700">Writing</h2>
        <ul className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {writingTests.map((test) => (
            <li
              key={test.id}
              className="p-4 transition-shadow border rounded-lg shadow-md hover:shadow-lg hover:border-yellow-500"
            >
              <Link
                href={`/writing-test/${test.id}`}
                className="text-lg font-semibold text-yellow-600"
              >
                {test.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Speaking Tests Section */}
      <section className="w-full p-6 mt-10 rounded-lg shadow-lg bg-purple-50">
        <h2 className="mb-4 text-2xl font-semibold text-purple-700">
          Speaking
        </h2>
        <ul className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {speakingTests.map((test) => (
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
      </section>
    </main>
  );
}
