
import WritingPracticesList from "@/components/practices/writing-practices-list";
import React from "react";

export default async function Practice() {
  return (
    <main className="flex flex-col items-center text-center gap-y-5">
      <WritingPracticesList />
    </main>
  );
}
