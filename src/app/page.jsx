import Navbar from "@/components/Navbar";
import Achievements from "@/components/Achievements";
import { auth } from "@/auth";
export default async function Home() {
  const session =await auth()
  return (
    <>
      <Navbar session={session} />
      <Achievements />
    </>
  );
}
