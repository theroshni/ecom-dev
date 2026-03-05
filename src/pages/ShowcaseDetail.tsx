"use client";

import React from 'react';
import { Link, useParams } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronLeft, 
  Heart, 
  Eye, 
  Share2, 
  ExternalLink, 
  Github, 
  MessageSquare,
  Sparkles,
  Zap,
  Layout,
  Database,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import GlassButton from '@/components/ui/GlassButton';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const ShowcaseDetail = () => {
  const { id } = useParams();
  
  const project = {
    title: "EcoStore - Sustainable Fashion",
    author: "Sarah Chen",
    avatar: "https://i.pravatar.cc/150?u=sarah",
    role: "Senior Frontend Engineer",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200",
    description: "A high-performance ecommerce storefront built with Next.js 15 and Tailwind CSS. Features include real-time inventory tracking, multi-currency support, and a custom-built checkout flow using Stripe Connect.",
    likes: 245,
    views: "1.2k",
    tech: [
      { name: "Next.js 15", icon: Layout, desc: "App Router & PPR" },
      { name: "Supabase", icon: Database, desc: "Real-time DB & Auth" },
      { name: "Stripe", icon: Zap, desc: "Global Payments" },
      { name: "Tailwind 4", icon: Sparkles, desc: "Utility-first styling" }
    ],
    features: [
      "Partial Prerendering (PPR) for instant loads",
      "Optimized Image Pipeline with Next/Image",
      "Server Actions for secure cart management",
      "Custom Webhook handlers for Stripe events"
    ]
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        <Link to="/showcase" className="flex items-center text-sm font-bold text-muted-foreground hover:text-primary transition-colors group">
          <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" /> Back to Showcase
        </Link>

        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="aspect-video glass rounded-[3rem] overflow-hidden relative shadow-2xl"
            >
              <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-14 w-14 border-2 border-white/20">
                    <AvatarImage src={project.avatar} />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="text-2xl font-black text-white tracking-tight">{project.title}</h1>
                    <p className="text-sm font-bold text-white/70 uppercase tracking-widest">by {project.author}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <GlassButton className="rounded-xl px-6 h-12 bg-white text-primary hover:bg-white">
                    <ExternalLink className="w-4 h-4 mr-2" /> Live Demo
                  </GlassButton>
                </div>
              </div>
            </motion.div>

            <Card className="glass-card border-none p-10">
              <h2 className="text-3xl font-black mb-6">About the Project</h2>
              <p className="text-xl text-muted-foreground leading-relaxed mb-10 font-medium">
                {project.description}
              </p>
              
              <h3 className="text-xl font-black mb-6 flex items-center gap-3">
                <div className="p-2 glass rounded-xl bg-primary/10"><Sparkles className="w-5 h-5 text-primary" /></div>
                Key Features
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {project.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-4 p-5 glass rounded-2xl border-none group hover:bg-primary/5 transition-all">
                    <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                    <span className="font-bold text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="space-y-8">
            <Card className="glass-card border-none p-8">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-2xl font-black text-primary">{project.likes}</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Likes</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-black text-accent">{project.views}</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Views</p>
                  </div>
                </div>
                <GlassButton variant="secondary" size="icon" className="rounded-xl" onClick={() => toast.success("Added to favorites!")}>
                  <Heart className="w-5 h-5" />
                </GlassButton>
              </div>
              
              <div className="space-y-4">
                <GlassButton className="w-full h-14 rounded-2xl font-black shadow-xl shadow-primary/20">
                  <Github className="w-5 h-5 mr-2" /> View Source Code
                </GlassButton>
                <GlassButton variant="secondary" className="w-full h-14 rounded-2xl font-black">
                  <Share2 className="w-5 h-5 mr-2" /> Share Project
                </GlassButton>
              </div>
            </Card>

            <Card className="glass-card border-none p-8">
              <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground mb-6">Tech Stack</h3>
              <div className="space-y-4">
                {project.tech.map((t, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 glass rounded-2xl border-none group hover:bg-white/5 transition-all">
                    <div className="p-3 glass rounded-xl bg-primary/10 group-hover:bg-primary group-hover:text-white transition-colors">
                      <t.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-black text-sm">{t.name}</p>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{t.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="glass-card border-none bg-primary/5 p-8 relative overflow-hidden">
              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 glass rounded-xl bg-primary/10">
                    <MessageSquare className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-black">Ask the Author</h3>
                </div>
                <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                  Have questions about Sarah's implementation? Start a discussion in the community.
                </p>
                <GlassButton variant="ghost" className="p-0 h-auto font-black text-primary group" asChild>
                  <Link to="/community">Go to Discussion <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" /></Link>
                </GlassButton>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ShowcaseDetail;