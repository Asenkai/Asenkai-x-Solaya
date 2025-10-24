import { MadeWithDyad } from "@/components/made-with-dyad";
import Header from "@/components/layout/Header";
import HeroSection from "@/components/sections/HeroSection";
import IntroductionSection from "@/components/sections/IntroductionSection";
import ResidencesSection from "@/components/sections/ResidencesSection";
import AmenitiesSection from "@/components/sections/AmenitiesSection";
import RegisterSection from "@/components/sections/RegisterSection";
import DestinationSection from "@/components/sections/DestinationSection";
import BrochureCalloutSection from "@/components/sections/BrochureCalloutSection"; // Import new component
import FloatingWhatsAppButton from "@/components/FloatingWhatsAppButton";
import { smoothScrollTo } from "@/lib/scroll";
import { navigationLinks } from "@/data/landingPageData";
import { useCMS } from "@/contexts/CMSContext";
import React from "react";

const Index = () => {
  const { globalCopy, loading, error } = useCMS();

  const handleNavigate = (id: string) => {
    smoothScrollTo(id);
  };

  React.useEffect(() => {
    if (globalCopy) {
      console.log("Index.tsx - globalCopy.hero_media_url:", globalCopy.hero_media_url);
      console.log("Index.tsx - globalCopy.intro_images:", globalCopy.intro_images);
      console.log("Index.tsx - globalCopy.destination_background_image_url:", globalCopy.destination_background_image_url);
      console.log("Index.tsx - globalCopy.whatsapp_number:", globalCopy.whatsapp_number);
      console.log("Index.tsx - globalCopy.brochure_url:", globalCopy.brochure_url);
      console.log("Index.tsx - globalCopy.brochure_callout_headline:", globalCopy.brochure_callout_headline); // Debug log
      console.log("Index.tsx - globalCopy.brochure_callout_description:", globalCopy.brochure_callout_description); // Debug log
      console.log("Index.tsx - globalCopy.brochure_callout_cta_label:", globalCopy.brochure_callout_cta_label); // Debug log
    }
  }, [globalCopy]);


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-700">Loading content...</p>
      </div>
    );
  }

  if (error || !globalCopy) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-500">Error: {error || "CMS data not available."}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        onNavigate={handleNavigate}
        navigationLinks={navigationLinks}
        whatsappNumber={globalCopy.whatsapp_number}
        brochureUrl={globalCopy.brochure_url}
      />
      <main className="flex-grow">
        <HeroSection
          onRegisterClick={() => handleNavigate("register")}
          heroHeadline={globalCopy.hero_headline}
          heroSubheadline={globalCopy.hero_subheadline}
          heroCtaLabel={globalCopy.hero_cta_label}
          heroMediaUrl={globalCopy.hero_media_url}
        />
        <IntroductionSection
          onDiscoverClick={() => handleNavigate("residences")}
          introTitle={globalCopy.intro_title}
          introRichText={globalCopy.intro_rich_text}
          introButtonLabel={globalCopy.intro_button_label}
          introImages={globalCopy.intro_images || []}
        />
        <BrochureCalloutSection
          headline={globalCopy.brochure_callout_headline}
          description={globalCopy.brochure_callout_description}
          ctaLabel={globalCopy.brochure_callout_cta_label}
          brochureUrl={globalCopy.brochure_url}
        />
        <DestinationSection
          destinationTitle={globalCopy.destination_title}
          destinationParagraph={globalCopy.destination_paragraph}
          destinationPlaces={globalCopy.destination_places || []}
          keyLocations={globalCopy.key_locations || []}
          backgroundImageUrl={globalCopy.destination_background_image_url || ""}
        />
        <ResidencesSection
          residencesTitle={globalCopy.residences_title}
          residencesParagraph={globalCopy.residences_paragraph}
          residenceList={globalCopy.residence_list || []}
          brochureUrl={globalCopy.brochure_url} // Pass brochureUrl
          onBookVisitClick={() => handleNavigate("register")} // Pass handler for booking visit
        />
        <AmenitiesSection
          amenitiesTitle={globalCopy.experience_title}
          amenitiesParagraph={globalCopy.experience_paragraph}
          amenityList={globalCopy.amenity_list || []}
        />
        <RegisterSection />
      </main>
      {globalCopy.whatsapp_number && (
        <FloatingWhatsAppButton whatsappNumber={globalCopy.whatsapp_number} />
      )}
      <MadeWithDyad />
    </div>
  );
};

export default Index;