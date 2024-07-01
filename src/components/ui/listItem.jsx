import React from "react";

const ListItem = ({title, description}) => {
  return (
    <div className="Achievement overflow-hidden flex items-center gap-4 border-r p-4 hover:bg-secondary duration-200 sm:p-6 lg:p-8">
      <div className="AchieveIcon flex flex-none h-12 w-12 items-center justify-center rounded-md bg-secondary">
        <img src="/Achievement/achievement.png" className="h-6 w-6" />
      </div>
      <div className="grid gap-1">
        <h3 className="text-lg lg:text-2xl font-bold">{title}</h3>
        <p className=" text-sm  lg:text-lg text-gray-500">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ListItem;
