"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
  brochureUrl: string | null;
  onBookVisitClick: () => void;
}

const ResidencesSection: React.FC<ResidencesSectionProps> = ({
  residencesTitle,
  residencesParagraph,
  residenceList,
  brochureUrl,
  onBookVisitClick,
}) => {
  return (
    <section id="residences" className="py-20 px-4 md:px-8 bg-white">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight tracking-tighter text-primary mb-6">
            {residencesTitle}
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            {residencesParagraph}
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            {brochureUrl && (
              <a href={brochureUrl} target="_blank" rel="noopener noreferrer">
                <Button
                  className="bg-primary text-white hover:bg-primary/90 text-lg px-8 py-6 rounded-full font-semibold w-full sm:w-auto"
                >
                  <Download className="mr-3 h-5 w-5" /> Download Brochure
                </Button>
              </a>
            )}
            <Button
              className="bg-secondary text-secondary-foreground hover:bg-secondary/80 text-lg px-8 py-6 rounded-full font-semibold w-full sm:w-auto"
              onClick={onBookVisitClick}
            >
              Book Your Private Visit
            </Button>
          </div>
        </div>

        {residenceList.length > 0 && (
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full max-w-full"
          >
            <CarouselContent className="-ml-4">
              {residenceList.map((residence, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                    <img
                      src={residence.imageUrl}
                      alt={residence.type}
                      className="w-full h-60 object-cover"
                    />
                    <CardHeader>
                      <CardTitle className="text-2xl font-semibold text-primary">{residence.type}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 flex-grow">
                      <p className="text-lg text-gray-800">{residence.size}</p>
                      <p className="text-gray-600">{residence.description}</p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        )}
      </div>
    </section>
  );
};

export default ResidencesSection;