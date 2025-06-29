"use client"

import { moveProjectUp, moveProjectDown } from "@/app/actions/ProjectData";
import { useRouter } from "next/navigation";

export function ArrowButtons({ projectId, club, isFirst, isLast }) {
  const router = useRouter();

  const handleMoveUp = async () => {
    await moveProjectUp(projectId, club);
    router.refresh(); // Force refresh immediately
  };

  const handleMoveDown = async () => {
    await moveProjectDown(projectId, club);
    router.refresh(); // Force refresh immediately
  };

  return (
    <div className="flex gap-0.5">
      <button 
        className="w-6 h-6 text-xs border border-gray-300 rounded-l bg-white hover:bg-blue-50 hover:border-blue-300 transition-colors flex items-center justify-center disabled:bg-gray-50 disabled:text-gray-400"
        disabled={isFirst}
        onClick={handleMoveUp}
      >
        ↑
      </button>
      <button 
        className="w-6 h-6 text-xs border border-gray-300 rounded-r bg-white hover:bg-blue-50 hover:border-blue-300 transition-colors flex items-center justify-center disabled:bg-gray-50 disabled:text-gray-400"
        disabled={isLast}
        onClick={handleMoveDown}
      >
        ↓
      </button>
    </div>
  );
}