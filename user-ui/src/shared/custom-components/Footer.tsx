import { Instagram, Linkedin, Twitter, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="pt-8 md:pt-10 lg:pt-12 pb-6 md:pb-8 w-full bg-[#00151e]">
      <div className="w-11/12 mx-auto">
        {/* Main footer content */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8 md:gap-0 mb-8 md:mb-12">
          {/* Left section */}
          <div className="flex flex-col gap-4 md:gap-5 lg:gap-6">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg md:text-xl font-medium text-white no-underline"
            >
              <Image
                src="/images/webVirtusLogo.svg"
                alt="logo"
                width={120}
                height={16}
                className="md:w-[140px] lg:w-[150px] h-auto"
              />
            </Link>
            <p
              style={{ color: "#8b949e" }}
              className="text-xs md:text-sm leading-5 md:leading-6 w-full md:w-80 lg:w-xs"
            >
              Building websites that place you in the top 1% of the digital
              world.
            </p>
            <div className="flex gap-2 md:gap-3">
              <a
                href="https://www.linkedin.com/in/mohdshahalam855"
                className="w-7 h-7 md:w-8 md:h-8 rounded-md flex items-center justify-center no-underline text-sm transition-all duration-200 hover:border-blue-500 hover:text-blue-500"
                style={{
                  border: "1px solid #30363d",
                  color: "#8b949e",
                }}
                aria-label="LinkedIn"
                target="_blank"
              >
                <Linkedin size={12} className="md:w-[14px] md:h-[14px]" />
              </a>
              <a
                href="https://x.com/Aalam855"
                className="w-7 h-7 md:w-8 md:h-8 rounded-md flex items-center justify-center no-underline text-sm transition-all duration-200 hover:border-blue-500 hover:text-blue-500"
                style={{
                  border: "1px solid #30363d",
                  color: "#8b949e",
                }}
                aria-label="Twitter"
                target="_blank"
              >
                <Twitter size={12} className="md:w-[14px] md:h-[14px]" />
              </a>
              <a
                href="https://www.instagram.com/iam_shahalam855"
                className="w-7 h-7 md:w-8 md:h-8 rounded-md flex items-center justify-center no-underline text-sm transition-all duration-200 hover:border-blue-500 hover:text-blue-500"
                style={{
                  border: "1px solid #30363d",
                  color: "#8b949e",
                }}
                aria-label="Instagram"
                target="_blank"
              >
                <Instagram size={12} className="md:w-[14px] md:h-[14px]" />
              </a>
            </div>
          </div>

          {/* Right section */}
          <div className="text-left lg:text-right">
            <div className="text-white text-sm md:text-base font-medium mb-3 md:mb-4">
              Policies & Legal
            </div>
            <div className="flex flex-col gap-2 md:gap-3">
              <a
                href="#"
                className="no-underline text-xs md:text-sm transition-colors duration-200 hover:text-white"
                style={{ color: "#8b949e" }}
              >
                Terms & Conditions
              </a>
              <a
                href="#"
                className="no-underline text-xs md:text-sm transition-colors duration-200 hover:text-white"
                style={{ color: "#8b949e" }}
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div
          className="pt-6 md:pt-8 flex flex-col md:flex-row md:justify-between md:items-center gap-4 md:gap-0"
          style={{ borderTop: "1px solid #21262d" }}
        >
          <div style={{ color: "#8b949e" }} className="text-xs md:text-sm order-2 md:order-1">
            © 2025 All Rights Reserved
          </div>
          <div
            className="flex items-center gap-1 md:gap-2 text-xs md:text-sm order-1 md:order-2"
            style={{ color: "#8b949e" }}
          >
            <Zap size={14} className="md:w-4 md:h-4" style={{ color: "#8b949e" }} />
            <span>Powered by</span>
            <a
              href="#"
              className="no-underline hover:underline"
              style={{ color: "#58a6ff" }}
            >
              Directus
            </a>
            <span>.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;