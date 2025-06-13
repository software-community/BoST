"use client"
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar, MapPin, Clock, Users } from 'lucide-react';
import { getClubDetails } from '@/app/actions/ClubData';





const ClubLogo = ({ logo, clubName, className = "" }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  // If no logo provided or image failed to load, show Users icon
  if (!logo || imageError) {
    return <Users className={`text-indigo-600 ${className}`} />;
  }

  return (
    <div className="relative">
      <img
        src={logo}
        alt={`${clubName} logo`}
        className={`object-cover rounded-full ${className} ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        onError={handleImageError}
        onLoad={handleImageLoad}
        style={{ transition: 'opacity 0.3s ease' }}
      />
      {/* Fallback icon while loading */}
      {!imageLoaded && !imageError && (
        <Users className={`absolute inset-0 text-indigo-600 ${className}`} />
      )}
    </div>
  );
};


// Add line-clamp and scrollbar styles
const customStyles = `
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .scrollbar-thin {
    scrollbar-width: thin;
  }
  .scrollbar-thin::-webkit-scrollbar {
    width: 4px;
  }
  .scrollbar-thumb-gray-300::-webkit-scrollbar-thumb {
    background-color: #d1d5db;
    border-radius: 2px;
  }
  .scrollbar-track-transparent::-webkit-scrollbar-track {
    background: transparent;
  }
  .hover\\:scrollbar-thumb-gray-400:hover::-webkit-scrollbar-thumb {
    background-color: #9ca3af;
  }
`;

const EventCarousel = ({ events }) => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => 
      prevIndex >= events.length - 1 ? 0 : prevIndex + 1
    );
    setTimeout(() => setIsTransitioning(false), 1200);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? events.length - 1 : prevIndex - 1
    );
    setTimeout(() => setIsTransitioning(false), 1200);
  };

  const goToSlide = (index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 1200);
  };

  // Auto-play functionality with hover pause
  useEffect(() => {
    if (!events || events.length <= 1 || isHovered) return;

    const interval = setInterval(() => {
      if (!isTransitioning && !isHovered) {
        setIsTransitioning(true);
        setCurrentIndex((prevIndex) => 
          prevIndex >= events.length - 1 ? 0 : prevIndex + 1
        );
        setTimeout(() => setIsTransitioning(false), 1200);
      }
    }, 7000); // Increased to 7 seconds

    return () => clearInterval(interval);
  }, [events, isTransitioning, isHovered]);

  if (!events || events.length === 0) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-100 rounded-lg">
        <p className="text-gray-500">No events to display</p>
      </div>
    );
  }

  // Get the three events to display
  const getVisibleEvents = () => {
    if (events.length === 1) {
      return [events[0]];
    }
    if (events.length === 2) {
      return [events[currentIndex], events[(currentIndex + 1) % events.length]];
    }
    // For 3 or more events
    return [
      events[currentIndex],
      events[(currentIndex + 1) % events.length],
      events[(currentIndex + 2) % events.length]
    ];
  };

  const visibleEvents = getVisibleEvents();

  const EventCard = ({ event, index }) => (
    <div 
      className={`w-[450px] bg-white rounded-2xl shadow-2xl overflow-hidden flex-shrink-0 transform transition-all duration-1200 ease-out ${
        isTransitioning ? 'scale-98 opacity-90' : 'scale-100 opacity-100'
      } hover:scale-105 hover:shadow-3xl`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-[420px]">
        <div className="flex h-full">
          {/* Left half - Event Image */}
          <div className="w-1/2 relative overflow-hidden">
            <img
              src={event.image || '/api/placeholder/400/320'}
              alt={event.event}
              className="w-full h-full object-cover transition-transform duration-1200 ease-out hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20 transition-opacity duration-1200"></div>
          </div>

          {/* Right half - Event Details */}
          <div className="w-1/2 p-6 flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* Club name with logo at top */}
            <div className="flex items-center mb-4 flex-shrink-0">
              <ClubLogo 
                logo={event.clubLogo}
                clubName={event.club}
                className="w-5 h-5 mr-2 flex-shrink-0"
              />
              <span className="text-sm font-semibold text-indigo-600 uppercase tracking-wide break-words">
                {event.club}
              </span>
            </div>

            {/* Event details - flexible content area */}
            <div className="flex-1 flex flex-col min-h-0">
              <h2 className="text-xl font-bold text-gray-900 mb-3 leading-tight line-clamp-2 flex-shrink-0 break-words">
                {event.event}
              </h2>
              
              <div className="text-gray-700 mb-4 text-sm leading-relaxed flex-1 overflow-y-auto break-words">
                {event.desc}
              </div>

              <div className="space-y-3 flex-shrink-0">
                <div className="flex items-start text-gray-600 min-h-[20px]">
                  <MapPin className="w-4 h-4 mr-2 text-indigo-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm break-words">{event.venue}</span>
                </div>
                
                <div className="flex items-start text-gray-600 min-h-[20px]">
                  <Calendar className="w-4 h-4 mr-2 text-indigo-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm break-words">{event.date}</span>
                </div>
                
                <div className="flex items-start text-gray-600 min-h-[20px]">
                  <Clock className="w-4 h-4 mr-2 text-indigo-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm break-words">{event.time}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative w-full overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      
      {/* Main carousel container with conditional spacing */}
      <div className="flex justify-center py-12 px-8">
        <div className={`flex transition-transform duration-1200 ease-out ${
          events.length === 2 ? 'gap-48' : 'gap-16'
        }`}>
          {visibleEvents.map((event, index) => (
            <EventCard key={`${currentIndex}-${index}`} event={event} index={index} />
          ))}
        </div>
      </div>

      {/* Navigation arrows with improved positioning */}
      {events.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            disabled={isTransitioning}
            className="absolute left-8 top-1/2 transform -translate-y-1/2 bg-white/95 hover:bg-white text-gray-700 hover:text-gray-900 p-4 rounded-full shadow-lg hover:shadow-2xl transition-all duration-700 ease-out z-10 backdrop-blur-md hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-6 h-6 transition-transform duration-500 ease-out" />
          </button>
          
          <button
            onClick={nextSlide}
            disabled={isTransitioning}
            className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-white/95 hover:bg-white text-gray-700 hover:text-gray-900 p-4 rounded-full shadow-lg hover:shadow-2xl transition-all duration-700 ease-out z-10 backdrop-blur-md hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-6 h-6 transition-transform duration-500 ease-out" />
          </button>
        </>
      )}

      {/* Dots indicator with increased spacing */}
      {events.length > 1 && (
        <div className="flex justify-center mt-8 mb-4">
          <div className="flex space-x-3">
            {events.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                disabled={isTransitioning}
                className={`h-3 rounded-full transition-all duration-800 ease-out hover:scale-125 disabled:cursor-not-allowed ${
                  index === currentIndex
                    ? 'bg-indigo-600 w-10 shadow-lg'
                    : 'bg-gray-300 hover:bg-gray-400 w-3'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventCarousel;