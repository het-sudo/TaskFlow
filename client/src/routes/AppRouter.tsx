import { Navigate, Route, Routes } from "react-router-dom"

import { LoginPage } from "@/features/auth/pages/LoginPage"
import { RegisterPage } from "@/features/auth/pages/RegisterPage"

import { ProtectedRoute } from "./ProtectedRoute"

import { AppLayout } from "@/shared/AppLayout"
import { AuthLayout } from "@/shared/AuthLayout"

import { ROUTES } from "@/shared/constants"

// App router for routes
export function AppRouter() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />

        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route
            path={ROUTES.DASHBOARD}
            element={
              <div>
                Dashboard
                {/* const {logout} = useAuth(); */}
              </div>
            }
          />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to={ROUTES.LOGIN} replace />} />
    </Routes>
  )
}
