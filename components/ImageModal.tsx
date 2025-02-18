import * as React from "react"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

interface ImageModalProps {
  src: string
  alt: string
  className?: string
  children: React.ReactNode
}

export function ImageModal({ src, alt, className, children }: ImageModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-[95vw] max-h-[95vh] w-fit h-fit p-0 bg-transparent border-none">
        <div className="relative w-full max-w-[90vw] max-h-[90vh] aspect-video">
          <Image
            src={src}
            alt={alt}
            fill
            className={cn("object-contain rounded-lg", className)}
            sizes="90vw"
            priority
            quality={100}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
} 