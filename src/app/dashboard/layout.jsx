import Sidenav from "@/components/Sidenav/Sidenav";
import { getClubDetails } from "@/app/actions/ClubData";
import { auth } from "@/auth";
import { clubCodes } from "@/lib/utils";

export async function generateMetadata(x, parent) {
  const session = await auth();
  // console.log("Session:", session);
  const club = clubCodes[session?.user?.email?.split("@")[0]];
  // console.log("Club code:", club);
  const clubDetails = await getClubDetails(club);
  // console.log("Club details:", clubDetails);
  const clubName = clubDetails ? clubDetails.name : "Unknown Club";
  
  // console.log(await parent);
  return {
    title: `Dashboard | ${clubName} | ${(await parent).title.absolute}`,
  }
}

export default function Layout({ children }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full bg-primary md:px-4 z-30 fixed bottom-0 md:static flex-none md:w-64 md:order-1 md:py-4  order-2">
        <Sidenav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto pb-20 md:px-12 md:py-8 md:order-2 order-1">
        {children}
      </div>
    </div>
  );
}