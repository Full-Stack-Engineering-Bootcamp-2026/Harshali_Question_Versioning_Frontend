import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"

import type { RootState } from "@/app/store"

export default function PublicRoute() {
  const { token, user } = useSelector((state: RootState) => state.auth)

  if (token && user?.role === "ADMIN") {
    return <Navigate to="/admin" replace />
  }

  if (token && user?.role === "USER") {
    return <Navigate to="/user" replace />
  }

  return <Outlet />
}
