import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

import DashSidebar from "./DashSidebar"
import DashHeader from "./DashHeader"

import { Outlet } from "react-router"

export default function DashLayout() {
  return (
    <SidebarProvider className="flex min-h-screen">
      {/* sidebar occupies its own column, layout manages collapse internally */}
      <DashSidebar />

      {/* main content area; SidebarInset styles adjust when sidebar is inset/collapsed */}
      <SidebarInset className="bg-[#F9FAFB]">
        <DashHeader />
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
