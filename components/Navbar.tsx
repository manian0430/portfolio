"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
  { name: 'Let\'s Talk', href: '/lets-talk' },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <motion.div 
        className="absolute inset-0 bg-black/50 backdrop-blur-md border-b border-white/10"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      />
      <nav className="container mx-auto px-4 relative">
        <div className="flex h-16 items-center justify-center">
          <motion.div 
            className="flex gap-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {navigation.map((item, index) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative px-4 py-2 group"
                >
                  <span className={cn(
                    "relative z-10 text-sm font-medium transition-colors duration-200",
                    isActive
                      ? "text-white"
                      : "text-white/60 group-hover:text-white"
                  )}>
                    {item.name}
                  </span>
                  
                  {/* Hover background */}
                  <motion.div
                    className="absolute inset-0 rounded-md bg-white/0 transition-colors duration-200"
                    whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                    transition={{ duration: 0.2 }}
                  />

                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                      layoutId="activeTab"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    >
                      <div className="absolute -inset-x-2 -top-2 h-px bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-50 blur-sm" />
                    </motion.div>
                  )}
                </Link>
              )
            })}
          </motion.div>
        </div>
      </nav>
    </header>
  )
} 