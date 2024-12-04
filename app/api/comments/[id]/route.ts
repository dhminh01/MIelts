import prisma from "@/lib/db"; // Ensure you are importing your Prisma client

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return new Response(JSON.stringify({ error: "Comment ID is required" }), {
        status: 400,
      });
    }

    // Attempt to delete the comment by its ID
    const deletedComment = await prisma.comment.delete({
      where: { id },
    });

    return new Response(JSON.stringify(deletedComment), { status: 200 });
  } catch (error) {
    console.error("Error deleting comment:", error);
    return new Response(JSON.stringify({ error: "Error deleting comment" }), {
      status: 500,
    });
  }
}
