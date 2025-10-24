"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavLink {
  id: string;
  label: string;
}

interface MobileNavProps {
  onNavigate: (id: string) => void;
  isScrolled: boolean;
  navigationLinks: NavLink[];
}

const MobileNav: React.FC<MobileNavProps> = ({ onNavigate, isScrolled, navigationLinks }) => {
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
          <Button className="bg-primary text-white hover:bg-primary/90 text-lg px-8 py-6 rounded-full font-semibold mt-4" onClick={() => handleLinkClick("register")}>
            Register Now
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;