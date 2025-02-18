"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import GradientBackground from "@/components/GradientBackground"

export default function Home() {
  const [text, setText] = useState("")
  const fullText = "A passionate Full Stack Developer creating amazing digital experiences."
  
  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      setText(fullText.slice(0, index))
      index++
      if (index > fullText.length) clearInterval(timer)
    }, 50)
    return () => clearInterval(timer)
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 relative overflow-hidden">
      <GradientBackground />
      
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl font-bold text-white font-mono">
              Hi, I'm Ian Managuelod
            </h1>
            <div className="h-[60px]">
              <p className="text-2xl text-white/90 font-mono">
                {text}
                <motion.span 
                  className="inline-block w-[3px] h-6 bg-white/90 ml-1"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              </p>
            </div>
            <div className="flex gap-4">
              <Link href="/portfolio">
                <Button 
                  variant="gradient" 
                  size="lg"
                  className="hover:scale-105 transform transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                >
                  View My Work
                </Button>
              </Link>
              <Link href="/contact">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="text-white border-white/50 hover:border-white hover:bg-white/10 hover:scale-105 transform transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                >
                  Contact Me
                </Button>
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            className="relative w-80 h-[380px]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-3xl"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative"
            >
              <div className="relative w-80 h-[380px] overflow-hidden">
                <Image
                  src="/aboutmenobg.png"
                  alt="Ian Managuelod"
                  fill
                  className="object-contain transform hover:scale-105 transition-transform duration-300"
                  priority
                  quality={100}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}

