"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { GetQuoteModal } from "./get-quote-modal"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold text-foreground">Denwa Technologies</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
                About
              </a>
              <a href="#services" className="text-muted-foreground hover:text-foreground transition-colors">
                Services
              </a>
              <a href="#projects" className="text-muted-foreground hover:text-foreground transition-colors">
                Projects
              </a>
              <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </a>
            </div>
          </div>

          <div className="hidden md:block">
            <GetQuoteModal>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Get Quote</Button>
            </GetQuoteModal>
            {/* </CHANGE> */}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-card border-t border-border">
              <a href="#about" className="block px-3 py-2 text-muted-foreground hover:text-foreground">
                About
              </a>
              <a href="#services" className="block px-3 py-2 text-muted-foreground hover:text-foreground">
                Services
              </a>
              <a href="#projects" className="block px-3 py-2 text-muted-foreground hover:text-foreground">
                Projects
              </a>
              <a href="#contact" className="block px-3 py-2 text-muted-foreground hover:text-foreground">
                Contact
              </a>
              <div className="px-3 py-2">
                <GetQuoteModal>
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Get Quote</Button>
                </GetQuoteModal>
                {/* </CHANGE> */}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
