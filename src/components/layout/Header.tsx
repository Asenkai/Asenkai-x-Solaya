"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import MobileNav from "./MobileNav";

interface NavLink {
  id: string;
  label: string;
}

interface HeaderProps {
  onNavigate: (id: string) => void;
  navigationLinks: NavLink[];
}

const Header: React.FC<HeaderProps> = ({ onNavigate, navigationLinks }) => {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        "bg-transparent text-white",
        isScrolled && "bg-white/90 backdrop-blur-sm shadow-md text-primary",
      )}
    >
      <nav className="container mx-auto flex items-center justify-between p-4">
        {/* Replaced text logo with image logo */}
        <div className="h-10"> {/* Container for the logo to maintain height */}
          <img
            src="https://cdn.prod.website-files.com/67da8099f8de202cdff217eb/6895ea9346de207ac1b16a52_Solaya%20Badge%20White%20SVG.svg"
            alt="Solaya Logo"
            className="h-full object-contain"
          />
        </div>
        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-6">
          {navigationLinks.map((link) => (
            <li key={link.id}>
              <Button
                variant="link"
                className={cn("text-lg", isScrolled ? "text-primary" : "text-white")}
                onClick={() => onNavigate(link.id)}
              >
                {link.label}
              </Button>
            </li>
          ))}
        </ul>
        <Button className={cn("hidden md:block", isScrolled ? "bg-primary text-white hover:bg-primary/90" : "bg-white text-primary hover:bg-gray-100")} onClick={() => onNavigate("register")}>
          Register Now
        </Button>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <MobileNav onNavigate={onNavigate} isScrolled={isScrolled} navigationLinks={navigationLinks} />
        </div>
      </nav>
    </header>
  );
};

export default Header;