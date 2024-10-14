import prisma from "@/lib/db";
import React from "react";

export default async function Practice({ params }) {
  const practice = await prisma.ieltsPractices.findUnique({
    where: {
      id: params.id,
    },
  });
  return (
    <main className="flex flex-col items-center pt-24 text-center gap-y-5">
      <h1 className="text-3xl font-semibold">{practice?.title}</h1>

      <p>{practice?.content}</p>
    </main>
  );
}
