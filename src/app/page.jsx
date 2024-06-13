import Navbar from "@/components/Navbar/Navbar";
import Achievements from "@/components/Home/Achievements";
import { auth } from "@/auth";
import Gallery from "@/components/Home/Gallery";
import TeamPage from "@/components/Home/TeamPage";
import Aboutprojects from "@/components/Home/Aboutprojects";
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
