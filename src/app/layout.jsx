import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { Inter } from "next/font/google";
import "./globals.css";
import { auth } from "@/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Board of Science & Technology"
};

export default async function RootLayout({ children }) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={`${inter.className} bg-secondary`}>
        <Navbar session={session} />
        {children}
        <Footer/>
      </body>
    </html>
  );
}
