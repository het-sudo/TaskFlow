import { Link } from "react-router-dom"
import { useState } from "react"
import { Eye, EyeOff, Lock, Mail } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/shared/resusable/Button"
import { Input } from "@/shared/resusable/Input"

import { loginSchema, type LoginInput } from "../auth.schema"
import { useAuth } from "../useAuth"

import { ROUTES } from "@/shared/constants"

export function LoginPage() {
  const { login } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  })

  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="fixed inset-0 z-[9999] grid min-h-screen w-screen grid-cols-1 bg-white md:grid-cols-2">
      <div className="relative hidden overflow-hidden md:flex">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-black" />

        <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-red-500/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-orange-400/10 blur-3xl" />

        <div className="relative z-10 flex w-full flex-col justify-between px-16 py-14 text-white">
          <div>
            <div className="inline-flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-orange-400 text-xl font-bold shadow-lg">
                T
              </div>

              <div>
                <h2 className="text-2xl font-bold tracking-tight">TaskFlow</h2>

                <p className="text-sm text-slate-300">
                  Smart task management platform
                </p>
              </div>
            </div>
          </div>

          <div className="max-w-xl">
            <div className="mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium backdrop-blur-md">
              ✨ Work smarter, not harder
            </div>

            <h1 className="text-5xl font-bold leading-tight tracking-tight">
              Manage your work in one beautiful workspace
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-300">
              Plan projects, organize tasks, collaborate with your team, and
              stay productive with TaskFlow.
            </p>

            <div className="mt-12 grid gap-4">
              {[
                {
                  icon: "📋",
                  title: "Task Organization",
                  desc: "Keep everything structured and easy to track",
                },
                {
                  icon: "⚡",
                  title: "Team Collaboration",
                  desc: "Work together with real-time updates",
                },
                {
                  icon: "📈",
                  title: "Productivity Insights",
                  desc: "Track progress and improve efficiency",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="group flex items-center gap-4 rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-md transition-all duration-300 hover:bg-white/10"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500/30 to-orange-400/30 text-2xl">
                    {item.icon}
                  </div>

                  <div>
                    <h3 className="font-semibold text-white">{item.title}</h3>

                    <p className="mt-1 text-sm text-slate-300">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-white/10 pt-6 text-sm text-slate-400">
            <p>© 2026 TaskFlow</p>

            <div className="flex items-center gap-6">
              <span>Secure Login</span>
              <span>Fast Workflow</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center bg-slate-50 px-6 py-10">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center md:hidden">
            <h1 className="text-3xl font-bold text-red-500">TaskFlow</h1>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900">Welcome Back</h2>

            <p className="mt-2 text-sm text-slate-500">
              Login to continue to your workspace
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <form className="space-y-5" onSubmit={handleSubmit(login)}>
              <Input
                type="email"
                label="Email"
                placeholder="Enter your email"
                error={errors.email?.message}
                leftIcon={<Mail className="h-5 w-5" />}
                {...register("email")}
              />

              <Input
                type={showPassword ? "text" : "password"}
                label="Password"
                placeholder="Enter your password"
                error={errors.password?.message}
                leftIcon={<Lock className="h-5 w-5" />}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="text-slate-400 transition hover:text-slate-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                }
                {...register("password")}
              />

              <Button type="submit" loading={isSubmitting} fullWidth>
                Login
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-600">
              Don&apos;t have an account?{" "}
              <Link
                className="font-semibold text-red-500 transition hover:opacity-70"
                to={ROUTES.REGISTER}
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
