import axios from "axios"
import { store } from "@/app/store"
const API = axios.create({
  baseURL: "http://localhost:3000/api/v1",
})
//request interceptor created
API.interceptors.request.use((config) => {
  const token = store.getState().auth.token
  //attach token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export default API
