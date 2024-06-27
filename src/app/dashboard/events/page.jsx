import { MonthCalendar } from "@/components/Events/Calendar";
import { auth } from "@/auth";
import { getEventsForClub } from "@/app/actions/EventData";

const Page = async () => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = new Date().getMonth(); // Call the function to get the month
  const year = new Date().getFullYear();
  const monthName = monthNames[month];
  const session = await auth();
  const club = session?.user.email.split("@")[0];
  const events = await getEventsForClub(club);
  // console.log(events)

  return (
    <>
      <div className="w-full h-full flex items-center justify-center flex-col">
        <h1 className="w-full text-center font-bold">
          {monthName} {year} 
        </h1>
        <MonthCalendar serializedEvents={JSON.stringify(events)}/>
      </div>
    </>
  );
};

export default Page;
