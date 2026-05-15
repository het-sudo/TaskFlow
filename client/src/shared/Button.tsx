import type { ButtonHTMLAttributes } from "react"

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean
}

export function Button({ className = "", loading, children, ...props }: Props) {
  return (
    <button
      className={`
        w-full rounded-xl bg-red-400 px-4 py-3 font-medium text-white
        transition-all duration-200
        hover:scale-[1.01] hover:bg-red-500
        active:scale-[0.99]
        disabled:opacity-70
        ${className}
      `}
      disabled={loading}
      {...props}
    >
      {loading ? "Please wait..." : children}
    </button>
  )
}
