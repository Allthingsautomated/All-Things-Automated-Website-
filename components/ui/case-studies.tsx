"use client"

interface CaseStudy {
  title: string
  description: string
  challenge: string
  solution: string
  results: string[]
  tags: string[]
}

interface CaseStudiesProps {
  caseStudies: CaseStudy[]
  title?: string
}

export default function CaseStudies({
  caseStudies,
  title = "Our Case Studies",
}: CaseStudiesProps) {
  return (
    <section className="py-20 px-6 md:px-12 bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {title}
          </h2>
          <p className="text-lg text-zinc-400">
            Real-world smart home transformations
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="space-y-12">
          {caseStudies.map((study, index) => (
            <div
              key={index}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center p-8 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-blue-500/30 transition-all"
            >
              {/* Content */}
              <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                <h3 className="text-3xl font-bold text-white mb-4">
                  {study.title}
                </h3>
                <p className="text-zinc-400 mb-6">{study.description}</p>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm uppercase tracking-wider text-blue-400 font-semibold mb-2">
                      Challenge
                    </h4>
                    <p className="text-zinc-300">{study.challenge}</p>
                  </div>

                  <div>
                    <h4 className="text-sm uppercase tracking-wider text-blue-400 font-semibold mb-2">
                      Solution
                    </h4>
                    <p className="text-zinc-300">{study.solution}</p>
                  </div>

                  <div>
                    <h4 className="text-sm uppercase tracking-wider text-blue-400 font-semibold mb-3">
                      Results
                    </h4>
                    <ul className="space-y-2">
                      {study.results.map((result, i) => (
                        <li key={i} className="flex gap-3 text-zinc-300">
                          <span className="text-green-400 font-bold">✓</span>
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-zinc-800">
                  {study.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-semibold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Visual Placeholder */}
              <div
                className={`h-80 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-zinc-700 rounded-lg flex items-center justify-center ${
                  index % 2 === 1 ? "lg:order-1" : ""
                }`}
              >
                <div className="text-center">
                  <div className="text-6xl mb-4">🏠</div>
                  <p className="text-zinc-400">{study.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
