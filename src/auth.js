import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { clubCodes } from "./lib/utils";

const allowedEmails = [
  "guptaparag101@gmail.com",
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
  trustHost: true,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "select_account",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    redirect: async ({ url, baseUrl }) => {
      // Determine base URL: prioritize live domain if running in prod or if baseUrl is localhost
      const publicBase = (
        process.env.AUTH_URL?.replace(/\/api\/auth\/?$/, "") ||
        process.env.NEXTAUTH_URL ||
        (baseUrl && !baseUrl.includes("localhost") ? baseUrl : "http://www.iitrpr.ac.in/bost")
      ).replace(/\/$/, "");

      // If user wants to go to home/signout
      if (url === "/" || url === "/bost" || url === "/bost/" || url.includes("signout")) {
        return publicBase.endsWith("/bost") ? publicBase : `${publicBase}/bost`;
      }

      // If URL is a full public URL already
      if (url.startsWith("http://") || url.startsWith("https://")) {
        if (!url.includes("localhost")) {
          return url;
        }
        // If url has localhost, strip it to pathname
        try {
          const parsed = new URL(url);
          url = parsed.pathname + parsed.search;
        } catch {
          // ignore
        }
      }

      // If URL is relative
      if (url.startsWith("/")) {
        const rootBase = publicBase.endsWith("/bost") ? publicBase.replace(/\/bost$/, "") : publicBase;
        const fullPath = url.startsWith("/bost") ? url : `/bost${url}`;
        return `${rootBase}${fullPath}`;
      }

      return publicBase.endsWith("/bost") ? `${publicBase}/dashboard` : `${publicBase}/bost/dashboard`;
    },
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
