import { useAuth } from "@/features/auth/useAuth"
import { Outlet } from "react-router-dom"

export function AppLayout() {
  const { logout } = useAuth()
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex">
        <aside className="w-64 border-r border-slate-200 bg-white p-6">
          <h2 className="text-xl font-bold text-violet-600">TaskFlow</h2>
        </aside>
        <button
          onClick={logout}
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
        >
          Logout
        </button>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
