"use client";

import { login } from "@/actions/auth";
import React from "react";
import { FaGoogle } from "react-icons/fa";

export default function LoginGoogle() {
  return (
    <div
      onClick={() => login()}
      className="flex items-center justify-center w-full h-12 gap-4 p-4 mt-6 bg-black rounded-md hover:cursor-pointer"
    >
      <FaGoogle className="text-white" />
      <p className="text-white">Log in with Google</p>
    </div>
  );
}
