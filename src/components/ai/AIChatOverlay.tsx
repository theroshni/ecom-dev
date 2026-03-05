"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles, Bot, User, Zap } from 'lucide-react';
import GlassButton from '@/components/ui/GlassButton';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const AIChatOverlay = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([
    { role: 'ai', text: "Hello! I'm your EcomDev AI assistant. How can I help you with your ecommerce build today?" }
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMsg = { role: 'user', text: message };
    setChat(prev => [...prev, userMsg]);
    setMessage("");

    // Simulate AI response
    setTimeout(() => {
      setChat(prev => [...prev, { 
        role: 'ai', 
        text: "That's a great question! For high-performance storefronts, I recommend using Next.js 15 with Partial Prerendering. Would you like me to generate a code snippet for that?" 
      }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-20 right-0 w-[400px] h-[600px] glass rounded-[2.5rem] shadow-2xl border-none flex flex-col overflow-hidden"
          >
            <div className="p-6 bg-primary text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-xl">
                  <Sparkles className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <h3 className="font-black tracking-tight">EcomDev AI</h3>
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-70">Always Online</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
              {chat.map((msg, i) => (
                <div key={i} className={cn("flex gap-3", msg.role === 'user' ? "flex-row-reverse" : "")}>
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                    msg.role === 'ai' ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"
                  )}>
                    {msg.role === 'ai' ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
                  </div>
                  <div className={cn(
                    "p-4 rounded-2xl text-sm font-medium leading-relaxed",
                    msg.role === 'ai' ? "glass bg-white/5" : "bg-primary text-white"
                  )}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSend} className="p-6 pt-0">
              <div className="glass p-2 rounded-2xl flex items-center gap-2 shadow-xl">
                <Input 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask anything..." 
                  className="border-none bg-transparent focus-visible:ring-0 text-sm font-medium"
                />
                <GlassButton type="submit" size="icon" className="h-10 w-10 rounded-xl shrink-0">
                  <Send className="w-4 h-4" />
                </GlassButton>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <GlassButton 
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "h-16 px-8 rounded-[2rem] shadow-2xl transition-all duration-500",
          isOpen ? "bg-white text-primary" : "bg-primary text-white shadow-primary/40"
        )}
      >
        {isOpen ? <X className="w-6 h-6" /> : (
          <>
            <Sparkles className="w-6 h-6 mr-3 fill-current" />
            <span className="font-black">AI Assistant</span>
          </>
        )}
      </GlassButton>
    </div>
  );
};

export default AIChatOverlay;