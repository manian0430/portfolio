import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface GradientBackgroundProps {
  className?: string
}

export default function GradientBackground({ className }: GradientBackgroundProps) {
  return (
    <div className={cn("fixed inset-0 -z-10 h-full w-full overflow-hidden", className)}>
      {/* Dark background with noise texture */}
      <div className="absolute inset-0 bg-black/95" />
      
      {/* Animated code patterns */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `
              repeating-linear-gradient(to bottom, transparent, transparent 24px, rgba(255,255,255,0.1) 24px, rgba(255,255,255,0.1) 48px),
              repeating-linear-gradient(to right, transparent, transparent 24px, rgba(255,255,255,0.1) 24px, rgba(255,255,255,0.1) 48px)
            `,
            backgroundSize: '48px 48px'
          }}
          animate={{
            backgroundPosition: ["0px 0px", "48px 48px"]
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Tech symbols and brackets */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-[20%] left-[15%] text-white/20 text-[140px] font-mono transform -rotate-12"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0.15, 0.25, 0.15],
            scale: [0.95, 1, 0.95],
            rotate: [-12, -10, -12]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        >
          {"</>"}
        </motion.div>
        <motion.div
          className="absolute bottom-[20%] right-[15%] text-white/20 text-[140px] font-mono transform rotate-12"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0.15, 0.25, 0.15],
            scale: [0.95, 1, 0.95],
            rotate: [12, 10, 12]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 2,
            ease: "easeInOut"
          }}
        >
          {"{...}"}
        </motion.div>
        <motion.div
          className="absolute top-[60%] left-[60%] text-white/20 text-[120px] font-mono transform -rotate-45"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0.15, 0.25, 0.15],
            scale: [0.95, 1, 0.95],
            rotate: [-45, -43, -45]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 4,
            ease: "easeInOut"
          }}
        >
          {"()=>"}
        </motion.div>
      </div>

      {/* Binary pattern */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 font-mono text-[10px] leading-none text-white/[0.02] whitespace-pre overflow-hidden"
          style={{
            content: "01".repeat(1000)
          }}
          animate={{
            y: ["0%", "-50%"]
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {Array.from({ length: 100 }, () => "01").join("")}
        </motion.div>
      </div>

      {/* Glowing dots */}
      <div className="absolute inset-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]" />
    </div>
  )
} 