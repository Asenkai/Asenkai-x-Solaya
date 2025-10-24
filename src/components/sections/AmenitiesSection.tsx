"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import * as LucideIcons from "lucide-react"; // Import all Lucide icons

// Define the AmenityItem type to match the CMS data structure
interface AmenityItem {
  icon_name: string; // Storing icon name as string
  title: string;
  description: string;
}

interface AmenitiesSectionProps {
  amenitiesTitle: string;
  amenitiesParagraph: string;
  amenityList: AmenityItem[]; // Use AmenityItem type
}

// Helper to get Lucide icon component by name
const getLucideIcon = (iconName: string): LucideIcons.LucideIcon | null => {
  const IconComponent = (LucideIcons as any)[iconName];
  return IconComponent || null;
};

const AmenitiesSection: React.FC<AmenitiesSectionProps> = ({
  amenitiesTitle,
  amenitiesParagraph,
  amenityList,
}) => {
  return (
    <section id="amenities" className="py-20 px-4 md:px-8 bg-gray-50">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight tracking-tighter text-primary mb-6">
            {amenitiesTitle}
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            {amenitiesParagraph}
          </p>
        </div>

        {amenityList.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {amenityList.map((amenity, index) => {
              const IconComponent = getLucideIcon(amenity.icon_name);
              return (
                <Card key={index} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 text-center p-6">
                  <CardHeader className="flex flex-col items-center pb-4">
                    {IconComponent && <IconComponent className="h-12 w-12 text-primary mb-4" />}
                    <CardTitle className="text-xl font-semibold text-primary">{amenity.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{amenity.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default AmenitiesSection;