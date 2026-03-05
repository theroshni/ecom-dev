"use client";

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Download, 
  ExternalLink, 
  FileText, 
  Layout, 
  Database, 
  Shield,
  Zap,
  Book,
  Filter,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import GlassButton from '@/components/ui/GlassButton';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const Resources = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("All");

  const resources = [
    {
      title: "Ecom UI Kit (Figma)",
      description: "A comprehensive set of high-fidelity ecommerce components for Figma.",
      category: "Design",
      icon: Layout,
      color: "text-pink-500",
      bg: "bg-pink-500/10"
    },
    {
      title: "Next.js Starter Template",
      description: "Pre-configured Next.js 15 template with Tailwind, Lucide, and Shadcn UI.",
      category: "Code",
      icon: Zap,
      color: "text-amber-500",
      bg: "bg-amber-500/10"
    },
    {
      title: "API Documentation Guide",
      description: "Best practices for documenting your ecommerce REST and GraphQL APIs.",
      category: "Docs",
      icon: FileText,
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    },
    {
      title: "Stripe Integration Flow",
      description: "Step-by-step guide and code snippets for a secure checkout experience.",
      category: "Tutorial",
      icon: Shield,
      color: "text-indigo-500",
      bg: "bg-indigo-500/10"
    },
    {
      title: "Database Schema Patterns",
      description: "Common database designs for products, orders, and user management.",
      category: "Architecture",
      icon: Database,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10"
    },
    {
      title: "Performance Checklist",
      description: "Optimize your store for Core Web Vitals and fast loading speeds.",
      category: "Optimization",
      icon: Book,
      color: "text-violet-500",
      bg: "bg-violet-500/10"
    }
  ];

  const filteredResources = resources.filter(r => 
    (filter === "All" || r.category === filter) &&
    (r.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <Badge className="glass bg-primary/10 text-primary border-primary/20 px-4 py-1.5 rounded-full font-black uppercase tracking-widest text-[10px]">
              Developer Assets
            </Badge>
            <h1 className="text-5xl font-black tracking-tight">Resources</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Templates, guides, and tools to accelerate your ecommerce development.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input 
                placeholder="Search resources..." 
                className="glass border-none pl-12 h-14 w-full md:w-80 rounded-2xl text-lg font-medium focus-visible:ring-primary"
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
          {["All", "Design", "Code", "Docs", "Tutorial", "Architecture"].map((cat) => (
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
          {filteredResources.map((resource, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="glass-card border-none group overflow-hidden">
                <CardHeader className="p-8">
                  <div className="flex justify-between items-start mb-8">
                    <div className={cn("p-4 glass rounded-[1.5rem] shadow-xl group-hover:scale-110 transition-transform duration-500", resource.bg)}>
                      <resource.icon className={cn("w-8 h-8", resource.color)} />
                    </div>
                    <Badge className="glass bg-white/5 text-muted-foreground border-none px-3 py-1 rounded-lg font-black uppercase tracking-widest text-[10px]">
                      {resource.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl font-black group-hover:text-primary transition-colors">
                    {resource.title}
                  </CardTitle>
                  <CardDescription className="mt-3 text-muted-foreground font-medium line-clamp-2 leading-relaxed">
                    {resource.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <div className="flex gap-3 pt-8 border-t border-white/10">
                    <GlassButton variant="secondary" className="flex-1 rounded-xl h-12 font-black" onClick={() => toast.success("Download started!")}>
                      <Download className="w-4 h-4 mr-2" /> Download
                    </GlassButton>
                    <GlassButton variant="ghost" size="icon" className="rounded-xl h-12 w-12">
                      <ExternalLink className="w-5 h-5 text-muted-foreground" />
                    </GlassButton>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Featured Resource Banner */}
        <Card className="glass-card border-none bg-gradient-to-r from-primary to-accent p-12 text-white relative overflow-hidden">
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 space-y-8 text-center lg:text-left">
              <Badge className="glass bg-white/20 text-white border-none px-4 py-1.5 rounded-full font-black uppercase tracking-widest text-[10px]">
                New Release
              </Badge>
              <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">The Ultimate <br /> Ecommerce Handbook</h2>
              <p className="text-xl text-white/80 max-w-xl leading-relaxed">
                A 150-page deep dive into building, scaling, and optimizing modern ecommerce platforms. 
                Free for all EcomDev members.
              </p>
              <GlassButton className="bg-white text-primary hover:bg-white hover:scale-105 rounded-2xl px-12 h-16 text-lg font-black shadow-2xl">
                Get Your Copy Now
              </GlassButton>
            </div>
            <div className="w-64 h-80 glass rounded-[2.5rem] backdrop-blur-md border-white/20 flex items-center justify-center rotate-6 shadow-2xl group cursor-pointer hover:rotate-0 transition-transform duration-700">
              <Book className="w-24 h-24 text-white/40" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
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

export default Resources;