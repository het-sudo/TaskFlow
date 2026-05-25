import { useState } from "react"
import { Outlet } from "react-router-dom"
import AppHeader from "./components/AppHeader"
import AppSidebar from "./components/AppSidebar"

export function AppLayout() {
  const [openSidebar, setOpenSidebar] = useState(true)

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-red-400">
      <AppHeader onMenuClick={() => setOpenSidebar((prev) => !prev)} />

      <div className="flex">
        <AppSidebar open={openSidebar} onClose={() => setOpenSidebar(false)} />
        {/* min-h-[calc(100vh-72px)] flex-1 overflow-x-hidden p-4 md:p-8  */}
        <main className="min-h-[calc(100vh-72px)] flex-1 p-4 md:p-8">
          <div className="mx-auto w-full max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
