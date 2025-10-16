import {
  Briefcase,
  DollarSign,
  FileSpreadsheet,
  LayoutDashboard,
  LogOut,
  LucideIcon,
  MessageCircle,
  Users,
} from "lucide-react";

export const sidebarItems: { Icon: LucideIcon; title: string; href: string }[] =
  [
    {
      Icon: LayoutDashboard,
      title: "Dashboard Overview",
      href: "/dashboard",
    },
    {
      Icon: DollarSign,
      title: "Payments and Billings",
      href: "/dashboard/payments",
    },
    {
      Icon: FileSpreadsheet,
      title: "Leads Management",
      href: "/dashboard/leads-management",
    },
    {
      Icon: Briefcase,
      title: "Projects",
      href: "/dashboard/active-projects",
    },
    {
      Icon: Users,
      title: "Developers & Teams",
      href: "/dashboard/developers",
    },
    {
      Icon: MessageCircle,
      title: "Team Chat",
      href: "/dashboard/chattings",
    },
    {
      Icon: LogOut,
      title: "Logout",
      href: "/dashboard/logout",
    },
  ];
