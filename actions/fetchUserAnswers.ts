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
                questions: true, // Include Listening questions
              },
            },
          },
        },
        readingTest: {
          include: {
            passages: {
              include: {
                questions: true, // Include Reading questions
              },
            },
          },
        },
        writingTest: true, // Include Writing test if needed
        speakingTest: {
          include: {
            SpeakingPart: {
              include: {
                SpeakingQuestion: true, // Include Speaking questions
              },
            },
          },
        },
        comments: true, // Include comments
      },
    });

    if (!historyItem) {
      return null;
    }

    const userAnswers = Array.isArray(historyItem.userAnswers)
      ? historyItem.userAnswers
      : typeof historyItem.userAnswers === "string"
      ? historyItem.userAnswers.split(",")
      : [];

    const correctListeningAnswers =
      historyItem.listeningTest?.sections.flatMap((section) =>
        section.questions.map((question) => question.correctAnswer)
      ) || [];

    const correctReadingAnswers =
      historyItem.readingTest?.passages.flatMap((passage) =>
        passage.questions.map((question) => question.correctAnswer)
      ) || [];

    const speakingParts =
      historyItem.speakingTest?.SpeakingPart.map((part) => ({
        partTitle: part.title,
        partDescription: part.description,
        questions: part.SpeakingQuestion.map((question) => ({
          questionText: question.questionText,
        })),
      })) || [];

    const speakingAnswers = historyItem.speakingTest
      ? {
          title: historyItem.speakingTest.title || "No title",
          audioURL: historyItem.audioURL || null,
        }
      : null;

    const writingAnswers = historyItem.writingTest
      ? {
          title: historyItem.writingTest.title,
          task1: historyItem.userAnswers.task1 || "No answer provided",
          task2: historyItem.userAnswers.task2 || "No answer provided",
          task1Title: historyItem.writingTest.task1Title,
          task2Title: historyItem.writingTest.task2Title,
          task1Description: historyItem.writingTest.task1_description,
          task2Description: historyItem.writingTest.task2_description,
          task1ImageURL: historyItem.writingTest.task1_imageURL,
          task2ImageURL: historyItem.writingTest.task2_imageURL,
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
      speaking: {
        answer: speakingAnswers,
        parts: speakingParts,
      },
      writing: writingAnswers,
      comments: historyItem.comments || [],
    };
  } catch (error) {
    console.error("Error fetching user answers:", error);
    return null;
  }
}
