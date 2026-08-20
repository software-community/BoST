import Sidenav from "@/components/Sidenav/Sidenav";
import { getClubDetails } from "@/app/actions/ClubData";
import { auth } from "@/auth";
import { clubCodes } from "@/lib/utils";

export async function generateMetadata(x, parent) {
  const session = await auth();
  const emailPrefix = session?.user?.email?.split("@")[0] || "";
  const club = clubCodes[emailPrefix] || emailPrefix;
  let clubName = "BoST";
  try {
    const clubDetails = await getClubDetails(club);
    if (clubDetails?.name) clubName = clubDetails.name;
  } catch (e) {}
  
  return {
    title: `Dashboard | ${clubName}`,
  };
}

export default function Layout({ children }) {
  return (
    <div className="dashboard-root flex h-screen flex-col md:flex-row md:overflow-hidden bg-white text-black">
      <div className="w-full bg-[#020659] md:px-4 z-30 fixed bottom-0 md:static flex-none md:w-64 md:order-1 md:py-4 order-2">
        <Sidenav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto pb-20 md:px-12 md:py-8 md:order-2 order-1 bg-white text-black">
        {children}
      </div>
    </div>
  );
}