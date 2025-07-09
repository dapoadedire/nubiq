"use client";

import { SearchForm } from "@/components/search-form";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, Search, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export const Header = () => {
  const isMobile = useIsMobile();

  return (
    <header className="font-sans bg-background sticky top-0 z-10 flex h-16 shrink-0 items-center border-b px-4 shadow-sm">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-3">
          <SidebarTrigger className="text-foreground hover:text-primary transition-colors cursor-pointer" />
          <h1 className="text-xl font-semibold tracking-tight hidden sm:block">
            Nubiq Sales Dashboard
          </h1>
        </div>

        <div className="flex-1 mx-4 max-w-md hidden md:block">
          <SearchForm />
        </div>

        <div className="flex items-center gap-2">
          {isMobile && (
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          )}
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Notifications</span>
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Settings className="h-4 w-4" />
            <span className="sr-only">Settings</span>
          </Button>
          <div className="ml-2 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-xs font-medium text-primary">DA</span>
          </div>
        </div>
      </div>
    </header>
  );
};
