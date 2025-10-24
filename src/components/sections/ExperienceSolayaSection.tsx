"use client";

import React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

interface ExperienceItem {
  title: string;
  imageUrl: string;
}

interface ExperienceSolayaSectionProps {
  experienceTitle: string;
  experienceParagraph: string;
  experienceGallery: ExperienceItem[];
}

const ExperienceSolayaSection: React.FC<ExperienceSolayaSectionProps> = ({
  experienceTitle,
  experienceParagraph,
  experienceGallery,
}) => {
  return (
    <section id="experience" className="py-20 px-4 md:px-8 bg-gray-50">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight tracking-tighter text-primary mb-6">
            {experienceTitle}
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            {experienceParagraph}
          </p>
        </div>

        {experienceGallery.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {experienceGallery.map((item, index) => (
              <Card key={index} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-60 object-cover"
                />
                <CardHeader className="p-4">
                  <CardTitle className="text-xl font-semibold text-primary">{item.title}</CardTitle>
                </CardHeader>
                {/* CardContent can be added here if there's a description for each item */}
                {/* <CardContent>
                  <p className="text-gray-600">Short description here.</p>
                </CardContent> */}
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ExperienceSolayaSection;