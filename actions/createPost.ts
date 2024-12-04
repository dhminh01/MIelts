import prisma from "@/lib/db";

export async function createPost(data: {
  title: string;
  content: string;
  authorName: string;
  authorEmail: string;
}) {
  if (!data.title || !data.content || !data.authorName || !data.authorEmail) {
    throw new Error("All fields are required.");
  }

  const post = await prisma.blogPost.create({
    data,
  });

  return post;
}
