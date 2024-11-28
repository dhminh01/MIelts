// actions/fetchUserAnswers.ts
import prisma from "@/lib/db";

export async function fetchUserAnswers(id: string) {
  try {
    const historyItem = await prisma.testHistory.findUnique({
      where: { id },
      include: {
        listeningTest: {
          include: {
            sections: {
              include: {
                questions: true, // Include all questions in the sections
              },
            },
          },
        },
        readingTest: {
          include: {
            passages: {
              include: {
                questions: true, // Include all questions in the passages
              },
            },
          },
        },
        writingTest: true, // Include writingTest if needed
      },
    });

    if (!historyItem) {
      return null; // Return null if history item not found
    }

    // Check if userAnswers is a string and split it if necessary
    const userAnswers = Array.isArray(historyItem.userAnswers)
      ? historyItem.userAnswers
      : typeof historyItem.userAnswers === "string"
      ? historyItem.userAnswers.split(",") // If it's a string, split it into an array
      : [];

    // Extract correct answers from the listening test's questions
    const correctListeningAnswers =
      historyItem.listeningTest?.sections.flatMap((section) =>
        section.questions.map((question) => question.correctAnswer)
      ) || [];

    // Extract correct answers from the reading test's questions
    const correctReadingAnswers =
      historyItem.readingTest?.passages.flatMap((passage) =>
        passage.questions.map((question) => question.correctAnswer)
      ) || [];

    // For Writing Test, we don't have correct answers, so just return user answers
    const writingAnswers = historyItem.writingTest
      ? {
          task1: historyItem.userAnswers.task1 || "No answer provided",
          task2: historyItem.userAnswers.task2 || "No answer provided",
          task1Title: historyItem.writingTest.task1Title,
          task2Title: historyItem.writingTest.task2Title,
          task1_description: historyItem.writingTest.task1_description,
          task2_description: historyItem.writingTest.task2_description,
          task1_imageURL: historyItem.writingTest.task1_imageURL,
          task2_imageURL: historyItem.writingTest.task2_imageURL,
        }
      : null;

    return {
      listening: {
        user_answer: userAnswers.slice(0, correctListeningAnswers.length),
        correct_answer: correctListeningAnswers,
      },
      reading: {
        user_answer: userAnswers.slice(correctListeningAnswers.length),
        correct_answer: correctReadingAnswers,
      },
      writing: writingAnswers, // Return writing answers
    };
  } catch (error) {
    console.error("Error fetching user answers:", error);
    return null;
  }
}
