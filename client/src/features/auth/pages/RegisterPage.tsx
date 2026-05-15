import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/shared/Button"
import { Input } from "@/shared/Input"
import { registerSchema, type RegisterInput } from "../auth.schema"
import { useAuth } from "../useAuth"
import { ROUTES } from "@/shared/constants"

export function RegisterPage() {
  //destructure register
  const { register: registerUser } = useAuth()

  //react hook form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  })

  return (
    <>
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold">Create Account</h1>

        <p className="mt-2 text-sm text-slate-500">
          Register to start managing tasks
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit(registerUser)}>
        <div>
          <Input placeholder="Enter name" {...register("name")} />

          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

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

        <div>
          <Input
            type="password"
            placeholder="Confirm password"
            {...register("confirmPassword")}
          />

          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <Button loading={isSubmitting}>Register</Button>
      </form>

      <p className="mt-4 text-center text-sm text-slate-500">
        Already have an account?{" "}
        <Link className="font-medium text-red-300" to={ROUTES.LOGIN}>
          Login
        </Link>
      </p>
    </>
  )
}
