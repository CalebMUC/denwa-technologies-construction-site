"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, MapPin, Calendar, ChevronLeft, ChevronRight, X, Eye } from "lucide-react"
import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

const projects = [
  {
    title: "Limuru 3 Bedroom House",
    category: "Residential",
    status: "Ongoing",
    location: "Limuru, Kiambu",
    year: "2024",
    image: "/Limuru 3 Bedroom/1.jpg",
    images: ["/Limuru 3 Bedroom/2.jpg", "/Limuru 3 Bedroom/3.jpg", "/Limuru 3 Bedroom/4.jpg"],
    description: "A modern 3-bedroom house in Limuru featuring sustainable design and smart building technology.",
  },
  {
    title: "Mary Immaculate",
    category: "Commercial",
    status: "Completed",
    location: "Nyeri, Kenya",
    year: "2023",
    image: "/Mary Immaculate/1.jpg",
    images: [
      "/Mary Immaculate/2.jpg",
      "/Mary Immaculate/3.jpg",
      "/Mary Immaculate/4.jpg",
      "/Mary Immaculate/5.jpg",
      "/Mary Immaculate/6.jpg",
      "/Mary Immaculate/7.jpg",
      "/Mary Immaculate/8.jpg",
      "/Mary Immaculate/9.jpg",
    ],
    description: "Mary Immaculate school.",
  },
  {
    title: "Gate house at Kimbo",
    category: "Residential",
    location: "Ruiru, Kimbo",
    status: "Completed",
    year: "2022",
    image: "/Gate House Kimbo/1.jpg",
    images: ["/Gate House Kimbo/2.jpg", "/Gate House Kimbo/3.jpg", "/Gate House Kimbo/4.jpg"],
    description: "Gate House at Kimbo Ruiru.",
  },
  {
    title: "Riara Ridge Estate 3 Bedroom House",
    category: "Residential",
    status: "Ongoing",
    location: "Limuru, Ridge Estate",
    year: "2022",
    image: "/Riara Ridge Estate/1.jpg",
    images: ["/Riara Ridge Estate/2.jpg", "/Riara Ridge Estate/3.jpg", "/Riara Ridge Estate/4.jpg"],
    description: "A modern 3-Bedroom House.",
  },
  {
    title: "Perimeter Wall and Gate Limuru",
    category: "Residential",
    location: "Limuru",
    status: "Ongoing",
    year: "2023",
    image: "/Perimeter Wall Limuru/1.jpg",
    images: [
      "/Perimeter Wall Limuru/2.jpg",
      "/Perimeter Wall Limuru/3.jpg",
      "/Perimeter Wall Limuru/4.jpg",
    ],
    description: "Perimeter Wall and Gate Limuru.",
  },
  {
    title: "Perimeter Wall and Gate Kimbo",
    category: "Residential",
    status: "Completed",
    location: "Ruiru, Kimbo",
    year: "2023",
    image: "/Kimbo Perimeter wall/1.jpg",
    images: [
      "/Kimbo Perimeter wall/1.jpg",
      "/Kimbo Perimeter wall/2.jpg",
      "/Kimbo Perimeter wall/3.jpg",
    ],
    description: "Perimeter Wall and Gate Kimbo.",
  },
  {
    title: "Highland Scaping",
    category: "Residential",
    location: "Nyeri",
    status: "Completed",
    year: "2023",
    image: "/Highlands Scaping/1.jpg",
    images: [
      "/Highlands Scaping/2.jpg",
      "/Highlands Scaping/3.jpg",
      "/Highlands Scaping/4.jpg",
    ],
    description: "Landscaping at Highlands.",
  },
]

const slideVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? 1000 : -1000, opacity: 0 }),
  center: { zIndex: 1, x: 0, opacity: 1 },
  exit: (direction: number) => ({ zIndex: 0, x: direction < 0 ? 1000 : -1000, opacity: 0 }),
}

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
}

const modalVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
}

function ProjectGalleryModal({ project, isOpen, onClose }: any) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % project.images.length)
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      if (e.key === "ArrowLeft") prevImage()
      if (e.key === "ArrowRight") nextImage()
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen])

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="relative max-w-6xl max-h-[90vh] mx-4 bg-white rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70"
        >
          <X className="h-5 w-5" />
        </button>

        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/50 text-white rounded-full hover:bg-black/70"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/50 text-white rounded-full hover:bg-black/70"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        <motion.img
          key={currentImageIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          src={project.images[currentImageIndex]}
          alt={`${project.title} - Image ${currentImageIndex + 1}`}
          className="w-full h-96 md:h-[500px] object-cover"
        />

        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2 text-foreground">{project.title}</h3>
          <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
            <span className="bg-primary text-primary-foreground px-2 py-0.5 rounded-full text-xs">{project.category}</span>
            <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {project.location}</span>
            <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {project.year}</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function ProjectsSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [projectsPerSlide, setProjectsPerSlide] = useState(3)

  const getProjectsPerSlide = () =>
    typeof window !== "undefined"
      ? window.innerWidth >= 1024
        ? 3
        : window.innerWidth >= 768
        ? 2
        : 1
      : 3

  useEffect(() => {
    const handleResize = () => setProjectsPerSlide(getProjectsPerSlide())
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const totalSlides = Math.ceil(projects.length / projectsPerSlide)

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => paginate(1), 6000)
    return () => clearInterval(timer)
  }, [currentSlide, isPaused, totalSlides])

  const paginate = useCallback(
    (newDirection: number) => {
      setDirection(newDirection)
      setCurrentSlide((prev) =>
        newDirection === 1 ? (prev === totalSlides - 1 ? 0 : prev + 1) : prev === 0 ? totalSlides - 1 : prev - 1
      )
    },
    [totalSlides]
  )

  const getCurrentProjects = () => {
    const start = currentSlide * projectsPerSlide
    return projects.slice(start, start + projectsPerSlide)
  }

  const openModal = (project: any) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  return (
    <section
      id="projects"
      className="py-20 bg-white relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4">
            Our Projects <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Across Kenya</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Ongoing and completed projects showcasing our expertise in residential, commercial, and infrastructure construction.
          </p>
        </motion.div>

        <div className="relative mb-10">
          <button
            onClick={() => paginate(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white shadow-lg rounded-full p-2 hover:scale-110"
          >
            <ChevronLeft className="h-5 w-5 text-foreground" />
          </button>
          <button
            onClick={() => paginate(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white shadow-lg rounded-full p-2 hover:scale-110"
          >
            <ChevronRight className="h-5 w-5 text-foreground" />
          </button>

          <div className="relative h-[460px] overflow-hidden rounded-2xl">
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
                  opacity: { duration: 0.2 },
                }}
                className="absolute inset-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {getCurrentProjects().map((project, i) => (
                  <motion.div key={i} custom={i} variants={cardVariants} initial="hidden" animate="visible">
                    <Card
                      className="h-full bg-white/90 backdrop-blur-sm border-0 shadow-md hover:shadow-lg transition-all duration-300 group hover:scale-[1.02] cursor-pointer"
                      onClick={() => openModal(project)}
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                        />

                        {/* ✅ Status Badge */}
                        <span
                          className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium text-white ${
                            project.status === "Completed"
                              ? "bg-green-600"
                              : project.status === "Ongoing"
                              ? "bg-yellow-500"
                              : "bg-gray-400"
                          }`}
                        >
                          {project.status}
                        </span>

                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 flex items-center justify-center transition-all duration-300">
                          <Eye className="h-5 w-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                      <CardContent className="p-5">
                        <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        <div className="flex items-center gap-3 mb-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" /> {project.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" /> {project.year}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-3">
                          {project.description}
                        </p>
                        <Button variant="outline" size="sm" className="border-primary/30 hover:bg-primary hover:text-white">
                          View Gallery
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex justify-center gap-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  index === currentSlide ? "bg-primary scale-125" : "bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-br from-white/90 to-muted/40 backdrop-blur-sm rounded-2xl p-10 md:p-14 shadow-xl">
            <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
              Ready to Bring Your Vision to Life?
            </h3>
            <p className="text-base md:text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Discover how we turn concepts into exceptional buildings through craftsmanship and innovation.
            </p>
            <Button size="lg" className="bg-primary text-white hover:bg-primary/90 px-8 py-3 text-base">
              View All Projects
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectGalleryModal
            project={selectedProject}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
