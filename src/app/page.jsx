import Achievements from "@/components/Home/Achievements";
import Gallery from "@/components/Home/Gallery";
import OurTeam from "@/components/Home/OurTeam";
import OurProjects from "@/components/Home/OurProjects";
import GalleryCarousel from "@/components/Home/Carousel";
import Hero from "@/components/Home/Hero";
import OurBlogs from "@/components/Home/OurBlogs";


export default function Home() {
  return (
    <>
      <Hero />
      <Achievements />
      <Gallery />
      <OurTeam />
      <OurProjects />
      <OurBlogs/>
      {/* <GalleryCarousel /> */}
    </>
  );
}
