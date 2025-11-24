"use client";

import { useState, useEffect } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import Image from "next/image";
import { useContent } from "@/lib/hooks/content/useContent";
import BannerSkeleton from "@/components/ui/loading/BannerSkeleton";

interface BannerSlide {
  id: string;
  img: string;
  title: string;
  subtitle: string;
  cta: string;
  link: string;
}

const HeroCarousel = () => {
  const { banners, fetchBanners, fetBannerLoading, fetchBannerError } =
    useContent();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    fetchBanners();
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (banners.length > 1 && isAutoPlaying) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % banners.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [banners.length, isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  // Show loading state
  if (fetBannerLoading) {
    return <BannerSkeleton />;
  }

  // Show error state
  if (fetchBannerError) {
    return (
      <div className="w-full h-[400px] md:h-[500px] bg-(--muted) rounded-lg flex items-center justify-center">
        <div className="text-(--destructive) text-center">
          Failed to load banners
          <button
            onClick={fetchBanners}
            className="mt-2 block text-sm text-(--primary) hover:underline"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  if (!banners || banners.length === 0) {
    return null;
  }

  return (
    <div
      className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-lg"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Slides */}
      {banners.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === currentSlide
              ? "opacity-100"
              : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Background Image */}
          <Image
            src={slide.image || "/default-banner.jpg"}
            alt={slide.title || "Banner image"}
            fill
            priority={index === 0}
            loading={index === 0 ? "eager" : "lazy"}
            className="object-cover w-full h-full"
            onError={(e) => {
              // Fallback for broken images
              const target = e.target as HTMLImageElement;
              target.src = "/default-banner.jpg";
            }}
          />

          {/* Gradient Overlay - Only show if there's content */}
          {(slide.title || slide.subtitle || slide.ctaText) && (
            <div className="absolute inset-0 bg-gradient-to-r from-(--background)/80 to-transparent">
              <div className="container mx-auto px-4 h-full flex items-center">
                <div className="md:ml-20 max-w-xl space-y-4 animate-fade-in">
                  {/* Title - Conditionally render */}
                  {slide.title && (
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-(--foreground)">
                      {slide.title}
                    </h2>
                  )}

                  {/* Subtitle - Conditionally render */}
                  {slide.subtitle && (
                    <p className="text-lg md:text-xl text-(--muted-foreground) leading-relaxed">
                      {slide.subtitle}
                    </p>
                  )}

                  {/* CTA Button - Conditionally render */}
                  {slide.ctaText && slide.link && (
                    <button
                      onClick={() => (window.location.href = slide.link)}
                      className="mt-4 h-11 rounded-md px-8 bg-(--primary) text-(--primary-foreground) hover:bg-(--primary)/90 inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-(--background) transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-(--ring) focus:ring-offset-2"
                    >
                      {slide.ctaText}
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Navigation Arrows - Only show if multiple slides */}
      {banners.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-(--card)/80 backdrop-blur hover:bg-(--card) cursor-pointer transition-all focus:outline-none focus:ring-2 focus:ring-(--ring) focus:ring-offset-2"
            aria-label="Previous slide"
          >
            <LuChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-(--card)/80 backdrop-blur hover:bg-(--card) cursor-pointer transition-all focus:outline-none focus:ring-2 focus:ring-(--ring) focus:ring-offset-2"
            aria-label="Next slide"
          >
            <LuChevronRight className="h-5 w-5 md:h-6 md:w-6" />
          </button>
        </>
      )}

      {/* Dots Indicator - Only show if multiple slides */}
      {banners.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-(--ring) focus:ring-offset-2 ${
                index === currentSlide
                  ? "bg-(--primary) w-6"
                  : "bg-(--muted-foreground)/50 hover:bg-(--muted-foreground)/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentSlide ? "true" : "false"}
            />
          ))}
        </div>
      )}

      {/* Slide Counter - Only show if multiple slides */}
      {banners.length > 1 && (
        <div className="absolute top-4 right-4 bg-(--card)/80 backdrop-blur rounded-full px-3 py-1 text-sm text-(--muted-foreground)">
          {currentSlide + 1} / {banners.length}
        </div>
      )}
    </div>
  );
};

export default HeroCarousel;
