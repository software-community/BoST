import Navbar from "@/components/Navbar";
import { auth } from "@/auth";
export default async function Home() {
  const session =await auth()
  return (
    <>
      <Navbar session={session}/>
    </>
  );
}
