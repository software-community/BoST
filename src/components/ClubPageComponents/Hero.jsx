import { getClubDetails } from "@/app/actions/ClubData";

export default async function Hero({club}) {
  const clubDetails = await getClubDetails(club);

  return (
    <section className="w-full h-[90vh]  flex flex-col lg:flex-row justify-center items-center px-6">
      <div className="w-full lg:w-1/2 h-auto lg:h-full flex flex-col justify-center items-start gap-5">
        <h1 className="w-full text-center font-bold text-5xl lg:text-7xl LandingHeroTitle">{clubDetails.name}</h1>
        <p className="roboto-light text-xl lg:text-3xl LandingHeroSubtitle text-center w-full">{clubDetails.introduction}</p>
      </div>
      <div className="w-full lg:w-1/2  h-1/2 lg:h-full flex justify-center LandingHeroImage items-center">
        <img src={clubDetails.logo} className="object-cover Globe h-3/5 aspect-square rounded-full" />{" "}
      </div>
    </section>
  );
}
