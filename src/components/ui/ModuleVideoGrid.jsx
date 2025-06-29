"use client";
import React, { useState } from "react";
import { Play } from "lucide-react";
import YouTubeModalPlayer from "@/components/ui/YouTubeModalPlayer";

const ModuleVideoGrid = ({ videos }) => {
  const [open, setOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleOpen = (video) => {
    setSelectedVideo(video);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedVideo(null);
  };

  return (
    <div>
      <div className="space-y-2 pr-2">
        {videos.map((video, videoIndex) => (
          <button
            key={videoIndex}
            className="group flex items-center gap-3 p-3 bg-white hover:bg-red-50 rounded-lg transition-all duration-200 border border-gray-200 hover:border-red-300 w-full text-left"
            onClick={() => handleOpen(video)}
          >
            <div className="flex-shrink-0 w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center group-hover:bg-red-600 transition-all duration-200">
              <Play size={12} className="text-white ml-0.5" />
            </div>
            <div className="flex-1 min-w-0">
              <h5 className="font-medium text-gray-900 truncate text-sm">
                {video.title || `Video ${videoIndex + 1}`}
              </h5>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <span>Click to watch</span>
              </div>
            </div>
          </button>
        ))}
      </div>
      <YouTubeModalPlayer
        open={open}
        onOpenChange={handleClose}
        videoUrl={selectedVideo?.url || ""}
        videoTitle={selectedVideo?.title || ""}
      />
    </div>
  );
};

export default ModuleVideoGrid; 