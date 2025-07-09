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
import { ApiStatusIndicator } from "./api-status-indicator";

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

  const isActive = (path: string) => pathname === path;

  // Dashboard section
  // === SNIP: imports remain unchanged ===

  // Reorganized Nav Sections

  // Dashboard
  const dashboardSection: NavSection = {
    items: [
      {
        title: "Dashboard",
        url: "/",
        icon: Home,
      },
    ],
  };

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
    ],
  };

 
  const inventorySection: NavSection = {
    title: "Inventory",
    items: [
      {
        title: "Products",
        url: "/inventory",
        icon: Boxes,
      },
    ],
  };

  // Customers
  const customersSection: NavSection = {
    title: "Customers",
    items: [
      {
        title: "Users",
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

  // Settings & Notifications
  const settingsSection: NavSection = {
    title: "Settings",
    items: [
      {
        title: "Notifications",
        url: "/notifications",
        icon: Bell,
      },
      {
        title: "Preferences",
        url: "/settings",
        icon: Settings,
      },
    ],
  };

  // Footer
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

  // All sections
  const allSections: NavSection[] = [
    dashboardSection,
    salesSection,
    inventorySection,
    customersSection,
    settingsSection,
  ];

  return (
    <Sidebar className="font-sans">
      <SidebarHeader>
        <div
          className={cn(
            "flex items-center gap-2 px-2 py-4",
            "bg-primary/5 rounded-lg border border-border/50",
            "hover:bg-primary/10 transition-colors duration-200"
          )}
        >
          <Notebook className="h-5 w-5 text-primary/80" />
          <h2 className="font-semibold tracking-tight font-sans">Nubiq</h2>
          <ApiStatusIndicator />
        </div>
      </SidebarHeader>

      <SidebarContent className="pt-4">
        {allSections.map((section, sectionIndex) => (
          <SidebarGroup
            key={section.title || `section-${sectionIndex}`}
            className={sectionIndex > 0 ? "mt-2" : ""}
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
