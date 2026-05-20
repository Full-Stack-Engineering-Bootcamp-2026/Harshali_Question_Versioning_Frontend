import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { LogOut, UserCircle } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { logout } from "@/features/auth/authSlice"

import type { RootState } from "@/app/store"

type NavbarProps = {
  role: "ADMIN" | "USER"
}

export default function Navbar({ role }: NavbarProps) {
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const user = useSelector((state: RootState) => state.auth.user)

  const handleLogout = () => {
    dispatch(logout())

    toast.success("Logged out successfully")

    navigate("/")
  }

  return (
    <header className="flex h-16 items-center justify-between border-b bg-card px-6">
      <div>
        <h1 className="text-lg font-semibold">
          {role === "ADMIN" ? "Admin Panel" : "User Panel"}
        </h1>

        <p className="text-xs text-muted-foreground">Quiz Management System</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden items-center gap-2 md:flex">
          <UserCircle size={22} />

          <div className="text-sm">
            <p className="font-medium">
              {user?.firstName} {user?.lastName}
            </p>

            <p className="text-xs text-muted-foreground">{user?.role}</p>
          </div>
        </div>

        <Button variant="outline" size="sm" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </header>
  )
}
