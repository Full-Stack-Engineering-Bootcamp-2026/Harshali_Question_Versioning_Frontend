"use client"

import { useState, useEffect } from "react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useSelector } from "react-redux"
import type { RootState } from "@/app/store"
import { useNavigate } from "react-router-dom"
import { UserCircle, Pencil, KeyRound } from "lucide-react"
import { fetchProfileApi } from "@/features/profile/api/profileApi"

export function Navbar() {
  const user = useSelector((state: RootState) => state.auth.user)
  const navigate = useNavigate()

  const [open, setOpen] = useState(false)
  const [profileImage, setProfileImage] = useState<string | null>(null)

  useEffect(() => {
    const loadImage = async () => {
      try {
        const profile = await fetchProfileApi()
        setProfileImage(profile.profileImageUrl)
      } catch {
        setProfileImage(null)
      }
    }
    loadImage()
  }, [])

  const handleNavigate = (path: string) => {
    setOpen(false)
    navigate(path)
  }

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-6">
      {/* Left — sidebar trigger */}
      <div className="flex items-center">
        <SidebarTrigger className="cursor-pointer text-gray-500 hover:text-gray-900" />
      </div>

      {/* Right — user + dropdown */}
      <div className="relative flex items-center gap-4">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="flex cursor-pointer items-center gap-3 rounded-lg p-1 transition-colors hover:bg-gray-50"
        >
          <div className="text-right leading-tight">
            <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
            <p className="text-xs text-gray-400">{user?.role}</p>
          </div>

          {profileImage ? (
            <img
              src={profileImage}
              alt="profile"
              className="h-9 w-9 rounded-full object-cover ring-2 ring-gray-100"
            />
          ) : (
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted ring-2 ring-gray-100">
              <UserCircle className="h-6 w-6 text-muted-foreground" />
            </div>
          )}
        </button>

        {/* dropdown */}
        {open && (
          <div className="absolute top-12 right-0 z-50 w-48 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg">
            <div className="flex flex-col py-1">
              <button
                onClick={() => handleNavigate("/profile")}
                className="flex cursor-pointer items-center gap-2 px-4 py-2.5 text-sm text-gray-700 transition-colors hover:bg-gray-50"
              >
                <UserCircle size={15} className="text-gray-400" />
                My Profile
              </button>

              <button
                onClick={() => handleNavigate("/profile/edit")}
                className="flex cursor-pointer items-center gap-2 px-4 py-2.5 text-sm text-gray-700 transition-colors hover:bg-gray-50"
              >
                <Pencil size={15} className="text-gray-400" />
                Edit Profile
              </button>

              <button
                onClick={() => handleNavigate("/change-password")}
                className="flex cursor-pointer items-center gap-2 px-4 py-2.5 text-sm text-gray-700 transition-colors hover:bg-gray-50"
              >
                <KeyRound size={15} className="text-gray-400" />
                Change Password
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
