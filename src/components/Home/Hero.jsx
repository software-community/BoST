import Image from 'next/image';
import globeImg from '@/../public/home/Globe.svg'


export default function Hero() {
  return (
    <section className="w-full h-[90vh]  flex flex-col lg:flex-row justify-center items-center px-6">
      <div className="w-full lg:w-2/3 h-auto lg:h-full flex flex-col justify-center items-center text-center gap-8">
        <h1 className="w-full text-center font-bold text-5xl lg:text-7xl LandingHeroTitle">Board of Science & Technology</h1>
        <p className="roboto-light text-xl lg:text-3xl LandingHeroSubtitle">Innovative thinking that turns ideas into reality.<br/>We make it happen.</p>
      </div>
      <div className="w-full lg:w-1/3  h-1/2 lg:h-full flex justify-center LandingHeroImage items-center">
        <Image src={globeImg} className="object-contain Globe h-3/5 " fill={false} />{" "}
      </div>
    </section>
  );
}
