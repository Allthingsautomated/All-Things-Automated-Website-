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
          ? "relative overflow-hidden bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-pink-600/30 border-y border-blue-500/50"
          : "bg-zinc-900"
      }`}
    >
      {gradient && (
        <>
          <div className="absolute inset-0 opacity-30 blur-3xl">
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply"></div>
            <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply"></div>
          </div>
        </>
      )}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-text">
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
