"use client";

import React from "react";
import { MadeWithDyad } from "@/components/made-with-dyad";
import Header from "@/components/layout/Header";
import HeroSection from "@/components/sections/HeroSection";
import IntroductionSection from "@/components/sections/IntroductionSection";
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
      {/* Placeholder for other sections */}
      <section id="destination" className="min-h-screen bg-gray-50 flex items-center justify-center">
        <h2 className="text-4xl font-bold text-primary">Destination Section (Coming Soon)</h2>
      </section>
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