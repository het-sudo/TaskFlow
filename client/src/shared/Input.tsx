import { forwardRef, type InputHTMLAttributes } from "react"

type Props = InputHTMLAttributes<HTMLInputElement>

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ className = "", ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`
          w-full rounded-xl border border-slate-200 bg-white px-4 py-3
          transition-all duration-200
          focus:border-violet-500 focus:ring-4 focus:ring-violet-100
          ${className}
        `}
        {...props}
      />
    )
  }
)

Input.displayName = "Input"
