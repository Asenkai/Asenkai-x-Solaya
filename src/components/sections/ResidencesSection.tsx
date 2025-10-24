"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Residence {
  imageUrl: string;
  type: string;
  size: string;
  description: string;
}

interface ResidencesSectionProps {
  residencesTitle: string;
  residencesParagraph: string;
  residenceList: Residence[];
}

const ResidencesSection: React.FC<ResidencesSectionProps> = ({
  residencesTitle,
  residencesParagraph,
  residenceList,
}) => {
  return (
    <section id="residences" className="py-20 px-4 md:px-8 bg-white">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight tracking-tighter text-primary mb-6">
            {residencesTitle}
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            {residencesParagraph}
          </p>
        </div>

        {residenceList.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {residenceList.map((residence, index) => (
              <Card key={index} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <img
                  src={residence.imageUrl}
                  alt={residence.type}
                  className="w-full h-60 object-cover"
                />
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold text-primary">{residence.type}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-lg text-gray-800">{residence.size}</p>
                  <p className="text-gray-600">{residence.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ResidencesSection;