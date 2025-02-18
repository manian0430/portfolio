import * as React from "react"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink } from "lucide-react"
import { ImageModal } from "./ImageModal"

interface Project {
  title: string
  description: string
  longDescription?: string
  image: string
  github: string
  demo: string
  tags: string[]
}

interface ProjectDialogProps {
  project: Project
  children: React.ReactNode
}

export function ProjectDialog({ project, children }: ProjectDialogProps) {
  const [isImageLoading, setIsImageLoading] = React.useState(true)

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px] bg-black/50 backdrop-blur-xl border-white/20">
        <DialogHeader>
          <DialogTitle className="text-2xl text-white">{project.title}</DialogTitle>
          <DialogDescription className="text-white/70">
            {project.description}
          </DialogDescription>
        </DialogHeader>
        <ImageModal src={project.image} alt={project.title}>
          <div className="relative aspect-video w-full overflow-hidden rounded-lg cursor-zoom-in">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 z-10" />
            {isImageLoading && (
              <div className="absolute inset-0 bg-gray-900/20 animate-pulse z-20" />
            )}
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-all duration-200"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onLoadingComplete={() => setIsImageLoading(false)}
            />
          </div>
        </ImageModal>
        <div className="mt-4 space-y-4">
          <p className="text-white/90">
            {project.longDescription || project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, index) => (
              <Badge key={index} variant="gradient-subtle">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex gap-4">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center"
            >
              <Button variant="gradient-outline" size="sm">
                <Github className="w-4 h-4 mr-2" />
                View Code
              </Button>
            </a>
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center"
            >
              <Button variant="gradient" size="sm">
                <ExternalLink className="w-4 h-4 mr-2" />
                Live Demo
              </Button>
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 