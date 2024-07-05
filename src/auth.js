import NextAuth, { AuthError } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// import connectMongoDB from "./lib/db";
// import Admin from "./models/admin";
import { NextResponse } from "next/server";
import { clubCodes } from "./lib/utils";

const allowedEmails=[
  "meadityaraj0001@gmail.com",
  "2021ceb1007@iitrpr.ac.in",
  "2023meb1360@iitrpr.ac.in",
  "gs.tech@iitrpr.ac.in",
  // and clubCodes keys + @iitrpr.ac.in
  ...Object.keys(clubCodes).map((key)=>key+"@iitrpr.ac.in")
];

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
          const found=allowedEmails.find((email)=>email===email)

          if(!found)return false;

          return NextResponse.json({ message: "welcome back" });
        } catch (error) {
          console.log(error)
          throw new AuthError("Error while creating user");
        }
      }
    },
  },
});
