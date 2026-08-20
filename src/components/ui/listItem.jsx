import React from "react";

const ListItem = ({title, description}) => {
  return (
    <div className="Achievement overflow-hidden flex items-center gap-4 border-r border-b border-zinc-800/80 p-4 hover:bg-zinc-900/60 duration-200 sm:p-6 lg:p-8">
      <div className="AchieveIcon flex flex-none h-12 w-12 items-center justify-center rounded-lg bg-zinc-900 border border-primary/30">
        <img src="/Achievement/achievement.png" className="h-6 w-6 brightness-110" />
      </div>
      <div className="grid gap-1">
        <h3 className="text-lg lg:text-xl font-bold text-white">{title}</h3>
        <p className="text-sm lg:text-base text-zinc-400">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ListItem;
