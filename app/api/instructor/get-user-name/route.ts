import { NextResponse } from "next/server";
import prisma from "@/lib/db"; // Adjust this path if your Prisma client is in a different location.

export async function POST(req: Request) {
  try {
    // Parse the user IDs from the request body
    const { userIds } = await req.json();

    if (!userIds || !Array.isArray(userIds)) {
      return NextResponse.json(
        { error: "Invalid request. Provide an array of user IDs." },
        { status: 400 }
      );
    }

    // Fetch user names from the database
    const users = await prisma.user.findMany({
      where: { id: { in: userIds } },
      select: { id: true, name: true}, // Only fetch the id and name fields
    });

    // Create a mapping of userId to userName
    const userNameMap = users.reduce((map, user) => {
      map[user.id] = user.name || "No Name"; // Default to "No Name" if the name is null
      return map;
    }, {} as Record<string, string>);

    return NextResponse.json(userNameMap);
  } catch (error) {
    console.error("Error fetching user names:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
