"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, MapPin, Calendar, ChevronLeft, ChevronRight, X, Eye } from "lucide-react"
import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

// Helper function to generate image arrays
const generateImageArray = (basePath: string, count: number, startIndex: number = 1) => {
  return Array.from({ length: count }, (_, i) => `${basePath}/${startIndex + i}.jpg`)
}

// Helper function to generate JPEG image arrays
const generateJpegImageArray = (basePath: string, count: number, startIndex: number = 1) => {
  return Array.from({ length: count }, (_, i) => `${basePath}/${startIndex + i}.jpeg`)
}

// Flexible helper function to generate image arrays with custom extension
const generateImageArrayWithExtension = (basePath: string, count: number, extension: 'jpg' | 'jpeg' | 'png' | 'webp' = 'jpg', startIndex: number = 1) => {
  return Array.from({ length: count }, (_, i) => `${basePath}/${startIndex + i}.${extension}`)
}

// Helper function to generate mixed extension image arrays
const generateMixedImageArray = (basePath: string, imageConfig: Array<{index: number, extension: 'jpg' | 'jpeg' | 'png' | 'webp'}>) => {
  return imageConfig.map(config => `${basePath}/${config.index}.${config.extension}`)
}

// Helper function for common mixed patterns (alternating JPEG/JPG)
const generateAlternatingImageArray = (basePath: string, count: number, startIndex: number = 1, pattern: 'jpeg-first' | 'jpg-first' = 'jpeg-first') => {
  return Array.from({ length: count }, (_, i) => {
    const actualIndex = startIndex + i
    const isFirstExtension = i % 2 === 0 // Use array index for alternating, not actual file number
    const extension = pattern === 'jpeg-first' 
      ? (isFirstExtension ? 'JPEG' : 'jpg') 
      : (isFirstExtension ? 'jpg' : 'JPEG')
    return `${basePath}/${actualIndex}.${extension}`
  })
}

// Helper function that generates both extensions (browser will load whichever exists)
const generateDualExtensionArray = (basePath: string, count: number, startIndex: number = 1, primaryExt: 'jpg' | 'jpeg' = 'jpg') => {
  return Array.from({ length: count }, (_, i) => `${basePath}/${startIndex + i}.${primaryExt}`)
}

const projects = [
  {
    title: "Culvert Construction",
    category: "Infrastructure",
    status: "Completed",
    location: "Kenya",
    year: "2024",
    image: "projects done/CULVERT-complete/2.jpeg",
    images: generateImageArrayWithExtension("projects done/CULVERT-complete", 2, 'jpeg', 1), // Generate 1.jpeg to 2.jpeg
    description: "Professional culvert construction ensuring proper water drainage and infrastructure development.",
  },
  {
    title: "Highlands Landscaping",
    category: "Residential",
    status: "Completed",
    location: "Nyeri",
    year: "2023",
    image: "projects done/higlands-landscaping-complete/7.jpg",
    images: [
      "projects done/higlands-landscaping-complete/1.jpeg",
      "projects done/higlands-landscaping-complete/2.jpeg",
      "projects done/higlands-landscaping-complete/3.jpeg",
      "projects done/higlands-landscaping-complete/4.jpg",
      "projects done/higlands-landscaping-complete/5.jpg",
      "projects done/higlands-landscaping-complete/6.jpeg",
      "projects done/higlands-landscaping-complete/7.jpg"
    ], // Explicit JPEG image array
    description: "Complete landscaping transformation at Highlands featuring modern garden design and sustainable practices.",
  },
  {
    title: "Mansionate Speaker House",
    category: "Residential",
    status: "Completed",
    location: "Nyeri",
    year: "2024",
    image: "projects done/mansionate-speaker-nyeri-complete/27.jpg",
    images: generateImageArrayWithExtension("projects done/mansionate-speaker-nyeri-complete", 28, 'jpg', 1), // Generate 1.jpg to 28.jpg
    description: "Luxurious mansion construction in Nyeri featuring modern architecture and premium finishes.",
  },
  {
    title: "Nyeri Warehouse",
    category: "Commercial",
    status: "Completed",
    location: "Nyeri",
    year: "2024",
    image: "projects done/Nyeri-ware-house-complete/31.jpg",
    images: generateImageArrayWithExtension("projects done/Nyeri-ware-house-complete", 40, 'jpg', 1), // Generate 1.jpg to 40.jpg
    description: "Large-scale warehouse construction providing modern storage solutions for commercial operations.",
  },
  {
    title: "Perimeter Wall Kimbo",
    category: "Residential",
    status: "Completed",
    location: "Ruiru, Kimbo",
    year: "2023",
    image: "projects done/peerimetre-kimbo-complete/16.jpeg",
    images: [
      "projects done/peerimetre-kimbo-complete/1.jpg",
      "projects done/peerimetre-kimbo-complete/2.jpg",
      "projects done/peerimetre-kimbo-complete/3.jpg",
      "projects done/peerimetre-kimbo-complete/4.jpeg",
      "projects done/peerimetre-kimbo-complete/5.jpeg",
      "projects done/peerimetre-kimbo-complete/6.jpeg",
      "projects done/peerimetre-kimbo-complete/7.jpeg",
      "projects done/peerimetre-kimbo-complete/8.jpeg",
      "projects done/peerimetre-kimbo-complete/9.jpeg",
      "projects done/peerimetre-kimbo-complete/10.jpg",
      "projects done/peerimetre-kimbo-complete/11.jpg",
      "projects done/peerimetre-kimbo-complete/12.jpeg",
      "projects done/peerimetre-kimbo-complete/13.jpeg",
      "projects done/peerimetre-kimbo-complete/14.jpeg",
      "projects done/peerimetre-kimbo-complete/15.jpeg",
      "projects done/peerimetre-kimbo-complete/16.jpeg"
    ], // Explicit JPG image array
    description: "Secure perimeter wall construction in Kimbo ensuring property safety and boundary definition.",
  },
  {
    title: "Perimeter Wall Limuru",
    category: "Residential",
    status: "Completed",
    location: "Limuru",
    year: "2023",
    image: "projects done/perimetre-limuru-complete/12.jpeg",
    images: [
      "projects done/perimetre-limuru-complete/1.jpeg",
      "projects done/perimetre-limuru-complete/2.jpeg",
      // "projects done/perimetre-limuru-complete/3.jpg",
      "projects done/perimetre-limuru-complete/4.jpg",
      "projects done/perimetre-limuru-complete/5.jpg",
      "projects done/perimetre-limuru-complete/6.jpeg",
      "projects done/perimetre-limuru-complete/7.jpeg",
      "projects done/perimetre-limuru-complete/8.jpeg",
      "projects done/perimetre-limuru-complete/9.jpeg",
      "projects done/perimetre-limuru-complete/10.jpeg",
      "projects done/perimetre-limuru-complete/11.jpeg",
      "projects done/perimetre-limuru-complete/12.jpeg"
    ], // Explicit JPEG image array
    description: "Professional perimeter wall installation in Limuru with modern gate integration.",
  },
  {
    title: "Perimeter Wall Ruiru",
    category: "Residential",
    status: "Completed",
    location: "Ruiru",
    year: "2023",
    image: "projects done/perimtre-ruiru-complete/11.jpeg",
    images: [
      "projects done/perimtre-ruiru-complete/1.jpeg",
      "projects done/perimtre-ruiru-complete/2.jpg",
      "projects done/perimtre-ruiru-complete/3.jpeg",
      "projects done/perimtre-ruiru-complete/4.jpg",
      "projects done/perimtre-ruiru-complete/5.jpg",
      "projects done/perimtre-ruiru-complete/6.jpg",
      "projects done/perimtre-ruiru-complete/7.jpg",
      "projects done/perimtre-ruiru-complete/8.jpeg",
      "projects done/perimtre-ruiru-complete/9.jpeg",
      "projects done/perimtre-ruiru-complete/10.jpeg",
      "projects done/perimtre-ruiru-complete/11.jpeg"
    ], // Explicit mixed extensions
    description: "Comprehensive perimeter wall construction in Ruiru ensuring security and aesthetic appeal.",
  },
  {
    title: "Riara Ridge 3-Bedroom House",
    category: "Residential",
    status: "Ongoing",
    location: "Limuru, Ridge Estate",
    year: "2024",
    image: "projects done/RIARA-RIDGE-3-bedroom-ongoing/18.jpeg",
    images: generateImageArrayWithExtension("projects done/RIARA-RIDGE-3-bedroom-ongoing", 18, 'jpeg', 1), // Generate 1.jpeg to 18.jpeg
    description: "Modern 3-bedroom house construction at Riara Ridge featuring contemporary design and quality finishes.",
  },
  {
    title: "Steel Structure Nyeri",
    category: "Industrial",
    status: "Completed",
    location: "Nyeri",
    year: "2024",
    image: "projects done/steel-structure-in-Nyeri-compl/1.jpg",
    images: generateImageArrayWithExtension("projects done/steel-structure-in-Nyeri-compl", 7, 'jpg', 1), // Generate 1.jpg to 7.jpg
    description: "Industrial steel structure construction in Nyeri providing robust framework for commercial operations.",
  },
  {
    title: "Mary Immaculate School",
    category: "Commercial",
    status: "Completed",
    location: "Nyeri, Kenya",
    year: "2023",
    image: "projects done/Mary-Immaculate/34.jpg",
    images: generateImageArrayWithExtension("projects done/Mary-Immaculate", 34, 'jpg', 1), // Generate 1.jpg to 34.jpg
    description: "Mary Immaculate primary school multi-story classrooms construction project.",
  },
  {
    title: "Gate House Kimbo",
    category: "Residential",
    location: "Ruiru, Kimbo",
    status: "Completed",
    year: "2022",
    image: "projects done/Gate-House-Kimbo-complete/7.jpeg",
    images: [
      "projects done/Gate-House-Kimbo-complete/1.jpg",
      "projects done/Gate-House-Kimbo-complete/2.jpeg",
      "projects done/Gate-House-Kimbo-complete/3.jpeg",
      "projects done/Gate-House-Kimbo-complete/4.jpeg",
      "projects done/Gate-House-Kimbo-complete/5.jpeg",
      "projects done/Gate-House-Kimbo-complete/6.jpeg",
      "projects done/Gate-House-Kimbo-complete/7.jpeg"
    ], // Explicit JPG image array
    description: "Professional gate house construction at Kimbo Ruiru with modern security features.",
  },
]

const slideVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? 1000 : -1000, opacity: 0 }),
  center: { zIndex: 1, x: 0, opacity: 1 },
  exit: (direction: number) => ({ zIndex: 0, x: direction < 0 ? 1000 : -1000, opacity: 0 }),
}

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
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
                  <motion.div 
                    key={i} 
                    variants={cardVariants} 
                    initial="hidden" 
                    animate="visible"
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
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
