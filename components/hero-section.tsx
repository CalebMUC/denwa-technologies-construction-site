"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Phone } from "lucide-react"
import { GetQuoteModal } from "./get-quote-modal"
import { motion, useAnimation, useInView } from "framer-motion"

// 🧩 Custom Hook for smooth count-up animation
function useCountUp(target: number, start: number = 0, duration: number = 2000, trigger: boolean = false) {
  const [count, setCount] = useState(start)

  useEffect(() => {
    if (!trigger) return

    let startTime: number | null = null

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const current = Math.floor(progress * (target - start) + start)
      setCount(current)
      if (progress < 1) requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
  }, [target, duration, trigger])

  return count
}

export function HeroSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  // Counters
  const projects = useCountUp(20, 0, 2500, isInView)
  const years = useCountUp(5, 0, 2000, isInView)

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 🏗 Background with Parallax Zoom */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform"
        style={{
          backgroundImage: `url('/construction-site-with-cranes-and-buildings-under-.jpg')`,
        }}
        initial={{ scale: 1, opacity: 0.9 }}
        animate={{ scale: 1.1, opacity: 1 }}
        transition={{ duration: 10, ease: "easeOut" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/70 via-gray-900/60 to-gray-900/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </motion.div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } },
          }}
          className="space-y-8"
        >
          {/* 🏗 Heading */}
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight font-inter tracking-tight"
          >
            Denwa Innovation
            <br />
            <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              Construction Company
            </span>
          </motion.h1>

          {/* 🔶 Decorative Line */}
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: { opacity: 1, scale: 1 },
            }}
            className="flex justify-center"
          >
            <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full"></div>
          </motion.div>

          {/* 💬 Tagline */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed font-medium"
          >
            Building your Dreams with precision, quality, and 15+ years of trusted expertise. From concept to
            completion, we deliver excellence.
          </motion.p>

          {/* 🎯 Buttons */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-4"
          >
            <GetQuoteModal>
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white px-10 py-4 text-base font-semibold rounded-2xl shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 hover:scale-105 group"
              >
                Get Free Quote
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </GetQuoteModal>

            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white/30 text-white hover:bg-white/10 bg-white/5 backdrop-blur-sm px-10 py-4 text-base font-semibold rounded-2xl hover:scale-105 transition-all duration-300"
            >
              <Phone className="mr-3 h-5 w-5" />
              +254 717 671 843
            </Button>
          </motion.div>

          {/* 🧮 Animated Stats */}
          <motion.div
            ref={ref}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="pt-12"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-white/80">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-orange-400 font-inter">
                  {projects}+
                </div>
                <div className="text-sm font-medium">Projects Completed</div>
              </div>
              <div className="hidden sm:block w-px h-8 bg-white/20"></div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-orange-400 font-inter">
                  {years}+
                </div>
                <div className="text-sm font-medium">Years Experience</div>
              </div>
              <div className="hidden sm:block w-px h-8 bg-white/20"></div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-orange-400 font-inter">NCA</div>
                <div className="text-sm font-medium">Licensed</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/50 to-transparent"></div>
    </section>
  )
}
