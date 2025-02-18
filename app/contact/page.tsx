"use client"

import type React from "react"
import GradientBackground from "@/components/GradientBackground"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, MessageSquare, Send, Twitter, User } from "lucide-react"

export default function Contact() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Handle form submission here
    console.log('Form submitted')
  }

  return (
    <main className="min-h-screen pt-20 pb-16">
      <GradientBackground />
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center text-white">Get in Touch</h1>
          
          <Card className="bg-black/40 backdrop-blur-md border-white/10">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Contact Me</CardTitle>
              <CardDescription className="text-white/70">
                Fill out the form below and I'll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <div className="relative">
                    <Input 
                      id="name" 
                      placeholder="Your Name" 
                      required 
                      className="bg-black/30 border-white/10 text-white placeholder:text-white/50 pl-10"
                    />
                    <User className="w-4 h-4 absolute left-3 top-3 text-white/50" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="relative">
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="Your Email" 
                      required 
                      className="bg-black/30 border-white/10 text-white placeholder:text-white/50 pl-10"
                    />
                    <Mail className="w-4 h-4 absolute left-3 top-3 text-white/50" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="relative">
                    <Input 
                      id="subject" 
                      placeholder="Subject" 
                      required 
                      className="bg-black/30 border-white/10 text-white placeholder:text-white/50 pl-10"
                    />
                    <MessageSquare className="w-4 h-4 absolute left-3 top-3 text-white/50" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Textarea 
                    id="message" 
                    placeholder="Your Message" 
                    required 
                    className="min-h-[150px] bg-black/30 border-white/10 text-white placeholder:text-white/50"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Social Links */}
          <div className="mt-8 flex justify-center space-x-6">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white/80 hover:text-white hover:scale-110 transition-all duration-200"
            >
              <Github className="w-5 h-5" />
              <span className="sr-only">GitHub</span>
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white/80 hover:text-white hover:scale-110 transition-all duration-200"
            >
              <Linkedin className="w-5 h-5" />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white/80 hover:text-white hover:scale-110 transition-all duration-200"
            >
              <Twitter className="w-5 h-5" />
              <span className="sr-only">Twitter</span>
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}

