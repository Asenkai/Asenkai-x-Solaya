"use client";

import React from "react";
import RegisterInterestForm from "@/components/forms/RegisterInterestForm";

interface RegisterSectionProps {
  // No specific props needed for now, as the form handles its own state.
}

const RegisterSection: React.FC<RegisterSectionProps> = () => {
  return (
    <section id="register" className="min-h-screen bg-gray-100 flex items-center justify-center py-20 px-4">
      <RegisterInterestForm />
    </section>
  );
};

export default RegisterSection;