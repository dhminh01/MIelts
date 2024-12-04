import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { userId, amount } = await request.json();

    if (!userId || !amount) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    // Find the user's wallet
    const wallet = await prisma.userWallet.findUnique({
      where: { userId },
    });

    if (!wallet) {
      return NextResponse.json(
        { error: "User wallet not found." },
        { status: 404 }
      );
    }

    // Update the wallet's amount
    const updatedWallet = await prisma.userWallet.update({
      where: { userId },
      data: {
        amount: wallet.amount + parseFloat(amount),
      },
    });

    return NextResponse.json({ success: true, wallet: updatedWallet });
  } catch (error) {
    console.error("Error updating wallet:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
