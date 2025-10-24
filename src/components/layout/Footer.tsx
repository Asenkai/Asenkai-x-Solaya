"use client";

import React from "react";


interface FooterProps {
  privacyUrl: string | null;
  termsUrl: string | null;
  cookiesUrl: string | null;
}

const Footer: React.FC<FooterProps> = ({ privacyUrl, termsUrl, cookiesUrl }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white py-8 px-4 md:px-8">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <p className="text-sm text-gray-300">
          &copy; {currentYear} Solaya. All rights reserved.
        </p>
        <div className="flex space-x-6">
          {privacyUrl && (
            <a
              href={privacyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-300 hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
          )}
          {termsUrl && (
            <a
              href={termsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-300 hover:text-white transition-colors"
            >
              Terms of Service
            </a>
          )}
          {cookiesUrl && (
            <a
              href={cookiesUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-300 hover:text-white transition-colors"
            >
              Cookie Policy
            </a>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;