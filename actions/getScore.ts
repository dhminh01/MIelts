// @/actions/scoreHistory.ts

import prisma from "@/lib/db"; // Adjust according to your Prisma client setup

export async function getTestScoreHistory(userId: string) {
  const testHistory = await prisma.testHistory.findMany({
    where: { userId },
    include: {
      listeningTest: true,
      readingTest: true,
      writingTest: true,
      speakingTest: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  // Group by skills
  const history = {
    listening: [],
    reading: [],
    writing: [],
    speaking: [],
  };

  testHistory.forEach((entry) => {
    if (entry.listeningTest) {
      history.listening.push({ date: entry.createdAt, score: entry.score });
    }
    if (entry.readingTest) {
      history.reading.push({ date: entry.createdAt, score: entry.score });
    }
    if (entry.writingTest) {
      history.writing.push({ date: entry.createdAt, score: entry.score });
    }
    if (entry.speakingTest) {
      history.speaking.push({ date: entry.createdAt, score: entry.score });
    }
  });

  return history;
}
