import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react"

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  error?: string
  helperText?: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

export const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      className = "",
      label,
      error,
      helperText,
      disabled,
      leftIcon,
      rightIcon,
      ...props
    },
    ref
  ) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-slate-700">
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            disabled={disabled}
            className={`
              w-full rounded-xl border bg-white py-3 text-sm text-slate-800
              outline-none transition-all duration-200

              ${
                error
                  ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                  : "border-slate-200 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
              }

              ${leftIcon ? "pl-10" : "px-4"}

              ${rightIcon ? "pr-10" : "px-4"}

              disabled:cursor-not-allowed
              disabled:bg-slate-100
              disabled:opacity-70

              ${className}
            `}
            {...props}
          />

          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
              {rightIcon}
            </div>
          )}
        </div>

        {error ? (
          <p className="text-sm text-red-500">{error}</p>
        ) : helperText ? (
          <p className="text-sm text-slate-500">{helperText}</p>
        ) : null}
      </div>
    )
  }
)

Input.displayName = "Input"
