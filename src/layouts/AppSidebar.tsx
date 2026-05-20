import { Link, NavLink } from "react-router-dom"
import {
  BookOpen,
  ClipboardList,
  FileQuestion,
  Home,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type SidebarProps = {
  role: "ADMIN" | "USER"
  collapsed: boolean
  setCollapsed: (value: boolean) => void
}

const adminMenu = [
  {
    label: "Dashboard",
    path: "/admin",
    icon: Home,
  },
  {
    label: "Questions",
    path: "/admin/questions",
    icon: FileQuestion,
  },
  {
    label: "Quizzes",
    path: "/admin/quizzes",
    icon: BookOpen,
  },
  {
    label: "Attempts",
    path: "/admin/attempts",
    icon: ClipboardList,
  },
]

const userMenu = [
  {
    label: "Dashboard",
    path: "/user",
    icon: Home,
  },
  {
    label: "Quizzes",
    path: "/user/quizzes",
    icon: BookOpen,
  },
  {
    label: "My Attempts",
    path: "/user/attempts",
    icon: ClipboardList,
  },
]

export default function Sidebar({
  role,
  collapsed,
  setCollapsed,
}: SidebarProps) {
  const menuItems = role === "ADMIN" ? adminMenu : userMenu

  return (
    <aside
      className={cn(
        "border-r bg-card transition-all duration-300",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex h-16 items-center justify-between border-b px-4">
        {!collapsed && (
          <Link
            to={role === "ADMIN" ? "/admin" : "/user"}
            className="text-lg font-bold"
          >
            Quiz System
          </Link>
        )}

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <PanelLeftOpen size={20} />
          ) : (
            <PanelLeftClose size={20} />
          )}
        </Button>
      </div>

      <nav className="space-y-2 p-3">
        {menuItems.map((item) => {
          const Icon = item.icon

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/admin" || item.path === "/user"}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-all",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )
              }
            >
              <Icon size={20} />

              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          )
        })}
      </nav>
    </aside>
  )
}
