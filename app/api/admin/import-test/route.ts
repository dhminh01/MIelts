import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(request: Request) {
  const { tests } = await request.json(); // Nhận dữ liệu từ client

  try {
    await Promise.all(
      tests.map(async (test) => {
        await db.test.create({
          data: {
            title: test.title,
            skill: test.skill, // Đảm bảo có trường skill trong JSON
            sections: {
              create: test.sections.map((section) => ({
                title: section.title,
                audioURL: section.audioURL,
                questions: {
                  create: section.questions.map((question) => ({
                    questionNum: question.questionNum,
                    questionText: question.questionText,
                    type: question.type,
                    answer: question.answer || {},
                    correctAnswer: question.correctAnswer,
                  })),
                },
              })),
            },
          },
        });
      })
    );

    return NextResponse.json({ message: "Import successful!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to import tests." },
      { status: 500 }
    );
  }
}
