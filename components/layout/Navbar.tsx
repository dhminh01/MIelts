import { auth } from "@/auth";
import Link from "next/link";
import React from "react";
import Logout from "../auth/Logout";
import Image from "next/image";
import { House } from "lucide-react";

async function Navbar() {
  const session = await auth();
  const navRoutes = [
    { label: "Thư viện đề thi Ielts", path: "/practice-libraries" },
    { label: "IELTS Tips", path: "/ielts-tips" },
    { label: "IELTS Preps", path: "/ielts-preps" },
    { label: "Đăng ký giảng viên", path: "/instructor/booking" },
  ];
  return (
    <nav className="flex items-center w-full border-b bg-background">
      <div className="flex items-center justify-between w-full my-4">
        <div className="flex items-center gap-10">
          <Link className="font-bold" href={"/"}>
            <House />
          </Link>
          {navRoutes.map((routes) => (
            <Link
              href={routes.path}
              key={routes.path}
              className="py-2 font-bold hover:text-primary"
            >
              {routes.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-x-5">
          {!session?.user ? (
            <Link href={"/sign-in"}>
              <div className="font-bold hover:text-primary">Đăng nhập</div>
            </Link>
          ) : (
            <>
              <div className="flex items-center text-sm gap-x-2">
                {session?.user?.image && (
                  <Image
                    src={session?.user?.image || ""}
                    height={30}
                    width={30}
                    alt="User avatar"
                    className="rounded-full"
                  />
                )}
              </div>
              <Logout />
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
