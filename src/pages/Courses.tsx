"use client";

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Play, 
  Clock, 
  BarChart, 
  Bookmark, 
  ExternalLink, 
  Filter,
  Youtube,
  Star,
  ChevronRight
} from 'lucide-react';
import GlassButton from '@/components/ui/GlassButton';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("All");

  const courses = [
    {
      id: 1,
      title: "Ecommerce with React & Next.js 14",
      desc: "Build a full-scale production storefront with the latest App Router features.",
      duration: "12h 45m",
      level: "Advanced",
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800",
      youtubeId: "dQw4w9WgXcQ",
      category: "Frontend"
    },
    {
      id: 2,
      title: "Node.js Backend API Masterclass",
      desc: "Master Express, MongoDB, and secure API design for ecommerce platforms.",
      duration: "8h 20m",
      level: "Intermediate",
      thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
      youtubeId: "dQw4w9WgXcQ",
      category: "Backend"
    },
    {
      id: 3,
      title: "Stripe Payment Integration Guide",
      desc: "Learn how to handle subscriptions, webhooks, and global payments securely.",
      duration: "4h 15m",
      level: "Intermediate",
      thumbnail: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=800",
      youtubeId: "dQw4w9WgXcQ",
      category: "Payments"
    },
    {
      id: 4,
      title: "UI/UX Design for High Conversion",
      desc: "Design principles that turn visitors into customers using Figma and Tailwind.",
      duration: "6h 30m",
      level: "Beginner",
      thumbnail: "https://images.unsplash.com/photo-1586717791821-3f44a563dc4c?auto=format&fit=crop&q=80&w=800",
      youtubeId: "dQw4w9WgXcQ",
      category: "Design"
    }
  ];

  const filteredCourses = courses.filter(c => 
    (filter === "All" || c.category === filter) &&
    (c.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <Badge className="glass bg-primary/10 text-primary border-primary/20 px-4 py-1.5 rounded-full font-black uppercase tracking-widest text-[10px]">
              Learning Path
            </Badge>
            <h1 className="text-5xl font-black tracking-tight">Master Ecommerce</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Curated high-quality courses to take you from zero to a professional ecommerce architect.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input 
                placeholder="Search courses..." 
                className="glass border-none pl-12 h-14 w-full md:w-80 rounded-2xl border-none focus-visible:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <GlassButton variant="secondary" size="icon" className="h-14 w-14 rounded-2xl">
              <Filter className="w-6 h-6" />
            </GlassButton>
          </div>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
          {["All", "Frontend", "Backend", "Payments", "Design"].map((cat) => (
            <GlassButton 
              key={cat}
              variant={filter === cat ? 'primary' : 'secondary'}
              size="sm"
              className="rounded-full px-8"
              onClick={() => setFilter(cat)}
            >
              {cat}
            </GlassButton>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course, i) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="glass-card border-none group overflow-hidden">
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={course.thumbnail} 
                    alt={course.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <GlassButton 
                      className="rounded-full h-16 w-16 p-0 bg-white text-primary hover:bg-white hover:scale-110"
                      onClick={() => window.open(`https://youtube.com/watch?v=${course.youtubeId}`, '_blank')}
                    >
                      <Play className="w-8 h-8 fill-current" />
                    </GlassButton>
                  </div>
                  <div className="absolute top-4 left-4">
                    <Badge className="glass bg-black/50 text-white border-none backdrop-blur-md px-3 py-1 rounded-lg font-bold">
                      {course.category}
                    </Badge>
                  </div>
                  <button 
                    className="absolute top-4 right-4 p-2.5 glass rounded-xl text-white hover:bg-primary transition-colors"
                    onClick={() => toast.success("Course bookmarked!")}
                  >
                    <Bookmark className="w-5 h-5" />
                  </button>
                </div>
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">
                    <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {course.duration}</span>
                    <span className="flex items-center gap-1.5"><BarChart className="w-4 h-4" /> {course.level}</span>
                  </div>
                  <h3 className="text-2xl font-black mb-3 group-hover:text-primary transition-colors">{course.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-8 line-clamp-2">
                    {course.desc}
                  </p>
                  <div className="flex items-center justify-between pt-6 border-t border-white/10">
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm font-black">4.9</span>
                      <span className="text-xs text-muted-foreground font-medium ml-1">(1.2k)</span>
                    </div>
                    <GlassButton 
                      variant="ghost" 
                      size="sm" 
                      className="group/btn"
                      onClick={() => window.open(`https://youtube.com/watch?v=${course.youtubeId}`, '_blank')}
                    >
                      Watch Now <ChevronRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                    </GlassButton>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Featured Course Banner */}
        <Card className="glass-card border-none bg-gradient-to-r from-primary/20 to-accent/20 p-12 relative overflow-hidden">
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 space-y-6 text-center lg:text-left">
              <Badge className="glass bg-white/20 text-foreground border-none px-4 py-1.5 rounded-full font-black uppercase tracking-widest text-[10px]">
                Featured Masterclass
              </Badge>
              <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                The Future of <br /> <span className="text-primary">Headless Commerce</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-xl">
                Join our 20-hour intensive masterclass on building high-performance headless stores with Next.js, Shopify, and Stripe.
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <GlassButton size="lg" className="rounded-2xl px-10">Enroll Now</GlassButton>
                <GlassButton variant="secondary" size="lg" className="rounded-2xl px-10">View Syllabus</GlassButton>
              </div>
            </div>
            <div className="w-full max-w-md aspect-video glass rounded-[2.5rem] flex items-center justify-center relative group cursor-pointer overflow-hidden">
              <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-700" />
              <div className="relative z-10 h-20 w-20 bg-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                <Play className="w-8 h-8 text-primary fill-current ml-1" />
              </div>
            </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Courses;