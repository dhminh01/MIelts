// actions/fetchUserAnswers.ts

import prisma from "@/lib/db";

export async function fetchUserAnswers(id: string) {
  try {
    const historyItem = await prisma.testHistory.findUnique({
      where: { id },
      include: {
        writingTest: true, // Include the related writing test
        listeningTest: true, // Include related listening test, if applicable
        readingTest: true, // Include related reading test, if applicable
        speakingTest: true, // Include related speaking test, if applicable
      },
    });

    if (!historyItem) {
      return null; // Return null if history item not found
    }

    return {
      task1_answer: historyItem.userAnswers || "",
      // Add any other logic for other types of tests if necessary
    };
  } catch (error) {
    console.error("Error fetching user answers:", error);
    return null;
  }
}
