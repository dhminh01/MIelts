import ReadingPracticesList from "@/components/practices/reading-practices-list";
import React from "react";

export default async function Practice() {
  return (
    <main className="flex flex-col items-center text-center gap-y-5">
      <ReadingPracticesList />
    </main>
  );
}
