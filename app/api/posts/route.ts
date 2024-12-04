import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
  try {
    const posts = await prisma.blogPost.findMany({
      include: { comments: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const data = await req.json();
  const { title, content, authorName, authorEmail } = data;

  if (!title || !content || !authorName || !authorEmail) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  try {
    const post = await prisma.blogPost.create({
      data,
    });
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


