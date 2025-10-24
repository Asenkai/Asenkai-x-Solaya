"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface DestinationPlace {
  name: string;
  logoUrl: string; // Placeholder for logo image URL
}

interface KeyLocation {
  name: string;
  distance: string;
  time: string;
}

interface DestinationSectionProps {
  destinationTitle: string;
  destinationParagraph: string;
  destinationPlaces: DestinationPlace[];
  keyLocations: KeyLocation[];
  backgroundImageUrl: string;
}

const DestinationSection: React.FC<DestinationSectionProps> = ({
  destinationTitle,
  destinationParagraph,
  destinationPlaces,
  keyLocations,
  backgroundImageUrl,
}) => {
  const [scrollPosition, setScrollPosition] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const parallaxOffset = scrollPosition * 0.1; // Adjust parallax intensity

  return (
    <section id="destination" className="relative py-20 overflow-hidden bg-gray-50">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
          transform: `translateY(${parallaxOffset}px)`,
          backgroundAttachment: "fixed", // This helps with the parallax feel
        }}
      />
      <div className="relative z-10 container mx-auto px-4 md:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight tracking-tighter text-primary mb-6">
            {destinationTitle}
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            {destinationParagraph}
          </p>
        </div>

        {/* Nearby Hotspots Grid */}
        {destinationPlaces.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-center text-primary mb-8">Nearby Hotspots</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
              {destinationPlaces.map((place, index) => (
                <div key={index} className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-sm">
                  {place.logoUrl && (
                    <img src={place.logoUrl} alt={place.name} className="h-16 w-16 object-contain mb-4" />
                  )}
                  <p className="text-lg font-medium text-gray-800">{place.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Key Locations List */}
        {keyLocations.length > 0 && (
          <div>
            <h3 className="text-2xl font-semibold text-center text-primary mb-8">Key Locations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {keyLocations.map((location, index) => (
                <div key={index} className="flex items-center p-6 bg-white rounded-lg shadow-sm">
                  <div className="flex-grow">
                    <p className="text-xl font-semibold text-gray-800 mb-2">{location.name}</p>
                    <div className="flex space-x-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        {location.distance}
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        {location.time}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DestinationSection;