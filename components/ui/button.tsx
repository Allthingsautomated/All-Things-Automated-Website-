import Link from "next/link"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline"
  size?: "sm" | "md" | "lg"
  href?: string
  children: React.ReactNode
}

const variantClasses = {
  primary: "bg-blue-500 hover:bg-blue-600 text-white",
  secondary: "bg-zinc-700 hover:bg-zinc-600 text-white",
  outline: "border-2 border-blue-500 text-blue-400 hover:bg-blue-500/10",
}

const sizeClasses = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
}

export default function Button({
  variant = "primary",
  size = "md",
  href,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseClasses = `font-semibold rounded-lg transition-colors inline-flex items-center justify-center ${variantClasses[variant]} ${sizeClasses[size]}`

  if (href) {
    return (
      <Link href={href} className={`${baseClasses} ${className}`}>
        {children}
      </Link>
    )
  }

  return (
    <button className={`${baseClasses} ${className}`} {...props}>
      {children}
    </button>
  )
}
