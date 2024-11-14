import { Server as SocketIOServer } from "socket.io";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

const ioHandler = () => {
  // Prevent multiple Socket.IO servers during development in Next.js
  if (!(global as any).io) {
    const io = new SocketIOServer({
      path: "/api/socket",
      addTrailingSlash: false, // Optional: removes trailing slash if Next.js rewrites add them
    });

    io.on("connection", (socket) => {
      console.log("A user connected:", socket.id);

      socket.on("message", (msg) => {
        console.log("Message received:", msg);
        io.emit("message", msg); // Broadcasts to all clients
      });

      socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
      });
    });

    (global as any).io = io;
  }
  return (global as any).io;
};

export async function GET(req: NextApiRequest) {
  const io = ioHandler();
  return NextResponse.json({ message: "Socket.io server initialized" });
}
