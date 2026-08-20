import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { clubCodes } from "./lib/utils";

const allowedEmails = [
  "meadityaraj0001@gmail.com",
  "2021ceb1007@iitrpr.ac.in",
  "2023meb1360@iitrpr.ac.in",
  "gs.tech@iitrpr.ac.in",
  "2024epb1277@iitrpr.ac.in",
  "2024csb1120@iitrpr.ac.in",
  "2024chb1084@iitrpr.ac.in",
  "softcom@iitrpr.ac.in",
  ...Object.keys(clubCodes).map((key) => key + "@iitrpr.ac.in"),
];

export const { handlers, signIn, signOut, auth } = NextAuth({
  basePath: "/bost/api/auth",
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    signIn: async ({ user, account }) => {
      if (account?.provider === "google") {
        try {
          const email = user?.email?.toLowerCase();
          const found = allowedEmails.find((allowed) => allowed.toLowerCase() === email);
          console.log("Google Sign-In check for:", email, "Allowed:", !!found);

          if (!found) {
            console.log("User email not in allowed list:", email);
            return false;
          }

          return true;
        } catch (error) {
          console.error("SignIn Callback Error:", error);
          return false;
        }
      }
      return true;
    },
  },
});
