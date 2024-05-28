import NextAuth, { AuthError } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectMongoDB from "./libs/db";
import Admin from "./models/admin";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    signIn: async ({ user, account }) => {
      if (account.provider == "google") {
        try {
          const { email, name, image, id } = user;
          await connectMongoDB();
          const alreadyUserexists = await Admin.findOne({ email });
          if (!alreadyUserexists) await Admin.create({ name, email, image, googleId: id });
          return true;
        } catch (error) {

          throw new AuthError("Error while creating user")
        }
      }
    },
  },
});
