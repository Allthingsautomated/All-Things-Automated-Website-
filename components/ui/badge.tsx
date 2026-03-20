interface BadgeProps {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "success" | "warning" | "danger"
  size?: "sm" | "md" | "lg"
}

const variantClasses = {
  primary: "bg-blue-500/20 text-blue-300 border border-blue-500/40",
  secondary: "bg-zinc-700 text-zinc-200 border border-zinc-600",
  success: "bg-green-500/20 text-green-300 border border-green-500/40",
  warning: "bg-yellow-500/20 text-yellow-300 border border-yellow-500/40",
  danger: "bg-red-500/20 text-red-300 border border-red-500/40",
}

const sizeClasses = {
  sm: "px-2 py-1 text-xs font-medium rounded",
  md: "px-3 py-1.5 text-sm font-medium rounded-md",
  lg: "px-4 py-2 text-base font-semibold rounded-lg",
}

export default function Badge({
  children,
  variant = "primary",
  size = "md",
}: BadgeProps) {
  return (
    <span className={`inline-block ${variantClasses[variant]} ${sizeClasses[size]}`}>
      {children}
    </span>
  )
}
