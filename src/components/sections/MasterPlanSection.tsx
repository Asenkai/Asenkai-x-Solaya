"use client";

import React from "react";

interface MasterPlanSectionProps {
  imageUrl: string;
}

const MasterPlanSection: React.FC<MasterPlanSectionProps> = ({ imageUrl }) => {
  if (!imageUrl) {
    return null; // Don't render if no image URL is provided
  }

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error("Master plan image failed to load:", event.currentTarget.src, event);
  };

  return (
    <section id="master-plan" className="py-16 px-4 md:px-8 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold leading-tight tracking-tighter text-primary text-center mb-12">
          Master Plan
        </h2>
        <div className="relative w-full h-auto overflow-hidden rounded-lg shadow-xl">
          <img
            src={imageUrl}
            alt="Master Plan"
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
        </div>
      </div>
    </section>
  );
};

export default MasterPlanSection;