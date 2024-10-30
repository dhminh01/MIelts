"use server";
import { getTestByTitle } from "@/data/tests";
import { FormSchema } from "@/schemas";
import * as z from "zod";

export const addTest = async (values: z.infer<typeof FormSchema>) => {
  console.log(values);
  const validatedFields = FormSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { title } = validatedFields.data;

  const existingTest = await getTestByTitle(title);

  if (existingTest) {
    return { error: "Test is already existed in data!" };
  } else {
    return { success: "Test added successfully!" };
  }
};
