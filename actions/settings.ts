import prisma from "@/lib/db";
import { auth } from "@/auth"; // Adjust import based on your authentication logic

export async function POST(request: Request) {
  const session = await auth(); // Get the session to find the user
  const { name, password, image } = await request.json();

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const userId = session.user.id;

    // Update user settings in the database
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        password, // Ensure to handle password hashing if necessary
        image,
      },
    });

    return new Response(JSON.stringify(updatedUser), { status: 200 });
  } catch (error) {
    console.error("Error updating user settings:", error);
    return new Response("Failed to update settings", { status: 500 });
  }
}
