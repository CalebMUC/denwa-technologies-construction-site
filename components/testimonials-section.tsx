"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, MessageSquare, ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { ClientTestimonialModal } from "./client-testimonial-modal"
import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

const testimonials = [
  {
    name: "David Kimani",
    role: "Homeowner, Nairobi",
    content:
      "Excellent work on our family home in Karen. The team was professional, completed on time, and the quality exceeded our expectations. Highly recommend for residential projects.",
    rating: 5,
    project: "4-Bedroom Villa",
    avatar: "DK",
  },
  {
    name: "Sarah Wanjiku",
    role: "Business Owner, Mombasa",
    content:
      "They built our hotel in Diani and it's been a year with no issues. Great attention to detail and they understood our coastal construction requirements perfectly.",
    rating: 5,
    project: "Boutique Hotel",
    avatar: "SW",
  },
  {
    name: "John Mwangi",
    role: "Developer, Kisumu",
    content:
      "Professional team that delivered our apartment complex on budget and ahead of schedule. Their project management skills are outstanding.",
    rating: 5,
    project: "Residential Complex",
    avatar: "JM",
  },
  {
    name: "Grace Achieng",
    role: "School Administrator, Nakuru",
    content:
      "Built our new school block with excellent craftsmanship. They worked around our schedule to minimize disruption to classes. Very satisfied with the results.",
    rating: 5,
    project: "Educational Facility",
    avatar: "GA",
  },
  {
    name: "Peter Ochieng",
    role: "Factory Owner, Eldoret",
    content:
      "Constructed our manufacturing facility with all the technical requirements we needed. Great understanding of industrial construction standards.",
    rating: 5,
    project: "Industrial Facility",
    avatar: "PO",
  },
  {
    name: "Mary Njeri",
    role: "Clinic Owner, Thika",
    content:
      "They renovated our medical clinic beautifully. Very clean work and they understood the specific needs of a healthcare facility.",
    rating: 5,
    project: "Medical Facility",
    avatar: "MN",
  },
]

// Animation variants
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: { zIndex: 1, x: 0, opacity: 1 },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
}

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1 },
}

const starVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: { opacity: 1, scale: 1 },
}

export function TestimonialsSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const getTestimonialsPerSlide = () => {
    if (typeof window !== "undefined") {
      return window.innerWidth >= 1024 ? 2 : 1
    }
    return 2
  }

  const [testimonialsPerSlide, setTestimonialsPerSlide] = useState(2)
  const totalSlides = Math.ceil(testimonials.length / testimonialsPerSlide)

  useEffect(() => {
    const handleResize = () => setTestimonialsPerSlide(getTestimonialsPerSlide())
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => paginate(1), 7000)
    return () => clearInterval(timer)
  }, [currentSlide, isPaused, totalSlides])

  const paginate = useCallback(
    (newDirection: number) => {
      setDirection(newDirection)
      setCurrentSlide((prevSlide) =>
        newDirection === 1
          ? prevSlide === totalSlides - 1
            ? 0
            : prevSlide + 1
          : prevSlide === 0
          ? totalSlides - 1
          : prevSlide - 1
      )
    },
    [totalSlides]
  )

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1)
    setCurrentSlide(index)
  }

  const getCurrentTestimonials = () => {
    const startIndex = currentSlide * testimonialsPerSlide
    const endIndex = Math.min(startIndex + testimonialsPerSlide, testimonials.length)
    return testimonials.slice(startIndex, endIndex)
  }

  return (
    <section
      className="py-28 bg-white relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="absolute inset-0 bg-grid-black/[0.02] bg-grid-16"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight mb-4">
            What Our{" "}
            <span className="bg-gradient-to-r from-orange-500 to-orange-700 bg-clip-text text-transparent">
              Clients Say
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Hear from homeowners, developers, and business owners who trusted Denwa Innovation to deliver
            excellence across Kenya’s construction landscape.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative mb-20">
          {/* Navigation */}
          <button
            onClick={() => paginate(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 z-20 transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="h-6 w-6 text-gray-700" />
          </button>

          <button
            onClick={() => paginate(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 z-20 transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="h-6 w-6 text-gray-700" />
          </button>

          {/* Slide Area */}
          <div className="relative h-[440px] overflow-hidden rounded-3xl mx-10">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentSlide}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.25 },
                }}
                className="absolute inset-0"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
                  {getCurrentTestimonials().map((testimonial, index) => (
                    <motion.div
                      key={`${currentSlide}-${index}`}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ duration: 0.5, delay: index * 0.2 }}
                    >
                      <Card className="h-full bg-white/85 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-300 group hover:scale-[1.02] relative overflow-hidden rounded-3xl">
                        <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                          <Quote className="h-16 w-16 text-orange-600 transform rotate-180" />
                        </div>

                        <CardContent className="p-8 flex flex-col justify-between h-full relative z-10">
                          {/* Stars */}
                          <div className="flex mb-5">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <motion.div
                                key={i}
                                variants={starVariants}
                                initial="hidden"
                                animate="visible"
                                transition={{ duration: 0.25, delay: i * 0.1 }}
                              >
                                <Star className="h-5 w-5 fill-amber-400 text-amber-400 mr-1" />
                              </motion.div>
                            ))}
                          </div>

                          {/* Text */}
                          <blockquote className="text-gray-700 text-lg leading-relaxed italic mb-6">
                            “{testimonial.content}”
                          </blockquote>

                          {/* Footer */}
                          <div className="border-t border-gray-200 pt-5 flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-orange-500 rounded-full flex items-center justify-center text-white font-semibold text-lg shadow-md">
                              {testimonial.avatar}
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900 text-lg">
                                {testimonial.name}
                              </div>
                              <div className="text-sm text-gray-500">{testimonial.role}</div>
                              <div className="text-sm text-orange-600 font-semibold mt-1">
                                {testimonial.project}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress Indicator */}
          <div className="mt-8 w-full max-w-sm mx-auto bg-gray-100 rounded-full h-2 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-orange-500 to-orange-700 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-3 mt-6">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-orange-600 scale-125 shadow-md"
                    : "bg-gray-300 hover:bg-gray-400 hover:scale-110"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Bottom Note */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
        >
          Join hundreds of satisfied clients who trust{" "}
          <span className="font-semibold text-gray-900">Denwa Innovation</span> to bring their projects to life
          with integrity, precision, and craftsmanship.
        </motion.p>
      </div>
    </section>
  )
}
