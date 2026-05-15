import { Outlet } from "react-router-dom"

import { motion } from "framer-motion"

export function AuthLayout() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
      >
        <Outlet />
      </motion.div>
    </div>
  )
}
