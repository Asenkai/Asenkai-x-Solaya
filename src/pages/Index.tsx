import { MadeWithDyad } from "@/components/made-with-dyad";
import Header from "@/components/layout/Header";
import HeroSection from "@/components/sections/HeroSection";
import IntroductionSection from "@/components/sections/IntroductionSection";
import ResidencesSection from "@/components/sections/ResidencesSection";
import AmenitiesSection from "@/components/sections/AmenitiesSection";
import RegisterSection from "@/components/sections/RegisterSection";
import DestinationSection from "@/components/sections/DestinationSection";
import { smoothScrollTo } from "@/lib/scroll";
import {
  heroData,
  introData,
  residencesData,
  amenitiesData,
  destinationData,
  navigationLinks,
} from "@/data/landingPageData";

const Index = () => {
  const handleNavigate = (id: string) => {
    smoothScrollTo(id);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header onNavigate={handleNavigate} navigationLinks={navigationLinks} />
      <main className="flex-grow">
        <HeroSection
          onRegisterClick={() => handleNavigate("register")}
          heroHeadline={heroData.hero_headline}
          heroSubheadline={heroData.hero_subheadline}
          heroCtaLabel={heroData.hero_cta_label}
          heroMediaUrl={heroData.hero_media_url}
        />
        <IntroductionSection
          onDiscoverClick={() => handleNavigate("residences")}
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
        <RegisterSection />
      </main>
      <MadeWithDyad />
    </div>
  );
};

export default Index;