import Link from "next/link";
import React from "react";

export default function QuestionsPage() {
  const frequentlyQuestions = [
    {
      label: "Về chúng tôi",
      path: "/frequently-asked-questions/about-us",
    },
    {
      label: "Listening Test",
      path: "/frequently-asked-questions/listening-test",
    },
    {
      label: "Reading Test",
      path: "/frequently-asked-questions/reading-test",
    },
    {
      label: "Writing Test",
      path: "/frequently-asked-questions/writing-test",
    },
    {
      label: "Speaking Test",
      path: "/frequently-asked-questions/speaking-test",
    },
  ];
  return (
    <main className="flex flex-col items-center justify-center h-full">
      <h1 className="text-3xl">Ratings Page</h1>
      <div className="gap-5">
        {frequentlyQuestions.map((routes) => (
          <Link
            href={routes.path}
            key={routes.path}
            className="py-2 font-bold hover:text-primary"
          >
            {routes.label}
          </Link>
        ))}
      </div>
    </main>
  );
}
