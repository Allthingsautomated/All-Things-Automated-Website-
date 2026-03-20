"use client"

import { ReactNode } from "react"
import { Lightbulb, Shield, Thermometer, Tv } from "lucide-react"

interface ServiceItem {
  title: string
  description: string
  icon: "lightbulb" | "shield" | "thermometer" | "tv"
}

interface ServicesGridProps {
  label?: string
  title?: string
  subtitle?: string
  services: ServiceItem[]
}

const iconMap = {
  lightbulb: Lightbulb,
  shield: Shield,
  thermometer: Thermometer,
  tv: Tv,
}

export default function ServicesGrid({
  label = "What We Do",
  title = "Our Core Services",
  subtitle = "Comprehensive smart home solutions designed for luxury living on Florida's Gulf Coast.",
  services,
}: ServicesGridProps) {
  return (
    <section className="py-20 px-6 md:px-12 bg-zinc-900">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          {label && (
            <div className="inline-block mb-4 px-4 py-2 bg-blue-500/20 border border-blue-500/40 rounded-full text-blue-300 text-sm font-medium">
              {label}
            </div>
          )}
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

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon]
            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl p-8 backdrop-blur-sm transition-all duration-300 h-full bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-blue-500/30 hover:border-purple-500/60 hover:from-blue-500/20 hover:via-purple-500/20 hover:to-pink-500/20"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-2xl"></div>
                </div>
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-7 h-7 text-blue-300" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-200 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-zinc-400 group-hover:text-zinc-300 transition-colors leading-relaxed">
                    {service.description}
                  </p>
                </div>
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl -mr-12 -mb-12"></div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
