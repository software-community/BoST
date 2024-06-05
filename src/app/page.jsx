import { auth } from "../auth";
import { signOut } from "next-auth/react";
import Navbar from "@/components/Navbar";
import Achievements from "@/components/Achievements";

export default async function Home() {
  const session = await auth();

  return (
    <>
      <Navbar session={session} />
      <Achievements />
      
    </>
  );
}
