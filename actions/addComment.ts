// /actions/addComment.ts
import prisma from '@/lib/db';

export async function addComment({
  postId,
  content,
  authorName,
  authorEmail,
}: {
  postId: string;
  content: string;
  authorName: string;
  authorEmail: string;
}) {
  return await prisma.comment.create({
    data: { postId, content, authorName, authorEmail },
  });
}
