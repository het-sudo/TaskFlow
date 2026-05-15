import { AxiosError } from "axios"
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
import type { ApiErrorResponse } from "@/shared/types"
import { ROUTES } from "@/shared/constants"
import {
  setAccessToken,
  removeAccessToken,
  getAccessToken,
} from "@/shared/token"
import { useCallback } from "react"

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
      clearUser()
    } finally {
      setLoading(false)
    }
  }, [setUser, clearUser, setLoading])

  async function login(data: LoginInput) {
    try {
      const response = await loginRequest(data)
      setAccessToken(response.accessToken)
      setUser(response.user)

      toast.success("Login successful")

      navigate(ROUTES.DASHBOARD)
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>

      toast.error(axiosError.response?.data?.message || "Login failed")
    }
  }

  async function register(data: RegisterInput) {
    try {
      const response = await registerRequest(data)

      setUser(response.user)

      toast.success("Account created")

      navigate(ROUTES.DASHBOARD) // make changes if want user to login after register
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>

      toast.error(axiosError.response?.data?.message || "Registration failed")
    }
  }
  async function logout() {
    try {
      await logoutRequest()
    } finally {
      removeAccessToken()

      clearUser()

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
