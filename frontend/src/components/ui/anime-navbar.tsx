"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LucideIcon, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useUserStore } from "@/stores/userStore";

interface NavItem {
  name: string;
  url: string;
  href: string;
  icon: LucideIcon;
}

interface NavBarProps {
  items: NavItem[];
  className?: string;
  defaultActive?: string;
}

export function AnimeNavBar({ items, defaultActive }: NavBarProps) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>(defaultActive!);
  const [_isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useUserStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      // Close mobile menu when screen becomes desktop size
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close mobile menu when clicking outside or on a link
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isMobileMenuOpen && !target.closest(".mobile-menu-container")) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMobileMenuOpen]);

  if (!mounted) return null;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileNavClick = (item: NavItem) => {
    setActiveTab(item.href);
    router.push(item.url);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <div className="fixed top-2 left-0 right-0 z-[9999]">
        <div className="flex justify-center pt-6">
          <motion.div
            className="w-11/12 flex items-center justify-between gap-3 bg-blue/30 border border-white/10 backdrop-blur-lg py-4 px-6 md:px-10 rounded-full shadow-lg relative"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
          >
            <Link
              href={"/"}
              onClick={() => {
                setActiveTab("");
              }}
            >
              <Image
                src="/images/webVirtusLogo.svg"
                alt="logo"
                width={120}
                height={30}
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-3 px-2">
              {items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.href;
                const isHovered = hoveredTab === item.href;

                return (
                  <Link
                    key={item.name}
                    href={item.url}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab(item.href);
                      router.push(item.url);
                    }}
                    onMouseEnter={() => setHoveredTab(item.href)}
                    onMouseLeave={() => setHoveredTab(null)}
                    className={cn(
                      "relative cursor-pointer text-sm font-semibold px-6 py-3 rounded-full transition-all duration-300",
                      "text-white/70 hover:text-white",
                      isActive && "text-white"
                    )}
                  >
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 rounded-full -z-10 overflow-hidden"
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: [0.3, 0.5, 0.3],
                          scale: [1, 1.03, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <div className="absolute inset-0 bg-primary/25 rounded-full blur-md" />
                        <div className="absolute inset-[-4px] bg-primary/20 rounded-full blur-xl" />
                        <div className="absolute inset-[-8px] bg-primary/15 rounded-full blur-2xl" />
                        <div className="absolute inset-[-12px] bg-primary/5 rounded-full blur-3xl" />

                        <div
                          className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0"
                          style={{
                            animation: "shine 3s ease-in-out infinite",
                          }}
                        />
                      </motion.div>
                    )}

                    <motion.span
                      className="hidden lg:inline relative z-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.name}
                    </motion.span>
                    <motion.span
                      className="lg:hidden relative z-10"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Icon size={18} strokeWidth={2.5} />
                    </motion.span>

                    <AnimatePresence>
                      {isHovered && !isActive && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="absolute inset-0 bg-white/10 rounded-full -z-10"
                        />
                      )}
                    </AnimatePresence>

                    {isActive && (
                      <motion.div
                        layoutId="anime-mascot"
                        className="absolute -top-12 left-1/2 -translate-x-1/2 pointer-events-none"
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      >
                        <div className="relative w-12 h-12">
                          <motion.div
                            className="absolute w-10 h-10 bg-white rounded-full left-1/2 -translate-x-1/2"
                            animate={
                              hoveredTab
                                ? {
                                    scale: [1, 1.1, 1],
                                    rotate: [0, -5, 5, 0],
                                    transition: {
                                      duration: 0.5,
                                      ease: "easeInOut",
                                    },
                                  }
                                : {
                                    y: [0, -3, 0],
                                    transition: {
                                      duration: 2,
                                      repeat: Infinity,
                                      ease: "easeInOut",
                                    },
                                  }
                            }
                          >
                            <motion.div
                              className="absolute w-2 h-2 bg-black rounded-full"
                              animate={
                                hoveredTab
                                  ? {
                                      scaleY: [1, 0.2, 1],
                                      transition: {
                                        duration: 0.2,
                                        times: [0, 0.5, 1],
                                      },
                                    }
                                  : {}
                              }
                              style={{ left: "25%", top: "40%" }}
                            />
                            <motion.div
                              className="absolute w-2 h-2 bg-black rounded-full"
                              animate={
                                hoveredTab
                                  ? {
                                      scaleY: [1, 0.2, 1],
                                      transition: {
                                        duration: 0.2,
                                        times: [0, 0.5, 1],
                                      },
                                    }
                                  : {}
                              }
                              style={{ right: "25%", top: "40%" }}
                            />
                            <motion.div
                              className="absolute w-2 h-1.5 bg-pink-300 rounded-full"
                              animate={{
                                opacity: hoveredTab ? 0.8 : 0.6,
                              }}
                              style={{ left: "15%", top: "55%" }}
                            />
                            <motion.div
                              className="absolute w-2 h-1.5 bg-pink-300 rounded-full"
                              animate={{
                                opacity: hoveredTab ? 0.8 : 0.6,
                              }}
                              style={{ right: "15%", top: "55%" }}
                            />

                            <motion.div
                              className="absolute w-4 h-2 border-b-2 border-black rounded-full"
                              animate={
                                hoveredTab
                                  ? {
                                      scaleY: 1.5,
                                      y: -1,
                                    }
                                  : {
                                      scaleY: 1,
                                      y: 0,
                                    }
                              }
                              style={{ left: "30%", top: "60%" }}
                            />
                            <AnimatePresence>
                              {hoveredTab && (
                                <>
                                  <motion.div
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0 }}
                                    className="absolute -top-1 -right-1 w-2 h-2 text-yellow-300"
                                  >
                                    ✨
                                  </motion.div>
                                  <motion.div
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="absolute -top-2 left-0 w-2 h-2 text-yellow-300"
                                  >
                                    ✨
                                  </motion.div>
                                </>
                              )}
                            </AnimatePresence>
                          </motion.div>
                          <motion.div
                            className="absolute -bottom-1 left-1/2 w-4 h-4 -translate-x-1/2"
                            animate={
                              hoveredTab
                                ? {
                                    y: [0, -4, 0],
                                    transition: {
                                      duration: 0.3,
                                      repeat: Infinity,
                                      repeatType: "reverse",
                                    },
                                  }
                                : {
                                    y: [0, 2, 0],
                                    transition: {
                                      duration: 1,
                                      repeat: Infinity,
                                      ease: "easeInOut",
                                      delay: 0.5,
                                    },
                                  }
                            }
                          >
                            <div className="w-full h-full bg-white rotate-45 transform origin-center" />
                          </motion.div>
                        </div>
                      </motion.div>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Desktop Auth Buttons */}
            {!user ? (
              <div className="hidden md:flex gap-2 justify-center items-center">
                <Link
                  href={"/login"}
                  onClick={() => {
                    setActiveTab("");
                  }}
                >
                  <button className="w-[100px] py-2 relative cursor-pointer rounded-md border border-white/10 text-white/70 hover:bg-white/15 hover:text-white transition-all duration-300">
                    Login
                  </button>
                </Link>
                <Link
                  href={"/signup"}
                  onClick={() => {
                    setActiveTab("");
                  }}
                >
                  <button className="w-[100px] py-2 relative cursor-pointer rounded-md border border-white/10 text-white/70 hover:bg-white/15 hover:text-white transition-all duration-300 hidden lg:block">
                    Sign Up
                  </button>
                </Link>
              </div>
            ) : (
              <Link
                href={"/dashboard"}
                className="hidden md:block"
                onClick={() => {
                  setActiveTab("");
                }}
              >
                <div className="w-10 h-10 flex items-center justify-center bg-green-500 rounded-full">
                  <span>SH</span>
                </div>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <motion.button
                onClick={toggleMobileMenu}
                className="p-2 text-white/70 hover:text-white transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X size={24} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu size={24} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mobile Side Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998] md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Side Menu */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              className="mobile-menu-container fixed top-0 right-0 h-full w-80 bg-blue/40 border-l border-white/10 backdrop-blur-xl z-[9999] md:hidden"
            >
              <div className="flex flex-col p-6">
                {/* Navigation Items */}
                <div className="space-y-4 mb-8">
                  {items.map((item, index) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.href;

                    return (
                      <motion.div
                        key={item.name}
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <button
                          onClick={() => handleMobileNavClick(item)}
                          className={cn(
                            "w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-300",
                            "text-white/70 hover:text-white hover:bg-white/10",
                            isActive &&
                              "text-white bg-primary/20 border border-primary/30"
                          )}
                        >
                          <Icon size={20} strokeWidth={2.5} />
                          <span className="font-medium">{item.name}</span>
                          {isActive && (
                            <motion.div
                              className="ml-auto w-2 h-2 bg-primary rounded-full"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 500 }}
                            />
                          )}
                        </button>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Auth Buttons for Mobile/Tablet */}
                {!user ? (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: items.length * 0.1 }}
                    className="space-y-3 flex flex-col"
                  >
                    <Link
                      href={"/login"}
                      onClick={() => {
                        setActiveTab("");
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <button className="w-full py-3 rounded-xl border border-white/10 text-white/70 hover:bg-white/15 hover:text-white transition-all duration-300">
                        Login
                      </button>
                    </Link>
                    <Link
                      href={"/signup"}
                      onClick={() => {
                        setActiveTab("");
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <button className="w-full py-3 rounded-xl border border-white/10 text-white/70 hover:bg-white/15 hover:text-white transition-all duration-300">
                        Sign Up
                      </button>
                    </Link>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: items.length * 0.1 }}
                  >
                    <Link
                      href={"/dashboard"}
                      onClick={() => {
                        setActiveTab("");
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <div className="flex items-center gap-3 p-4 rounded-xl bg-green-500/20 border border-green-500/30">
                        <div className="w-10 h-10 flex items-center justify-center bg-green-500 rounded-full">
                          <span>SH</span>
                        </div>
                        <span className="text-white font-medium">
                          Dashboard
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
