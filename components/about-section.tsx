"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import { motion } from "framer-motion"

const achievements = [
  "20+ Successful Projects Across Kenya",
  "5+ Years of Local Experience",
  "Licensed by National Construction Authority",
  "Award-Winning Kenyan Construction Team",
  "Expertise in Local Building Codes",
  "Sustainable Construction Practices",
]

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white"></div>
        <div className="absolute inset-0 bg-grid-black/[0.02] bg-grid-24"></div>
      </div>

      <div className="max-w-6xl mx-auto px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight font-inter">
                Building Your Dreams with Precision and Quality,
                <br />
                <span className="text-orange-600"> One Project at a Time</span>
              </h2>
              
              <div className="w-16 h-1 bg-gradient-to-r from-orange-600 to-orange-500 rounded-full"></div>
              
              <p className="text-lg text-gray-700 leading-relaxed font-medium">
                Established in 2020, we've grown into Kenya's most trusted construction partner, 
                delivering precision and quality across diverse projects and challenging environments.
              </p>


              <div className="pt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {achievements.map((achievement, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-3 py-2"
                    >
                      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-sm font-medium text-gray-800">{achievement}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="pt-6">
                <Button 
                  className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 text-sm font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  Learn More About Us
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Image Section */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-xl group-hover:shadow-2xl transition-shadow duration-500">
              <img
                src="/professional-construction-team-at-work-site-wearin.jpg"
                alt="Professional construction team at work"
                className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
            </div>
            
            {/* Stats Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="absolute -bottom-6 -right-6 bg-gradient-to-br from-orange-600 to-orange-700 text-white p-6 rounded-2xl shadow-2xl"
            >
              <div className="text-center">
                <div className="text-2xl font-bold font-inter">5+</div>
                <div className="text-xs font-medium opacity-90">Years in Kenya</div>
              </div>
            </motion.div>

            {/* Secondary stats */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="absolute -top-4 -left-4 bg-white p-4 rounded-2xl shadow-lg border border-gray-100"
            >
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900 font-inter">20+</div>
                <div className="text-xs text-gray-600 font-medium">Projects</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Section Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
    </section>
  )
}
