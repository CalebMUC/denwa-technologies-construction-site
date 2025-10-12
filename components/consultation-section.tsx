"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Clock, Users, Award, ChevronLeft, ChevronRight, MessageCircle } from "lucide-react"
import { GetQuoteModal } from "@/components/get-quote-modal"
import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

const benefits = [
  {
    icon: Clock,
    title: "Save Time",
    description:
      "Get expert advice without the back-and-forth. We'll assess your project quickly and provide clear recommendations.",
  },
  {
    icon: Users,
    title: "Expert Team",
    description:
      "Consult with experienced engineers and project managers who understand Kenyan construction standards.",
  },
  {
    icon: CheckCircle,
    title: "No Obligation",
    description: "Free consultation with no strings attached. Get the information you need to make informed decisions.",
  },
  {
    icon: Award,
    title: "Proven Results",
    description: "Over 500+ successful projects across Kenya. We bring experience and expertise to every consultation.",
  },
]

// Animation variants for carousel slides
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0
  })
}

// Card animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1
  }
}

// Icon animation variants
const iconVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: { 
    scale: 1, 
    rotate: 0
  },
  hover: { 
    scale: 1.1, 
    rotate: 5,
    transition: { duration: 0.2 }
  }
}

export function ConsultationSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  // Calculate benefits per slide based on screen size
  const getBenefitsPerSlide = () => {
    if (typeof window !== "undefined") {
      return window.innerWidth >= 1024 ? 2 : 1
    }
    return 2
  }

  const [benefitsPerSlide, setBenefitsPerSlide] = useState(2)
  const totalSlides = Math.ceil(benefits.length / benefitsPerSlide)

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setBenefitsPerSlide(getBenefitsPerSlide())
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Auto-slide functionality
  useEffect(() => {
    if (isPaused) return

    const timer = setInterval(() => {
      paginate(1)
    }, 6000) // 6 seconds per slide

    return () => clearInterval(timer)
  }, [currentSlide, isPaused, totalSlides])

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection)
    setCurrentSlide((prevSlide) => {
      if (newDirection === 1) {
        return prevSlide === totalSlides - 1 ? 0 : prevSlide + 1
      } else {
        return prevSlide === 0 ? totalSlides - 1 : prevSlide - 1
      }
    })
  }, [totalSlides])

  const goToSlide = (slideIndex: number) => {
    setDirection(slideIndex > currentSlide ? 1 : -1)
    setCurrentSlide(slideIndex)
  }

  const getCurrentBenefits = () => {
    const startIndex = currentSlide * benefitsPerSlide
    const endIndex = Math.min(startIndex + benefitsPerSlide, benefits.length)
    return benefits.slice(startIndex, endIndex)
  }

  return (
    <section 
      className="py-24 bg-white relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-black/[0.02] bg-grid-16"></div>
      </div>
      
      {/* Section Divider - Top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 text-balance leading-tight">
            Get Your Free
            <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent"> Construction Consultation</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Not sure where to start with your construction project? Our experts are here to help. Get professional
            advice tailored to your specific needs and budget with zero commitment.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Benefits Carousel */}
          <div className="relative">
            {/* Navigation Arrows */}
            <button
              onClick={() => paginate(-1)}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg rounded-full p-3 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
              aria-label="Previous benefits"
            >
              <ChevronLeft className="h-6 w-6 text-gray-700" />
            </button>

            <button
              onClick={() => paginate(1)}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg rounded-full p-3 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
              aria-label="Next benefits"
            >
              <ChevronRight className="h-6 w-6 text-gray-700" />
            </button>

            {/* Carousel Content */}
            <div className="relative h-[300px] overflow-hidden rounded-2xl mx-12">
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
                    opacity: { duration: 0.2 }
                  }}
                  className="absolute inset-0"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
                    {getCurrentBenefits().map((benefit, index) => (
                      <motion.div
                        key={`${currentSlide}-${index}`}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ 
                          duration: 0.6,
                          delay: index * 0.2
                        }}
                      >
                        <Card className="h-full bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group hover:scale-105 overflow-hidden">
                          <CardContent className="p-8 h-full flex flex-col justify-center">
                            <motion.div
                              variants={iconVariants}
                              initial="hidden"
                              animate="visible"
                              whileHover="hover"
                              transition={{ 
                                duration: 0.5,
                                delay: index * 0.1 + 0.3
                              }}
                              className="mb-6"
                            >
                              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-orange-200 transition-shadow">
                                <benefit.icon className="h-8 w-8 text-white" />
                              </div>
                            </motion.div>
                            
                            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
                              {benefit.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                              {benefit.description}
                            </p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Progress Bar */}
            <div className="mt-8 w-full max-w-md mx-auto bg-gray-200 rounded-full h-2 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"
                initial={{ width: "0%" }}
                animate={{ 
                  width: `${((currentSlide + 1) / totalSlides) * 100}%` 
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            </div>

            {/* Dot Indicators */}
            <div className="flex justify-center space-x-3 mt-6">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500/50 ${
                    index === currentSlide 
                      ? "bg-orange-500 scale-125 shadow-lg" 
                      : "bg-gray-300 hover:bg-gray-400 hover:scale-110"
                  }`}
                  aria-label={`Go to benefits ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* What You'll Get Section */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-white/90 to-gray-50/80 backdrop-blur-sm rounded-3xl p-10 shadow-2xl border border-white/20"
          >
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">What You'll Get:</h3>
              <div className="space-y-4">
                {[
                  "Project feasibility assessment",
                  "Budget estimation and cost breakdown",
                  "Timeline and milestone planning",
                  "Material recommendations",
                  "Regulatory and permit guidance",
                  "Risk assessment and mitigation",
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center text-left"
                  >
                    <CheckCircle className="h-6 w-6 text-green-500 mr-4 flex-shrink-0" />
                    <span className="text-gray-700 text-lg">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="text-center space-y-4">
              <GetQuoteModal>
                <Button 
                  size="lg" 
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 py-4 text-lg"
                >
                  Book Your Free Consultation
                </Button>
              </GetQuoteModal>
              <p className="text-sm text-gray-500">Usually scheduled within 24-48 hours • Available across Kenya</p>
            </div>
          </motion.div>
        </div>

        {/* Enhanced CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-br from-orange-50/80 to-white/80 backdrop-blur-sm rounded-3xl p-12 md:p-16 max-w-5xl mx-auto shadow-2xl border border-orange-100/50">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Ready to Start Your Project?
            </h3>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Whether you're planning a small renovation or a major construction project, our team is ready to help you
              bring your vision to life with expert guidance every step of the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <GetQuoteModal>
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 px-8 py-4 text-lg"
                >
                  Get Detailed Quote
                </Button>
              </GetQuoteModal>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-orange-500 text-orange-600 hover:bg-orange-50 bg-transparent hover:scale-105 transition-all duration-300 px-8 py-4 text-lg"
                onClick={() =>
                  window.open(
                    "https://wa.me/254700000000?text=Hi, I would like to schedule a free consultation for my construction project.",
                    "_blank",
                  )
                }
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                WhatsApp Consultation
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Section Divider - Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
    </section>
  )
}
