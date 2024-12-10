// import { ROLE } from "@prisma/client";
import * as z from "zod";

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    email: z.optional(z.string()),
    // role: z.enum([ROLE.ADMIN, ROLE.USER, ROLE.INSTRUCTOR]),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
    image: z.string().optional(),
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

// Instructor registration form handle error
export const InstructorRegistrationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
      "Password must include uppercase, lowercase, number, and special character"
    ),
  ieltsProof: z
    .any()
    .refine(
      (file) => file instanceof File && file.size > 0,
      "IELTS proof is required"
    ),
});

export const ListeningTestSchema = z.object({
  title: z.string().min(1, "Title is required"),
  isTimed: z.boolean(),
  transcript: z.string().optional(),
  sections: z.array(
    z.object({
      sectionTitle: z.string().min(1, "Section title is required"),
      audioURL: z.any(), // This will be handled by multer or alternative upload handling
      questions: z.array(
        z.object({
          questionText: z.string().min(1, "Question text is required"),
          type: z.enum([
            "MULTIPLE_CHOICE",
            "FILL_IN_THE_BLANK",
            "SHORT_ANSWER",
          ]),
          answer: z
            .object({
              options: z
                .array(
                  z.object({
                    label: z.string().min(1),
                    option: z.string().min(1),
                  })
                )
                .optional(),
            })
            .optional(),
          correctAnswer: z.string().min(1, "Correct answer is required"),
        })
      ),
    })
  ),
});

// Define Zod schema for validation
export const ReadingTestSchema = z.object({
  title: z.string().min(1, "Title is required"),
  passages: z.array(
    z.object({
      passageTitle: z.string().min(1, "Passage title is required!"),
      content: z.string().min(1, "Passage content is required!"),
      questions: z.array(
        z.object({
          questionTitle: z.string().optional(),
          questionDescription: z.string().optional(),
          questionText: z.string().min(1, "Question text is required"),
          type: z.enum(["MULTIPLE_CHOICE", "FILL_IN_THE_BLANK"]),
          answer: z
            .object({
              options: z
                .array(
                  z.object({
                    label: z.string().optional(),
                    content: z.string().optional(),
                  })
                )
                .optional(),
            })
            .optional(),
          correctAnswer: z.string().min(1, "Correct answer is required"),
        })
      ),
    })
  ),
});
