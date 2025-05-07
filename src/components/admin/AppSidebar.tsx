import { Calendar, Home } from "lucide-react";
import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { UserButton } from "@clerk/nextjs";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/admin",
    icon: Home,
  },
  {
    title: "Kategori",
    url: "/admin/kategori",
    icon: Calendar,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <Link href="/admin">
            <SidebarGroupLabel className="text-xl mt-6">
              Glorys Admin Dashboard
            </SidebarGroupLabel>
          </Link>
          <SidebarGroupContent className="mt-4">
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="w-full">
                    <Link href={item.url}>
                      <item.icon className="w-36 h-36" />
                      <span className="ml-2 text-lg">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="px-6 py-8">
        <div className="flex flex-row space-x-4">
          <UserButton />
          <div className="flex flex-col">
            <p className="text-slate-900">User Account</p>
            <p className="text-slate-500 text-sm">Role</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
