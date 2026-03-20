"use client"

interface Testimonial {
  name: string
  title: string
  company?: string
  content: string
  rating: number
}

interface TestimonialsProps {
  testimonials: Testimonial[]
  title?: string
  subtitle?: string
}

export default function TestimonialSection({
  testimonials,
  title = "What Our Clients Say",
  subtitle = "Real feedback from homeowners who've transformed their spaces.",
}: TestimonialsProps) {
  return (
    <section className="py-20 px-6 md:px-12 bg-zinc-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
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

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl p-8 backdrop-blur-sm transition-all duration-300 bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-blue-500/10 border border-blue-500/40 hover:border-cyan-500/60 hover:from-blue-500/20 hover:via-cyan-500/20"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 blur-2xl"></div>
              </div>
              <div className="relative z-10">
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
                      i < testimonial.rating
                        ? "fill-yellow-400"
                        : "fill-zinc-600"
                    }`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-zinc-300 mb-6 leading-relaxed italic">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="border-t border-zinc-700/50 group-hover:border-cyan-500/30 transition-colors pt-4">
                <p className="text-white font-semibold group-hover:text-cyan-200 transition-colors">{testimonial.name}</p>
                <p className="text-zinc-400 group-hover:text-zinc-300 transition-colors text-sm">
                  {testimonial.title}
                  {testimonial.company && `, ${testimonial.company}`}
                </p>
              </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
