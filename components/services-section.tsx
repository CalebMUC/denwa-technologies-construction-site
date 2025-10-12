"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Home, Building2, Wrench, Hammer, Factory, School, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { GetQuoteModal } from "./get-quote-modal"
import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

const services = [
  {
    icon: Home,
    title: "Residential Construction",
    description:
      "Custom homes, maisonettes, and bungalows built to Kenyan standards with modern amenities and local materials.",
  },
  {
    icon: Building2,
    title: "Commercial Construction",
    description:
      "Office buildings, shopping malls, and commercial complexes designed for Kenya's growing business sector.",
  },
  {
    icon: Factory,
    title: "Industrial Construction",
    description:
      "Warehouses, factories, and industrial facilities built to support Kenya's manufacturing and logistics sectors.",
  },
  {
    icon: School,
    title: "Infrastructure Projects",
    description: "Schools, hospitals, and public facilities contributing to Kenya's development and community growth.",
  },
  {
    icon: Wrench,
    title: "Renovation & Remodeling",
    description:
      "Transform existing spaces with modern designs while respecting Kenyan architectural heritage and climate needs.",
  },
  {
    icon: Hammer,
    title: "Project Management",
    description:
      "End-to-end project coordination with local expertise, ensuring compliance with Kenyan building codes and regulations.",
  },
  {
    icon: Hammer,
    title: "Landscaping Gardening and Cabros",
    description:
      "Complete landscaping solutions including garden design, cabro installation, and outdoor space transformation.",
  },
]

// Animation variants for smooth transitions
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

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
}

export function ServicesSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  // Calculate slides based on screen size (3 services per slide on desktop, 1 on mobile)
  const getServicesPerSlide = () => {
    if (typeof window !== "undefined") {
      return window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1
    }
    return 3
  }

  const [servicesPerSlide, setServicesPerSlide] = useState(3)
  const totalSlides = Math.ceil(services.length / servicesPerSlide)

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setServicesPerSlide(getServicesPerSlide())
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

  const getCurrentServices = () => {
    const startIndex = currentSlide * servicesPerSlide
    const endIndex = Math.min(startIndex + servicesPerSlide, services.length)
    return services.slice(startIndex, endIndex)
  }

  return (
    <section 
      id="services" 
      className="py-16 bg-white relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-black/[0.02] bg-grid-16"></div>
      
      {/* Section Divider - Top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 text-balance leading-tight">
            Our Construction
            <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent"> Services</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            Comprehensive construction solutions tailored for Kenya's unique climate, regulations, and architectural
            needs with world-class standards.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative mb-8">
          {/* Navigation Arrows */}
          <button
            onClick={() => paginate(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg rounded-full p-3 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/50"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6 text-foreground" />
          </button>

          <button
            onClick={() => paginate(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg rounded-full p-3 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/50"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6 text-foreground" />
          </button>

          {/* Carousel Content */}
          <div className="relative h-[320px] overflow-hidden rounded-2xl">
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 h-full">
                  {getCurrentServices().map((service, index) => (
                    <motion.div
                      key={`${currentSlide}-${index}`}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="h-full bg-white/70 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group hover:scale-105">
                        <CardContent className="p-6 text-center h-full flex flex-col justify-between">
                          <div>
                            <div className="mb-4 flex justify-center">
                              <div className="p-3 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-300 group-hover:scale-110">
                                <service.icon className="h-8 w-8 text-primary" />
                              </div>
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                              {service.title}
                            </h3>
                            <p className="text-sm text-muted-foreground text-pretty mb-4 leading-relaxed">
                              {service.description}
                            </p>
                          </div>
                          <GetQuoteModal>
                            <Button
                              variant="outline"
                              size="lg"
                              className="border-2 border-primary text-primary hover:bg-primary hover:text-white bg-transparent transition-all duration-300 hover:scale-105 hover:shadow-lg"
                            >
                              Get Quote
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </GetQuoteModal>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress Bar */}
          <div className="mt-8 w-full bg-muted/30 rounded-full h-2 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full"
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
                className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                  index === currentSlide 
                    ? "bg-primary scale-125 shadow-lg" 
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50 hover:scale-110"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Enhanced CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mt-12"
        >
          <div className="bg-gradient-to-br from-white/80 to-muted/50 backdrop-blur-sm rounded-2xl p-8 md:p-10 shadow-2xl border border-white/20">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Ready to Start Your Project?
            </h3>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed">
              Get a detailed quote for your construction project in Kenya. Our experts will review your requirements and
              provide a comprehensive estimate within 24 hours.
            </p>
            <GetQuoteModal>
              <Button 
                size="default" 
                className="bg-gradient-to-r from-primary to-primary/90 text-white hover:from-primary/90 hover:to-primary shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 px-6 py-3"
              >
                Get Free Detailed Quote
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </GetQuoteModal>
          </div>
        </motion.div>
      </div>
      
      {/* Section Divider - Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
    </section>
  )
}
