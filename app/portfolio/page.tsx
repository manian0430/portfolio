"use client"

import Image from "next/image"
import GradientBackground from "@/components/GradientBackground"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink } from "lucide-react"
import { ProjectDialog } from "@/components/ProjectDialog"

const projects = [
  {
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce platform built with Next.js, TypeScript, and Tailwind CSS",
    longDescription: "A comprehensive e-commerce solution featuring user authentication, product management, shopping cart functionality, and secure payment processing. Built with modern web technologies and best practices.",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1632&auto=format&fit=crop",
    github: "https://github.com/yourusername/ecommerce",
    demo: "https://ecommerce-demo.com",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL"]
  },
  {
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates",
    longDescription: "A real-time task management system that allows teams to collaborate efficiently. Features include live updates, task assignment, progress tracking, and team chat functionality.",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=1469&auto=format&fit=crop",
    github: "https://github.com/yourusername/taskapp",
    demo: "https://taskapp-demo.com",
    tags: ["React", "Node.js", "Socket.IO", "MongoDB"]
  },
  {
    title: "Weather Dashboard",
    description: "A weather dashboard that displays current and forecasted weather data",
    longDescription: "An intuitive weather application that provides detailed weather information, forecasts, and historical data visualization. Features interactive maps and customizable alerts.",
    image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?q=80&w=1470&auto=format&fit=crop",
    github: "https://github.com/yourusername/weather",
    demo: "https://weather-demo.com",
    tags: ["React", "OpenWeather API", "Chart.js"]
  },
  {
    title: "Portfolio Website",
    description: "A personal portfolio website built with Next.js and Tailwind CSS",
    longDescription: "A modern, responsive portfolio website showcasing my projects and skills. Features smooth animations, dark mode support, and a contact form for potential clients or employers.",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=1469&auto=format&fit=crop",
    github: "https://github.com/yourusername/portfolio",
    demo: "https://portfolio-demo.com",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion"]
  }
]

export default function Portfolio() {
  return (
    <main className="min-h-screen pt-20 pb-16">
      <GradientBackground />
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-4 text-center text-white">My Projects</h1>
          <p className="text-lg text-white/80 mb-8 text-center">
            Here are some of the projects I've worked on. Each project represents my skills and passion for development.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <Card 
                key={index} 
                className="group bg-black/40 backdrop-blur-md border-white/10 overflow-hidden hover:bg-black/50 transition-all duration-300 hover:scale-[1.02] flex flex-col"
              >
                <div className="aspect-video relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 z-10 group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-colors" />
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl text-white">{project.title}</CardTitle>
                  <CardDescription className="text-white/70">{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col flex-1 justify-between space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <Badge
                        key={tagIndex}
                        variant="gradient-subtle"
                        className="hover:scale-105 transition-transform cursor-default"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <Button 
                      variant="gradient-outline" 
                      className="w-full"
                      asChild
                    >
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        View Code
                      </a>
                    </Button>
                    <Button 
                      variant="gradient" 
                      className="w-full"
                      asChild
                    >
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

