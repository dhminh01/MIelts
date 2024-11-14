import { auth } from "@/auth";
import prisma from "@/lib/db";

export async function fetchScores() {
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
      throw new Error("Unauthorized");
    }

    const userId = session.user.id;

    const history = await prisma.testHistory.findMany({
      where: { userId },
      include: {
        listeningTest: { select: { title: true } },
        readingTest: { select: { title: true } },
        writingTest: { select: { title: true } },
        speakingTest: { select: { title: true } },
      },
    });

    console.log("Fetched history data:", history); // Debugging output
    return history;
  } catch (error) {
    console.error("Error fetching scores:", error);
    throw new Error("Failed to fetch scores");
  }
}
