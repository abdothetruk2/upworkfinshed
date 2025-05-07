import { ReactNode } from "react";
import {
  ClerkProvider,
 } from "@clerk/nextjs";
import { AppSidebar } from "@/components/admin/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "../api/uploadthing/core";

export default function PrivateLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider>
      <SidebarProvider>
        <AppSidebar />
        <main className="p-4 w-full">
          <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
          {children}
        </main>
      </SidebarProvider>
    </ClerkProvider>
  );
}
