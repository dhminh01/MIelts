import { NextResponse } from "next/server";
import prisma from "@/lib/db"; // Prisma client
import { ListeningTestSchema } from "@/schemas";

// Handle POST request
export async function POST(req: Request) {
  try {
    // Parse the JSON body
    const body = await req.json();

    // Validate the data using Zod schema
    const validatedData = ListeningTestSchema.parse(body);

    // Create the ListeningTest in the database
    const createdTest = await prisma.listeningTest.create({
      data: {
        title: validatedData.title,
        isTimed: validatedData.isTimed,
        transcript: validatedData.transcript,
        sections: {
          create: validatedData.sections.map((section) => ({
            sectionTitle: section.sectionTitle,
            audioURL: section.audioURL,
            questions: {
              create: section.questions.map((question) => ({
                questionText: question.questionText,
                type: question.type,
                answer:
                  question.type === "MULTIPLE_CHOICE" ? question.answer : null,
                correctAnswer: question.correctAnswer,
              })),
            },
          })),
        },
      },
    });

    return NextResponse.json({
      message: "Listening test created successfully",
      test: createdTest,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
