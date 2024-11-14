// /app/api/ielts/search/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const title = url.searchParams.get("title");

  if (!title) {
    return NextResponse.json({ tests: [] });
  }

  const [listeningTests, readingTests, writingTests, speakingTests] =
    await Promise.all([
      prisma.listeningTest.findMany({
        where: { title: { contains: title, mode: "insensitive" } },
        select: { id: true, title: true },
      }),
      prisma.readingTest.findMany({
        where: { title: { contains: title, mode: "insensitive" } },
        select: { id: true, title: true },
      }),
      prisma.writingTest.findMany({
        where: { title: { contains: title, mode: "insensitive" } },
        select: { id: true, title: true },
      }),
      prisma.speakingTest.findMany({
        where: { title: { contains: title, mode: "insensitive" } },
        select: { id: true, title: true },
      }),
    ]);

  // Combine results and add skill label
  const combinedResults = [
    ...listeningTests.map((test) => ({ ...test, skill: "Listening" })),
    ...readingTests.map((test) => ({ ...test, skill: "Reading" })),
    ...writingTests.map((test) => ({ ...test, skill: "Writing" })),
    ...speakingTests.map((test) => ({ ...test, skill: "Speaking" })),
  ];

  return NextResponse.json({ tests: combinedResults });
}
