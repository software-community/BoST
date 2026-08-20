import Image from 'next/image';
import logoImg from '@/../public/Logo.png';

export default function Hero() {
  return (
    <section className="w-full min-h-[85vh] flex flex-col justify-center items-center px-4 sm:px-8 py-8 md:py-12 overflow-hidden">
      <div className="w-full max-w-7xl flex flex-col justify-center items-center text-center mx-auto -mt-8 sm:-mt-12 md:-mt-16">
        <Image
          src={logoImg}
          alt="BoST Logo"
          width={550}
          height={260}
          className="LandingHeroTitle w-64 sm:w-80 md:w-[28rem] lg:w-[34rem] xl:w-[38rem] h-auto object-contain drop-shadow-2xl"
          priority
        />
        <h1 className="w-full text-center font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl LandingHeroTitle tracking-tight whitespace-nowrap mt-8 sm:mt-10 md:mt-12">
          <span className="text-white">Board of Science &amp; </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500">
            Technology
          </span>
        </h1>
        <p className="roboto-light text-base sm:text-lg md:text-xl lg:text-2xl text-zinc-400 max-w-6xl w-full text-center whitespace-normal md:whitespace-nowrap LandingHeroSubtitle tracking-wide mt-4 sm:mt-5">
          Innovative thinking that turns ideas into reality. We make it happen.
        </p>
      </div>
    </section>
  );
}
