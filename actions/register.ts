"use server";

import bcrypt from "bcryptjs";
import * as z from "zod";
import { db } from "@/lib/db";

import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, name } = validatedFields.data;
  const hashPassword = await bcrypt.hash(password, 10);

  const exitingUser = await getUserByEmail(email);

  if (exitingUser) {
    return { error: "Email is already in use!" };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashPassword,
    },
  });

  return { success: "User created!" };
};
