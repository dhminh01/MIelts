import ListeningPracticesList from "@/components/practices/listening-practices-list";
import prisma from "@/lib/db";
import React from "react";

export default async function Practice() {
  return (
    <main className="flex flex-col items-center text-center gap-y-5">
      <ListeningPracticesList />
    </main>
  );
}
