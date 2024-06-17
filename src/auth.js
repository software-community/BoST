import NextAuth, { AuthError } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectMongoDB from "./lib/db";
import Admin from "./models/admin";
import { NextResponse } from "next/server";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    error: "/error",
  },
  callbacks: {
    signIn: async ({ user, account }) => {
      if (account.provider == "google") {
        try {
          const { email, name, image, id } = user;
          // await connectMongoDB();
          // const alreadyUserexists = await Admin.findOne({ email });
          // if (!alreadyUserexists) return false;
          // else 
          return NextResponse.json({ message: "welcome back" });
        } catch (error) {
          throw new AuthError("Error while creating user");
        }
      }
    },
  },
});