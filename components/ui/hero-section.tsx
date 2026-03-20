"use client"

import Link from "next/link"
import Image from "next/image"
import React from "react"

interface HeroStat {
  number: string
  label: string
}

interface HeroSectionProps {
  label?: string
  title: React.ReactNode
  subtitle: string
  backgroundImage: string
  backgroundImageAlt: string
  buttons?: {
    text: string
    href: string
    variant?: "primary" | "outline"
  }[]
  stats?: HeroStat[]
}

export default function HeroSection({
  label,
  title,
  subtitle,
  backgroundImage,
  backgroundImageAlt,
  buttons,
  stats,
}: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt={backgroundImageAlt}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-32">
        {label && (
          <div className="inline-block mb-6 px-4 py-2 bg-blue-500/20 border border-blue-500/40 rounded-full text-blue-300 text-sm font-medium">
            {label}
          </div>
        )}

        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          {title}
        </h1>

        <p className="text-xl text-zinc-300 mb-8 max-w-2xl leading-relaxed">
          {subtitle}
        </p>

        {/* Buttons */}
        {buttons && buttons.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            {buttons.map((button) => (
              <Link
                key={button.href}
                href={button.href}
                className={`inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold transition-colors text-base ${
                  button.variant === "outline"
                    ? "border-2 border-white text-white hover:bg-white/10"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                {button.text}
              </Link>
            ))}
          </div>
        )}

        {/* Stats */}
        {stats && stats.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12">
            {stats.map((stat, index) => (
              <div key={index} className="border-l border-blue-500/30 pl-4">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-zinc-300 text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
