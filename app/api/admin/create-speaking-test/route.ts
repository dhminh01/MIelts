import { NextResponse } from "next/server";
import prisma from "@/lib/db";

// POST Handler
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, parts } = body;

    // Validation
    if (!title || !parts || !Array.isArray(parts)) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    // Create Speaking Test
    const speakingTest = await prisma.speakingTest.create({
      data: {
        title,
        SpeakingPart: {
          create: parts.map((part: any) => ({
            title: part.title,
            description: part.description,
            SpeakingQuestion: {
              create: part.questions.map((question: any) => ({
                questionText: question.questionText,
                responseType: question.responseType || "AUDIO",
              })),
            },
          })),
        },
      },
    });

    return NextResponse.json(
      { success: true, data: speakingTest },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating SpeakingTest:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
