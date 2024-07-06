import { MonthCalendar } from "@/components/Events/Calendar";
import { auth } from "@/auth";
import { getEventsForClub } from "@/app/actions/EventData";
import { clubCodes } from "@/lib/utils";

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
  const club = clubCodes[session?.user.email.split("@")[0]];
  const events = await getEventsForClub(club);
  // console.log(events)

  return (
    <>
      <div className="w-full h-full flex items-center justify-center flex-col">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2 mb-0">
          <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl">
            {monthName} {year} Schedule
          </h2>
          <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Click on a coloured cell to view, edit, delete event. Click on uncoloured cell to create event.
          </p>
        </div>
      </div>
        <MonthCalendar serializedEvents={JSON.stringify(events)}/>
      </div>
    </>
  );
};

export default Page;
