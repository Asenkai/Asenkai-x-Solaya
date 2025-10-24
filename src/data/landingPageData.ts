// src/data/landingPageData.ts

import { Dumbbell, Droplet, Coffee, Leaf, Car, ShieldCheck } from "lucide-react";

export const heroData = {
  hero_headline: "Experience Unrivalled Luxury Living",
  hero_subheadline: "Discover Solaya, an exclusive collection of residences designed for the discerning few.",
  hero_cta_label: "Register Your Interest",
  hero_media_url: "https://videos.meraas.com/solaya/solaya-hero-video.mp4",
};

export const introData = {
  intro_title: "A New Dawn of Sophistication",
  intro_rich_text: `
    <p>Nestled in the heart of a vibrant community, Solaya offers a lifestyle of unparalleled elegance and comfort. Every detail has been meticulously crafted to provide residents with an extraordinary living experience.</p>
    <p class="mt-4">From breathtaking views to world-class amenities, Solaya is more than just a home; it's a sanctuary where luxury meets tranquility.</p>
  `,
  intro_button_label: "Discover More",
  intro_images: [
    "https://www.meraas.com/-/media/project/meraassite/solaya/solaya-intro-1.jpg",
    "https://www.meraas.com/-/media/project/meraassite/solaya/solaya-intro-2.jpg",
  ],
};

export const destinationData = {
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
  background_image_url: "https://www.meraas.com/-/media/project/meraassite/solaya/solaya-destination-bg.jpg",
};

export const residencesData = {
  residences_title: "Exquisite Residences Tailored to Your Lifestyle",
  residences_paragraph: "Choose from a selection of meticulously designed apartments and penthouses, each offering unparalleled comfort and breathtaking views.",
  residence_list: [
    {
      imageUrl: "https://www.meraas.com/-/media/project/meraassite/solaya/solaya-residence-1.jpg",
      type: "1 Bedroom Apartment",
      size: "850 sqft",
      description: "Spacious and elegantly designed, perfect for urban living.",
    },
    {
      imageUrl: "https://www.meraas.com/-/media/project/meraassite/solaya/solaya-residence-2.jpg",
      type: "2 Bedroom Apartment",
      size: "1,300 sqft",
      description: "Ideal for families, offering ample space and modern finishes.",
    },
    {
      imageUrl: "https://www.meraas.com/-/media/project/meraassite/solaya/solaya-residence-3.jpg",
      type: "3 Bedroom Apartment",
      size: "1,800 sqft",
      description: "Luxurious living with panoramic city views and premium amenities.",
    },
    {
      imageUrl: "https://www.meraas.com/-/media/project/meraassite/solaya/solaya-residence-4.jpg",
      type: "4 Bedroom Penthouse",
      size: "3,500 sqft",
      description: "The pinnacle of luxury, featuring expansive layouts and private terraces.",
    },
  ],
};

export const amenitiesData = {
  amenities_title: "World-Class Amenities at Your Doorstep",
  amenities_paragraph: "Solaya offers an array of exclusive amenities designed to enhance your lifestyle and provide ultimate convenience and relaxation.",
  amenity_list: [
    {
      icon: Dumbbell,
      title: "State-of-the-Art Gym",
      description: "Fully equipped fitness center with personal trainers available.",
    },
    {
      icon: Droplet,
      title: "Infinity Pool",
      description: "Relax by the stunning infinity pool with breathtaking city views.",
    },
    {
      icon: Coffee,
      title: "Gourmet Cafe",
      description: "Enjoy artisanal coffee and light bites in a sophisticated setting.",
    },
    {
      icon: Leaf,
      title: "Lush Green Parks",
      description: "Beautifully landscaped gardens and serene green spaces for relaxation.",
    },
    {
      icon: Car,
      title: "Valet Parking",
      description: "Convenient and secure valet parking services for residents and guests.",
    },
    {
      icon: ShieldCheck,
      title: "24/7 Security",
      description: "Round-the-clock security and concierge services for peace of mind.",
    },
  ],
};