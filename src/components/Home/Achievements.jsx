import React from 'react';
import ListItem from '../ui/listItem';
import { getAllAchievements } from '@/app/actions/AchievementData';



//   {
//     title: "First",
//     description: "This is the first description",
//   },
//   {
//     title: "Second",
//     description: "This is the second description",
//   },
//   {
//     title: "Third",
//     description: "This is the third description",
//   },
//   {
//     title: "Fourth",
//     description: "This is the fourth description",
//   },
//   {
//     title: "Fifth",
//     description: "This is the fifth description",
//   },
//   {
//     title: "Sixth",
//     description: "This is the sixth description",
//   },
//   {
//     title: "Seventh",
//     description: "This is the seventh description",
//   },
//   {
//     title: "Eighth",
//     description: "This is the eighth description",
//   },
//   {
//     title: "Ninth",
//     description: "This is the ninth description",
//   }
// ];
const Achievements = async () => {
  const achievementsData=await getAllAchievements(process.env.SUPER_ADMIN)

  return (
    <section className="w-full py-12">
      <div className="container px-4 md:px-6">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
        <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl text-white">Our Achievements</h2>
        <p className="max-w-[900px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          We're proud of the milestones we've reached and the impact we've made.
        </p>
        </div>
      </div>
      <div className="mx-auto mt-12 max-h-[400px] w-full overflow-auto rounded-xl border border-zinc-800 bg-[#0d1117]">
        <div className="grid gap-0 border-b border-zinc-800 grid-flow-row md:grid-cols-2 lg:grid-cols-3">
        {achievementsData.map((achievement, idx) => <ListItem key={idx} title={achievement.title} description={achievement.description} />)}
        </div>
      </div>
      </div>
    </section>
    )
}

export default Achievements;