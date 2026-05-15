import { api } from "@/shared/axios"
import type { LoginInput, RegisterInput } from "./auth.schema"
import type { ApiResponse, AuthData, AuthResponse, User } from "@/shared/types"

//api handling functions

export async function loginRequest(data: LoginInput): Promise<AuthResponse> {
  const response = await api.post<ApiResponse<AuthData>>("/auth/login", data)

  return {
    user: response.data.data.user,

    accessToken: response.data.data.auth.accessToken,
  }
}
export async function registerRequest(data: RegisterInput) {
  const response = await api.post<AuthResponse>("/auth/register", data)

  return response.data
}

export async function getMeRequest() {
  const response = await api.get<ApiResponse<User>>("/auth/me")

  return response.data.data
}
export async function refreshRequest(): Promise<AuthResponse> {
  const response = await api.post<ApiResponse<AuthData>>("/auth/refresh-token")

  return {
    user: response.data.data.user,

    accessToken: response.data.data.auth.accessToken,
  }
}

export async function logoutRequest() {
  await api.post("/auth/logout")
}
