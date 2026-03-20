"use client"

import Link from "next/link"
import { Facebook, Instagram, Youtube } from "lucide-react"
import { useState } from "react"

export default function Footer() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // TODO: Add newsletter subscription logic
    setEmail("")
    setIsSubmitting(false)
  }

  return (
    <footer className="bg-zinc-900 border-t border-zinc-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Footer Top */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Column 1 - Logo & Newsletter */}
          <div className="flex flex-col gap-6">
            <div className="text-xl font-bold text-white">All Things Automated</div>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Intelligent automation for modern living. Serving Florida's Gulf Coast with premium smart home solutions.
            </p>
            <div className="text-zinc-400 text-sm">
              <p className="font-medium">Sarasota, FL | Insured</p>
              <p>Serving Sarasota, Manatee & Charlotte Counties</p>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-zinc-400 text-sm font-medium">Get smart home tips & offers:</p>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                >
                  Subscribe
                </button>
              </form>
            </div>
            {/* Social Links */}
            <div className="flex gap-4 pt-4">
              <a
                href="#"
                aria-label="Facebook"
                className="text-zinc-400 hover:text-blue-500 transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://www.instagram.com/allthingsautomated8/"
                target="_blank"
                rel="noopener"
                aria-label="Instagram"
                className="text-zinc-400 hover:text-pink-500 transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="text-zinc-400 hover:text-red-500 transition-colors"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Column 2 - Navigation */}
          <div>
            <h4 className="text-white font-semibold mb-6">Navigation</h4>
            <div className="flex flex-col gap-3">
              <Link href="/" className="text-zinc-400 hover:text-white transition-colors text-sm">
                Home
              </Link>
              <Link href="/about" className="text-zinc-400 hover:text-white transition-colors text-sm">
                About Us
              </Link>
              <Link href="/services" className="text-zinc-400 hover:text-white transition-colors text-sm">
                Services
              </Link>
              <Link href="/pricing" className="text-zinc-400 hover:text-white transition-colors text-sm">
                Pricing
              </Link>
              <Link href="/case-studies" className="text-zinc-400 hover:text-white transition-colors text-sm">
                Case Studies
              </Link>
              <Link href="/blog" className="text-zinc-400 hover:text-white transition-colors text-sm">
                Blog
              </Link>
              <Link href="/contact" className="text-zinc-400 hover:text-white transition-colors text-sm">
                Contact
              </Link>
            </div>
          </div>

          {/* Column 3 - Services */}
          <div>
            <h4 className="text-white font-semibold mb-6">Services</h4>
            <div className="flex flex-col gap-3">
              <Link href="/services" className="text-zinc-400 hover:text-white transition-colors text-sm">
                Smart Lighting
              </Link>
              <Link href="/services" className="text-zinc-400 hover:text-white transition-colors text-sm">
                Security & Cameras
              </Link>
              <Link href="/services" className="text-zinc-400 hover:text-white transition-colors text-sm">
                Climate Control
              </Link>
              <Link href="/services" className="text-zinc-400 hover:text-white transition-colors text-sm">
                Full Automation
              </Link>
            </div>
          </div>

          {/* Column 4 - Contact */}
          <div>
            <h4 className="text-white font-semibold mb-6">Contact</h4>
            <div className="flex flex-col gap-3">
              <a
                href="tel:+19412635325"
                className="text-zinc-400 hover:text-white transition-colors text-sm"
              >
                (941) 263-5325
              </a>
              <a
                href="mailto:hello@allthingsautomated.com"
                className="text-zinc-400 hover:text-white transition-colors text-sm"
              >
                hello@allthingsautomated.com
              </a>
              <div className="text-zinc-400 text-sm pt-2">
                <p>Mon-Fri: 9am-5pm ET</p>
                <p>Sat: By appointment</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-zinc-500 text-sm">&copy; 2026 All Things Automated. All rights reserved.</p>
          <Link href="/login" className="text-zinc-500 hover:text-zinc-300 text-sm transition-colors">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  )
}
