import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextResponse } from 'next/server'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '')

export const runtime = 'edge'

export async function POST(req: Request) {
  try {
    const { messages, action } = await req.json()

    const systemMessages: any = {
      default: "You are Ian's AI assistant. You can help with general questions, calculations, and information about Ian's work. Be direct and precise in your answers.",
      summarize: "You are a text summarization expert. Provide clear, concise summaries while maintaining key information.",
      plan: "You are a planning expert. Create detailed, actionable plans with clear steps and timelines.",
      analyze: "You are a data analysis expert. Provide insightful analysis and clear explanations of data patterns.",
      advice: "You are a career and technical advisor. Provide thoughtful, practical advice based on industry best practices."
    }

    const model = genAI.getGenerativeModel({ 
      model: 'gemini-pro',
      generationConfig: {
        temperature: 0.7,
        topP: 1,
        topK: 1,
        maxOutputTokens: 2048,
      },
    })

    try {
      // Format the conversation history
      const conversationHistory = messages
        .slice(0, -1)
        .map((msg: ChatMessage) => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
        .join('\n')

      // Get the current message
      const lastMessage = messages[messages.length - 1] as ChatMessage
      
      // Construct the full prompt
      const prompt = `${systemMessages[action || 'default']}

Previous conversation:
${conversationHistory}

User: ${lastMessage.content}

Please provide a direct and precise answer. If the question involves calculations, show the calculation steps.`

      const result = await model.generateContent(prompt)
      const response = await result.response

      // Ensure we get a valid response
      if (!response.text()) {
        throw new Error('Empty response from model')
      }

      const text = response.text()

      // Log the interaction for debugging
      console.log('User prompt:', lastMessage.content)
      console.log('AI response:', text)

      return NextResponse.json({ content: text })
    } catch (modelError) {
      console.error('Model error:', modelError)
      return NextResponse.json({ 
        content: "I apologize, but I encountered an error processing your request. Please try again with a different question." 
      })
    }
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error', content: 'I apologize, but something went wrong. Please try again.' }, 
      { status: 500 }
    )
  }
}