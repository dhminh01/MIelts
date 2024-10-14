import SpeakingPracticesList from "@/components/practices/speaking-practices-list";
import React from "react";

export default async function Practice() {
  return (
    <main className="flex flex-col items-center text-center gap-y-5">
      <SpeakingPracticesList />
    </main>
  );
}
