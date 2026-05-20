"use client"

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "./AppSidebar"
import { Navbar } from "./Navbar"
import { Outlet } from "react-router-dom"
import { requestNotificationPermission } from "@/firebase/notification"
import { useEffect } from "react"
export default function AppLayout() {
  useEffect(() => {
    requestNotificationPermission()
  }, [])
  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen overflow-hidden">
        <AppSidebar />
        <SidebarInset className="flex flex-1 flex-col">
          <Navbar />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-4">
            <Outlet />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
