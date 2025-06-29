"use client";
import { useState } from "react";

export default function ExpandableText({ text, limit = 100, className = "" }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!text) return null;

  const truncated = text.length > limit ? text.slice(0, limit) + "..." : text;

  return (
    <>
      <p className={`text-white/90 text-sm ${className}`}>
        {truncated}
        {text.length > limit && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(true);
            }}
            className="ml-2 text-blue-200 underline text-xs"
          >
            See More
          </button>
        )}
      </p>

      {isModalOpen && (
        <div
          onClick={() => setIsModalOpen(false)}
          className="fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center px-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl p-6 max-w-lg w-full max-h-[80%] overflow-y-auto shadow-xl"
          >
            <h3 className="text-lg font-semibold mb-4 text-gray-900">
              Full Description
            </h3>
            <p className="text-gray-700 whitespace-pre-line">{text}</p>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
