"use client";

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Layout, 
  Zap, 
  Smartphone, 
  Globe, 
  Eye, 
  Download, 
  Filter,
  ArrowRight,
  Sparkles,
  Code2
} from 'lucide-react';
import GlassButton from '@/components/ui/GlassButton';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const Templates = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("All");

  const templates = [
    {
      id: 1,
      title: "Modern Storefront",
      desc: "High-performance storefront built with Next.js 15 and Tailwind CSS.",
      category: "Frontend",
      icon: Layout,
      color: "text-primary",
      bg: "bg-primary/10",
      tech: ["Next.js", "Tailwind", "Lucide"],
      preview: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 2,
      title: "Headless API Starter",
      desc: "Robust backend structure for headless commerce with Supabase.",
      category: "Backend",
      icon: Zap,
      color: "text-accent",
      bg: "bg-accent/10",
      tech: ["Supabase", "Node.js", "PostgreSQL"],
      preview: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 3,
      title: "Mobile-First Shop",
      desc: "Optimized for mobile shopping experiences with PWA support.",
      category: "Fullstack",
      icon: Smartphone,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      tech: ["React", "Vite", "PWA"],
      preview: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 4,
      title: "Global Marketplace",
      desc: "Multi-vendor marketplace template with complex order routing.",
      category: "Enterprise",
      icon: Globe,
      color: "text-indigo-500",
      bg: "bg-indigo-500/10",
      tech: ["Next.js", "Prisma", "Stripe"],
      preview: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=800"
    }
  ];

  const filteredTemplates = templates.filter(t => 
    (filter === "All" || t.category === filter) &&
    (t.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <Badge className="glass bg-primary/10 text-primary border-primary/20 px-4 py-1.5 rounded-full font-black uppercase tracking-widest text-[10px]">
              Premium Assets
            </Badge>
            <h1 className="text-5xl font-black tracking-tight">Project Templates</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Jumpstart your development with professionally designed ecommerce structures.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input 
                placeholder="Search templates..." 
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
          {["All", "Frontend", "Backend", "Fullstack", "Enterprise"].map((cat) => (
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

        <div className="grid md:grid-cols-2 gap-8">
          {filteredTemplates.map((template, i) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="glass-card border-none group overflow-hidden">
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={template.preview} 
                    alt={template.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    <GlassButton className="rounded-xl px-6" onClick={() => toast.info("Previewing template...")}>
                      <Eye className="w-4 h-4 mr-2" /> Preview
                    </GlassButton>
                    <GlassButton variant="secondary" className="rounded-xl px-6" onClick={() => toast.success("Template added to your projects!")}>
                      Use Template
                    </GlassButton>
                  </div>
                  <div className="absolute top-4 left-4">
                    <Badge className="glass bg-black/50 text-white border-none backdrop-blur-md px-3 py-1 rounded-lg font-bold">
                      {template.category}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-xl ${template.bg}`}>
                      <template.icon className={`w-6 h-6 ${template.color}`} />
                    </div>
                    <div className="flex gap-1">
                      {template.tech.map(t => (
                        <span key={t} className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{t}</span>
                      ))}
                    </div>
                  </div>
                  <h3 className="text-2xl font-black mb-3 group-hover:text-primary transition-colors">{template.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                    {template.desc}
                  </p>
                  <div className="flex items-center justify-between pt-6 border-t border-white/10">
                    <div className="flex items-center gap-2">
                      <Code2 className="w-4 h-4 text-primary" />
                      <span className="text-xs font-bold">Production Ready</span>
                    </div>
                    <GlassButton variant="ghost" size="sm" className="group/btn">
                      View Details <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                    </GlassButton>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* AI Suggestion Banner */}
        <Card className="glass-card border-none bg-primary/5 p-12 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 text-primary">
                <Sparkles className="w-6 h-6 fill-current" />
                <span className="font-black uppercase tracking-widest text-sm">AI Recommendation</span>
              </div>
              <h2 className="text-3xl font-black tracking-tight">Can't find the right template?</h2>
              <p className="text-muted-foreground max-w-md">
                Our AI can generate a custom project structure based on your specific requirements.
              </p>
            </div>
            <GlassButton size="lg" className="rounded-2xl px-10">Generate Custom Template</GlassButton>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Templates;