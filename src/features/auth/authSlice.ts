import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

import type { AuthState, UserResponseDto } from "./types/auth.types"

interface AuthPayload {
  token: string
  user: UserResponseDto
}
//initil state user is not logged in
const initialState: AuthState = {
  token: null,
  user: null,
}

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    setAuth: (state, action: PayloadAction<AuthPayload>) => {
      state.token = action.payload.token

      state.user = action.payload.user
    },

    logout: (state) => {
      state.token = null

      state.user = null
    },
  },
})

export const { setAuth, logout } = authSlice.actions

export default authSlice.reducer
