// actions/fetchUserHistory.ts
import db from "@/lib/db"; // Adjust the path to your Prisma instance

export const getUserScoreHistory = async (userId: string) => {
  try {
    const history = await db.testHistory.findMany({
      where: { userId },
      select: {
        createdAt: true,
        score: true,
        listeningTestId: true,
        readingTestId: true,
        writingTestId: true,
        speakingTestId: true,
      },
    });

    const historyBySkill = {
      listening: history
        .filter((entry) => entry.listeningTestId)
        .map((entry) => ({ date: entry.createdAt, score: entry.score })),
      reading: history
        .filter((entry) => entry.readingTestId)
        .map((entry) => ({ date: entry.createdAt, score: entry.score })),
      writing: history
        .filter((entry) => entry.writingTestId)
        .map((entry) => ({ date: entry.createdAt, score: entry.score })),
      speaking: history
        .filter((entry) => entry.speakingTestId)
        .map((entry) => ({ date: entry.createdAt, score: entry.score })),
    };

    return historyBySkill;
  } catch (error) {
    console.error("Error fetching user score history:", error);
    return null;
  }
};
