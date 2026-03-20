"use client"

import Link from "next/link"

interface CTABannerProps {
  title: string
  subtitle?: string
  buttonText?: string
  buttonHref?: string
  secondaryButtonText?: string
  secondaryButtonHref?: string
  gradient?: boolean
}

export default function CTABanner({
  title,
  subtitle,
  buttonText = "Get Started",
  buttonHref = "/contact",
  secondaryButtonText,
  secondaryButtonHref,
  gradient = true,
}: CTABannerProps) {
  return (
    <section
      className={`py-20 px-6 md:px-12 ${
        gradient
          ? "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-y border-blue-500/30"
          : "bg-zinc-900"
      }`}
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          {title}
        </h2>
        {subtitle && (
          <p className="text-lg text-zinc-300 mb-8 max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={buttonHref}
            className="inline-block px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors"
          >
            {buttonText}
          </Link>
          {secondaryButtonText && secondaryButtonHref && (
            <Link
              href={secondaryButtonHref}
              className="inline-block px-8 py-4 border-2 border-blue-500 text-blue-400 hover:bg-blue-500/10 font-semibold rounded-lg transition-colors"
            >
              {secondaryButtonText}
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
