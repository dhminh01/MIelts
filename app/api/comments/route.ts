import { NextResponse } from "next/server";
import prisma from "@/lib/db";

// Thêm bình luận
export async function POST(req: Request) {
  const { postId, content, authorName, authorEmail } = await req.json();

  if (!postId || !content || !authorName || !authorEmail) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  try {
    const comment = await prisma.comment.create({
      data: {
        postId,
        content,
        authorName,
        authorEmail,
      },
    });
    return NextResponse.json(comment);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
