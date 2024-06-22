import Achievements from "@/components/Home/Achievements";
import Gallery from "@/components/Home/Gallery";
import TeamPage from "@/components/Home/TeamPage";
import Aboutprojects from "@/components/Home/Aboutprojects";
import GalleryCarousel from "@/components/Home/Carousel";

export default function Home() {
  return (
    <>
      <Achievements />
      <Gallery />
      <TeamPage />
      <Aboutprojects />
      <GalleryCarousel/>
    </>
  );
}
