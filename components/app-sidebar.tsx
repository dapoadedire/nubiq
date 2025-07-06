"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Notebook,
  LineChart,
  ShoppingCart,
  Users,
  Settings,
  HelpCircle,
  LogOut,
  Home,
  Bell,
  Inbox,
  Boxes,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LucideIcon } from "lucide-react";

// Define types for our navigation items
type NavItem = {
  title: string;
  url: string;
  icon: LucideIcon;
  isActive?: boolean;
};

type NavSection = {
  title?: string;
  items: NavItem[];
};

export function AppSidebar() {
  const pathname = usePathname();

  // Function to check if a path is active
  const isActive = (path: string) => pathname === path;

  // Dashboard section
  const dashboardSection: NavSection = {
    items: [
      {
        title: "Dashboard",
        url: "/",
        icon: Home,
      },
    ],
  };

  // Sales section
  const salesSection: NavSection = {
    title: "Sales",
    items: [
      {
        title: "Analytics",
        url: "/sales",
        icon: LineChart,
      },
      {
        title: "Orders",
        url: "/orders",
        icon: ShoppingCart,
      },
      {
        title: "Inventory",
        url: "/inventory",
        icon: Boxes,
      },
    ],
  };

  // Customers section
  const customersSection: NavSection = {
    title: "Customers",
    items: [
      {
        title: "Manage",
        url: "/customers",
        icon: Users,
      },
      {
        title: "Messages",
        url: "/inbox",
        icon: Inbox,
      },
    ],
  };

  // System section
  const systemSection: NavSection = {
    title: "System",
    items: [
      {
        title: "Notifications",
        url: "/notifications",
        icon: Bell,
      },
      {
        title: "Settings",
        url: "/settings",
        icon: Settings,
      },
    ],
  };

  // Footer items
  const footerItems: NavItem[] = [
    {
      title: "Help & Support",
      url: "/help",
      icon: HelpCircle,
    },
    {
      title: "Logout",
      url: "/logout",
      icon: LogOut,
    },
  ];

  // All sections for easier management
  const allSections: NavSection[] = [
    dashboardSection,
    salesSection,
    customersSection,
    systemSection,
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        <div
          className={cn(
            "flex items-center gap-2 px-4 py-3.5",
            "bg-primary/5 rounded-lg border border-border/50",
            "hover:bg-primary/10 transition-colors duration-200"
          )}
        >
          <Notebook className="h-5 w-5 text-primary/80" />
          <h2 className="font-semibold tracking-tight font-sans">Nubiq</h2>
        </div>
      </SidebarHeader>

      <SidebarContent className="pt-5">
        {allSections.map((section, sectionIndex) => (
          <SidebarGroup
            key={section.title || `section-${sectionIndex}`}
            className={sectionIndex > 0 ? "mt-4" : ""}
          >
            {section.title && (
              <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <SidebarMenuItem key={item.url}>
                      <SidebarMenuButton asChild isActive={isActive(item.url)}>
                        <Link
                          href={item.url}
                          className="flex items-center gap-3"
                        >
                          <Icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="pb-4">
        <div className="px-3 space-y-2">
          {footerItems.map((item) => {
            const Icon = item.icon;
            return (
              <SidebarMenuButton
                key={item.url}
                asChild
                className="w-full justify-start text-muted-foreground hover:text-foreground"
              >
                <Link href={item.url} className="flex items-center gap-3">
                  <Icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            );
          })}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
