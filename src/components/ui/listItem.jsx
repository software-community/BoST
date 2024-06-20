import React from "react";
// import style from "./style.css"

const ListItem = ({title, description}) => {
  return (
    <div className="Achievement overflow-hidden flex items-center gap-4 border-r p-4 hover:bg-secondary duration-200 sm:p-6 lg:p-8">
      <div className="AchieveIcon flex flex-none h-12 w-12 items-center justify-center rounded-md bg-secondary">
        <img src="/achievement.png" className="h-6 w-6" />
      </div>
      <div className="grid gap-1">
        <h3 className="Title text-lg font-bold">{title}</h3>
        <p className="Description text-sm truncate text-gray-500">
          {description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, unde iure cumque dolorum ab iste nisi possimus accusamus similique quos fugit ullam autem nemo sunt. Quisquam perferendis ducimus inventore placeat possimus esse cupiditate officiis distinctio, illum vel? Nisi maxime asperiores itaque. Dolore beatae vitae ea accusantium esse voluptates distinctio reiciendis.
        </p>
      </div>
    </div>
  );
};

export default ListItem;
