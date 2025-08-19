"use client";

import { useTranslation } from "@/hooks/use-translation";
import { useTestimonials } from "@/hooks/use-testimonials";
import { useWixIframe } from "@/hooks/use-wix-iframe";
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
import { useState, useEffect } from "react";

export default function TestimonialsCarousel() {
  const { t } = useTranslation();
  const testimonials = useTestimonials();
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const { getModalStyles } = useWixIframe();
  const modalStyles = getModalStyles();

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleVideoClick = (videoUrl: string | undefined, cardId: string) => {
    if (videoUrl) {
      if (isMobile) {
        setSelectedVideo(videoUrl);
      } else {
        // Toggle the expanded card
        if (expandedCardId === cardId) {
          setExpandedCardId(null);
          setSelectedVideo(null);
        } else {
          setExpandedCardId(cardId);
          setSelectedVideo(videoUrl);
        }
      }
    }
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
    setExpandedCardId(null);
  };

  const closeDesktopVideo = () => {
    setExpandedCardId(null);
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
      <section className="py-8 md:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-5">
          <h2 className="font-bold text-2xl md:text-4xl text-center mb-8 md:mb-12 text-gray-800">
            {t("testimonialsTitle")}
          </h2>

          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
            onSelect={() => {
              // Close video when carousel moves
              if (expandedCardId) {
                setExpandedCardId(null);
                setSelectedVideo(null);
              }
            }}
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {testimonials.map((testimonial) => (
                <CarouselItem
                  key={testimonial.id}
                  className={`pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3 transition-all duration-500 ${
                    !isMobile && expandedCardId === testimonial.id
                      ? "lg:basis-2/3"
                      : ""
                  }`}
                >
                  <div className="flex h-full">
                    {/* Original Card */}
                    <Card className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex-1">
                      <CardContent className="p-0 flex flex-col h-full">
                        {/* Tall Image Section */}
                        <div className="relative h-64 md:h-80 w-full">
                          <Image
                            src={testimonial.image || "/placeholder.svg"}
                            alt={testimonial.name}
                            fill
                            className="object-cover object-top"
                          />
                          {/* Gradient overlay for text readability */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                          {/* Profile info overlay */}
                          <div className="absolute bottom-3 md:bottom-4 left-3 md:left-4 text-white">
                            <h3 className="font-semibold text-lg md:text-xl drop-shadow-lg">
                              {testimonial.name}
                            </h3>
                            <p className="text-xs md:text-sm opacity-90 drop-shadow-lg">
                              {testimonial.location}
                            </p>
                          </div>

                          {/* Play button overlay - solo si existe videoUrl */}
                          {testimonial.videoUrl && (
                            <button
                              onClick={() =>
                                handleVideoClick(
                                  testimonial.videoUrl,
                                  testimonial.id
                                )
                              }
                              className="absolute top-3 md:top-4 right-3 md:right-4 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 md:p-3 rounded-full transition-all duration-200 hover:scale-110"
                            >
                              <Play
                                className="w-4 h-4 md:w-6 md:h-6"
                                fill="currentColor"
                              />
                            </button>
                          )}
                        </div>

                        {/* Content Section */}
                        <div className="p-4 md:p-6 flex-grow flex flex-col">
                          {/* Quote Section */}
                          <div className="flex-grow mb-4 md:mb-6">
                            <Quote className="w-6 h-6 md:w-8 md:h-8 text-[#15B674] mb-2 md:mb-3" />
                            <p className="text-sm md:text-base text-gray-700 leading-relaxed italic">
                              "{testimonial.quote}"
                            </p>
                          </div>

                          {/* Video Button - solo si existe videoUrl */}
                          {testimonial.videoUrl && (
                            <Button
                              onClick={() =>
                                handleVideoClick(
                                  testimonial.videoUrl,
                                  testimonial.id
                                )
                              }
                              className="w-full bg-[#15B674] hover:bg-[#12a066] text-white font-semibold py-2 px-3 md:px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 text-sm md:text-base"
                            >
                              <Play className="w-3 h-3 md:w-4 md:h-4" />
                              {t("watchVideo")}
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Desktop Video Expansion */}
                    {!isMobile &&
                      expandedCardId === testimonial.id &&
                      testimonial.videoUrl && (
                        <div className="hidden lg:block w-96 ml-4 transition-all duration-500">
                          <Card className="h-full shadow-lg">
                            <CardContent className="p-3 h-full flex flex-col">
                              <div className="flex items-center justify-between mb-3">
                                <div>
                                  <h3 className="font-semibold text-base text-[#121334]">
                                    {testimonial.name}
                                  </h3>
                                  <p className="text-xs text-gray-600">
                                    {t("watchVideo")}
                                  </p>
                                </div>
                                <Button
                                  onClick={() => closeDesktopVideo()}
                                  variant="ghost"
                                  size="sm"
                                  className="text-gray-500 hover:text-gray-700 h-6 w-6 p-0"
                                >
                                  <X className="w-3 h-3" />
                                </Button>
                              </div>

                              <div className="flex-1 relative bg-gray-200 rounded-lg overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <iframe
                                    src={getEmbedUrl(testimonial.videoUrl)}
                                    className="w-full h-full max-w-full max-h-full"
                                    style={{ aspectRatio: "16/9" }}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                  />
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      )}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-8 md:-left-12 bg-white border-2 border-gray-200 hover:bg-gray-50" />
            <CarouselNext className="hidden md:flex -right-8 md:-right-12 bg-white border-2 border-gray-200 hover:bg-gray-50" />
          </Carousel>

          {/* Mobile Navigation Dots */}
          <div className="flex justify-center mt-4 md:mt-6 md:hidden">
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <div key={index} className="w-2 h-2 rounded-full bg-gray-300" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Video Modal */}
      {selectedVideo && isMobile && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center z-50 p-2 md:p-4"
          style={modalStyles.container}
          onClick={closeVideoModal}
        >
          <div
            className="relative w-full max-w-4xl"
            style={modalStyles.modal}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-lg overflow-hidden shadow-2xl flex flex-col max-h-full">
              {/* Header */}
              <div className="p-3 md:p-6 text-center relative flex-shrink-0">
                <button
                  onClick={closeVideoModal}
                  className="absolute top-2 right-2 md:top-4 md:right-4 text-gray-500 hover:text-gray-700 transition-colors z-10 bg-white/80 hover:bg-white rounded-full p-1 md:p-2"
                >
                  <X className="w-4 h-4 md:w-6 md:h-6" />
                </button>
                <h3 className="text-lg md:text-2xl font-bold text-[#121334] mb-1 md:mb-2 pr-8">
                  {t("testimonialsTitle")}
                </h3>
                <p className="text-xs md:text-base text-gray-600">
                  {t("watchVideo")}
                </p>
              </div>

              {/* Video Container */}
              <div className="flex-1 min-h-0">
                <div
                  className="relative bg-gray-200 w-full h-full"
                  style={{
                    paddingBottom: "56.25%",
                    maxHeight: "calc(85vh - 120px)",
                    minHeight: "200px",
                  }}
                >
                  <iframe
                    src={getEmbedUrl(selectedVideo)}
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="p-3 md:p-6 text-center flex-shrink-0">
                <Button
                  onClick={closeVideoModal}
                  variant="outline"
                  className="border-[#121334] text-[#121334] hover:bg-[#121334] hover:text-white text-sm md:text-base"
                >
                  {t("close")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
