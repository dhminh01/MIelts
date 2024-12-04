import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const userId = request.headers.get("user-id");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required." },
        { status: 400 }
      );
    }

    // Fetch the user's wallet information
    const wallet = await prisma.userWallet.findUnique({
      where: { userId },
    });

    if (!wallet) {
      return NextResponse.json(
        { error: "User wallet not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, wallet: wallet.amount });
  } catch (error) {
    console.error("Error fetching wallet:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
