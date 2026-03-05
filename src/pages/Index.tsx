"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import { motion } from 'framer-motion';
import { 
  Rocket, 
  Zap, 
  Shield, 
  Users, 
  ArrowRight, 
  Code2, 
  Sparkles,
  Globe,
  Cpu,
  Layout
} from 'lucide-react';
import { Link } from 'react-router-dom';
import GlassButton from '@/components/ui/GlassButton';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="glass bg-primary/10 text-primary border-primary/20 px-4 py-1.5 rounded-full font-black uppercase tracking-widest text-[10px] mb-8">
              <Sparkles className="w-3 h-3 mr-2 fill-current" /> The Future of Ecommerce Development
            </Badge>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
              Build Your <span className="text-primary">Empire</span> <br />
              With AI Precision.
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-12">
              The all-in-one platform to learn, plan, and collaborate on high-performance ecommerce projects. Powered by AI, built for scale.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <GlassButton size="lg" className="rounded-full px-10 h-16 text-lg group" asChild>
                <Link to="/auth">
                  Start Building Free
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </GlassButton>
              <GlassButton variant="secondary" size="lg" className="rounded-full px-10 h-16 text-lg">
                View Live Demo
              </GlassButton>
            </div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="mt-24 relative max-w-6xl mx-auto"
          >
            <div className="aspect-[16/9] glass rounded-[3rem] shadow-2xl border-white/10 overflow-hidden flex items-center justify-center group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 opacity-50 group-hover:opacity-70 transition-opacity" />
              <div className="relative z-10 flex flex-col items-center">
                <div className="p-8 glass rounded-[2.5rem] shadow-2xl mb-6 animate-bounce">
                  <Cpu size={64} className="text-primary" />
                </div>
                <p className="text-2xl font-black tracking-tight">Interactive AI Workspace</p>
                <div className="mt-8 flex gap-4">
                  <div className="h-2 w-12 rounded-full bg-primary/40" />
                  <div className="h-2 w-12 rounded-full bg-primary" />
                  <div className="h-2 w-12 rounded-full bg-primary/40" />
                </div>
              </div>
            </div>
            {/* Decorative Orbs */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-accent/20 rounded-full blur-[100px] animate-pulse" />
          </motion.div>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section className="py-32 px-4 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6">Engineered for Excellence</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Everything you need to go from zero to a global ecommerce platform.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div whileHover={{ y: -10 }} className="md:col-span-2 glass-card p-12 flex flex-col justify-between min-h-[400px]">
              <div>
                <div className="p-4 glass bg-primary/10 rounded-2xl w-fit mb-8">
                  <Layout className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-3xl font-black mb-4">AI-Powered Project Builder</h3>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
                  Architect your entire tech stack in seconds. Our AI suggests the best tools, generates roadmaps, and exports production-ready JSON.
                </p>
              </div>
              <div className="mt-12 flex -space-x-4">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-12 h-12 rounded-full border-4 border-background glass flex items-center justify-center font-bold text-xs">
                    {i}
                  </div>
                ))}
                <div className="w-12 h-12 rounded-full border-4 border-background bg-primary text-white flex items-center justify-center font-bold text-xs">
                  +12
                </div>
              </div>
            </motion.div>

            <motion.div whileHover={{ y: -10 }} className="glass-card p-12 flex flex-col justify-between">
              <div>
                <div className="p-4 glass bg-accent/10 rounded-2xl w-fit mb-8">
                  <Zap className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-3xl font-black mb-4">Real-time Sync</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Collaborate with your team in real-time. Every change is synced instantly across the platform.
                </p>
              </div>
              <div className="mt-12 h-2 w-full glass rounded-full overflow-hidden">
                <div className="h-full w-2/3 bg-accent" />
              </div>
            </motion.div>

            <motion.div whileHover={{ y: -10 }} className="glass-card p-12 flex flex-col justify-between">
              <div>
                <div className="p-4 glass bg-indigo-500/10 rounded-2xl w-fit mb-8">
                  <Shield className="w-8 h-8 text-indigo-500" />
                </div>
                <h3 className="text-3xl font-black mb-4">Secure by Design</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Enterprise-grade security for your project plans and team data.
                </p>
              </div>
              <div className="mt-12 flex justify-center">
                <Shield className="w-24 h-24 text-indigo-500/20" />
              </div>
            </motion.div>

            <motion.div whileHover={{ y: -10 }} className="md:col-span-2 glass-card p-12 flex flex-col justify-between min-h-[400px]">
              <div>
                <div className="p-4 glass bg-emerald-500/10 rounded-2xl w-fit mb-8">
                  <Globe className="w-8 h-8 text-emerald-500" />
                </div>
                <h3 className="text-3xl font-black mb-4">Global Community</h3>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
                  Join 50,000+ developers building the future of commerce. Share snippets, find mentors, and land your dream job.
                </p>
              </div>
              <div className="mt-12 grid grid-cols-4 gap-4">
                {[1,2,3,4].map(i => (
                  <div key={i} className="h-16 glass rounded-2xl" />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="glass-card bg-primary p-16 text-center text-white relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8">Ready to Scale?</h2>
              <p className="text-xl text-white/80 max-w-xl mx-auto mb-12">
                Join the elite developers building high-performance stores on EcomDev.
              </p>
              <GlassButton size="lg" className="bg-white text-primary hover:bg-white hover:scale-105 rounded-full px-12 h-16 text-xl font-black">
                Get Started Now
              </GlassButton>
            </div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/20 rounded-full -ml-48 -mb-48 blur-[100px]" />
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="bg-primary p-1.5 rounded-lg">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black tracking-tighter">EcomDev</span>
          </div>
          <div className="flex gap-8 text-sm font-bold text-muted-foreground">
            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-primary transition-colors">Terms</Link>
            <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
          </div>
          <p className="text-sm text-muted-foreground font-medium">© 2026 EcomDev Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;