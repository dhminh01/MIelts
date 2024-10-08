import LoginGoogle from "@/components/layout/LoginGoogle";
import React from "react";

export default function SignIn() {
  return (
    <div className="flex justify-center w-full mt-20">
      <section className="flex flex-col w-[400px]">
        <h1 className="w-full mb-6 text-3xl font-bold text-center">Sign in</h1>
        <LoginGoogle />
      </section>
    </div>
  );
}
