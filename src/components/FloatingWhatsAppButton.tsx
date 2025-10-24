"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react"; // Changed Whatsapp to MessageCircle

interface FloatingWhatsAppButtonProps {
  whatsappNumber: string;
}

const FloatingWhatsAppButton: React.FC<FloatingWhatsAppButtonProps> = ({ whatsappNumber }) => {
  const whatsappLink = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}`; // Remove non-digits for the link

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50"
      aria-label="Chat on WhatsApp"
    >
      <Button
        className="rounded-full w-16 h-16 flex items-center justify-center shadow-lg bg-green-500 hover:bg-green-600 text-white"
        size="icon"
      >
        <MessageCircle className="h-8 w-8" />
      </Button>
    </a>
  );
};

export default FloatingWhatsAppButton;