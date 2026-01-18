"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bot, Maximize2, MessageCircle, Minimize2, Send, Shield, User, X, Zap } from "lucide-react"
import { useEffect, useRef, useState } from "react"

// Utility hook for responsive height
function useResponsiveHeight(defaultHeight: number, mobileHeight: number) {
  const [height, setHeight] = useState(defaultHeight)

  useEffect(() => {
    // Update height if screen is resized or orientation changes
    const updateHeight = () => {
      if (window.innerWidth <= 640) {
        setHeight(mobileHeight)
      } else {
        setHeight(defaultHeight)
      }
    }
    updateHeight()
    window.addEventListener("resize", updateHeight)
    window.addEventListener("orientationchange", updateHeight)
    return () => {
      window.removeEventListener("resize", updateHeight)
      window.removeEventListener("orientationchange", updateHeight)
    }
  }, [defaultHeight, mobileHeight])

  return height
}

interface Message {
  id: string
  type: "user" | "bot" | "system"
  content: string
  timestamp: Date
  options?: string[]
  isTyping?: boolean
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Responsive height for chat widget
  const chatHeight = useResponsiveHeight(600, 420) // 600px desktop, 420px mobile
  const chatContentHeight = useResponsiveHeight(536, 320) // 536px desktop, 320px mobile

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0)
    }
  }, [isOpen])

  const addMessage = (message: Omit<Message, "id" | "timestamp">) => {
    const newMessage: Message = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, newMessage])

    if (!isOpen && message.type === "bot") {
      setUnreadCount((prev) => prev + 1)
    }
  }

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    // Add user message
    addMessage({ type: "user", content })
    setInputValue("")
    setIsTyping(true)

    // Simulate bot typing delay
    setTimeout(
      () => {
        const response = getBotResponse(content)
        setIsTyping(false)
        addMessage(response)
      },
      1000 + Math.random() * 1000,
    )
  }

  const handleQuickReply = (option: string) => {
    // Handle phone call navigation
    if (option.includes("📞 Call")) {
      window.open("tel:+918799622551", "_self")
      return
    }
    // Handle WhatsApp navigation
    if (option.includes("💬 WhatsApp")) {
      const phoneNumber = "918799622551"
      const message = "Hello! I need assistance with Marvel Factory mattresses."
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
      window.open(whatsappUrl, "_blank")
      return
    }
    // Handle email navigation
    if (option.includes("✉️ Email")) {
      const subject = "Marvel Factory Support Request"
      const body = "Hello,\n\nI need assistance with Marvel Factory mattresses.\n\nThank you!"
      const emailUrl = `mailto:support@marvelfactory.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      window.open(emailUrl, "_self")
      return
    }
    // Handle products page navigation
    if (option.includes("⚡ See all Marvel Collection")) {
      window.open("/products", "_blank")
      return
    }
    // Handle other product-specific navigation (optional - you can add more specific product pages)
    if (option.includes("🔥 View Iron Man Elite")) {
      window.open("/products?filter=iron-man", "_blank")
      return
    }
    if (option.includes("🛡️ View Captain America")) {
      window.open("/products?filter=captain-america", "_blank")
      return
    }
    if (option.includes("🕸️ View Spider-Man Web")) {
      window.open("/products?filter=spider-man", "_blank")
      return
    }
    // Regular message handling for other options
    handleSendMessage(option)
  }

  const handleEscalateToHuman = () => {
    addMessage({
      type: "system",
      content:
        "🦸‍♂️ Connecting you to our Hero Support Team... You can also reach us directly at +91 8799622551 or via WhatsApp for instant help!",
    })
  }

  const openChat = () => {
    setIsOpen(true)
    if (messages.length === 0) {
      // Welcome message with Marvel theme
      setTimeout(() => {
        addMessage({
          type: "bot",
          content: "🦸‍♂️ Hello! I'm FRIDAY, your Marvel Factory sleep assistant. Ready to find your perfect superhero mattress? How can I help you sleep like a hero tonight?",
          options: ["🛏️ Product recommendations", "🚚 Delivery info", "🛡️ Warranty questions", "😴 Sleep tips", "👨‍💼 Talk to human"],
        })
      }, 500)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage(inputValue)
    }
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-20 right-6 z-50">
        <Button
          onClick={openChat}
          size="lg"
          className="rounded-full w-16 h-16 shadow-2xl hero-glow hover:scale-110 transition-all duration-300 relative bg-gradient-to-r from-primary to-red-500"
        >
          <MessageCircle className="w-7 h-7" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0 flex items-center justify-center text-xs bg-red-500 animate-pulse">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-12 right-6 z-50">
      {/* Single Card Container */}
      <Card
        className={`w-96 max-w-[calc(100vw-3rem)] shadow-2xl transition-all duration-300 border-primary/20 ${isMinimized ? "h-16" : ""} animate-in slide-in-from-bottom-4 bg-white/95 backdrop-blur-sm`}
        style={{
          height: isMinimized ? 64 : chatHeight, // 64px minimized, otherwise responsive
          maxHeight: isMinimized ? 64 : chatHeight,
        }}
      >
        {/* Header */}
        <CardHeader className="flex flex-row items-center justify-between p-4 bg-gradient-to-r from-primary via-red-500 to-yellow-500 text-white rounded-t-lg flex-shrink-0">
          <CardTitle className="text-lg font-bold flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                FRIDAY AI Assistant
                <Zap className="w-4 h-4" />
              </div>
              <div className="text-xs opacity-90 font-normal">Marvel Factory Sleep Expert</div>
            </div>
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs bg-green-500/20 text-green-100 border-green-400/30">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse" />
              Online
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-white hover:bg-white/20 h-8 w-8 p-0"
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 h-8 w-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        {/* Content Container */}
        {!isMinimized && (
          <CardContent className="p-0 flex flex-col"
            style={{
              height: chatContentHeight,
              maxHeight: chatContentHeight,
            }}
          >
            {/* Messages Area - Scrollable */}
            <div className="flex-1 overflow-hidden">
              <ScrollArea className="h-full px-4 py-4">
                <div className="space-y-4 pr-4">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                      {/* Bot Avatar */}
                      {message.type === "bot" && (
                        <div className="w-8 h-8 bg-gradient-to-r from-primary to-red-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                          <Bot className="h-4 w-4 text-white" />
                        </div>
                      )}
                      
                      {/* Message Bubble */}
                      <div
                        className={`max-w-[85%] rounded-2xl p-4 shadow-lg ${
                          message.type === "user"
                            ? "bg-gradient-to-r from-primary to-red-500 text-white ml-auto"
                            : message.type === "system"
                              ? "bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 text-foreground text-center border border-yellow-200 dark:border-yellow-800"
                              : "bg-white border border-gray-200 text-gray-800 shadow-md"
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          {message.type === "user" && <User className="w-4 h-4 mt-0.5 flex-shrink-0" />}
                          <div className="flex-1">
                            <p className="text-sm leading-relaxed font-medium">{message.content}</p>
                            
                            {/* Timestamp */}
                            <p className={`text-xs mt-2 ${
                              message.type === "user" ? "text-white/70" : "text-gray-500"
                            }`}>
                              {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            </p>
                            
                            {/* Quick Reply Options */}
                            {message.options && (
                              <div className="mt-4 space-y-2">
                                {message.options.map((option, index) => (
                                  <Button
                                    key={index}
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleQuickReply(option)}
                                    className={`w-full justify-start text-xs h-9 transition-all duration-200 border-primary/20 font-medium ${
                                      option.includes("📞") 
                                        ? "bg-green-50 hover:bg-green-100 text-green-700 hover:text-green-800 border-green-200"
                                        : option.includes("💬")
                                        ? "bg-green-50 hover:bg-green-100 text-green-700 hover:text-green-800 border-green-200"
                                        : option.includes("✉️")
                                        ? "bg-blue-50 hover:bg-blue-100 text-blue-700 hover:text-blue-800 border-blue-200"
                                        : option.includes("⚡ See all") || option.includes("🔥 View") || option.includes("🛡️ View") || option.includes("🕸️ View")
                                        ? "bg-purple-50 hover:bg-purple-100 text-purple-700 hover:text-purple-800 border-purple-200"
                                        : "bg-white/90 hover:bg-primary/10 text-gray-700 hover:text-primary"
                                    }`}
                                  >
                                    {option}
                                  </Button>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* User Avatar */}
                      {message.type === "user" && (
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                          <User className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex gap-3 justify-start">
                      <div className="w-8 h-8 bg-gradient-to-r from-primary to-red-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                      <div className="bg-white border border-gray-200 text-gray-800 rounded-2xl p-4 shadow-md">
                        <div className="flex items-center gap-3">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100" />
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200" />
                          </div>
                          <span className="text-xs text-gray-500 font-medium">FRIDAY is thinking...</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Auto-scroll anchor */}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
            </div>

            {/* Input Section - Fixed at bottom */}
            <div className="p-4 border-t bg-gradient-to-r from-gray-50 to-gray-100 rounded-b-lg flex-shrink-0">
              <div className="flex gap-2 mb-3">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask FRIDAY about mattresses... 🦸‍♂️"
                  onKeyPress={handleKeyPress}
                  className="flex-1 border-primary/20 focus:border-primary transition-all duration-200 bg-white shadow-sm"
                />
                <Button 
                  size="sm" 
                  onClick={() => handleSendMessage(inputValue)} 
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-gradient-to-r from-primary to-red-500 hover:from-primary/90 hover:to-red-500/90 shadow-lg px-4"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              
              {/* Footer */}
              <div className="flex items-center justify-between text-xs text-gray-600">
                <div className="flex items-center gap-2">
                  <Shield className="h-3 w-3 text-primary" />
                  <span className="font-medium">Powered by Stark Industries AI</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleEscalateToHuman}
                  className="text-xs h-6 px-2 text-primary hover:text-primary/80 hover:bg-primary/10 font-medium"
                >
                  <User className="w-3 h-3 mr-1" />
                  Human Support
                </Button>
              </div>
            </div>
            
          </CardContent>
        )}
      </Card>
    </div>
  )
}

function getBotResponse(userMessage: string): Omit<Message, "id" | "timestamp"> {
  const message = userMessage.toLowerCase()

  // Product recommendations
  if (message.includes("product") || message.includes("recommend") || message.includes("mattress") || message.includes("🛏️")) {
    return {
      type: "bot",
      content:
        "🦸‍♂️ Perfect! I'd love to help you find your superhero mattress! What's your biggest sleep challenge - staying cool, needing extra support, or partner movement?",
      options: ["❄️ Cooling technology (Iron Man)", "💪 Superior support (Captain America)", "🕷️ Motion isolation (Spider-Man)", "⚡ See all Marvel Collection"],
    }
  }

  // Delivery information
  if (message.includes("delivery") || message.includes("shipping") || message.includes("when") || message.includes("🚚")) {
    return {
      type: "bot",
      content:
        "🚚 We offer FREE white-glove delivery within 3-7 business days across India! This includes professional setup and removal of your old mattress. Our delivery heroes will handle everything!",
      options: ["📍 Check delivery areas", "🛠️ Setup service details", "♻️ Old mattress removal", "📦 Track my order"],
    }
  }

  // Warranty questions
  if (message.includes("warranty") || message.includes("guarantee") || message.includes("return") || message.includes("🛡️")) {
    return {
      type: "bot",
      content:
        "🛡️ All Marvel Factory mattresses come with an unbeatable 25-year warranty and 365-night sleep trial! That's a full year to make sure you sleep like a true hero. No questions asked returns!",
      options: ["😴 365-night trial details", "🛡️ Warranty coverage", "↩️ Return process", "🔄 Exchange options"],
    }
  }

  // Sleep tips
  if (message.includes("sleep") || message.includes("tip") || message.includes("better") || message.includes("😴")) {
    return {
      type: "bot",
      content:
        "😴 Here are Tony Stark's top sleep tips: Keep your room at 65-68°F (like the Arctic!), maintain a consistent bedtime (even heroes need routine), and avoid screens 1 hour before bed. Want personalized hero sleep advice?",
      options: ["📱 Sleep tracker tips", "🌡️ Temperature optimization", "⏰ Sleep schedule help", "🧘‍♂️ More hero sleep tips"],
    }
  }

  // Human support
  if (message.includes("human") || message.includes("agent") || message.includes("person") || message.includes("👨‍💼")) {
    return {
      type: "bot",
      content:
        "👨‍💼 Absolutely! Let me connect you with our Hero Support Team right away! You can also call us at +91 8799622551 or message us on WhatsApp for instant assistance.",
      options: ["📞 Call +91 8799622551", "💬 WhatsApp support", "✉️ Email support", "🤖 Continue with FRIDAY"],
    }
  }

  // Specific product inquiries
  if (message.includes("iron man") || message.includes("cooling") || message.includes("❄️")) {
    return {
      type: "bot",
      content:
        "🔥 The Iron Man Arc Reactor Elite features Tony's advanced cooling gel technology and arc reactor-inspired support zones. Perfect for hot sleepers who want to stay cool like a superhero! Interested?",
      options: ["🔥 View Iron Man Elite", "❄️ Compare cooling mattresses", "⚡ Arc Reactor technology", "🦸‍♂️ Other Marvel products"],
    }
  }

  if (message.includes("captain america") || message.includes("firm") || message.includes("💪")) {
    return {
      type: "bot",
      content:
        "🛡️ The Captain America Shield Defender offers firm, patriotic support with uncompromising comfort. It's ideal for those who prefer the strength and stability of a firm sleeping surface, just like Cap himself!",
      options: ["🛡️ View Captain America", "💪 Firm mattress options", "⭐ Shield support features", "📏 Size options"],
    }
  }

  if (message.includes("spider") || message.includes("spiderman") || message.includes("🕷️")) {
    return {
      type: "bot",
      content:
        "🕷️ The Spider-Man Web Support features amazing motion isolation technology! Just like Spidey's web, it adapts to your movements while keeping your partner undisturbed. Perfect for couples!",
      options: ["🕸️ View Spider-Man Web", "💑 Couples mattress options", "🏃‍♂️ Motion isolation tech", "🕷️ Web support features"],
    }
  }

  // Pricing questions
  if (message.includes("price") || message.includes("cost") || message.includes("expensive") || message.includes("💰")) {
    return {
      type: "bot",
      content:
        "💰 Our Marvel mattresses range from ₹45,000 to ₹89,000, with current superhero promotions offering up to ₹20,000 off! We also offer 0% EMI options. What's your budget range, hero?",
      options: ["💵 Under ₹50,000", "💳 ₹50,000-₹75,000", "💎 Over ₹75,000", "📊 EMI options"],
    }
  }

  // Location specific
  if (message.includes("keshod") || message.includes("gujarat") || message.includes("rajkot")) {
    return {
      type: "bot",
      content:
        "🏭 Great! We're right here in Keshod, Gujarat! Our Marvel Factory HQ is at Plot No 16, Nr Toral Hotel, Gokul Udhyog Nagar. We offer special local delivery and you can even visit our showroom!",
      options: ["📍 Visit showroom", "🚚 Local delivery", "📞 Call +91 8799622551", "🗓️ Schedule visit"],
    }
  }

  // Default response
  return {
    type: "bot",
    content:
      "🦸‍♂️ I'm here to help you find the perfect Marvel mattress! Whether you need product recommendations, delivery info, warranty details, or sleep tips - just ask! What would you like to know, hero?",
    options: ["🛏️ Product recommendations", "🚚 Delivery info", "🛡️ Warranty questions", "😴 Sleep tips", "👨‍💼 Talk to human"],
  }
}