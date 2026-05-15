import axios, { type InternalAxiosRequestConfig } from "axios"

import { getAccessToken, removeAccessToken, setAccessToken } from "./token"
import { refreshRequest } from "@/features/auth/auth.api"

type RetryRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean
}
//interceptors for handling the token request

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:9000/api/v1/",

  withCredentials: true,
})

api.interceptors.request.use((config) => {
  const token = getAccessToken()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config as RetryRequestConfig

    const status = error.response?.status

    const isRefreshRequest = originalRequest.url?.includes(
      "/auth/refresh-token"
    )

    if (status === 401 && !originalRequest._retry && !isRefreshRequest) {
      originalRequest._retry = true

      try {
        const response = await refreshRequest()

        setAccessToken(response.accessToken)

        originalRequest.headers.Authorization = `Bearer ${response.accessToken}`

        return api(originalRequest)
      } catch {
        removeAccessToken()
      }
    }

    return Promise.reject(error)
  }
)
