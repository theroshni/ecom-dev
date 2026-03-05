"use client";

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  Eye, 
  Share2, 
  ExternalLink, 
  Search, 
  Filter,
  Trophy,
  ArrowUpRight,
  Sparkles,
  Plus
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import GlassButton from '@/components/ui/GlassButton';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

const Showcase = () => {
  const projects = [
    {
      id: 1,
      title: "EcoStore - Sustainable Fashion",
      author: "Sarah Chen",
      avatar: "https://i.pravatar.cc/150?u=sarah",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800",
      likes: 245,
      views: "1.2k",
      tech: ["Next.js", "Tailwind", "Stripe"],
      featured: true
    },
    {
      id: 2,
      title: "GadgetFlow Marketplace",
      author: "Alex Rivera",
      avatar: "https://github.com/shadcn.png",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800",
      likes: 189,
      views: "850",
      tech: ["React", "Supabase", "Framer"],
      featured: false
    },
    {
      id: 3,
      title: "OrganicBites Delivery",
      author: "Mike Ross",
      avatar: "https://i.pravatar.cc/150?u=mike",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800",
      likes: 156,
      views: "2.1k",
      tech: ["Vue", "Node.js", "MongoDB"],
      featured: false
    }
  ];

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <Badge className="glass bg-primary/10 text-primary border-primary/20 px-4 py-1.5 rounded-full font-black uppercase tracking-widest text-[10px]">
              Community Gallery
            </Badge>
            <h1 className="text-5xl font-black tracking-tight">Project Showcase</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Explore and get inspired by high-performance projects built by the EcomDev community.
            </p>
          </div>
          <GlassButton className="rounded-2xl px-8 shadow-2xl shadow-primary/20">
            <Plus className="w-4 h-4 mr-2" /> Submit Your Project
          </GlassButton>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input placeholder="Search projects by name, tech, or author..." className="glass border-none pl-12 h-14 rounded-2xl text-lg font-medium focus-visible:ring-primary" />
          </div>
          <GlassButton variant="secondary" size="icon" className="h-14 w-14 rounded-2xl">
            <Filter className="w-6 h-6" />
          </GlassButton>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="glass-card border-none group overflow-hidden">
                <div className="aspect-video relative overflow-hidden">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    <GlassButton className="rounded-xl px-6" asChild>
                      <Link to={`/showcase/${project.id}`}>
                        <Eye className="w-4 h-4 mr-2" /> View Details
                      </Link>
                    </GlassButton>
                  </div>
                  {project.featured && (
                    <div className="absolute top-4 left-4">
                      <Badge className="glass bg-amber-500 text-white border-none backdrop-blur-md px-3 py-1 rounded-lg font-black uppercase tracking-widest text-[10px] flex items-center gap-1.5 shadow-xl">
                        <Trophy className="w-3 h-3" /> Featured
                      </Badge>
                    </div>
                  )}
                </div>
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 border-2 border-white/10 group-hover:border-primary transition-colors">
                        <AvatarImage src={project.avatar} />
                        <AvatarFallback className="font-black">{project.author[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-xs font-black text-muted-foreground uppercase tracking-widest">{project.author}</span>
                    </div>
                    <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                      <span className="flex items-center gap-1.5 text-primary"><Heart className="w-3.5 h-3.5 fill-current" /> {project.likes}</span>
                      <span className="flex items-center gap-1.5"><Eye className="w-3.5 h-3.5" /> {project.views}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-black mb-4 group-hover:text-primary transition-colors leading-tight">{project.title}</h3>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tech.map(t => (
                      <Badge key={t} className="glass bg-white/5 text-muted-foreground border-none px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest">{t}</Badge>
                    ))}
                  </div>

                  <div className="flex gap-3 pt-6 border-t border-white/10">
                    <GlassButton variant="secondary" className="flex-1 h-11 rounded-xl font-black text-xs" onClick={() => toast.success("Project shared!")}>
                      <Share2 className="w-4 h-4 mr-2" /> Share
                    </GlassButton>
                    <GlassButton variant="ghost" className="flex-1 h-11 rounded-xl font-black text-xs text-primary group/btn" asChild>
                      <Link to={`/showcase/${project.id}`}>
                        Details <ArrowUpRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </GlassButton>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Featured Banner */}
        <Card className="glass-card border-none bg-gradient-to-br from-primary to-accent p-12 text-white relative overflow-hidden">
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 space-y-8 text-center lg:text-left">
              <Badge className="glass bg-white/20 text-white border-none px-4 py-1.5 rounded-full font-black uppercase tracking-widest text-[10px]">
                Community Spotlight
              </Badge>
              <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">Showcase Your <br /> Masterpiece</h2>
              <p className="text-xl text-white/80 max-w-xl leading-relaxed">
                Built something amazing? Share it with the community to get feedback, 
                attract collaborators, and get noticed by top ecommerce agencies.
              </p>
              <GlassButton className="bg-white text-primary hover:bg-white hover:scale-105 rounded-2xl px-12 h-16 text-lg font-black shadow-2xl">
                Submit Project <ArrowUpRight className="ml-2 w-5 h-5" />
              </GlassButton>
            </div>
            <div className="w-64 h-64 glass rounded-[3rem] flex items-center justify-center shadow-2xl animate-pulse">
              <Sparkles className="w-32 h-32 text-white/40" />
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

export default Showcase;