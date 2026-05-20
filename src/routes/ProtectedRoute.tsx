import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"

import type { RootState } from "@/app/store"

type ProtectedRouteProps = {
  allowedRole: "ADMIN" | "USER"
}

export default function ProtectedRoute({ allowedRole }: ProtectedRouteProps) {
  const { token, user } = useSelector((state: RootState) => state.auth)

  if (!token || !user) {
    return <Navigate to="/" replace />
  }

  if (user.role !== allowedRole) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
