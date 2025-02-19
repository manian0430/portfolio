"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SendHorizontal, FileText, ListTodo, BarChart2, HelpCircle, MoreHorizontal, Paperclip, Search, Zap, Mic, Bot, Copy, RefreshCw, ThumbsUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import GradientBackground from "@/components/GradientBackground"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface Message {
  role: 'user' | 'assistant'
  content: string
  liked?: boolean
}

const messageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, x: -10 }
}

const regenerateResponse = async (messages: Message[], messageIndex: number, currentAction: string) => {
  const previousMessages = messages.slice(0, messageIndex + 1)
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messages: previousMessages,
      action: currentAction,
    }),
  })

  if (!response.ok) throw new Error('Failed to get response')

  const data = await response.json()
  return {
    role: 'assistant' as const,
    content: data.content
  }
}

const formatMessage = (content: string) => {
  // Check for code blocks
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g
  let formattedContent = content
  let match

  while ((match = codeBlockRegex.exec(content)) !== null) {
    const language = match[1] || 'text'
    const code = match[2]
    const highlighted = (
      <SyntaxHighlighter
        language={language}
        style={atomDark}
        className="rounded-md !bg-black/50 !p-4 my-2"
      >
        {code}
      </SyntaxHighlighter>
    )
    formattedContent = formattedContent.replace(match[0], highlighted as any)
  }

  return formattedContent
}

export default function LetsTalk() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hi! I\'m Ian\'s AI assistant powered by Google Gemini. How can I help you learn more about Ian\'s work and experience?'
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [currentAction, setCurrentAction] = useState<string>('default')
  const [isRecording, setIsRecording] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = { role: 'user', content: input.trim() }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          action: currentAction,
        }),
      })

      if (!response.ok) throw new Error('Failed to get response')

      const data = await response.json()
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.content,
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error:', error)
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'I apologize, but I encountered an error. Please try again.',
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickAction = (action: string, defaultPrompt: string) => {
    setCurrentAction(action)
    setInput(defaultPrompt)
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.type.startsWith('text/')) {
      const text = await file.text()
      setInput(`Please analyze this text:\n\n${text}`)
    } else if (file.type.startsWith('image/')) {
      const newMessage: Message = { 
        role: 'assistant', 
        content: 'Image upload functionality will be implemented soon! For now, you can describe what you see in the image.' 
      }
      setMessages(prev => [...prev, newMessage])
    }
  }

  const handleVoiceInput = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition()
      recognition.continuous = false
      recognition.interimResults = false

      recognition.onstart = () => {
        setIsRecording(true)
      }

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setInput(transcript)
        setIsRecording(false)
      }

      recognition.onerror = () => {
        setIsRecording(false)
      }

      recognition.onend = () => {
        setIsRecording(false)
      }

      recognition.start()
    } else {
      alert('Speech recognition is not supported in your browser.')
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
    } catch (err) {
      console.error('Failed to copy text:', err)
    }
  }

  const handleRegenerateResponse = async (messageIndex: number) => {
    if (isLoading) return
    setIsLoading(true)
    
    try {
      const newMessage = await regenerateResponse(messages, messageIndex, currentAction)
      setMessages(prev => [...prev.slice(0, messageIndex + 1), newMessage])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleLike = (index: number) => {
    setMessages(prev => prev.map((msg, i) => 
      i === index ? { ...msg, liked: !msg.liked } : msg
    ))
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-4 relative">
      <GradientBackground />
      
      <div className="z-10 w-full max-w-4xl mx-auto pt-20 pb-4 flex flex-col h-[calc(100vh-2rem)]">
        <AnimatePresence>
          {messages.length === 1 && (
            <motion.div 
              className="text-center mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <h1 className="text-2xl font-bold text-white mb-2">What can I help with?</h1>
              <p className="text-white/70">Ask me anything about Ian's work and experience</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Messages Container */}
        <Card className="flex-1 overflow-hidden bg-black/20 backdrop-blur-sm border-white/10">
          <ScrollArea className="h-full">
            <CardContent className="space-y-4 p-4">
              <AnimatePresence initial={false}>
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    variants={messageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`flex items-start gap-3 group ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.role === 'assistant' && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                    )}
                    <div className="relative">
                      <div
                        className={`max-w-[80%] p-4 rounded-lg ${
                          message.role === 'user'
                            ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white ml-12'
                            : 'bg-white/10 backdrop-blur-sm text-white/90'
                        }`}
                      >
                        {typeof message.content === 'string' 
                          ? formatMessage(message.content)
                          : message.content}
                      </div>
                      {message.role === 'assistant' && (
                        <div className="absolute -right-12 top-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-white/70 hover:text-white"
                                  onClick={() => copyToClipboard(message.content)}
                                >
                                  <Copy className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Copy response</p>
                              </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-white/70 hover:text-white"
                                  onClick={() => handleRegenerateResponse(index)}
                                >
                                  <RefreshCw className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Regenerate response</p>
                              </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className={`h-8 w-8 ${message.liked ? 'text-pink-500 hover:text-pink-400' : 'text-white/70 hover:text-white'}`}
                                  onClick={() => toggleLike(index)}
                                >
                                  <ThumbsUp className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{message.liked ? 'Unlike' : 'Like'} response</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      )}
                    </div>
                    {message.role === 'user' && (
                      <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={messagesEndRef} />
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg text-white/90">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </ScrollArea>
        </Card>

        {/* Input Form */}
        <Card className="mt-4 bg-black/20 backdrop-blur-sm border-white/10 overflow-hidden">
          <form onSubmit={handleSubmit}>
            <div className="p-2">
              <div className="flex gap-2 items-start">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Message Gemini..."
                  className="bg-transparent border-0 focus:ring-0 text-white placeholder:text-white/50 resize-none min-h-[44px] max-h-[200px]"
                  rows={1}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleSubmit(e)
                    }
                  }}
                />
                <div className="flex gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          onClick={handleVoiceInput}
                          className={`text-white/70 hover:text-white transition-colors ${isRecording ? 'text-red-500 hover:text-red-400' : ''}`}
                        >
                          <Mic className="h-5 w-5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Voice input</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <Button
                    type="submit"
                    size="icon"
                    disabled={!input.trim() || isLoading}
                    className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white transition-all duration-300 hover:scale-105"
                  >
                    <SendHorizontal className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </form>

          {/* Quick Actions */}
          <div className="border-t border-white/10">
            <ScrollArea>
              <div className="p-2 flex gap-2 min-w-max">
                <ScrollBar orientation="horizontal" />
                <TooltipProvider>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    className="hidden"
                    accept="text/*,image/*"
                  />
                  {currentAction !== 'default' && (
                    <Badge variant="secondary" className="bg-white/10 text-white/70">
                      {currentAction}
                    </Badge>
                  )}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-white/70 hover:text-white whitespace-nowrap group transition-colors"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Paperclip className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                        Attach
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Upload a file</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-white/70 hover:text-white whitespace-nowrap group transition-colors"
                        onClick={() => handleQuickAction('search', 'Search through Ian\'s portfolio and experience for: ')}
                      >
                        <Search className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                        Search
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Search through Ian's portfolio and experience</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-white/70 hover:text-white whitespace-nowrap group transition-colors"
                        onClick={() => handleQuickAction('reason', 'Help me reason through this problem: ')}
                      >
                        <Zap className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                        Reason
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Help me reason through this problem</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-white/70 hover:text-white whitespace-nowrap group transition-colors"
                        onClick={() => handleQuickAction('summarize', 'Please summarize this text: ')}
                      >
                        <FileText className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                        Summarize text
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Please summarize this text</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-white/70 hover:text-white whitespace-nowrap group transition-colors"
                        onClick={() => handleQuickAction('plan', 'Help me create a plan for: ')}
                      >
                        <ListTodo className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                        Make a plan
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Help me create a plan for</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-white/70 hover:text-white whitespace-nowrap group transition-colors"
                        onClick={() => handleQuickAction('analyze', 'Please analyze this data: ')}
                      >
                        <BarChart2 className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                        Analyze data
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Please analyze this data</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-white/70 hover:text-white whitespace-nowrap group transition-colors"
                        onClick={() => handleQuickAction('advice', 'I need advice about: ')}
                      >
                        <HelpCircle className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                        Get advice
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>I need advice about</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </ScrollArea>
          </div>
        </Card>
      </div>
    </main>
  )
} 