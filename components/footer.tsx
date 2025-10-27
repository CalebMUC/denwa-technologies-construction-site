"use client"

import { Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail, Building2 } from "lucide-react"
import { motion } from "framer-motion"

export function Footer() {
  return (
    <footer className="bg-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800"></div>
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-24"></div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-600 to-orange-700 rounded-xl flex items-center justify-center">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white font-inter">Denwa Innovations</h3>
            </div>
            
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed text-sm">
              Kenya's trusted construction partner since 2009. Building excellence across residential, 
              commercial, and infrastructure projects with uncompromising quality and local expertise.
            </p>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-orange-500 flex-shrink-0" />
                <span className="text-gray-300 text-sm">Nairobi, Kenya</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-orange-500 flex-shrink-0" />
                <span className="text-gray-300 text-sm">+254 717 671 843</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-orange-500 flex-shrink-0" />
                <span className="text-gray-300 text-sm">info@denwatech.co.ke</span>
              </div>
            </div>
            
            <div className="flex space-x-4">
              {[
                { icon: Facebook, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Instagram, href: "#" },
                { icon: Linkedin, href: "#" }
              ].map(({ icon: Icon, href }, index) => (
                <a 
                  key={index}
                  href={href} 
                  className="w-10 h-10 bg-gray-800 hover:bg-orange-600 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                >
                  <Icon className="h-4 w-4 text-gray-400 group-hover:text-white" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Services */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold text-white mb-6 font-inter">Our Services</h4>
            <ul className="space-y-3">
              {[
                "Residential Construction",
                "Commercial Buildings",
                "Industrial Facilities",
                "Infrastructure Projects",
                "Renovation & Remodeling",
                "Project Management"
              ].map((service, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="text-gray-400 hover:text-orange-400 transition-colors text-sm leading-relaxed hover:translate-x-1 inline-block transition-transform"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold text-white mb-6 font-inter">Company</h4>
            <ul className="space-y-3">
              {[
                "About Us",
                "Our Projects",
                "Testimonials",
                "Careers",
                "Contact Us",
                "Get Quote"
              ].map((item, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="text-gray-400 hover:text-orange-400 transition-colors text-sm leading-relaxed hover:translate-x-1 inline-block transition-transform"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-gray-400 text-sm">
            © 2025 Denwa Technologies Construction. All rights reserved.
          </p>
          <div className="flex space-x-8">
            <a href="#" className="text-gray-400 hover:text-gray-300 text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-300 text-sm transition-colors">
              Terms of Service
            </a>
          </div>
        </motion.div>
      </div>

      {/* Orange accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600"></div>
    </footer>
  )
}
