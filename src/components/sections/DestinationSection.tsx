import React from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card"; // Removed CardHeader
import { MapPin, Clock } from "lucide-react"; // Assuming these icons are relevant

interface DestinationPlace {
  name: string;
  logoUrl: string;
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
  return (
    <section id="destination" className="relative py-20 px-4 md:px-8 bg-gray-900 text-white overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      ></div>
      <div className="relative z-10 container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight tracking-tighter text-white mb-6">
            {destinationTitle}
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            {destinationParagraph}
          </p>
        </div>

        {destinationPlaces.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-center mb-8">Nearby Attractions</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
              {destinationPlaces.map((place, index) => (
                <Card key={index} className="bg-white/10 border-none text-center p-4 flex flex-col items-center justify-center">
                  <img src={place.logoUrl} alt={place.name} className="h-12 w-12 mb-3 rounded-full object-cover" />
                  <p className="text-sm font-medium text-white">{place.name}</p>
                </Card>
              ))}
            </div>
          </div>
        )}

        {keyLocations.length > 0 && (
          <div>
            <h3 className="text-2xl font-semibold text-center mb-8">Key Locations & Travel Times</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
              {keyLocations.map((location, index) => (
                <Card key={index} className="bg-white/10 border-none p-6 flex items-center space-x-4">
                  <MapPin className="h-8 w-8 text-primary" />
                  <div>
                    <CardTitle className="text-xl font-semibold text-white">{location.name}</CardTitle>
                    <CardContent className="p-0 mt-2 flex items-center text-gray-300">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>{location.distance} ({location.time})</span>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DestinationSection;