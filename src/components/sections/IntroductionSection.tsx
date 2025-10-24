"use client";

import React from "react";
import { Button } from "@/components/ui/button";

interface IntroductionSectionProps {
  onDiscoverClick: () => void;
  introTitle: string;
  introRichText: string;
  introButtonLabel: string;
  introImages: string[]; // Placeholder for image URLs
}

const IntroductionSection: React.FC<IntroductionSectionProps> = ({
  onDiscoverClick,
  introTitle,
  introRichText,
  introButtonLabel,
  introImages,
}) => {
  console.log("IntroductionSection received introImages:", introImages); // Debug log

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error("Introduction image failed to load:", event.currentTarget.src, event);
  };

  return (
    <section id="introduction" className="container mx-auto py-20 px-4 md:px-8 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Column: Large Display Header */}
        <div className="md:pr-12">
          <h2 className="text-4xl md:text-6xl font-bold leading-tight tracking-tighter text-primary">
            {introTitle}
          </h2>
        </div>

        {/* Right Column: Paragraph Block and Button */}
        <div className="space-y-8">
          <div
            className="text-lg text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: introRichText }}
          />
          <Button
            className="bg-primary text-white hover:bg-primary/90 text-lg px-8 py-6 rounded-full font-semibold"
            onClick={onDiscoverClick}
          >
            {introButtonLabel}
          </Button>
          {introImages.length > 0 && (
            <div className="grid grid-cols-2 gap-4 pt-8">
              {introImages.map((imgSrc, index) => (
                <img
                  key={index}
                  src={imgSrc}
                  alt={`Introduction image ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg shadow-md border-4 border-red-500" // Force height and prominent border
                  onError={handleImageError}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default IntroductionSection;