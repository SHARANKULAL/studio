// src/components/layout/AppShell.tsx
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NAV_ITEMS } from "@/lib/constants";
import type { NavItem } from "@/types";
import { UserNav } from "./UserNav";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";
import { Settings } from "lucide-react";

function MainSidebar() {
  const pathname = usePathname();
  const { state: sidebarState } = useSidebar();
  const isCollapsed = sidebarState === "collapsed";

  return (
    <Sidebar
      variant="sidebar"
      collapsible="icon"
      className="border-r border-sidebar-border shadow-md"
    >
      <SidebarHeader className="p-4 flex items-center justify-between">
        <Logo collapsed={isCollapsed} />
      </SidebarHeader>
      <SidebarContent asChild>
        <ScrollArea className="h-full">
          <SidebarMenu className="p-2">
            {NAV_ITEMS.map((item: NavItem) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href} legacyBehavior passHref>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))}
                    tooltip={{
                      children: item.title,
                      className: "bg-primary text-primary-foreground",
                    }}
                    className="justify-start"
                  >
                    <a>
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </ScrollArea>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-sidebar-border">
        <Link href="#" legacyBehavior passHref>
          <SidebarMenuButton
            asChild
            tooltip={{
              children: "Settings",
              className: "bg-primary text-primary-foreground",
            }}
            className="justify-start"
          >
            <a>
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </a>
          </SidebarMenuButton>
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen">
        <MainSidebar />
        <SidebarInset className="flex flex-col flex-1">
          <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b bg-background/80 backdrop-blur-sm px-6 shadow-sm">
            <SidebarTrigger className="md:hidden" /> {/* Mobile trigger */}
            <div className="flex-1">
              {/* Optional: Breadcrumbs or Page Title */}
            </div>
            <UserNav />
          </header>
          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
