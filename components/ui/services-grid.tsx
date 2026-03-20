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
                className="p-6 bg-zinc-800/50 border border-zinc-700 rounded-xl hover:border-blue-500/50 transition-all hover:bg-zinc-800"
              >
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                  <IconComponent className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-zinc-400 leading-relaxed">
                  {service.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
