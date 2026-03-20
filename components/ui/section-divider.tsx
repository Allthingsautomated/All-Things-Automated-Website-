interface SectionDividerProps {
  variant?: "gradient" | "line" | "dots"
}

export default function SectionDivider({
  variant = "gradient",
}: SectionDividerProps) {
  if (variant === "line") {
    return (
      <div className="py-8 px-6 md:px-12 bg-zinc-950 flex justify-center">
        <div className="w-full max-w-7xl border-t border-zinc-800"></div>
      </div>
    )
  }

  if (variant === "dots") {
    return (
      <div className="py-8 px-6 md:px-12 bg-zinc-950 flex justify-center">
        <div className="flex gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <div className="w-2 h-2 bg-blue-500/50 rounded-full"></div>
          <div className="w-2 h-2 bg-blue-500/30 rounded-full"></div>
        </div>
      </div>
    )
  }

  // gradient variant
  return (
    <div className="h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
  )
}
