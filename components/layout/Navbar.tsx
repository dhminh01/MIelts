import { auth } from "@/auth";
import Link from "next/link";
import React from "react";
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
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { FaUser } from "react-icons/fa";
import { LogoutButton } from "../auth/logout-button";
import { ExitIcon } from "@radix-ui/react-icons";
import { IoHelpCircleOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";

async function Navbar() {
  const session = await auth();

  const imageUrl = session?.user?.image;
  // const name = session?.user?.name;

  const navRoutes = [
    { label: "Thư viện đề thi Ielts", path: "/practice-libraries" },
    { label: "IELTS Tips", path: "/ielts-tips" },
    { label: "IELTS Preps", path: "/ielts-preps" },
    { label: "Blog", path: "/blog" },
    // { label: "Đăng ký làm giảng viên", path: "/instructor-registration" },
  ];
  return (
    <nav className="flex items-center w-full border-b bg-background">
      <div className="flex flex-col items-center justify-between w-full my-4 lg:flex-row">
        <div className="flex flex-col items-center w-full gap-4 lg:flex-row lg:gap-10 lg:w-auto">
          <Link className="font-bold" href={"/"}>
            <House />
          </Link>
        </div>
        <div className="flex flex-wrap justify-center gap-5">
          {navRoutes.map((routes) => (
            <Link
              href={routes.path}
              key={routes.path}
              className="font-semibold text-slate-700 lg:text-lg hover:text-primary/80"
            >
              {routes.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-3 mt-4 lg:mt-0">
          {!session?.user ? (
            <LoginButton>
              <div className="font-semibold hover:text-primary">Đăng nhập</div>
            </LoginButton>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="hover:cursor-pointer">
                <Button
                  variant={"secondary"}
                  className="flex items-center justify-start gap-1 p-0 m-0 bg-white lg:gap-3 lg:px-3 lg:w-full"
                >
                  <Avatar>
                    <AvatarImage src={imageUrl || ""} />
                    <AvatarFallback className="bg-slate-500">
                      <FaUser className="text-white" />
                    </AvatarFallback>
                  </Avatar>
                  {/* <p className="truncate">{name}</p> */}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="font-semibold w-52">
                <DropdownMenuItem className="flex items-center justify-center">
                  <CgProfile className="w-4 h-4 mr-2" />
                  <Link href={"/user-profile/my-dashboard"} className="p-2">
                    Tài khoản
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center justify-center">
                  <IoHelpCircleOutline className="w-4 h-4 mr-2" />
                  <Link
                    href={"/frequently-asked-questions/about-us"}
                    className="p-2"
                    replace
                  >
                    Hỗ trợ
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center justify-center">
                  <LogoutButton>
                    <DropdownMenuItem>
                      <ExitIcon className="w-4 h-4 mr-2" />
                      Đăng xuất
                    </DropdownMenuItem>
                  </LogoutButton>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
