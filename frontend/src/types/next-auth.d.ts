import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "STUDENT" | "TEACHER" | "ADMIN";
      accessToken?: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role: "STUDENT" | "TEACHER" | "ADMIN";
    token?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: "STUDENT" | "TEACHER" | "ADMIN";
    accessToken?: string;
  }
}
