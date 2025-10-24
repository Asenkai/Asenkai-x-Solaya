"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface BrochureCalloutSectionProps {
  headline: string | null;
  description: string | null;
  ctaLabel: string | null;
  brochureUrl: string | null;
}

const BrochureCalloutSection: React.FC<BrochureCalloutSectionProps> = ({
  headline,
  description,
  ctaLabel,
  brochureUrl,
}) => {
  if (!headline && !description && !ctaLabel && !brochureUrl) {
    return null; // Don't render if no content is provided
  }

  return (
    <section id="brochure-callout" className="py-20 px-4 md:px-8 bg-gradient-to-r from-blue-600 to-purple-700 text-white text-center">
      <div className="container mx-auto max-w-3xl">
        {headline && (
          <h2 className="text-4xl md:text-5xl font-bold leading-tight tracking-tighter mb-6">
            {headline}
          </h2>
        )}
        {description && (
          <p className="text-lg md:text-xl mb-8 opacity-90">
            {description}
          </p>
        )}
        {brochureUrl && ctaLabel && (
          <a href={brochureUrl} target="_blank" rel="noopener noreferrer">
            <Button
              className="bg-white text-blue-700 hover:bg-gray-100 text-lg px-8 py-6 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Download className="mr-3 h-5 w-5" /> {ctaLabel}
            </Button>
          </a>
        )}
      </div>
    </section>
  );
};

export default BrochureCalloutSection;