"use client"

interface FeatureItem {
  title: string
  description: string
  icon?: string
}

interface FeaturesProps {
  title?: string
  subtitle?: string
  features: FeatureItem[]
  columns?: number
}

export default function Features({
  title = "Why Choose All Things Automated",
  subtitle,
  features,
  columns = 3,
}: FeaturesProps) {
  const gridCols = {
    2: "lg:grid-cols-2",
    3: "lg:grid-cols-3",
    4: "lg:grid-cols-4",
  }[columns] || "lg:grid-cols-3"

  return (
    <section className="py-20 px-6 md:px-12 bg-zinc-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        {(title || subtitle) && (
          <div className="text-center mb-16">
            {title && (
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Features Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 ${gridCols} gap-8`}>
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-8 bg-zinc-800/50 border border-zinc-700 rounded-xl hover:border-blue-500/30 transition-all hover:bg-zinc-800"
            >
              {feature.icon && (
                <div className="text-4xl mb-4">{feature.icon}</div>
              )}
              <h3 className="text-xl font-bold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-zinc-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
