import Achievements from "@/components/Home/Achievements";
import Gallery from "@/components/Home/Gallery";
import TeamPage from "@/components/Home/TeamPage";
import Aboutprojects from "@/components/Home/Aboutprojects";
import GalleryCarousel from "@/components/Home/Carousel";
import Hero from "@/components/Home/Hero";


export default function Home() {
  return (
    <>
      <Hero />
      <Achievements />
      <Gallery />
      <TeamPage />
      <Aboutprojects />
      <GalleryCarousel />
    </>
  );
}
