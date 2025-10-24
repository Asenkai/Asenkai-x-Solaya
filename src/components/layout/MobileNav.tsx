"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  onNavigate: (id: string) => void;
  isScrolled: boolean;
}

const MobileNav: React.FC<MobileNavProps> = ({ onNavigate, isScrolled }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setIsOpen(false); // Close the sheet after navigation
  };

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
          <Button variant="ghost" className="text-lg justify-start text-primary" onClick={() => handleLinkClick("hero")}>
            Home
          </Button>
          <Button variant="ghost" className="text-lg justify-start text-primary" onClick={() => handleLinkClick("introduction")}>
            Introduction
          </Button>
          <Button variant="ghost" className="text-lg justify-start text-primary" onClick={() => handleLinkClick("destination")}>
            Destination
          </Button>
          <Button variant="ghost" className="text-lg justify-start text-primary" onClick={() => handleLinkClick("residences")}>
            Residences
          </Button>
          <Button variant="ghost" className="text-lg justify-start text-primary" onClick={() => handleLinkClick("amenities")}>
            Amenities
          </Button>
          <Button variant="ghost" className="text-lg justify-start text-primary" onClick={() => handleLinkClick("register")}>
            Register
          </Button>
          <Button className="bg-primary text-white hover:bg-primary/90 text-lg px-8 py-6 rounded-full font-semibold mt-4" onClick={() => handleLinkClick("register")}>
            Register Now
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;