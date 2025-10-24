"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import MobileNav from "./MobileNav"; // Import the new MobileNav component

interface HeaderProps {
  onNavigate: (id: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
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
        <div className="text-2xl font-bold">Solaya</div>
        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-6">
          <li>
            <Button variant="link" className={cn("text-lg", isScrolled ? "text-primary" : "text-white")} onClick={() => onNavigate("hero")}>
              Home
            </Button>
          </li>
          <li>
            <Button variant="link" className={cn("text-lg", isScrolled ? "text-primary" : "text-white")} onClick={() => onNavigate("introduction")}>
              Introduction
            </Button>
          </li>
          <li>
            <Button variant="link" className={cn("text-lg", isScrolled ? "text-primary" : "text-white")} onClick={() => onNavigate("destination")}>
              Destination
            </Button>
          </li>
          <li>
            <Button variant="link" className={cn("text-lg", isScrolled ? "text-primary" : "text-white")} onClick={() => onNavigate("residences")}>
              Residences
            </Button>
          </li>
          <li>
            <Button variant="link" className={cn("text-lg", isScrolled ? "text-primary" : "text-white")} onClick={() => onNavigate("amenities")}>
              Amenities
            </Button>
          </li>
          <li>
            <Button variant="link" className={cn("text-lg", isScrolled ? "text-primary" : "text-white")} onClick={() => onNavigate("register")}>
              Register
            </Button>
          </li>
        </ul>
        <Button className={cn("hidden md:block", isScrolled ? "bg-primary text-white hover:bg-primary/90" : "bg-white text-primary hover:bg-gray-100")} onClick={() => onNavigate("register")}>
          Register Now
        </Button>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <MobileNav onNavigate={onNavigate} isScrolled={isScrolled} />
        </div>
      </nav>
    </header>
  );
};

export default Header;