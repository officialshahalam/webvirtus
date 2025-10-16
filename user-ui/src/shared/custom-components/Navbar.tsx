"use client";

import * as React from "react";
import { Globe, MessagesSquare, Info, User, Calculator } from "lucide-react";
import { AnimeNavBar } from "@/components/ui/anime-navbar";
import { usePathname } from "next/navigation";

const items = [
  {
    name: "Cost Analysis",
    url: "/cost-analysis",
    href: "cost-analysis",
    icon: Calculator,
  },
  {
    name: "Services",
    url: "/services",
    href: "services",
    icon: Globe,
  },
  {
    name: "About",
    url: "/about",
    href: "about",
    icon: Info,
  },
  {
    name: "Reviews",
    url: "/reviews",
    href: "reviews",
    icon: MessagesSquare,
  },
  {
    name: "Contact",
    url: "/contact",
    href: "contact",
    icon: User,
  },
];

const Navbar = () => {
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);
  const lastParam = segments.length > 0 ? segments.at(-1) : "";

  return <AnimeNavBar items={items} defaultActive={lastParam} />;
};

export default Navbar;