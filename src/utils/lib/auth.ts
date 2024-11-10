import  { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare,hash } from "bcryptjs";
import axios from "axios";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import { iUser } from "@/app/type";
const prisma = new PrismaClient()


export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          if (!credentials) {
            console.error("No credentials provided");
            return null;
          }
          // Log the email being used for the request
          console.log("Authorizing user with email:", credentials);
          axios.defaults.baseURL = process.env.NEXTAUTH_URL;
          const res = await axios.get("/api/prisma/getUsers", {
            params: {
              email: credentials.email,
              password: credentials.password,
            },
          });
          if (!res.data.length) {
            throw new Error("No user found with the entered email");
          }
          const hashedPassword = await hash(credentials.password, 10);
          const matchedUser = (res.data as iUser[]).find(
            (user) => user.email === credentials.email
          );
          console.log("matchedUser", matchedUser);
          if (!matchedUser) {
            throw new Error("No user found with the entered email");
          }

          const isValidPassword = await compare(
            credentials.password,
            matchedUser.password
          );
          console.log("Password entered1:", credentials.password);
          console.log("Password entered2:", matchedUser.password);
          console.log("Password entered2:", hashedPassword);
          
          console.log("Password is valid:", isValidPassword);
          if (!isValidPassword) {
            throw new Error("Invalid password");
          }
          return {
            id: matchedUser.id.toString(),
            email: matchedUser.email,
            name: matchedUser.name,
            role: matchedUser.role || "",
          };
        } catch (error) {
          console.error("Error during authorization:", error);
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.name = user.name;
        token.email = user.email;
      }
      if (trigger === "update" && session) {
        token.email = session.user.email;
        token.name = session.user.name;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.name = token.name as string;
      session.user.email = token.email as string;
      session.user.role = token.role as string;

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};