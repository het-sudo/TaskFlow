import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/shared/Button"
import { Input } from "@/shared/Input"
import { loginSchema, type LoginInput } from "../auth.schema"
import { useAuth } from "../useAuth"
import { ROUTES } from "@/shared/constants"

export function LoginPage() {
  //destructure login
  const { login } = useAuth()

  //react hook form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  })

  return (
    <>
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold">Welcome Back</h1>

        <p className="mt-2 text-sm text-slate-500">
          Login to continue to TaskFlow
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit(login)}>
        <div>
          <Input
            type="email"
            placeholder="Enter email"
            {...register("email")}
          />

          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Input
            type="password"
            placeholder="Enter password"
            {...register("password")}
          />

          {errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        <Button loading={isSubmitting}>Login</Button>
      </form>

      <p className="mt-4 text-center text-sm text-slate-500">
        Don&apos;t have an account?{" "}
        <Link className="font-medium text-red-300" to={ROUTES.REGISTER}>
          Register
        </Link>
      </p>
    </>
  )
}
