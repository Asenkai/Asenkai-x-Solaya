"use client";

import React from "react";
import { MadeWithDyad } from "@/components/made-with-dyad";
import Header from "@/components/layout/Header";
import HeroSection from "@/components/sections/HeroSection";
import IntroductionSection from "@/components/sections/IntroductionSection";
import DestinationSection from "@/components/sections/DestinationSection";
import ResidencesSection from "@/components/sections/ResidencesSection";
import AmenitiesSection from "@/components/sections/AmenitiesSection";
import RegisterSection from "@/components/sections/RegisterSection"; // Import the new RegisterSection
import { smoothScrollTo } from "@/lib/scroll";
import {
  heroData,
  introData,
  destinationData,
  residencesData,
  amenitiesData,
} from "../data/landingPageData.ts";

const Index = () => {
  const handleNavigate = (id: string) => {
    smoothScrollTo(id);
  };

  return (
    <div className="relative">
      <Header onNavigate={handleNavigate} />
      <HeroSection
        onRegisterClick={() => handleNavigate("register")}
        heroHeadline={heroData.hero_headline}
        heroSubheadline={heroData.hero_subheadline}
        heroCtaLabel={heroData.hero_cta_label}
        heroMediaUrl={heroData.hero_media_url}
      />
      <IntroductionSection
        onDiscoverClick={() => handleNavigate("destination")}
        introTitle={introData.intro_title}
        introRichText={introData.intro_rich_text}
        introButtonLabel={introData.intro_button_label}
        introImages={introData.intro_images}
      />
      <DestinationSection
        destinationTitle={destinationData.destination_title}
        destinationParagraph={destinationData.destination_paragraph}
        destinationPlaces={destinationData.destination_places}
        keyLocations={destinationData.key_locations}
        backgroundImageUrl={destinationData.background_image_url}
      />
      <ResidencesSection
        residencesTitle={residencesData.residences_title}
        residencesParagraph={residencesData.residences_paragraph}
        residenceList={residencesData.residence_list}
      />
      <AmenitiesSection
        amenitiesTitle={amenitiesData.amenities_title}
        amenitiesParagraph={amenitiesData.amenities_paragraph}
        amenityList={amenitiesData.amenity_list}
      />
      <RegisterSection /> {/* Use the new RegisterSection component */}
      <MadeWithDyad />
    </div>
  );
};

export default Index;