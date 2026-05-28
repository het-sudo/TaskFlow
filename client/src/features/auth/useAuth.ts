import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import {
  getMeRequest,
  loginRequest,
  logoutRequest,
  registerRequest,
} from "./auth.api"
import { useAuthStore } from "./auth.store"
import type { LoginInput, RegisterInput } from "./auth.schema"

import { ROUTES } from "@/shared/constants"
import {
  setAccessToken,
  removeAccessToken,
  getAccessToken,
} from "@/shared/token"
import { useCallback } from "react"
import { connectSocket, disconnectSocket } from "@/libs/socket"
import { getErrorMessage } from "@/libs/getErrorMessage"

//hook for all api operations

export function useAuth() {
  const navigate = useNavigate()
  const { setUser, clearUser, setLoading } = useAuthStore()

  const initializeAuth = useCallback(async () => {
    const token = getAccessToken()

    if (!token) {
      clearUser()
      setLoading(false)
      return
    }

    try {
      const response = await getMeRequest()

      setUser(response)
    } catch {
      removeAccessToken()

      clearUser()
    } finally {
      setLoading(false)
    }
  }, [setUser, clearUser, setLoading])

  async function login(data: LoginInput) {
    try {
      const response = await loginRequest(data)
      const token = response.accessToken
      removeAccessToken()
      setAccessToken(token)
      setUser(response.user)
      disconnectSocket()
      connectSocket(token)
      toast.success("Login successful")

      navigate(ROUTES.DASHBOARD)
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }

  async function register(data: RegisterInput) {
    try {
      await registerRequest(data)

      toast.success("Account created")

      navigate(ROUTES.LOGIN)
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }
  async function logout() {
    try {
      await logoutRequest()
    } finally {
      clearUser()
      removeAccessToken()
      disconnectSocket()
      navigate(ROUTES.LOGIN)
    }
  }
  return {
    login,
    register,
    logout,
    initializeAuth,
  }
}
