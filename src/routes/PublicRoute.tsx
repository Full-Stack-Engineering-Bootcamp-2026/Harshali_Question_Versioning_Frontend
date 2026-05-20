import { Navigate } from "react-router-dom"

import { useSelector } from "react-redux"

import type { RootState } from "@/app/store"

interface Props {
  children: React.ReactNode
}

export default function PublicRoute({ children }: Props) {
  const { token, user } = useSelector((state: RootState) => state.auth)

  if (!token || !user) {
    return children
  }

  if (user.mustChangePassword) {
    return <Navigate to="/force-reset-password" replace />
  }

  if (user.role === "ADMIN") {
    return <Navigate to="/admin/dashboard" replace />
  }

  if (user.role === "STAFF") {
    return <Navigate to="/staff/dashboard" replace />
  }

  return <Navigate to="/dashboard/member" replace />
}
