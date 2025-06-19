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

import globeImg from '@/../public/home/Globe.svg'

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
    animation: slideLeft 0.5s ease-in-out forwards;
  }
  .slide-right {
    animation: slideRight 0.5s ease-in-out forwards;
  }
  .slide-in-right {
    animation: slideInRight 0.5s ease-in-out forwards;
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
`;

const ClubLogo = ({ logo, clubName, className = "" }) => {
  const [hasError, setHasError] = useState(false);

  // If no logo or error occurred, show fallback
  if (!logo || hasError) {
    return <Users className={`text-indigo-600 ${className}`} />;
  }

  if(logo === 'admin')
  {
    logo = globeImg.src
  }
  else
  {
    logo = logo
  }


  return (
    <img
      src={logo}
      alt={`${clubName} logo`}
      className={`rounded-full object-cover ${className}`}
      onError={() => setHasError(true)}
      onLoad={() => console.log('Image loaded:', logo)}
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
      className={`w-full ${
        isMobile ? "max-w-sm" : "max-w-2xl"
      } bg-white rounded-3xl card-shadow overflow-hidden ${animationClass}`}
    >
      {/* Club Header */}
      <div className="bg-gray-100 border-b border-gray-200 px-4 sm:px-6 py-3">
        <div className="flex items-center">
          <ClubLogo
            logo={event.clubLogo}
            clubName={event.club}
            className="w-8 h-8 sm:w-10 sm:h-10 mr-2" // Try larger sizes first
          />
          <h3 className="text-gray-700 font-bold text-sm sm:text-lg pl-1 uppercase tracking-wide">
            {event.club}
          </h3>
        </div>
      </div>

      {/* Main Content - All cards have same layout (image on right) */}
      <div
        className={`flex ${
          isMobile
            ? "flex-col h-auto"
            : "h-[450px]"
        }`}
      >
        {/* Event Details - Always on the left */}
        <div
          className={`${
            isMobile ? "w-full" : "flex-1"
          } p-4 sm:p-6 flex flex-col`}
        >
          <div className="mb-3 sm:mb-4 flex-shrink-0">
            <h1
              className={`font-bold text-gray-900 mb-2 sm:mb-3 leading-tight ${
                isMobile ? "text-xl" : "text-2xl"
              }`}
            >
              {event.event}
            </h1>
          </div>

          {/* Scrollable Description */}
          <div
            className={`flex-1 mb-3 sm:mb-4 overflow-hidden ${
              isMobile ? "max-h-32" : ""
            }`}
          >
            <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400 pr-2">
              <p
                className={`text-gray-700 leading-relaxed ${
                  isMobile ? "text-sm" : "text-base"
                }`}
              >
                {event.desc}
              </p>
            </div>
          </div>

          {/* Event Info */}
          <div className="space-y-2 sm:space-y-3 flex-shrink-0">
            <div className="flex items-center text-gray-600">
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-indigo-500" />
              <span className="text-xs sm:text-sm font-medium">
                {event.date}
              </span>
            </div>

            <div className="flex items-center text-gray-600">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-indigo-500" />
              <span className="text-xs sm:text-sm font-medium">
                {event.time}
              </span>
            </div>

            <div className="flex items-center text-gray-600">
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-indigo-500" />
              <span className="text-xs sm:text-sm font-medium">
                {event.venue}
              </span>
            </div>
          </div>
        </div>

        {/* Event Image - Always on the right */}
        <div
          className={`${
            isMobile ? "w-full h-48" : "w-1/2"
          } p-3 sm:p-4 flex-shrink-0`}
        >
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
  const getAnimationClass = (position) => {
    if (!isTransitioning) return "";

    if (transitionDirection === "next") {
      // Moving forward: current slides out left, new slides in from right
      return position === "left" ? "slide-left" : "slide-in-right";
    } else {
      // Moving backward: current slides out right, new slides in from left
      return position === "left" ? "slide-right" : "slide-in-left";
    }
  };

  if (!events || events.length === 0) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-100 rounded-lg">
        <p className="text-gray-500">No events to display</p>
      </div>
    );
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

        {/* Mobile Navigation - Positioned absolutely outside content */}
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
            animationClass={getAnimationClass("left")}
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

  // Desktop: Dual card layout
  const leftEvent = events[currentIndex];
  const rightEvent = events[(currentIndex + 1) % events.length];

  return (
    <div className="relative w-full">
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />

      {/* Navigation arrows - Positioned absolutely outside content area */}
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

      {/* Main carousel container */}
      <div className="max-w-7xl mx-auto">
        <div
          className="flex justify-center py-4 sm:py-8 px-16 sm:px-20"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="w-full flex flex-col lg:flex-row gap-6 sm:gap-12 justify-center items-center">
            {/* Left Card */}
            <div className="flex-shrink-0 w-full lg:w-auto lg:max-w-2xl">
              <EventCard
                event={leftEvent}
                isLeft={true}
                isMobile={false}
                animationClass={getAnimationClass("left")}
              />
            </div>

            {/* Right Card */}
            <div className="flex-shrink-0 w-full lg:w-auto lg:max-w-2xl">
              <EventCard
                event={rightEvent}
                isLeft={true}
                isMobile={false}
                animationClass={getAnimationClass("right")}
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

export default EventCarousel;