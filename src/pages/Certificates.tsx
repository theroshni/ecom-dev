"use client";

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Award, 
  Download, 
  Share2, 
  ExternalLink, 
  CheckCircle2,
  Lock,
  Search,
  Filter,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import GlassButton from '@/components/ui/GlassButton';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const Certificates = () => {
  const certificates = [
    {
      id: "CERT-8821",
      title: "Ecommerce Frontend Specialist",
      module: "HTML & CSS for Modern Stores",
      date: "Oct 12, 2024",
      status: "earned",
      image: "https://images.unsplash.com/photo-1606326666700-7361c2f4b7ef?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: "CERT-4432",
      title: "Backend Architecture Professional",
      module: "Node.js & Supabase Mastery",
      date: "Sep 28, 2024",
      status: "earned",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: "CERT-PENDING",
      title: "Fullstack Ecom Developer",
      module: "Advanced Stripe & Auth",
      date: "In Progress",
      status: "locked",
      image: null
    }
  ];

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <Badge className="glass bg-primary/10 text-primary border-primary/20 px-4 py-1.5 rounded-full font-black uppercase tracking-widest text-[10px]">
              Professional Credentials
            </Badge>
            <h1 className="text-5xl font-black tracking-tight">My Certificates</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Verify and share your professional ecommerce credentials with the world.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input placeholder="Search certificates..." className="glass border-none pl-12 h-14 w-full md:w-64 rounded-2xl text-lg font-medium focus-visible:ring-primary" />
            </div>
            <GlassButton variant="secondary" size="icon" className="h-14 w-14 rounded-2xl">
              <Filter className="w-6 h-6" />
            </GlassButton>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className={`glass-card border-none overflow-hidden group transition-all ${cert.status === 'locked' ? 'opacity-60 grayscale' : ''}`}>
                <div className="aspect-[4/3] bg-white/5 relative overflow-hidden">
                  {cert.image ? (
                    <img src={cert.image} alt={cert.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-primary/5">
                      <Award className="w-24 h-24 text-primary/20" />
                    </div>
                  )}
                  
                  {cert.status === 'earned' ? (
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                      <GlassButton className="rounded-xl px-6" onClick={() => toast.success("Downloading PDF...")}>
                        <Download className="w-4 h-4 mr-2" /> PDF
                      </GlassButton>
                      <GlassButton variant="secondary" className="rounded-xl px-6" onClick={() => toast.info("Sharing to LinkedIn...")}>
                        <Share2 className="w-4 h-4 mr-2" /> Share
                      </GlassButton>
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                      <div className="glass p-6 rounded-[2rem] text-center shadow-2xl">
                        <Lock className="w-8 h-8 text-white/40 mx-auto mb-3" />
                        <p className="text-xs font-black uppercase tracking-widest text-white">Complete Module to Unlock</p>
                      </div>
                    </div>
                  )}
                </div>
                <CardContent className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <Badge className={`glass border-none text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg ${cert.status === 'earned' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-white/5 text-muted-foreground'}`}>
                      {cert.status === 'earned' ? 'Verified' : 'Locked'}
                    </Badge>
                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{cert.id}</span>
                  </div>
                  <h3 className="text-2xl font-black mb-2 group-hover:text-primary transition-colors leading-tight">{cert.title}</h3>
                  <p className="text-muted-foreground font-medium mb-8">{cert.module}</p>
                  
                  <div className="flex items-center justify-between pt-6 border-t border-white/10">
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                      <CheckCircle2 className={`w-4 h-4 ${cert.status === 'earned' ? 'text-emerald-500' : 'text-white/10'}`} />
                      {cert.date}
                    </div>
                    {cert.status === 'earned' && (
                      <GlassButton variant="ghost" size="sm" className="font-black text-primary group/btn">
                        Verify <ExternalLink className="w-4 h-4 ml-1.5 group-hover/btn:translate-x-1 transition-transform" />
                      </GlassButton>
                    )}
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
                Career Accelerator
              </Badge>
              <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">Boost Your <br /> Professional Profile</h2>
              <p className="text-xl text-white/80 max-w-xl leading-relaxed">
                Our certificates are recognized by top ecommerce agencies and startups worldwide. 
                Add them to your LinkedIn profile to stand out to recruiters.
              </p>
              <GlassButton className="bg-white text-primary hover:bg-white hover:scale-105 rounded-2xl px-12 h-16 text-lg font-black shadow-2xl">
                View Learning Path <ArrowRight className="ml-2 w-5 h-5" />
              </GlassButton>
            </div>
            <div className="w-64 h-64 glass rounded-[3rem] flex items-center justify-center shadow-2xl animate-pulse">
              <Award className="w-32 h-32 text-white/40" />
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

export default Certificates;