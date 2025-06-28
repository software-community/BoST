import { getCourseDetailsById, getCourseDetailsForClub } from "@/app/actions/CourseData"; // Adjust path as needed
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Play, FileText, Calendar, User, Building, Clock, BookOpen } from "lucide-react";
import { PdfButtonGrid } from "@/components/ui/pdfButton"; // Updated import

const CoursePage = async ({ params, searchParams }) => {
  const { id } = searchParams;
  const { clubname, courseSlug } = params;

  if (!id) return notFound();

  const allCourses = await getCourseDetailsForClub({club: clubname});
  const course = await getCourseDetailsById(id);

  if (!course) return notFound();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="w-full min-h-[75vh] flex flex-col lg:flex-row justify-center items-center px-6 py-6 gap-6 bg-white shadow-sm">
        <div className="w-full lg:w-1/2 h-auto lg:h-full flex flex-col justify-center items-start gap-5">
          <h1 className="w-full text-center font-bold text-5xl lg:text-7xl text-black">
            {course.courseName}
          </h1>

          <p className="text-xl lg:text-2xl text-center w-full text-gray-700">
            {course.courseDesc}
          </p>
          
          {/* Course Info Cards */}
          <div className="w-full mt-4 flex flex-col items-center gap-3">
            <div className="flex flex-wrap justify-center gap-4">
              {course.instructorName && (
                <div className="px-4 py-2 bg-blue-100 text-blue-800 font-semibold rounded-xl shadow-sm flex items-center gap-2">
                  <User size={16} />
                  Instructor: {course.instructorName}
                </div>
              )}
              
              {course.club && (
                <div className="px-4 py-2 bg-green-100 text-green-800 font-semibold rounded-xl shadow-sm flex items-center gap-2">
                  <Building size={16} />
                  Club: {course.club}
                </div>
              )}
            </div>
            
            {(course.startDate || course.endDate) && (
              <div className="flex flex-wrap justify-center gap-4">
                {course.startDate && (
                  <div className="px-4 py-2 bg-purple-100 text-purple-800 font-semibold rounded-xl shadow-sm flex items-center gap-2">
                    <Calendar size={16} />
                    Start: {course.startDate}
                  </div>
                )}
                
                {course.endDate && (
                  <div className="px-4 py-2 bg-red-100 text-red-800 font-semibold rounded-xl shadow-sm flex items-center gap-2">
                    <Calendar size={16} />
                    End: {course.endDate}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        <div className="w-full lg:w-1/2 h-1/2 lg:h-full flex justify-center items-center">
          {course.instructorImage && (
            <Image
              src={course.instructorImage}
              alt={course.courseName}
              width={400}
              height={400}
              className="object-cover aspect-square rounded-full w-full max-w-[400px] shadow-lg"
            />
          )}
        </div>
      </section>

      {/* Modules Section */}
      <section className="px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              Course Modules
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore the comprehensive learning materials organized into structured modules
            </p>
          </div>
          
          {course.modules && course.modules.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {course.modules.map((module, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 hover:border-gray-300 overflow-hidden flex flex-col h-[520px]"
                >
                  {/* Module Header - Simple colored background */}
                  <div className="bg-slate-700 p-4 text-white flex-shrink-0">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                          <BookOpen size={16} className="text-white" />
                        </div>
                        <span className="text-white/90 text-sm font-medium">
                          Module {index + 1}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 leading-tight">
                      {module.moduleName}
                    </h3>
                    <p className="text-white/90 text-sm">
                      {module.moduleDesc}
                    </p>
                  </div>

                  <div className="p-4 bg-gray-50 flex-1 flex flex-col min-h-0">
                    {/* Stats Bar */}
                    <div className="flex items-center justify-between text-sm bg-white p-3 rounded-lg shadow-sm border border-gray-200 flex-shrink-0 mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-red-100 rounded-md flex items-center justify-center">
                          <Play size={12} className="text-red-500" />
                        </div>
                        <span className="font-medium text-gray-700">{module.moduleVideos?.length || 0} Videos</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-blue-100 rounded-md flex items-center justify-center">
                          <FileText size={12} className="text-blue-500" />
                        </div>
                        <span className="font-medium text-gray-700">{module.modulePdfs?.length || 0} Resources</span>
                      </div>
                    </div>

                    {/* Content area with independent scrollable sections */}
                    <div className="flex-1 flex flex-col space-y-4 min-h-0">
                      {/* Videos Section */}
                      <div className="flex-[1.2] min-h-0 flex flex-col">
                        <h4 className="text-base font-semibold text-gray-800 mb-3 flex items-center gap-2 flex-shrink-0">
                          <Play size={16} className="text-red-500" />
                          Video Lectures
                        </h4>
                        <div className="flex-1 overflow-y-auto min-h-0">
                          {module.moduleVideos && module.moduleVideos.length > 0 ? (
                            <div className="space-y-2 pr-2">
                              {module.moduleVideos.map((video, videoIndex) => (
                                <Link
                                  key={videoIndex}
                                  href={video.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="group/video flex items-center gap-3 p-3 bg-white hover:bg-red-50 rounded-lg transition-all duration-200 border border-gray-200 hover:border-red-300"
                                >
                                  <div className="flex-shrink-0 w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center group-hover/video:bg-red-600 transition-all duration-200">
                                    <Play size={12} className="text-white ml-0.5" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h5 className="font-medium text-gray-900 truncate text-sm">
                                      {video.title || `Video ${videoIndex + 1}`}
                                    </h5>
                                    <div className="flex items-center gap-1 text-xs text-gray-500">
                                      <Clock size={10} />
                                      <span>Click to watch</span>
                                    </div>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          ) : (
                            <div className="text-center py-4 px-3 bg-white rounded-lg border border-gray-200">
                              <Play size={16} className="text-red-400 mx-auto mb-2" />
                              <p className="text-gray-500 text-sm">No videos available</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* PDFs Section */}
                      <div className="flex-[0.8] min-h-0 flex flex-col">
                        <h4 className="text-base font-semibold text-gray-800 mb-3 flex items-center gap-2 flex-shrink-0">
                          <FileText size={16} className="text-blue-500" />
                          Learning Resources
                        </h4>
                        <div className="flex-1 overflow-y-auto min-h-0">
                          {module.modulePdfs && module.modulePdfs.length > 0 ? (
                            <div className="pr-2">
                              <PdfButtonGrid pdfs={module.modulePdfs} />
                            </div>
                          ) : (
                            <div className="text-center py-4 px-3 bg-white rounded-lg border border-gray-200">
                              <FileText size={16} className="text-blue-400 mx-auto mb-2" />
                              <p className="text-gray-500 text-sm">No resources available</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="bg-white rounded-3xl shadow-lg p-12 max-w-md mx-auto">
                <div className="text-gray-400 mb-6">
                  <BookOpen size={80} className="mx-auto" />
                </div>
                <h3 className="text-3xl font-bold text-gray-600 mb-4">
                  No Modules Available
                </h3>
                <p className="text-gray-500 text-lg">
                  This course doesn't have any modules yet. Check back later for updates.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CoursePage;