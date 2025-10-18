"use client";

import { sidebarItems } from "@/constants";
import {
  ChevronDown,
  ChevronsRight,
  HelpCircle,
  LucideIcon,
  Menu,
  User,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const [open, setOpen] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selected, setSelected] = useState<string>("Dashboard");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 639px)");

    setIsMobile(mediaQuery.matches);
    setOpen(!mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
      setOpen(!e.matches);
      if (!e.matches) {
        setMobileMenuOpen(false); // Close mobile menu when switching to desktop
      }
    };

    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  // Mobile Menu Toggle Button
  if (isMobile) {
    return (
      <>
        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="fixed top-2 left-2 z-50 p-2 rounded-lg bg-blue-300 text-blue-50 shadow-lg sm:hidden"
        >
          <Menu className="h-6 w-6" />
        </button>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-40 sm:hidden">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/50 transition-opacity"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Mobile Menu */}
            <div className="fixed left-0 top-0 h-full w-80 max-w-[85vw] bg-blue-300 shadow-xl transform transition-transform">
              {/* Close Button */}
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-lg text-blue-50 hover:bg-blue-100/20"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Mobile Menu Content */}
              <div className="p-4 pt-16">
                <MobileTitleSection />

                <div className="space-y-1 mb-8">
                  <div className="px-3 py-2 text-xs font-medium text-blue-50 uppercase tracking-wide">
                    Menu
                  </div>
                  {sidebarItems.map(({ Icon, title, href }, index) => {
                    return (
                      <MobileOption
                        key={index}
                        Icon={Icon}
                        title={title}
                        href={href}
                        selected={selected}
                        setSelected={setSelected}
                        setMobileMenuOpen={setMobileMenuOpen}
                      />
                    );
                  })}
                </div>

                <div className="border-t border-blue-100/30 pt-4 space-y-1">
                  <div className="px-3 py-2 text-xs font-medium text-blue-50 uppercase tracking-wide">
                    Account
                  </div>
                  <MobileOption
                    Icon={User}
                    title="Profile"
                    href="/dashboard/profile"
                    selected={selected}
                    setSelected={setSelected}
                    setMobileMenuOpen={setMobileMenuOpen}
                  />
                  <MobileOption
                    Icon={HelpCircle}
                    title="Help & Support"
                    href="/dashboard/supports"
                    selected={selected}
                    setSelected={setSelected}
                    setMobileMenuOpen={setMobileMenuOpen}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  // Desktop/Tablet Sidebar
  return (
    <aside
      className={`sticky top-0 h-screen shrink-0 border-r transition-all duration-300 ease-in-out ${
        open ? "w-64" : "w-16"
      } border border-blue-300 bg-blue-300 p-2 shadow-sm hidden sm:block`}
    >
      <TitleSection open={open} />

      <div className="space-y-1 mb-8">
        <div className="px-3 py-2 text-xs font-medium text-blue-50 uppercase tracking-wide">
          Menu
        </div>
        {sidebarItems.map(({ Icon, title, href }, index) => {
          return (
            <Option
              key={index}
              Icon={Icon}
              title={title}
              href={href}
              selected={selected}
              setSelected={setSelected}
              open={open}
            />
          );
        })}
      </div>
      {open && (
        <div className="border-t border-gray-800 pt-4 space-y-1">
          <div className="px-3 py-2 text-xs font-medium text-blue-50 uppercase tracking-wide">
            Account
          </div>
          <Option
            Icon={User}
            title="Profile"
            href="/dashboard/profile"
            selected={selected}
            setSelected={setSelected}
            open={open}
          />
          <Option
            Icon={HelpCircle}
            title="Help & Support"
            href="/dashboard/supports"
            selected={selected}
            setSelected={setSelected}
            open={open}
          />
        </div>
      )}

      <ToggleClose isMobile={isMobile} open={open} setOpen={setOpen} />
    </aside>
  );
};

export default Sidebar;

const TitleSection = ({ open }: { open: boolean }) => {
  return (
    <Link
      href={"/"}
      className="mb-6 border-b border-gray-200 dark:border-gray-800 pb-4"
    >
      <div className="flex cursor-pointer items-center justify-between rounded-md p-2 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800">
        <div className="flex items-center gap-3">
          <Image
            src={"/images/webVirtusIcon.png"}
            width={36}
            height={36}
            alt="logo"
          />
          {open && (
            <div
              className={`transition-opacity duration-200 ${
                open ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="flex items-center gap-2">
                <div>
                  <span className="block text-sm font-semibold text-gray-900 dark:text-gray-100">
                    WebVirtus
                  </span>
                  <span className="block text-xs text-gray-500 dark:text-gray-400">
                    Pro Plan
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
        {open && (
          <ChevronDown className="h-4 w-4 text-gray-400 dark:text-gray-500" />
        )}
      </div>
    </Link>
  );
};

const MobileTitleSection = () => {
  return (
    <Link href={"/"} className="mb-6 border-b border-blue-100/30 pb-4">
      <div className="flex cursor-pointer items-center gap-3 rounded-md p-2 transition-colors hover:bg-blue-100/20">
        <Image
          src={"/images/webVirtusIcon.png"}
          width={36}
          height={36}
          alt="logo"
        />
        <div>
          <span className="block text-sm font-semibold text-blue-50">
            WebVirtus
          </span>
          <span className="block text-xs text-blue-200">Pro Plan</span>
        </div>
      </div>
    </Link>
  );
};

const Option = ({
  Icon,
  title,
  href,
  selected,
  setSelected,
  open,
  notifs,
}: {
  Icon: LucideIcon;
  title: string;
  href: string;
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  open: boolean;
  notifs?: number;
}) => {
  const router = useRouter();
  const isSelected = selected === title;

  return (
    <button
      onClick={() => {
        setSelected(title);
        router.push(href);
      }}
      className={`relative flex h-11 w-full items-center rounded-md transition-all duration-200 ${
        isSelected
          ? "bg-blue-100/40 text-blue-50 shadow-sm border-l-2 border-blue-100"
          : "text-blue-200 hover:bg-blue-100/20 hover:text-blue-50"
      }`}
    >
      <div className="grid h-full w-12 place-content-center">
        <Icon className="h-4 w-4" />
      </div>

      {open && (
        <span
          className={`text-sm font-medium transition-opacity duration-200 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        >
          {title}
        </span>
      )}

      {notifs && open && (
        <span className="absolute right-3 flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-xs text-blue-50 font-medium">
          {notifs}
        </span>
      )}
    </button>
  );
};

const MobileOption = ({
  Icon,
  title,
  href,
  selected,
  setSelected,
  setMobileMenuOpen,
  notifs,
}: {
  Icon: LucideIcon;
  title: string;
  href: string;
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  notifs?: number;
}) => {
  const router = useRouter();
  const isSelected = selected === title;

  return (
    <button
      onClick={() => {
        setSelected(title);
        router.push(href);
        setMobileMenuOpen(false); // Close mobile menu after navigation
      }}
      className={`relative flex h-12 w-full items-center rounded-md transition-all duration-200 ${
        isSelected
          ? "bg-blue-100/40 text-blue-50 shadow-sm border-l-2 border-blue-100"
          : "text-blue-200 hover:bg-blue-100/20 hover:text-blue-50"
      }`}
    >
      <div className="grid h-full w-12 place-content-center">
        <Icon className="h-5 w-5" />
      </div>

      <span className="text-sm font-medium">{title}</span>

      {notifs && (
        <span className="absolute right-3 flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-xs text-blue-50 font-medium">
          {notifs}
        </span>
      )}
    </button>
  );
};

const ToggleClose = ({
  isMobile,
  open,
  setOpen,
}: {
  isMobile: boolean;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <button
      onClick={() => !isMobile && setOpen(!open)}
      className="absolute bottom-0 left-0 right-0 border-t border-gray-800 transition-colors hover:bg-blue-100/20"
    >
      <div className="flex items-center p-3 text-blue-200 hover:text-blue-50">
        <div className="grid size-10 place-content-center">
          <ChevronsRight
            className={`h-4 w-4 transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
          />
        </div>
        {open && (
          <span
            className={`text-sm font-medium transition-all duration-200 ${
              open ? "opacity-100" : "opacity-0"
            }`}
          >
            Hide
          </span>
        )}
      </div>
    </button>
  );
};
