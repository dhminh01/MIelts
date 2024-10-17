import { auth, signOut } from "@/auth";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { House } from "lucide-react";
import { LoginButton } from "../auth/login-button";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

async function Navbar() {
  const session = await auth();

  const imageUrl = session?.user?.image;
  const name = session?.user?.name;

  const navRoutes = [
    { label: "Thư viện đề thi Ielts", path: "/practice-libraries" },
    { label: "IELTS Tips", path: "/ielts-tips" },
    { label: "IELTS Preps", path: "/ielts-preps" },
    { label: "Đăng ký giảng viên", path: "/instructor/booking" },
  ];
  return (
    <nav className="flex items-center w-full border-b bg-background">
      <div className="flex flex-col items-center justify-between w-full my-4 lg:flex-row">
        <div className="flex flex-col items-center w-full gap-4 lg:flex-row lg:gap-10 lg:w-auto">
          <Link className="font-bold" href={"/"}>
            <House />
          </Link>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {navRoutes.map((routes) => (
            <Link
              href={routes.path}
              key={routes.path}
              className="py-2 text-sm font-semibold lg:text-base hover:text-primary"
            >
              {routes.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-3 mt-4 lg:mt-0">
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="hover:cursor-pointer">
              <Button
                variant={"secondary"}
                className="flex items-center justify-start gap-1 p-0 m-0 bg-white lg:gap-3 lg:px-3 lg:w-full"
              >
                {imageUrl && (
                  <Image
                    src={imageUrl}
                    width={24}
                    height={24}
                    alt="user profile picture"
                    className="rounded-full"
                  />
                )}
                <p className="truncate">{name}</p>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-52">
              <DropdownMenuItem className="flex items-center justify-center">
                <Button variant={"ghost"} className="hover:text-primary">
                  <Link href={"/users/settings"}>Tài khoản</Link>
                </Button>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center justify-center">
                <Button variant={"ghost"} className="hover:text-primary">
                  <Link href={"/loggedIn/support"}>Hỗ trợ</Link>
                </Button>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center justify-center">
                <form
                  action={async () => {
                    "use server";
                    await signOut({ redirectTo: "/auth/login" });
                  }}
                >
                  <Button
                    variant={"ghost"}
                    type="submit"
                    className="hover:text-primary"
                  >
                    Đăng xuất
                  </Button>
                </form>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
