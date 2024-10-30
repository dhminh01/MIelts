import { type DefaultSession } from "next-auth";
import { ROLE } from "@prisma/client";

export type ExtendedUser = DefaultSession["user"] & {
  role: ROLE;
  isOAuth: boolean;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
