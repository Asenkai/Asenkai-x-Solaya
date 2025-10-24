"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

interface HeroSectionProps {
  onRegisterClick: () => void;
  heroHeadline: string;
  heroSubheadline: string;
  heroCtaLabel: string;
  heroMediaUrl: string; // Placeholder for video or image URL
}

const HeroSection: React.FC<HeroSectionProps> = ({
  onRegisterClick,
  heroHeadline,
  heroSubheadline,
  heroCtaLabel,
  heroMediaUrl,
}) => {
  console.log("HeroSection received heroMediaUrl:", heroMediaUrl); // Debug log

  const handleMediaError = (event: React.SyntheticEvent<HTMLImageElement | HTMLVideoElement, Event>) => {
    console.error("Hero media failed to load:", event.currentTarget.src, event);
  };

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      {/* Background Media */}
      {heroMediaUrl.endsWith(".mp4") ? (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={heroMediaUrl}
          autoPlay
          loop
          muted
          playsInline
          onError={handleMediaError}
        />
      ) : (
        <img
          className="absolute inset-0 w-full h-full object-cover"
          src={heroMediaUrl}
          alt="Hero Background"
          onError={handleMediaError}
        />
      )}

      {/* Soft beige overlay - TEMPORARILY REMOVED FOR DEBUGGING */}
      {/* <div className="absolute inset-0 bg-amber-500/10" /> */}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white p-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 max-w-4xl leading-tight">
          {heroHeadline}
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl">
          {heroSubheadline}
        </p>
        <Button
          className="bg-white text-primary hover:bg-gray-100 text-lg px-8 py-6 rounded-full font-semibold"
          onClick={onRegisterClick}
        >
          {heroCtaLabel}
        </Button>
      </div>

      {/* Subtle downward chevron animation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="h-10 w-10 text-white" />
      </div>
    </section>
  );
};

export default HeroSection;