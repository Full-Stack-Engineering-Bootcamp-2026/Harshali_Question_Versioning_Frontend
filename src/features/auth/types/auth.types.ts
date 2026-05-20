export type RoleType = "MEMBER" | "STAFF" | "ADMIN"

export interface UserResponseDto {
  id: number
  name: string
  email: string
  role: RoleType
  isActive: boolean
  mustChangePassword: boolean
  createdAt: string
  updatedAt: string
}

export interface LoginRequestDto {
  email: string
  password: string
}

export interface RegisterRequestDto {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export interface AuthResponseDto {
  accessToken: string
  user: UserResponseDto
}

export interface AuthState {
  token: string | null
  user: UserResponseDto | null
}
export interface ForceResetPasswordRequestDto {
  password: string
  confirmPassword: string
}
export interface CreateStaffRequestDto {
  name: string
  email: string
}

export interface StaffResponseDto {
  id: number
  name: string
  email: string
  role: RoleType
  isActive: boolean
  mustChangePassword: boolean
  createdAt: string
}
export interface ForgotPasswordRequestDto {
  email: string
}
export interface ResetPasswordRequestDto {
  resetToken: string
  password: string
  confirmPassword: string
}
