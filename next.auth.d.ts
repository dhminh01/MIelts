import { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  role: "ADMIN" | "USER" | "INTRUCTOR";
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
