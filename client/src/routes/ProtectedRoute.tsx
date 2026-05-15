import { Navigate, Outlet } from "react-router-dom"

import { useAuthStore } from "@/features/auth/auth.store"

import { ROUTES } from "@/shared/constants"

//protecting route from unauthenticate access

export function ProtectedRoute() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  const isLoading = useAuthStore((state) => state.isLoading)

  if (isLoading) {
    return null
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />
  }

  return <Outlet />
}
