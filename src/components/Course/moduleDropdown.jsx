"use client";
import React, { useState } from "react";
import { IconPlus, IconEdit, IconTrash, IconBook2 } from "@tabler/icons-react";
import Link from "next/link";
import { deleteModule } from "@/app/actions/CourseActions";

export default function ModuleDropdown({ courseid, modules }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async (moduleId) => {
    try {
      await deleteModule(courseid, moduleId);
      window.location.reload(); // or better: update state to remove module
    } catch (err) {
      console.error("Failed to delete module:", err);
    }
  };
  return (
    <div className="mt-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 text-sm px-3 py-1.5 rounded-md transition-colors duration-200
              ${isOpen ? "bg-blue-100 text-blue-600" : "bg-blue-50 text-blue-500 hover:bg-blue-100"}`}
      >
        <IconBook2 size={16} />
        {isOpen ? "Hide Modules" : "Show Modules"}
      </button>

      {isOpen && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-white border border-gray-300 shadow-xl rounded-lg p-6 z-[9999] w-[90%] max-w-3xl">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-primary">Modules for Course</h2>
            <button onClick={() => setIsOpen(false)} className="text-red-500 font-bold text-sm">
              Close
            </button>
          </div>

          {/* Module list */}
          {modules.length === 0 ? (
            <p className="text-gray-500">No modules added yet.</p>
          ) : (
            <ul className="space-y-4">
              {modules.map((module) => (
                <li
                  key={module._id}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <div>
                    <p className="font-medium">{module.moduleName}</p>
                    <p className="text-xs text-gray-500">
                      Videos: {module.moduleVideos.length} | PDFs: {module.modulePdfs.length}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href={`/dashboard/courses/${courseid}/modules/${module._id}/edit`}
                      className="text-blue-500 hover:underline"
                    >
                      <IconEdit size={16} />
                    </Link>
                    <button
                      onClick={() => handleDelete(module._id)}
                      className="text-red-500 hover:underline"
                    >
                      <IconTrash size={16} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {/* Add Module Button */}
          <div className="mt-6 text-right">
            <Link
              href={`/dashboard/courses/${courseid}/modules/create`}
              className="inline-flex items-center text-white bg-primary hover:bg-blue-700 px-4 py-2 rounded-md text-sm"
            >
              <IconPlus size={16} className="mr-1" /> Add New Module
            </Link>
          </div>
        </div>
      )}

    </div>
  );
}