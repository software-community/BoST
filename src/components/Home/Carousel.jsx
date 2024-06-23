'use client'
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/YTU0xP4w1T4
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, CarouselIndicators, CarouselIndicator } from "@/components/ui/carousel"

export default function GalleryCarousel() {
  return (
    <div className="relative w-full  mx-auto">
      <Carousel className="lg:h-screen  overflow-hidden">
        <CarouselContent>
          <CarouselItem>
            <img
              src="/GalleryImages/img1.png"
              alt="Carousel Image 1"

              className="object-cover w-full"
            />
          </CarouselItem>
          <CarouselItem>
            <img
               src="/GalleryImages/img1.png"
              alt="Carousel Image 2"

              className="object-cover w-full"
            />
          </CarouselItem>
          <CarouselItem>
            <img
                  src="/GalleryImages/img1.png"
              alt="Carousel Image 3"

              className="object-cover w-full"
            />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className="absolute top-1/2  -translate-y-1/2 left-4 z-10 text-white hover:text-primary transition-colors">
          <ChevronLeftIcon />
        </CarouselPrevious>
        <CarouselNext className="absolute top-1/2 -translate-y-1/2 right-4 z-10 text-white hover:text-primary transition-colors">
          <ChevronRightIcon  />
        </CarouselNext>
       
      </Carousel>
    </div>
  )
}

function ChevronLeftIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  )
}


function ChevronRightIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}