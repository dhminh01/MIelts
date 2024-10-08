"use client";

import Link from "next/link";
import Image from "next/image";
const Topbar = () => {
  return (
    <div className="flex items-center justify-between gap-5 p-4">
      <Link href="/">
        <Image
          src="/logo.png"
          height={50}
          width={80}
          alt="logo"
          style={{ borderRadius: "50%" }}
          className="flex-1"
        />
      </Link>
    </div>
  );
};

export default Topbar;
