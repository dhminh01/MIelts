import { ROLE } from "@prisma/client";
import * as z from "zod";

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    email: z.optional(z.string()),
    role: z.enum([ROLE.ADMIN, ROLE.USER, ROLE.INSTRUCTOR]),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
    image: z.string().url().optional(),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }
      return true;
    },
    {
      message: "New password is required!",
      path: ["newPassword"],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }
      return true;
    },
    {
      message: "Password is required!",
      path: ["password"],
    }
  );

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required!",
  }),
  password: z.string().min(1, {
    message: "Password is required!",
  }),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required!",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required!",
  }),
});

const QuestionSchema = z.object({
  questionTitle: z.string().min(5, { message: "Question title is too short" }),
  questionType: z.enum(["MULTIPLE_CHOICE", "FILL_IN_THE_BLANK"]),
  questionText: z.string().min(1, { message: "Question text is required" }),
  options: z.array(z.string()).optional(), // Optional for FILL_IN_THE_BLANK
  correctAnswer: z.string().min(1, { message: "Correct answer is required" }),
});

export const FormSchema = z.object({
  title: z.string().min(5, { message: "Test title is too short" }),
  skill: z.enum(["Listening", "Reading", "Writing", "Speaking"]),
  questions: z
    .array(QuestionSchema)
    .nonempty({ message: "At least one question is required" }),
});
