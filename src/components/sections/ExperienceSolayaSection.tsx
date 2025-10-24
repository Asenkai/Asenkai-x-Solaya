"use client";

import React from "react";

interface ExperienceGalleryItem {
  label: string;
  imageUrl: string;
}

interface ExperienceSolayaSectionProps {
  title: string;
  paragraph: string;
  galleryItems: ExperienceGalleryItem[];
}

const ExperienceSolayaSection: React.FC<ExperienceSolayaSectionProps> = ({
  title,
  paragraph,
  galleryItems,
}) => {
  if (!galleryItems || galleryItems.length === 0) {
    return null;
  }

  const mainImage = galleryItems[0];
  const topGridImage = galleryItems[1];
  const bottomGridImage = galleryItems[2];
  const remainingImages = galleryItems.slice(3);

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error("Experience Solaya image failed to load:", event.currentTarget.src, event);
  };

  return (
    <section id="experience" className="py-20 px-4 md:px-8 bg-white">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight tracking-tighter text-primary mb-6">
            {title}
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            {paragraph}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Main Image (Community Garden) */}
          {mainImage && (
            <div className="relative h-[600px] lg:h-auto overflow-hidden rounded-lg shadow-lg">
              <img
                src={mainImage.imageUrl}
                alt={mainImage.label}
                className="w-full h-full object-cover"
                onError={handleImageError}
              />
              <div className="absolute bottom-6 left-6 text-white text-2xl font-semibold">
                {mainImage.label}
              </div>
            </div>
          )}

          {/* Right Column: Two stacked images (Arrival Lobby, Gym) */}
          <div className="grid grid-cols-1 gap-8">
            {topGridImage && (
              <div className="relative h-[290px] overflow-hidden rounded-lg shadow-lg">
                <img
                  src={topGridImage.imageUrl}
                  alt={topGridImage.label}
                  className="w-full h-full object-cover"
                  onError={handleImageError}
                />
                <div className="absolute bottom-6 left-6 text-white text-2xl font-semibold">
                  {topGridImage.label}
                </div>
              </div>
            )}
            {bottomGridImage && (
              <div className="relative h-[290px] overflow-hidden rounded-lg shadow-lg">
                <img
                  src={bottomGridImage.imageUrl}
                  alt={bottomGridImage.label}
                  className="w-full h-full object-cover"
                  onError={handleImageError}
                />
                <div className="absolute bottom-6 left-6 text-white text-2xl font-semibold">
                  {bottomGridImage.label}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Remaining images in a general grid below */}
        {remainingImages.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {remainingImages.map((item, index) => (
              <div key={index} className="relative h-60 overflow-hidden rounded-lg shadow-lg">
                <img
                  src={item.imageUrl}
                  alt={item.label}
                  className="w-full h-full object-cover"
                  onError={handleImageError}
                />
                <div className="absolute bottom-4 left-4 text-white text-xl font-semibold">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ExperienceSolayaSection;