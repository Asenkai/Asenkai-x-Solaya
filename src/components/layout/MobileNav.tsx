"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, MessageCircle, Download } from "lucide-react"; // Changed Whatsapp to MessageCircle
import { cn } from "@/lib/utils";

interface NavLink {
  id: string;
  label: string;
}

interface MobileNavProps {
  onNavigate: (id: string) => void;
  isScrolled: boolean;
  navigationLinks: NavLink[];
  whatsappNumber: string | null; // Added
  brochureUrl: string | null; // Added
}

const MobileNav: React.FC<MobileNavProps> = ({ onNavigate, isScrolled, navigationLinks, whatsappNumber, brochureUrl }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setIsOpen(false); // Close the sheet after navigation
  };

  const whatsappLink = whatsappNumber ? `https://wa.me/${whatsappNumber.replace(/\D/g, '')}` : '#';

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "md:hidden",
            isScrolled ? "text-primary" : "text-white hover:text-gray-200",
          )}
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[250px] sm:w-[300px] bg-white p-6">
        <div className="flex flex-col space-y-4 pt-8">
          {navigationLinks.map((link) => (
            <Button
              key={link.id}
              variant="ghost"
              className="text-lg justify-start text-primary"
              onClick={() => handleLinkClick(link.id)}
            >
              {link.label}
            </Button>
          ))}
          {brochureUrl && (
            <a href={brochureUrl} target="_blank" rel="noopener noreferrer" className="w-full">
              <Button
                variant="ghost"
                className="text-lg justify-start text-primary w-full"
                onClick={() => setIsOpen(false)} // Close sheet on click
              >
                <Download className="mr-3 h-5 w-5" /> Download Brochure
              </Button>
            </a>
          )}
          {whatsappNumber && (
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="w-full">
              <Button
                variant="ghost"
                className="text-lg justify-start text-green-600 w-full"
                onClick={() => setIsOpen(false)} // Close sheet on click
              >
                <MessageCircle className="mr-3 h-5 w-5" /> WhatsApp
              </Button>
            </a>
          )}
          <Button className="bg-primary text-white hover:bg-primary/90 text-lg px-8 py-6 rounded-full font-semibold mt-4" onClick={() => handleLinkClick("register")}>
            Register Now
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;