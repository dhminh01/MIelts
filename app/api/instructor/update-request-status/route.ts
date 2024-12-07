import { NextResponse } from "next/server";
import prisma from "@/lib/db"; // Adjust this path if necessary

export async function POST(req: Request) {
  try {
    const { requestId, status } = await req.json();

    if (!requestId || !["ACCEPTED", "DECLINED"].includes(status)) {
      return NextResponse.json(
        { error: "Invalid request data." },
        { status: 400 }
      );
    }

    const updatedRequest = await prisma.requestInfo.update({
      where: { id: requestId },
      data: { status },
    });

    return NextResponse.json(updatedRequest);
  } catch (error) {
    console.error("Error updating request status:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
