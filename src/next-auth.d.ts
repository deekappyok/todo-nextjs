// next-auth.d.ts
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // User ID
      email: string; // User email
      name?: string | null; // Optional user name
      // Add any other user properties you want to include
    };
  }

  interface JWT {
    id: string; // User ID
  }
}
