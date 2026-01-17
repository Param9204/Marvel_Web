"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Mail, MessageCircle, Send, User, X } from "lucide-react";
import type React from "react";
import { useEffect, useRef, useState } from "react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const botResponses = [
  "Hello! I'm FRIDAY, Tony Stark's AI assistant. How can I help you find the perfect mattress today?",
  "Based on your sleep patterns, I'd recommend our Iron Man Arc Reactor model with advanced cooling technology.",
  "Our Captain America Shield Duo is perfect for couples who need maximum support and motion isolation.",
  "The Thor Mjolnir King features Asgardian memory foam that's literally out of this world!",
  "Would you like me to schedule a consultation with one of our sleep experts?",
  "Our Spider-Man Web Support adapts to your movements throughout the night - perfect for active sleepers.",
  "I can help you compare features across our entire Marvel collection. What's most important to you?",
  "All our mattresses come with a 365-night trial and 25-year warranty. Sleep like a hero, guaranteed!",
];

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm FRIDAY, your AI sleep consultant. How can I help you find the perfect superhero sleep solution?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [sending, setSending] = useState(false);
  const [sendStatus, setSendStatus] = useState<null | "success" | "error">(
    null
  );
  const [showTopShadow, setShowTopShadow] = useState(false);
  const [showBottomShadow, setShowBottomShadow] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleScroll = () => {
      const container = messagesContainerRef.current;
      if (!container) return;
      setShowTopShadow(container.scrollTop > 4);
      setShowBottomShadow(
        container.scrollHeight - container.scrollTop - container.clientHeight >
          4
      );
    };
    const container = messagesContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      handleScroll();
    }
    return () => {
      container?.removeEventListener("scroll", handleScroll);
    };
  }, [isOpen, messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponses[Math.floor(Math.random() * botResponses.length)],
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const transcriptText = messages
    .map(
      (m) =>
        `[${m.timestamp.toLocaleString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}] ${m.sender === "user" ? "You" : "FRIDAY"}: ${m.text}`
    )
    .join("\n");

  const handleSendTranscript = async () => {
    if (!emailValue || !/\S+@\S+\.\S+/.test(emailValue)) {
      setSendStatus(null);
      setIsEmailDialogOpen(true);
      return;
    }
    setSending(true);
    setSendStatus(null);
    try {
      const res = await fetch("http://localhost:4000/api/chat-transcript", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailValue, transcript: transcriptText }),
      });
      if (res.ok) {
        setSendStatus("success");
      } else {
        setSendStatus("error");
      }
    } catch {
      setSendStatus("error");
    }
    setSending(false);
    setIsEmailDialogOpen(false);
  };

  const userBubble =
    "bg-gradient-to-br from-blue-500 via-primary to-blue-400 text-white rounded-br-none";
  const botBubble =
    "bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300 text-black dark:from-gray-700 dark:to-gray-800 rounded-bl-none";

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="lg"
          className="rounded-full w-16 h-16 shadow-2xl bg-gradient-to-br from-primary via-secondary to-primary/80 hover:scale-110 transition-transform"
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <MessageCircle className="h-6 w-6" />
          )}
        </Button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-3rem)]"
          >
            <Card className="shadow-2xl border border-primary/40 overflow-hidden animate-in slide-in-from-bottom-4 duration-300 dark:border-gray-700 dark:bg-gray-900 rounded-xl bg-gradient-to-tr from-gray-900 via-gray-950 to-primary/10">
              <CardHeader className="bg-gradient-to-r from-primary to-secondary text-primary-foreground p-4 dark:from-gray-900 dark:to-gray-800 dark:text-white rounded-t-xl">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <motion.div
                    className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center dark:bg-gray-700 shadow"
                    whileHover={{ rotate: 8, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 350 }}
                  >
                    <Bot className="h-4 w-4 dark:text-white" />
                  </motion.div>
                  FRIDAY AI Assistant
                  <Badge
                    variant="secondary"
                    className="ml-auto text-xs dark:bg-green-800 dark:text-green-200"
                  >
                    Online
                  </Badge>
                </CardTitle>
              </CardHeader>

              <CardContent className="p-0">
                <div
                  ref={messagesContainerRef}
                  className="h-80 overflow-y-auto p-4 space-y-4 dark:bg-gray-900 bg-gradient-to-br from-gray-900 via-gray-950 to-primary/10 relative"
                  style={{ transition: "box-shadow 0.2s" }}
                >
                  {showTopShadow && (
                    <div className="pointer-events-none absolute top-0 left-0 right-0 h-4 z-10 bg-gradient-to-b from-black/30 to-transparent rounded-t-xl" />
                  )}
                  {showBottomShadow && (
                    <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-5 z-10 bg-gradient-to-t from-black/30 to-transparent rounded-b-xl" />
                  )}

                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35 }}
                      className={`flex gap-3 ${
                        message.sender === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      {message.sender === "bot" && (
                        <motion.div
                          className="w-8 h-8 bg-primary shadow-lg rounded-full flex items-center justify-center flex-shrink-0 dark:bg-blue-900"
                          whileHover={{ scale: 1.1, rotate: 10 }}
                          transition={{ type: "spring", stiffness: 250 }}
                        >
                          <Bot className="h-4 w-4 text-primary-foreground dark:text-white" />
                        </motion.div>
                      )}
                      <div
                        className={`max-w-[80%] p-3 rounded-lg shadow ${
                          message.sender === "user" ? userBubble : botBubble
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <p className="text-xs opacity-70 mt-1 text-right">
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                      {message.sender === "user" && (
                        <motion.div
                          className="w-8 h-8 bg-blue-600 shadow-lg rounded-full flex items-center justify-center flex-shrink-0"
                          whileHover={{ scale: 1.1, rotate: -10 }}
                          transition={{ type: "spring", stiffness: 250 }}
                        >
                          <User className="h-4 w-4 text-white" />
                        </motion.div>
                      )}
                    </motion.div>
                  ))}

                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex gap-3 justify-start"
                    >
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 dark:bg-blue-900 shadow">
                        <Bot className="h-4 w-4 text-primary-foreground dark:text-white" />
                      </div>
                      <div className="bg-muted text-black p-3 rounded-lg shadow">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-current rounded-full animate-bounce" />
                          <div
                            className="w-2 h-2 bg-current rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          />
                          <div
                            className="w-2 h-2 bg-current rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <div className="p-4 border-t bg-muted/30 dark:bg-gray-900 dark:border-gray-700 rounded-b-xl">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Ask FRIDAY about our mattresses..."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyPress}
                      className="flex-1 bg-black text-white placeholder:text-gray-400 border border-gray-600 rounded-lg"
                    />
                    <Button
                      onClick={handleSendMessage}
                      size="icon"
                      disabled={!inputValue.trim() || isTyping}
                      className="bg-gradient-to-br from-primary via-secondary to-primary/80"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="mt-2 text-center">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={sending}
                      onClick={() => setIsEmailDialogOpen(true)}
                      className="w-full flex gap-2 justify-center items-center border-primary/40"
                    >
                      <Mail className="h-4 w-4" />
                      📧 Send transcript to my email
                    </Button>
                    {sendStatus === "success" && (
                      <span className="block text-green-600 text-xs mt-2">
                        Transcript sent!
                      </span>
                    )}
                    {sendStatus === "error" && (
                      <span className="block text-red-600 text-xs mt-2">
                        Failed to send email.
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
            <AnimatePresence>
              {isEmailDialogOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
                >
                  <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-xl w-full max-w-xs border border-primary/40">
                    <h3 className="text-lg font-bold mb-2 text-primary">
                      Send transcript
                    </h3>
                    <p className="text-sm mb-2">Enter your email address:</p>
                    <Input
                      type="email"
                      value={emailValue}
                      onChange={(e) => setEmailValue(e.target.value)}
                      placeholder="your@email.com"
                      className="mb-3"
                    />
                    <div className="flex gap-2 justify-end mt-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setIsEmailDialogOpen(false)}
                        disabled={sending}
                      >
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        onClick={handleSendTranscript}
                        disabled={
                          sending ||
                          !emailValue ||
                          !/\S+@\S+\.\S+/.test(emailValue)
                        }
                        className="bg-gradient-to-br from-primary via-secondary to-primary/80"
                      >
                        {sending ? "Sending..." : "Send"}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
