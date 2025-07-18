"use client";

import { useTranslation } from "@/hooks/use-translation";
import { useTestimonials } from "@/hooks/use-testimonials";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Quote, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function TestimonialsCarousel() {
  const { t } = useTranslation();
  const testimonials = useTestimonials();
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const handleVideoClick = (videoUrl: string | undefined) => {
    if (videoUrl) {
      setSelectedVideo(videoUrl);
    }
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
  };

  const getEmbedUrl = (url: string) => {
    // Handle youtu.be format
    if (url.includes("youtu.be/")) {
      const videoId = url.split("youtu.be/")[1]?.split("?")[0];
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }
    // Handle youtube.com/watch?v= format
    if (url.includes("youtube.com/watch?v=")) {
      const videoId = url.split("v=")[1]?.split("&")[0];
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }
    // Handle youtube.com/embed/ format
    if (url.includes("youtube.com/embed/")) {
      const videoId = url.split("embed/")[1]?.split("?")[0];
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }
    return url; // fallback
  };

  return (
    <>
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-5">
          <h2 className="font-bold text-4xl text-center mb-12 text-gray-800">
            {t("testimonialsTitle")}
          </h2>

          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {testimonials.map((testimonial) => (
                <CarouselItem
                  key={testimonial.id}
                  className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <Card className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                    <CardContent className="p-0 flex flex-col h-full">
                      {/* Tall Image Section */}
                      <div className="relative h-80 w-full">
                        <Image
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.name}
                          fill
                          className="object-cover object-center"
                        />
                        {/* Gradient overlay for text readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                        {/* Profile info overlay */}
                        <div className="absolute bottom-4 left-4 text-white">
                          <h3 className="font-semibold text-xl drop-shadow-lg">
                            {testimonial.name}
                          </h3>
                          <p className="text-sm opacity-90 drop-shadow-lg">
                            {testimonial.location}
                          </p>
                        </div>

                        {/* Play button overlay - solo si existe videoUrl */}
                        {testimonial.videoUrl && (
                          <button
                            onClick={() =>
                              handleVideoClick(testimonial.videoUrl)
                            }
                            className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-200 hover:scale-110"
                          >
                            <Play className="w-6 h-6" fill="currentColor" />
                          </button>
                        )}
                      </div>

                      {/* Content Section */}
                      <div className="p-6 flex-grow flex flex-col">
                        {/* Quote Section */}
                        <div className="flex-grow mb-6">
                          <Quote className="w-8 h-8 text-[#15B674] mb-3" />
                          <p className="text-gray-700 leading-relaxed italic">
                            "{testimonial.quote}"
                          </p>
                        </div>

                        {/* Video Button - solo si existe videoUrl */}
                        {testimonial.videoUrl && (
                          <Button
                            onClick={() =>
                              handleVideoClick(testimonial.videoUrl)
                            }
                            className="w-full bg-[#15B674] hover:bg-[#12a066] text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                          >
                            <Play className="w-4 h-4" />
                            {t("watchVideo")}
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12 bg-white border-2 border-gray-200 hover:bg-gray-50" />
            <CarouselNext className="hidden md:flex -right-12 bg-white border-2 border-gray-200 hover:bg-gray-50" />
          </Carousel>

          {/* Mobile Navigation Dots */}
          <div className="flex justify-center mt-6 md:hidden">
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <div key={index} className="w-2 h-2 rounded-full bg-gray-300" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden">
            <button
              onClick={closeVideoModal}
              className="absolute top-4 right-4 z-10 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 rounded-full transition-all duration-200"
            >
              <X className="w-6 h-6" />
            </button>
            <iframe
              src={getEmbedUrl(selectedVideo)}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
}
