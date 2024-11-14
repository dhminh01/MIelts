import prisma from "@/lib/db";
import { auth } from "@/auth";

export async function fetchHistory() {
  try {
    // Retrieve the authenticated user
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
      throw new Error("Unauthorized");
    }

    const userId = session.user.id;

    // Fetch the score history for the user, including testId and skill
    const history = await prisma.testHistory.findMany({
      where: { userId }, // Use the ObjectId here
      include: {
        listeningTest: {
          select: { title: true },
        },
        readingTest: {
          select: { title: true },
        },
        writingTest: {
          select: { title: true },
        },
        speakingTest: {
          select: { title: true },
        },
      },
    });

    return history;
  } catch (error) {
    console.error("Error fetching scores:", error);
    throw new Error("Failed to fetch scores");
  }
}
