import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/shared/resusable/Button"

import { Input } from "@/shared/resusable/Input"

import { registerSchema, type RegisterInput } from "../auth.schema"

import { useAuth } from "../useAuth"

import { ROUTES } from "@/shared/constants"
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react"
import { useState } from "react"

export function RegisterPage() {
  const { register: registerUser } = useAuth()

  const {
    register,

    handleSubmit,

    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  })
  const [showPassword, setShowPassword] = useState(false)

  return (
    <>
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-red-400">Create Account</h1>

        <p className="mt-2 text-sm text-slate-700">
          Register to start managing tasks
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit(registerUser)}>
        <Input
          label="Full Name"
          placeholder="Enter your Full Name"
          className="pl-10"
          error={errors.name?.message}
          leftIcon={<User className="h-5 w-5" />}
          {...register("name")}
        />

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
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-400 transition hover:text-gray-600"
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
        <Input
          type={showPassword ? "text" : "password"}
          label="Confirm Password"
          placeholder="Confirm your password"
          error={errors.confirmPassword?.message}
          leftIcon={<Lock className="h-5 w-5" />}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-400 transition hover:text-gray-600"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          }
          {...register("confirmPassword")}
        />
        <Button type="submit" loading={isSubmitting} fullWidth>
          Register
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-700">
        Already have an account?{" "}
        <Link
          className="font-medium text-red-400 transition hover:opacity-70"
          to={ROUTES.LOGIN}
        >
          Login
        </Link>
      </p>
    </>
  )
}
