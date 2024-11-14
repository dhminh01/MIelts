// app/api/createListeningTest/route.ts
import { createListeningTestWithSectionsAndQuestions } from "@/actions/createListeningTestWithSectionsAndQuestions";
import { NextResponse } from "next/server";

// Handle POST request
export async function POST(request: Request) {
  const body = await request.json();
  const { title, isTimed, transcript, totalQuestions, sections } = body;

  // Validate the incoming data
  if (!title || !sections || sections.length === 0) {
    return NextResponse.json(
      { error: "Missing required fields or sections" },
      { status: 400 }
    );
  }

  try {
    const newTest = await createListeningTestWithSectionsAndQuestions(
      title,
      isTimed,
      transcript,
      totalQuestions,
      sections
    );
    return NextResponse.json(newTest, { status: 201 });
  } catch (error) {
    console.error(
      "Error creating ListeningTest with sections and questions:",
      error
    );
    return NextResponse.json(
      { error: "Failed to create ListeningTest" },
      { status: 500 }
    );
  }
}
