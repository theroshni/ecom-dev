"use client";

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Calendar, 
  Clock, 
  Video, 
  Users, 
  Search, 
  Filter,
  ArrowRight,
  PlayCircle,
  Sparkles,
  MapPin
} from 'lucide-react';
import GlassButton from '@/components/ui/GlassButton';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const Events = () => {
  const events = [
    {
      id: 1,
      title: "Next.js 15 & Ecommerce: What's New?",
      description: "Join us for a deep dive into the latest Next.js features and how they impact ecommerce development.",
      date: "Oct 25, 2024",
      time: "10:00 AM PST",
      type: "Webinar",
      host: "Alex Rivera",
      avatar: "https://github.com/shadcn.png",
      attendees: 156,
      image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 2,
      title: "Stripe Connect for Marketplaces",
      description: "Learn how to build complex multi-vendor payment flows using Stripe Connect.",
      date: "Oct 28, 2024",
      time: "2:00 PM PST",
      type: "Workshop",
      host: "Sarah Chen",
      avatar: "https://i.pravatar.cc/150?u=sarah",
      attendees: 89,
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 3,
      title: "Community Q&A: Career Growth",
      description: "Ask our mentors anything about growing your career as an ecommerce developer.",
      date: "Nov 02, 2024",
      time: "11:00 AM PST",
      type: "Meetup",
      host: "David Miller",
      avatar: "https://i.pravatar.cc/150?u=david",
      attendees: 210,
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <Badge className="glass bg-primary/10 text-primary border-primary/20 px-4 py-1.5 rounded-full font-black uppercase tracking-widest text-[10px]">
              Community Hub
            </Badge>
            <h1 className="text-5xl font-black tracking-tight">Community Events</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Join live sessions, workshops, and meetups with the global EcomDev community.
            </p>
          </div>
          <GlassButton className="rounded-2xl px-8 shadow-2xl shadow-primary/20">
            <Calendar className="w-4 h-4 mr-2" /> Host an Event
          </GlassButton>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input placeholder="Search events by title or host..." className="glass border-none pl-12 h-14 rounded-2xl text-lg font-medium focus-visible:ring-primary" />
          </div>
          <GlassButton variant="secondary" size="icon" className="h-14 w-14 rounded-2xl">
            <Filter className="w-6 h-6" />
          </GlassButton>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="glass-card border-none group overflow-hidden">
                <div className="aspect-video relative overflow-hidden">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute top-4 left-4">
                    <Badge className="glass bg-black/50 text-white border-none backdrop-blur-md px-3 py-1 rounded-lg font-bold">
                      {event.type}
                    </Badge>
                  </div>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <GlassButton className="rounded-xl px-8 h-12 font-black" onClick={() => toast.success("Registration successful!")}>
                      Register Now
                    </GlassButton>
                  </div>
                </div>
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 text-[10px] font-black text-primary uppercase tracking-widest mb-4">
                    <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {event.date}</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {event.time}</span>
                  </div>
                  <h3 className="text-2xl font-black mb-3 group-hover:text-primary transition-colors leading-tight">{event.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-8 line-clamp-2">
                    {event.description}
                  </p>
                  
                  <div className="flex items-center justify-between pt-6 border-t border-white/10">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 border-2 border-white/10 group-hover:border-primary transition-colors">
                        <AvatarImage src={event.avatar} />
                        <AvatarFallback className="font-black">{event.host[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-xs font-black">{event.host}</p>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Host</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                      <Users className="w-3.5 h-3.5" /> {event.attendees} joined
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Featured Workshop Banner */}
        <Card className="glass-card border-none bg-gradient-to-r from-primary to-accent p-12 text-white relative overflow-hidden">
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 space-y-8 text-center lg:text-left">
              <Badge className="glass bg-white/20 text-white border-none px-4 py-1.5 rounded-full font-black uppercase tracking-widest text-[10px]">
                Featured Workshop
              </Badge>
              <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">Mastering <br /> Headless Commerce</h2>
              <p className="text-xl text-white/80 max-w-xl leading-relaxed">
                A 4-hour intensive workshop on building high-performance headless stores with Next.js and Shopify. 
                Limited spots available.
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-8">
                <div className="flex items-center gap-3 text-sm font-black uppercase tracking-widest">
                  <Calendar className="w-6 h-6 text-white/60" /> Nov 15, 2024
                </div>
                <div className="flex items-center gap-3 text-sm font-black uppercase tracking-widest">
                  <Video className="w-6 h-6 text-white/60" /> Live on Zoom
                </div>
              </div>
              <GlassButton className="bg-white text-primary hover:bg-white hover:scale-105 rounded-2xl px-12 h-16 text-lg font-black shadow-2xl">
                Secure Your Spot
              </GlassButton>
            </div>
            <div className="w-64 h-64 glass rounded-[3rem] flex items-center justify-center shadow-2xl animate-pulse">
              <PlayCircle className="w-32 h-32 text-white/40" />
            </div>
          </div>
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/20 rounded-full -ml-48 -mb-48 blur-[100px]" />
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Events;