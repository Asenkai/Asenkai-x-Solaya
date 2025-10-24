"use client";

import React from "react";
import { MadeWithDyad } from "@/components/made-with-dyad"; // Corrected import syntax
import Header from "@/components/layout/Header";
import HeroSection from "@/components/sections/HeroSection";
import IntroductionSection from "@/components/sections/IntroductionSection";
import DestinationSection from "@/components/sections/DestinationSection";
import { smoothScrollTo } from "@/lib/scroll";

const Index = () => {
  // Placeholder data - these will eventually come from CMS
  const heroData = {
    hero_headline: "Experience Unrivalled Luxury Living",
    hero_subheadline: "Discover Solaya, an exclusive collection of residences designed for the discerning few.",
    hero_cta_label: "Register Your Interest",
    hero_media_url: "https://videos.meraas.com/solaya/solaya-hero-video.mp4", // Example video URL
  };

  const introData = {
    intro_title: "A New Dawn of Sophistication",
    intro_rich_text: `
      <p>Nestled in the heart of a vibrant community, Solaya offers a lifestyle of unparalleled elegance and comfort. Every detail has been meticulously crafted to provide residents with an extraordinary living experience.</p>
      <p class="mt-4">From breathtaking views to world-class amenities, Solaya is more than just a home; it's a sanctuary where luxury meets tranquility.</p>
    `,
    intro_button_label: "Discover More",
    intro_images: [
      "https://www.meraas.com/-/media/project/meraassite/solaya/solaya-intro-1.jpg", // Placeholder image
      "https://www.meraas.com/-/media/project/meraassite/solaya/solaya-intro-2.jpg", // Placeholder image
    ],
  };

  const destinationData = {
    destination_title: "Your Gateway to Dubai's Finest",
    destination_paragraph: "Solaya is perfectly positioned to offer easy access to the city's most iconic landmarks, entertainment hubs, and business districts.",
    destination_places: [
      { name: "Burj Khalifa", logoUrl: "https://via.placeholder.com/64/0000FF/FFFFFF?text=BK" },
      { name: "Dubai Mall", logoUrl: "https://via.placeholder.com/64/FF0000/FFFFFF?text=DM" },
      { name: "Jumeirah Beach", logoUrl: "https://via.placeholder.com/64/00FF00/FFFFFF?text=JB" },
      { name: "Dubai Opera", logoUrl: "https://via.placeholder.com/64/FFFF00/000000?text=DO" },
      { name: "City Walk", logoUrl: "https://via.placeholder.com/64/FF00FF/FFFFFF?text=CW" },
      { name: "La Mer", logoUrl: "https://via.placeholder.com/64/00FFFF/000000?text=LM" },
    ],
    key_locations: [
      { name: "Downtown Dubai", distance: "5 km", time: "10 min drive" },
      { name: "Dubai International Airport", distance: "15 km", time: "20 min drive" },
      { name: "Business Bay", distance: "7 km", time: "12 min drive" },
      { name: "DIFC", distance: "8 km", time: "15 min drive" },
    ],
    background_image_url: "https://www.meraas.com/-/media/project/meraassite/solaya/solaya-destination-bg.jpg", // Placeholder background image
  };

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
      {/* Placeholder for other sections */}
      <section id="residences" className="min-h-screen bg-white flex items-center justify-center">
        <h2 className="text-4xl font-bold text-primary">Residences Section (Coming Soon)</h2>
      </section>
      <section id="amenities" className="min-h-screen bg-gray-50 flex items-center justify-center">
        <h2 className="text-4xl font-bold text-primary">Amenities Section (Coming Soon)</h2>
      </section>
      <section id="register" className="min-h-screen bg-white flex items-center justify-center">
        <h2 className="text-4xl font-bold text-primary">Register Your Interest Form (Coming Soon)</h2>
      </section>
      <MadeWithDyad />
    </div>
  );
};

export default Index;