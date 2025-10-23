"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { slides } from "@/data/products";

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };
  

  return (
    <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-lg">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image src={slide.image} loading="lazy" alt={slide.title} width={1920} height={1080} className="object-cover w-full h-full" />


          <div className="absolute inset-0 bg-gradient-to-r from-[theme(--background)]/80 to-transparent">
            <div className="container mx-auto px-4 h-full flex items-center">
              <div className="md:ml-20 max-w-xl space-y-4 animate-fade-in">
                <h2 className="text-4xl md:text-6xl font-bold">
                  {slide.title}
                </h2>
                <p className="text-lg md:text-xl text-[theme(--muted-foreground)]">
                  {slide.subtitle}
                </p>
                <button className="mt-4 h-11 rounded-md px-8 bg-[theme(--primary)] text-[theme(--primary-foreground)] hover:bg-[theme(--primary)]/90 inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-[theme(--background)] transition-colors cursor-pointer">
                  {slide.cta}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[theme(--card)]/80 backdrop-blur hover:bg-[theme(--card)] cursor-pointer transition-all"
        aria-label="Previous slide"
      >
        <LuChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[theme(--card)]/80 backdrop-blur hover:bg-[theme(--card)] cursor-pointer transition-all"
        aria-label="Next slide"
      >
        <LuChevronRight className="h-6 w-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
              index === currentSlide
                ? "bg-[theme(--primary)] w-8"
                : "bg-[theme(--muted-foreground)]/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
