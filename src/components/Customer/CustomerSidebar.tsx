"use client";

import {
  LayoutDashboardIcon,
  PackageIcon,
  StoreIcon,
  User,
} from "lucide-react";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "../shadcnui/sidebar";

const navItems = [
  { label: "Dashboard", href: "/customer", icon: LayoutDashboardIcon },
  { label: "Orders", href: "/customer/orders", icon: PackageIcon },
  { label: "Profile", href: "/customer/profile", icon: User },
];

const CustomerSidebar = () => {
  const pathname = usePathname();
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="group-data-[collapsible=icon]:size-8!"
              render={<a href="/customer" />}>
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <StoreIcon className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">E-Com Micro</span>
                <span className="text-muted-foreground truncate text-xs">
                  Customer Panel
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/customer" && pathname.startsWith(item.href));

                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      isActive={isActive}
                      tooltip={item.label}
                      render={<a href={item.href} />}>
                      <Icon />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="sm"
              className="group-data-[collapsible=icon]:hidden">
              <kbd className="text-muted-foreground flex items-center gap-1 text-xs">
                <span className="bg-muted rounded border px-1 font-mono text-[10px]">
                  ⌘
                </span>
                <span className="bg-muted rounded border px-1 font-mono text-[10px]">
                  B
                </span>
              </kbd>
              <span className="text-muted-foreground text-xs">
                Toggle sidebar
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
};

export default CustomerSidebar;
