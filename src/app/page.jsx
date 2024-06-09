import Navbar from "@/components/Navbar";
import Achievements from "@/components/Achievements";
import { auth } from "@/auth";
import Gallery from "@/components/Gallery";
import TeamPage from "@/components/TeamPage";
import Aboutprojects from "@/components/Aboutprojects";
export default async function Home() {
  const session =await auth()
  return (
    <>
      <Navbar session={session} />
      <Achievements />
      <Gallery/>
      <TeamPage />
      <Aboutprojects />
    </>
  );
}
