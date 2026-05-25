import { Route, Routes } from "react-router-dom"

import { LoginPage } from "@/features/auth/pages/LoginPage"
import { RegisterPage } from "@/features/auth/pages/RegisterPage"

import { ProtectedRoute } from "./ProtectedRoute"

import { AppLayout } from "@/shared/AppLayout"
import { AuthLayout } from "@/shared/AuthLayout"

import { ROUTES } from "@/shared/constants"
import Dashboard from "@/components/Dashboard"
import NotFoundPage from "@/components/NotFoundPage"
import { PublicLayout } from "@/shared/PublicLayout"
import DashboardPage from "@/features/task/pages/DashboardPage"
import TaskDetail from "@/features/task/pages/TaskDetail"
import SharedTask from "@/features/task/pages/SharedTask"

// App router for routes
export function AppRouter() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Dashboard />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="/" element={<Dashboard />} />

        <Route path={ROUTES.LOGIN} element={<LoginPage />} />

        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />

          <Route path="/tasks" element={<DashboardPage />} />

          <Route path="/tasks/:id" element={<TaskDetail />} />

          <Route path="/shared" element={<SharedTask />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
