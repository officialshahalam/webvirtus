import Footer from "@/shared/custom-components/Footer";
import Navbar from "@/shared/custom-components/Navbar";
import React from "react";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default PublicLayout;
