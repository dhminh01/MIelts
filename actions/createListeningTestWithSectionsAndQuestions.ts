// actions/listeningTest/createListeningTestWithSectionsAndQuestions.ts
import  prisma  from "@/lib/db";

export const createListeningTestWithSectionsAndQuestions = async (
  title: string,
  isTimed: boolean,
  transcript?: string,
  totalQuestions?: number,
  sections: {
    sectionTitle: string;
    audioURL: string;
    questions: {
      questionText: string;
      type: string;
      answer: any;
      correctAnswer: string;
    }[];
  }[]
) => {
  try {
    const newTest = await prisma.listeningTest.create({
      data: {
        title,
        isTimed,
        transcript,
        totalQuestions,
        sections: {
          create: sections.map((section) => ({
            sectionTitle: section.sectionTitle,
            audioURL: section.audioURL,
            questions: {
              create: section.questions.map((question) => ({
                questionText: question.questionText,
                type: question.type,
                answer: question.answer,
                correctAnswer: question.correctAnswer,
              })),
            },
          })),
        },
      },
    });

    return newTest;
  } catch (error) {
    console.error(
      "Error creating ListeningTest with sections and questions:",
      error
    );
    throw new Error(
      "Failed to create ListeningTest with sections and questions"
    );
  }
};
