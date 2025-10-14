"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Award, Clock, Users, Star, Shield, Wrench } from "lucide-react"
import { motion } from "framer-motion"

const features = [
  {
    icon: Users,
    title: "Experienced Professionals",
    description: "A seasoned team with over 5 years in residential and commercial projects across Kenya.",
  },
  {
    icon: Award,
    title: "Quality Materials",
    description: "We source only the best materials for lasting durability, style, and climate resilience.",
  },
  {
    icon: Clock,
    title: "Timely Delivery",
    description: "Projects delivered on schedule, every time. We respect your timeline and budget constraints.",
  },
  {
    icon: Star,
    title: "Client Satisfaction",
    description: "Your vision is our blueprint — we ensure results that exceed expectations and build lasting relationships.",
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 }
  }
}

export function WhyChooseUsSection() {
  return (
    <section id="why-choose-us" className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-black/[0.02] bg-grid-16"></div>
      </div>

      {/* Section Divider - Top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance leading-tight">
            Why Choose
            <span className="bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent"> Us</span>
          </h2>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "6rem" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="h-1 bg-gradient-to-r from-orange-600 to-orange-500 rounded-full mx-auto mb-6"
          ></motion.div>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
            We don't just build structures — we build trust and long-term relationships through our unwavering 
            commitment to excellence, innovation, and client satisfaction.
          </p>
        </motion.div>

        {/* Features Section */}
        {/* Mobile Carousel */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="block lg:hidden overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory"
        >
          <div className="flex space-x-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                transition={{ duration: 0.6 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="min-w-[85%] sm:min-w-[60%] snap-center"
              >
                <Card className="h-full bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-300 group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <CardContent className="p-8 text-center h-full flex flex-col justify-between relative z-10">
                    <div>
                      <div className="mb-6 flex justify-center">
                        <div className="p-4 bg-gradient-to-br from-orange-100 to-orange-50 rounded-2xl group-hover:from-orange-200 group-hover:to-orange-100 transition-all duration-300 group-hover:scale-110 shadow-lg group-hover:shadow-orange-500/20">
                          <feature.icon className="h-8 w-8 text-orange-600" />
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-orange-600 transition-colors leading-tight">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground text-pretty leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Desktop Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <Card className="h-full bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-300 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <CardContent className="p-8 text-center h-full flex flex-col justify-between relative z-10">
                  <div>
                    <div className="mb-6 flex justify-center">
                      <div className="p-4 bg-gradient-to-br from-orange-100 to-orange-50 rounded-2xl group-hover:from-orange-200 group-hover:to-orange-100 transition-all duration-300 group-hover:scale-110 shadow-lg group-hover:shadow-orange-500/20">
                        <feature.icon className="h-8 w-8 text-orange-600" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-orange-600 transition-colors leading-tight">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-pretty leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-br from-white/90 to-gray-50/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-white/20 max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Ready to Experience the Denwa Difference?
            </h3>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join hundreds of satisfied clients who chose quality, reliability, and excellence for their construction projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4 text-orange-600" />
                <span>Licensed & Insured</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Wrench className="h-4 w-4 text-orange-600" />
                <span>5+ Years Experience</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Star className="h-4 w-4 text-orange-600" />
                <span>100% Client Satisfaction</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Section Divider - Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
    </section>
  )
}
