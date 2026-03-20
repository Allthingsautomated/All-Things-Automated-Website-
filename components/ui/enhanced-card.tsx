interface EnhancedCardProps {
  title: string
  description: string
  icon?: React.ReactNode
  gradient?: boolean
  onClick?: () => void
}

export default function EnhancedCard({
  title,
  description,
  icon,
  gradient = true,
  onClick,
}: EnhancedCardProps) {
  return (
    <div
      onClick={onClick}
      className={`group relative overflow-hidden rounded-2xl p-8 backdrop-blur-sm transition-all duration-300 cursor-pointer h-full ${
        gradient
          ? "bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-blue-500/30 hover:border-purple-500/60 hover:from-blue-500/20 hover:via-purple-500/20 hover:to-pink-500/20"
          : "bg-zinc-800/50 border border-zinc-700 hover:border-blue-500/50"
      }`}
    >
      {/* Animated background glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-2xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {icon && (
          <div className="mb-4 text-4xl transform group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
        )}
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
          {title}
        </h3>
        <p className="text-zinc-400 group-hover:text-zinc-300 transition-colors leading-relaxed">
          {description}
        </p>
      </div>

      {/* Hover indicator */}
      <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl -mr-10 -mb-10"></div>
    </div>
  )
}
