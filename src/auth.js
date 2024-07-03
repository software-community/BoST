import NextAuth, { AuthError } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// import connectMongoDB from "./lib/db";
// import Admin from "./models/admin";
import { NextResponse } from "next/server";

const allowedEmails=["meadityaraj0001@gmail.com","2021ceb1007@iitrpr.ac.in","softcom@iitrpr.ac.in"]

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
          // await connectMongoDB();
          // const alreadyUserexists = await Admin.findOne({ email });
          // if (!alreadyUserexists) return false;
          // await Admin.create({email,name,image})

          return NextResponse.json({ message: "welcome back" });
        } catch (error) {
          console.log(error)
          throw new AuthError("Error while creating user");
        }
      }
    },
  },
});
