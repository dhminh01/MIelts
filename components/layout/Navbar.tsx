import { auth } from "@/auth";
import Link from "next/link";
import React from "react";
import Logout from "../auth/Logout";
import Image from "next/image";
import { House } from "lucide-react";
import { LoginButton } from "../auth/login-button";
import { Button } from "../ui/button";

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
          <LoginButton >
            <Button variant={"secondary"} size={"lg"}>
              Đăng nhập
            </Button>
          </LoginButton>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
