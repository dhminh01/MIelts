"use server";

import { signIn, signOut } from "@/auth";
import { revalidatePath } from "next/cache";

export async function login() {
  await signIn("google", { redirectTo: "/" });
  revalidatePath("/");
}

export const logout = async () => {
  await signOut({ redirectTo: "/" });
  revalidatePath("/");
};
