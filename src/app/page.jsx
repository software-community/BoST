import { auth } from "../auth";
import { signOut } from "next-auth/react";
import Navbar from "@/components/Navbar";

export default async function Home() {
  const session = await auth();

  return (
    <>
      <Navbar session={session} />
    </>
  );
}
