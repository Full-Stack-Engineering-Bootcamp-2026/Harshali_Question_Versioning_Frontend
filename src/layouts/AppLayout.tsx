import { useState } from "react"
import { Outlet } from "react-router-dom"

import Navbar from "./Navbar"
import Sidebar from "./AppSidebar"

type AppLayoutProps = {
  role: "ADMIN" | "USER"
}

export default function AppLayout({ role }: AppLayoutProps) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role={role} collapsed={collapsed} setCollapsed={setCollapsed} />

      <div className="flex flex-1 flex-col">
        <Navbar role={role} />

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
