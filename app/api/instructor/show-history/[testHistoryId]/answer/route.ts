import { NextRequest, NextResponse } from "next/server";
import { fetchUserAnswers } from "@/actions/fetchUserAnswers";

export async function GET(
  req: NextRequest,
  { params }: { params: { testHistoryId: string } }
) {
  try {
    const { testHistoryId } = params;

    if (!testHistoryId) {
      return NextResponse.json(
        { error: "Test History ID is required" },
        { status: 400 }
      );
    }

    const userAnswers = await fetchUserAnswers(testHistoryId);

    if (!userAnswers) {
      return NextResponse.json(
        { error: "Test History not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(userAnswers, { status: 200 });
  } catch (error) {
    console.error("Error fetching user answers:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching user answers" },
      { status: 500 }
    );
  }
}
