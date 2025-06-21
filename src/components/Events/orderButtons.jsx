"use client"

import { moveEventUp, moveEventDown } from "@/app/actions/EventData";
import { useRouter } from "next/navigation";

export function ArrowButtons({ eventId, club, isFirst, isLast }) {
  const router = useRouter();

  const handleMoveUp = async () => {
    await moveEventUp(eventId, club);
    router.refresh(); // Force refresh immediately
  };

  const handleMoveDown = async () => {
    await moveEventDown(eventId, club);
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