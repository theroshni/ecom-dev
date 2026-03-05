"use client";

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Send, 
  MoreVertical, 
  Phone, 
  Video, 
  Paperclip, 
  Smile,
  Circle,
  ChevronLeft
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import GlassButton from '@/components/ui/GlassButton';
import { motion, AnimatePresence } from 'framer-motion';

const Messages = () => {
  const [activeChatId, setActiveChatId] = React.useState(1);
  const [messageText, setMessageText] = React.useState("");
  
  const [chats, setChats] = React.useState([
    { id: 1, name: "Sarah Chen", avatar: "https://i.pravatar.cc/150?u=sarah", lastMsg: "The Stripe webhook is working now!", time: "10m", online: true, unread: 2, messages: [
      { id: 1, text: "Hey Alex! I've finished the Stripe webhook implementation for the LuxeCart project. Could you take a look at the PR when you have a moment?", time: "10:42 AM", sender: "them" },
      { id: 2, text: "That's awesome, Sarah! I'll check it out right now. Did you manage to fix the signature verification issue?", time: "10:45 AM", sender: "me" },
      { id: 3, text: "Yes! It was exactly what you said—I needed to use the raw request body. The Stripe webhook is working now! 🎉", time: "10:48 AM", sender: "them" }
    ]},
    { id: 2, name: "David Miller (Mentor)", avatar: "https://i.pravatar.cc/150?u=david", lastMsg: "Let's review your architecture tomorrow.", time: "2h", online: true, unread: 0, messages: [
      { id: 1, text: "Hi Alex, I saw your progress on the backend. Let's review your architecture tomorrow.", time: "9:00 AM", sender: "them" }
    ]},
    { id: 3, name: "Alpha Developers", avatar: null, lastMsg: "Alex: I've pushed the new UI kit.", time: "5h", online: false, unread: 0, isGroup: true, messages: [] },
    { id: 4, name: "Mike Ross", avatar: "https://i.pravatar.cc/150?u=mike", lastMsg: "Can you check the PR?", time: "Yesterday", online: false, unread: 0, messages: [] }
  ]);

  const activeChat = chats.find(c => c.id === activeChatId) || chats[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: messageText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sender: "me"
    };

    setChats(prevChats => prevChats.map(chat => {
      if (chat.id === activeChatId) {
        return {
          ...chat,
          messages: [...chat.messages, newMessage],
          lastMsg: messageText,
          time: "Just now"
        };
      }
      return chat;
    }));

    setMessageText("");
    toast.success("Message sent");
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto h-[calc(100vh-160px)]">
        <div className="flex h-full glass rounded-[2.5rem] overflow-hidden shadow-2xl border-none">
          {/* Sidebar: Chat List */}
          <div className="w-80 border-r border-white/10 flex flex-col bg-white/5">
            <div className="p-8 border-b border-white/10">
              <h2 className="text-2xl font-black tracking-tight mb-6">Messages</h2>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search conversations..." className="glass border-none pl-11 h-12 rounded-2xl focus-visible:ring-primary" />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-2">
              {chats.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => setActiveChatId(chat.id)}
                  className={cn(
                    "w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 group relative",
                    activeChatId === chat.id 
                      ? "bg-primary text-white shadow-xl shadow-primary/20" 
                      : "hover:bg-white/5"
                  )}
                >
                  <div className="relative shrink-0">
                    <Avatar className="h-12 w-12 border-2 border-white/10 group-hover:border-primary transition-colors">
                      <AvatarImage src={chat.avatar || ''} />
                      <AvatarFallback className="bg-primary/10 text-primary font-black">
                        {chat.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    {chat.online && (
                      <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-background" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-black text-sm truncate">{chat.name}</h3>
                      <span className={cn("text-[10px] font-bold uppercase tracking-widest", activeChatId === chat.id ? "text-white/60" : "text-muted-foreground")}>{chat.time}</span>
                    </div>
                    <p className={cn("text-xs font-medium truncate", activeChatId === chat.id ? "text-white/80" : "text-muted-foreground")}>{chat.lastMsg}</p>
                  </div>
                  {chat.unread > 0 && activeChatId !== chat.id && (
                    <div className="w-5 h-5 bg-primary text-white text-[10px] font-black rounded-full flex items-center justify-center shadow-lg shadow-primary/40">
                      {chat.unread}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Main: Chat Window */}
          <div className="flex-1 flex flex-col relative">
            {/* Chat Header */}
            <div className="p-6 glass border-none flex items-center justify-between z-10">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Avatar className="h-12 w-12 border-2 border-primary/20">
                    <AvatarImage src={activeChat.avatar || ''} />
                    <AvatarFallback className="bg-primary/10 text-primary font-black">
                      {activeChat.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  {activeChat.online && (
                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-background" />
                  )}
                </div>
                <div>
                  <h3 className="font-black text-lg tracking-tight">{activeChat.name}</h3>
                  <div className="flex items-center gap-2">
                    <div className={cn("w-2 h-2 rounded-full", activeChat.online ? "bg-emerald-500 animate-pulse" : "bg-muted-foreground")} />
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{activeChat.online ? "Active Now" : "Offline"}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <GlassButton variant="secondary" size="icon" className="rounded-xl"><Phone className="w-5 h-5" /></GlassButton>
                <GlassButton variant="secondary" size="icon" className="rounded-xl"><Video className="w-5 h-5" /></GlassButton>
                <GlassButton variant="secondary" size="icon" className="rounded-xl"><MoreVertical className="w-5 h-5" /></GlassButton>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar">
              <div className="flex justify-center">
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground glass px-4 py-1.5 rounded-full">Today</span>
              </div>
              
              <AnimatePresence mode="popLayout">
                {activeChat.messages.map((msg) => (
                  <motion.div 
                    key={msg.id} 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className={cn("flex gap-4 max-w-[75%]", msg.sender === 'me' ? "ml-auto flex-row-reverse" : "")}
                  >
                    <Avatar className="h-9 w-9 border-2 border-white/10 shrink-0 mt-1">
                      <AvatarImage src={msg.sender === 'me' ? "https://github.com/shadcn.png" : activeChat.avatar || ''} />
                      <AvatarFallback className="font-black">{msg.sender === 'me' ? "AR" : activeChat.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1.5">
                      <div className={cn(
                        "p-5 rounded-[2rem] shadow-xl",
                        msg.sender === 'me' 
                          ? "bg-primary text-white rounded-tr-none shadow-primary/10" 
                          : "glass text-foreground rounded-tl-none"
                      )}>
                        <p className="text-sm font-medium leading-relaxed">
                          {msg.text}
                        </p>
                      </div>
                      <span className={cn("text-[10px] font-bold uppercase tracking-widest px-2", msg.sender === 'me' ? "text-primary text-right block" : "text-muted-foreground")}>
                        {msg.time}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Input Area */}
            <div className="p-8 pt-0">
              <form onSubmit={handleSendMessage} className="glass p-3 rounded-[2rem] flex items-center gap-3 shadow-2xl">
                <GlassButton type="button" variant="ghost" size="icon" className="rounded-2xl text-muted-foreground hover:text-primary"><Paperclip className="w-5 h-5" /></GlassButton>
                <Input 
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Type your message..." 
                  className="border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-lg font-medium placeholder:text-muted-foreground"
                />
                <GlassButton type="button" variant="ghost" size="icon" className="rounded-2xl text-muted-foreground hover:text-primary"><Smile className="w-5 h-5" /></GlassButton>
                <GlassButton type="submit" className="rounded-2xl h-12 w-12 p-0 shadow-xl shadow-primary/20">
                  <Send className="w-5 h-5" />
                </GlassButton>
              </form>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Messages;