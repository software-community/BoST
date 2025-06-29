"use client";
import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  Clock,
  Users,
} from "lucide-react";

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
  .card-shadow {
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.08);
  }
  .card-shadow:hover {
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15), 0 12px 24px rgba(0, 0, 0, 0.12);
  }
  .slide-left {
    animation: slideInRight 0.5s ease-in-out forwards;
  }
  .slide-right {
    animation: slideRight 0.5s ease-in-out forwards;
  }
  .slide-in-right {
    animation: slideLeft 0.5s ease-in-out forwards;
  }
  .slide-in-left {
    animation: slideInLeft 0.5s ease-in-out forwards;
  }
  @keyframes slideLeft {
    from {
      transform: translateX(0) scale(1);
      opacity: 1;
    }
    to {
      transform: translateX(-100%) scale(0.8);
      opacity: 0;
    }
  }
  @keyframes slideRight {
    from {
      transform: translateX(0) scale(1);
      opacity: 1;
    }
    to {
      transform: translateX(100%) scale(0.8);
      opacity: 0;
    }
  }
  @keyframes slideInRight {
    from {
      transform: translateX(100%) scale(0.8);
      opacity: 0;
    }
    to {
      transform: translateX(0) scale(1);
      opacity: 1;
    }
  }
  @keyframes slideInLeft {
    from {
      transform: translateX(-100%) scale(0.8);
      opacity: 0;
    }
    to {
      transform: translateX(0) scale(1);
      opacity: 1;
    }
  }
  
  /* Enhanced scrollbar styles for description */
  .description-scroll {
    scrollbehavior: smooth;
  }
  .description-scroll::-webkit-scrollbar {
    width: 6px;
  }
  .description-scroll::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.05);
    border-radius: 3px;
  }
  .description-scroll::-webkit-scrollbar-thumb {
    background: rgba(99, 102, 241, 0.3);
    border-radius: 3px;
    transition: all 0.2s;
  }
  .description-scroll::-webkit-scrollbar-thumb:hover {
    background: rgba(99, 102, 241, 0.5);
  }
  
  /* Fixed card dimensions */
  .fixed-card-width {
    width: 100%;
    max-width: 600px;
    min-width: 520px;
  }
  
  .fixed-card-height {
    height: 550px;
  }
  
  @media (max-width: 640px) {
    .fixed-card-width {
      min-width: 320px;
      max-width: 380px;
    }
    .fixed-card-height {
      height: auto;
      min-height: 400px;
    }
  }
`;

const ClubLogo = ({ logo, clubName, className = "" }) => {
  const [hasError, setHasError] = useState(false);

  // If no logo or error occurred, show fallback
  if (!logo || hasError) {
    return <Users className={`text-indigo-600 ${className}`} />;
  }

  // Handle admin logo or regular logo
  const logoSrc = logo === 'admin' ? '/api/placeholder/40/40' : logo;

  return (
    <img
      src={logoSrc}
      alt={`${clubName} logo`}
      className={`rounded-full object-cover ${className}`}
      onError={() => setHasError(true)}
    />
  );
};

const EventCard = ({
  event,
  isLeft,
  animationClass = "",
  isMobile = false,
}) => {
  return (
    <div
      className={`fixed-card-width ${
        isMobile ? "" : "fixed-card-height"
      } bg-white rounded-3xl card-shadow overflow-hidden ${animationClass} flex flex-col`}
    >
      {/* Club Header - Fixed height */}
      <div className="bg-gray-100 border-b border-gray-200 px-4 sm:px-6 py-3 flex-shrink-0">
        <div className="flex items-center">
          <ClubLogo
            logo={event.clubLogo}
            clubName={event.club}
            className="w-8 h-8 sm:w-10 sm:h-10 mr-2 flex-shrink-0"
          />
          <h3 className="text-gray-700 font-bold text-sm sm:text-lg pl-1 uppercase tracking-wide truncate">
            {event.club}
          </h3>
        </div>
      </div>

      {/* Main Content - Flexible layout */}
      <div className={`flex ${isMobile ? "flex-col flex-1" : "flex-1"}`}>
        {/* Event Details - Fixed proportions */}
        <div className={`${isMobile ? "flex-1" : "w-1/2"} p-5 sm:p-7 flex flex-col`}>
          {/* Title - Fixed height */}
          <div className="mb-4 sm:mb-5 flex-shrink-0" style={{ minHeight: '70px' }}>
            <h1 className={`font-bold text-gray-900 mb-2 sm:mb-3 leading-tight ${
              isMobile ? "text-xl" : "text-2xl"
            } line-clamp-2`}>
              {event.event}
            </h1>
          </div>

          {/* Scrollable Description - Fixed height with scroll */}
          <div className={`flex-1 mb-4 sm:mb-5 ${isMobile ? "min-h-[100px] max-h-[120px]" : "min-h-[220px] max-h-[220px]"}`}>
            <div className="h-full overflow-y-auto description-scroll pr-2">
              <p className={`text-gray-700 leading-relaxed ${
                isMobile ? "text-sm" : "text-base"
              }`}>
                {event.desc}
              </p>
            </div>
          </div>

          {/* Event Info - Fixed height */}
          <div className="space-y-2 sm:space-y-3 flex-shrink-0" style={{ minHeight: '100px' }}>
            <div className="flex items-center text-gray-600">
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-indigo-500 flex-shrink-0" />
              <span className="text-xs sm:text-sm font-medium truncate">
                {event.date}
              </span>
            </div>

            <div className="flex items-center text-gray-600">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-indigo-500 flex-shrink-0" />
              <span className="text-xs sm:text-sm font-medium truncate">
                {event.time}
              </span>
            </div>

            <div className="flex items-center text-gray-600">
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-indigo-500 flex-shrink-0" />
              <span className="text-xs sm:text-sm font-medium truncate">
                {event.venue}
              </span>
            </div>
          </div>
        </div>

        {/* Event Image - Fixed proportions */}
        <div className={`${isMobile ? "w-full h-48 flex-shrink-0" : "w-1/2"} p-4 sm:p-5 flex-shrink-0`}>
          <div className="h-full bg-gray-100 rounded-2xl overflow-hidden">
            <img
              src={event.image || "/api/placeholder/300/300"}
              alt={event.event}
              className="w-full h-full object-cover transition-transform duration-600 ease-out hover:scale-105"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const EventCarousel = ({ events }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState("next");
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const nextSlide = () => {
    if (isTransitioning) return;

    setTransitionDirection("next");
    setIsTransitioning(true);

    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex >= events.length - 1 ? 0 : prevIndex + 1
      );
    }, 250);

    setTimeout(() => setIsTransitioning(false), 500);
  };

  const prevSlide = () => {
    if (isTransitioning) return;

    setTransitionDirection("prev");
    setIsTransitioning(true);

    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? events.length - 1 : prevIndex - 1
      );
    }, 250);

    setTimeout(() => setIsTransitioning(false), 500);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!events || events.length <= 1 || isHovered) return;

    const interval = setInterval(() => {
      if (!isTransitioning && !isHovered) {
        nextSlide();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [events, isTransitioning, isHovered]);

  // Animation classes for transitions
  const getAnimationClass = (cardPosition, isNewCard = false) => {
    if (!isTransitioning) return "";

    if (transitionDirection === "next") {
      if (isNewCard) {
        // New cards always slide in from the right when going forward
        return "slide-in-right";
      } else {
        // Existing cards slide out to the left when going forward
        return "slide-left";
      }
    } else {
      if (isNewCard) {
        // New cards always slide in from the left when going backward
        return "slide-in-left";
      } else {
        // Existing cards slide out to the right when going backward
        return "slide-right";
      }
    }
  };

  if (!events || events.length === 0) {
    return null;
  }

  if (events.length === 1) {
    return (
      <div className="relative w-full max-w-7xl mx-auto">
        <style dangerouslySetInnerHTML={{ __html: customStyles }} />
        <div className="flex justify-center py-4 sm:py-8 px-2 sm:px-4">
          <EventCard event={events[0]} isLeft={true} isMobile={isMobile} />
        </div>
      </div>
    );
  }

  // Mobile: show single card
  if (isMobile) {
    const currentEvent = events[currentIndex];

    return (
      <div
        className="relative w-full max-w-md mx-auto"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <style dangerouslySetInnerHTML={{ __html: customStyles }} />

        {/* Mobile Navigation */}
        {events.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              disabled={isTransitioning}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/95 hover:bg-white text-gray-700 hover:text-indigo-600 p-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-out z-30 backdrop-blur-sm hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={nextSlide}
              disabled={isTransitioning}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/95 hover:bg-white text-gray-700 hover:text-indigo-600 p-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-out z-30 backdrop-blur-sm hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        <div className="flex justify-center py-4 px-12">
          <EventCard
            event={currentEvent}
            isLeft={true}
            isMobile={true}
            animationClass={getAnimationClass("mobile", true)}
          />
        </div>

        {/* Mobile Progress Indicator */}
        <div className="flex justify-center mt-4 mb-2">
          <div className="bg-white rounded-full px-4 py-2 shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="w-24 h-1 bg-gray-300 relative rounded-full overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-indigo-600 transition-all duration-500 ease-out rounded-full"
                  style={{
                    width: `${((currentIndex + 1) / events.length) * 100}%`,
                  }}
                />
              </div>
              <span className="text-xs text-gray-600 font-medium">
                {currentIndex + 1}/{events.length}
              </span>
            </div>
          </div>
        </div>

        {/* Mobile Dots */}
        {events.length > 1 && (
          <div className="flex justify-center mt-2">
            <div className="flex space-x-1">
              {events.map((_, index) => (
                <div
                  key={index}
                  className={`h-1.5 rounded-full transition-all duration-300 ease-out ${
                    index === currentIndex
                      ? "bg-indigo-600 w-4 shadow-md"
                      : "bg-gray-300 w-1.5"
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Desktop: Dual card layout with consistent spacing
  const leftEvent = events[currentIndex];
  const rightEvent = events[(currentIndex + 1) % events.length];
  
  // Track which cards are new based on transition direction
  const leftCardIsNew = isTransitioning && transitionDirection === "prev";
  const rightCardIsNew = isTransitioning && transitionDirection === "next";

  return (
    <div className="relative w-full">
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />

      {/* Navigation arrows */}
      {events.length > 2 && (
        <>
          <button
            onClick={prevSlide}
            disabled={isTransitioning}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/95 hover:bg-white text-gray-700 hover:text-indigo-600 p-2 sm:p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-out z-30 backdrop-blur-sm hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <button
            onClick={nextSlide}
            disabled={isTransitioning}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/95 hover:bg-white text-gray-700 hover:text-indigo-600 p-2 sm:p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-out z-30 backdrop-blur-sm hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </>
      )}

      {/* Main carousel container with consistent spacing */}
      <div className="max-w-7xl mx-auto">
        <div
          className="flex justify-center py-4 sm:py-8 px-16 sm:px-20"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="flex gap-8 justify-center items-start">
            {/* Left Card */}
            <div className="flex-shrink-0">
              <EventCard
                event={leftEvent}
                isLeft={true}
                isMobile={false}
                animationClass={getAnimationClass("left", leftCardIsNew)}
              />
            </div>

            {/* Right Card */}
            <div className="flex-shrink-0">
              <EventCard
                event={rightEvent}
                isLeft={true}
                isMobile={false}
                animationClass={getAnimationClass("right", rightCardIsNew)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Progress indicator */}
      <div className="flex justify-center mt-4 sm:mt-6 mb-2 sm:mb-4">
        <div className="bg-white rounded-full px-4 sm:px-6 py-2 sm:py-3 shadow-lg">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="w-24 sm:w-32 h-1 bg-gray-300 relative rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-indigo-600 transition-all duration-500 ease-out rounded-full"
                style={{
                  width: `${((currentIndex + 1) / events.length) * 100}%`,
                }}
              />
            </div>
            <span className="text-xs sm:text-sm text-gray-600 font-medium">
              {currentIndex + 1} of {events.length}
            </span>
          </div>
        </div>
      </div>

      {/* Dots indicator */}
      {events.length > 2 && (
        <div className="flex justify-center mt-2 sm:mt-4">
          <div className="flex space-x-1 sm:space-x-2">
            {events.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ease-out ${
                  index === currentIndex
                    ? "bg-indigo-600 w-4 sm:w-6 shadow-md"
                    : "bg-gray-300 w-1.5 sm:w-2"
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Demo component with sample data
const EventCarouselDemo = () => {
  const sampleEvents = [
    {
      club: "Tech Club",
      clubLogo: "/api/placeholder/40/40",
      event: "Annual Tech Summit 2024",
      desc: "Join us for the biggest technology conference of the year! This event will feature cutting-edge presentations from industry leaders, hands-on workshops covering the latest technologies, networking opportunities with professionals from top tech companies, and exciting product launches. Whether you're a seasoned developer, a curious student, or an aspiring entrepreneur, this summit offers something valuable for everyone. Don't miss this chance to stay ahead of the curve in the rapidly evolving tech landscape.",
      date: "March 15, 2024",
      time: "9:00 AM - 6:00 PM",
      venue: "Convention Center Hall A",
      image: "/api/placeholder/400/300"
    },
    {
      club: "Photography Club",
      clubLogo: "/api/placeholder/40/40",
      event: "Nature Photography Workshop",
      desc: "Learn the art of capturing stunning nature photographs in this comprehensive workshop. Perfect for beginners and intermediate photographers looking to improve their skills.",
      date: "March 20, 2024",
      time: "2:00 PM - 5:00 PM",
      venue: "City Park Pavilion",
      image: "/api/placeholder/400/300"
    },
    {
      club: "Music Society",
      clubLogo: "/api/placeholder/40/40",
      event: "Spring Concert Series",
      desc: "Experience an evening of classical and contemporary music performed by talented student musicians. The concert will feature solo performances, ensemble pieces, and special guest appearances.",
      date: "March 25, 2024",
      time: "7:00 PM - 9:30 PM",
      venue: "University Auditorium",
      image: "/api/placeholder/400/300"
    },
    {
      club: "Drama Club",
      clubLogo: "/api/placeholder/40/40",
      event: "Shakespeare Festival",
      desc: "A week-long celebration of William Shakespeare's greatest works, featuring live performances, readings, and interactive workshops.",
      date: "April 1-7, 2024",
      time: "Various Times",
      venue: "Drama Theater",
      image: "/api/placeholder/400/300"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
          Upcoming Events
        </h1>
        <EventCarousel events={sampleEvents} />
      </div>
    </div>
  );
};

export default EventCarousel