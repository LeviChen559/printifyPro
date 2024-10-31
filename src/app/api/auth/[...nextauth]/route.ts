import NextAuth, { DefaultSession } from "next-auth";
import { authOptions } from "@/utils/lib/auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      role: string;
    } & DefaultSession["user"];
  }

  interface JWT {
    id: string;
    role: string;
    name: string;
    email: string;
  }
}


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
