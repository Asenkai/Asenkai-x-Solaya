"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';

// Define types for nested objects
interface DestinationPlace {
  name: string;
  logoUrl: string;
}

interface KeyLocation {
  name: string;
  distance: string;
  time: string;
}

interface Residence {
  imageUrl: string;
  type: string;
  size: string;
  description: string;
}

interface AmenityItem {
  icon_name: string; // Storing icon name as string
  title: string;
  description: string;
}

interface GlobalCopy {
  hero_headline: string;
  hero_subheadline: string;
  hero_cta_label: string;
  hero_media_url: string;
  intro_title: string;
  intro_rich_text: string;
  intro_button_label: string;
  intro_images: string[]; // Added
  destination_title: string;
  destination_paragraph: string;
  destination_places: DestinationPlace[];
  key_locations: KeyLocation[]; // Added
  destination_background_image_url: string; // Added
  residences_title: string;
  residences_paragraph: string;
  residence_list: Residence[]; // Added
  experience_title: string;
  experience_paragraph: string;
  amenity_list: AmenityItem[]; // Added
  privacy_url: string;
  terms_url: string;
  cookies_url: string;
  gtm_container_id: string;
  whatsapp_number: string | null; // Added WhatsApp number
  brochure_url: string | null; // Added Brochure URL
}

interface ToolkitImage {
  id: string;
  label: string;
  image_url: string;
  group: string;
  order: number;
}

interface CMSContextType {
  globalCopy: GlobalCopy | null;
  toolkitImages: ToolkitImage[];
  loading: boolean;
  error: string | null;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export const CMSProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [globalCopy, setGlobalCopy] = useState<GlobalCopy | null>(null);
  const [toolkitImages, setToolkitImages] = useState<ToolkitImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCMSData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch global_copy by its known ID
        const { data: globalCopyData, error: globalCopyError } = await supabase
          .from('global_copy')
          .select('*')
          .eq('id', '00000000-0000-0000-0000-000000000001') // Explicitly query by the ID we inserted
          .single();

        if (globalCopyError) {
          console.error("Supabase global_copy fetch error:", globalCopyError); // Added log
          throw new Error(globalCopyError.message);
        }
        setGlobalCopy(globalCopyData);

        // Fetch toolkit_images
        const { data: toolkitImagesData, error: toolkitImagesError } = await supabase
          .from('toolkit_images')
          .select('*')
          .order('order', { ascending: true });

        if (toolkitImagesError) {
          console.error("Supabase toolkit_images fetch error:", toolkitImagesError); // Added log
          throw new Error(toolkitImagesError.message);
        }
        setToolkitImages(toolkitImagesData || []);

      } catch (err: any) {
        console.error("Error fetching CMS data in CMSContext:", err.message); // Updated log
        setError("Failed to load content. Please try again later. Details: " + err.message); // Added details to error message
      } finally {
        setLoading(false);
      }
    };

    fetchCMSData();
  }, []);

  return (
    <CMSContext.Provider value={{ globalCopy, toolkitImages, loading, error }}>
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (context === undefined) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};