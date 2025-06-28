import React from "react";
import { IconCalendar, IconUser, IconBook } from "@tabler/icons-react";
import Link from "next/link";

const CourseCard = ({
  title,
  desc,
  image,
  instructorName,
  startDate,
  endDate,
  modules,
  club,
  _id
}) => {
  const slugify = (str) =>
    str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

  // Format dates for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Only render if we have required fields
  if (!title || !club || !_id) {
    return null;
  }

  return (
    <div className="bg-white w-72 lg:w-[350px] rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      
      {/* Course Title Header */}
      <div className="px-6 pt-6 pb-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-900 leading-tight flex-1 pr-3">
            {title}
          </h3>
          <div className="flex items-center gap-1 bg-blue-100 text-blue-700 rounded-full px-3 py-1 flex-shrink-0">
            <IconBook size={14} />
            <span className="text-xs font-medium">Modules : {modules || 0}</span>
          </div>
        </div>
      </div>

      {/* Course Image */}
      <div className="mx-6 mb-4 relative w-auto h-[180px] overflow-hidden rounded-xl">
        <img 
          className="w-full h-full object-cover" 
          src={image || '/default-course-image.jpg'} 
          alt={title}
        />
      </div>

      {/* Content */}
      <div className="px-6 pb-6">
        
        {/* Course Description */}
        <p className="text-gray-600 text-sm mb-5 leading-relaxed">
          {desc && desc.trim().length > 0 
            ? (desc.trim().length < 90 ? desc : desc.trim().substring(0, 90) + '...') 
            : 'No description available'}
        </p>

        {/* Details */}
        <div className="space-y-3 mb-6">
          {/* Instructor */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <IconUser size={16} className="text-gray-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">INSTRUCTOR</p>
              <p className="text-sm font-semibold text-gray-900">{instructorName || 'TBA'}</p>
            </div>
          </div>

          {/* Date Range */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <IconCalendar size={16} className="text-gray-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">DURATION</p>
              <p className="text-sm font-semibold text-gray-900">
                {startDate && endDate 
                  ? `${formatDate(startDate)} - ${formatDate(endDate)}`
                  : 'Dates TBA'
                }
              </p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <Link 
          href={`/${club}/courses/${slugify(title)}?id=${_id}`}
          className="block w-full"
        >
          <button className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 px-6 rounded-xl font-semibold transition-colors duration-200">
            View Course
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;