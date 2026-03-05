"use client";

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  MapPin, 
  Briefcase, 
  DollarSign, 
  Clock, 
  Filter,
  Building2,
  ArrowUpRight,
  Sparkles,
  Globe,
  Zap
} from 'lucide-react';
import GlassButton from '@/components/ui/GlassButton';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const Jobs = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const jobs = [
    {
      id: 1,
      title: "Senior Frontend Engineer (Next.js)",
      company: "Shopify Plus Agency",
      location: "Remote",
      salary: "$120k - $160k",
      type: "Full-time",
      posted: "2 days ago",
      logo: "https://logo.clearbit.com/shopify.com",
      tech: ["Next.js", "Tailwind", "TypeScript"]
    },
    {
      id: 2,
      title: "Ecommerce Backend Developer",
      company: "LuxeFashion Group",
      location: "New York, NY",
      salary: "$140k - $180k",
      type: "Full-time",
      posted: "5 hours ago",
      logo: "https://logo.clearbit.com/farfetch.com",
      tech: ["Node.js", "Supabase", "PostgreSQL"]
    },
    {
      id: 3,
      title: "Freelance Stripe Integration Expert",
      company: "StartupX",
      location: "Remote",
      salary: "$80 - $120/hr",
      type: "Contract",
      posted: "1 day ago",
      logo: "https://logo.clearbit.com/stripe.com",
      tech: ["Stripe", "Webhooks", "API"]
    }
  ];

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <Badge className="glass bg-primary/10 text-primary border-primary/20 px-4 py-1.5 rounded-full font-black uppercase tracking-widest text-[10px]">
              Career Portal
            </Badge>
            <h1 className="text-5xl font-black tracking-tight">Job Board</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Find your next career move in the global ecommerce ecosystem.
            </p>
          </div>
          <GlassButton className="rounded-2xl px-8 shadow-2xl shadow-primary/20">
            Post a Job Listing
          </GlassButton>
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input 
              placeholder="Job title, keywords, or company..." 
              className="glass border-none pl-12 h-14 rounded-2xl text-lg font-medium focus-visible:ring-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="relative w-full lg:w-72">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input placeholder="Location..." className="glass border-none pl-12 h-14 rounded-2xl text-lg font-medium focus-visible:ring-primary" />
          </div>
          <GlassButton variant="secondary" size="icon" className="h-14 w-14 rounded-2xl">
            <Filter className="w-6 h-6" />
          </GlassButton>
        </div>

        <div className="grid gap-6">
          {jobs.map((job, i) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="glass-card border-none group cursor-pointer overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row md:items-center gap-8">
                    <div className="w-20 h-20 rounded-[2rem] glass flex items-center justify-center overflow-hidden border-2 border-white/10 shrink-0 group-hover:border-primary transition-colors">
                      <img src={job.logo} alt={job.company} className="w-12 h-12 object-contain" />
                    </div>
                    
                    <div className="flex-1 min-w-0 space-y-4">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-2xl font-black group-hover:text-primary transition-colors truncate">
                            {job.title}
                          </h3>
                          <Badge className="glass bg-primary/10 text-primary border-none px-3 py-1 rounded-lg font-black uppercase tracking-widest text-[10px]">{job.type}</Badge>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                          <span className="flex items-center gap-2 text-primary"><Building2 className="w-4 h-4" /> {job.company}</span>
                          <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {job.location}</span>
                          <span className="flex items-center gap-2 text-emerald-500"><DollarSign className="w-4 h-4" /> {job.salary}</span>
                          <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> {job.posted}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {job.tech.map(t => (
                          <Badge key={t} className="glass bg-white/5 text-muted-foreground border-none px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest">{t}</Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <GlassButton variant="secondary" className="rounded-xl px-6 h-12 font-black">
                        Save
                      </GlassButton>
                      <GlassButton className="rounded-xl px-8 h-12 font-black shadow-xl shadow-primary/20">
                        Apply Now <ArrowUpRight className="w-5 h-5 ml-2" />
                      </GlassButton>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Featured Section */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="glass-card border-none bg-gradient-to-br from-primary to-accent p-12 text-white relative overflow-hidden">
            <div className="relative z-10 space-y-6">
              <div className="p-4 glass bg-white/20 rounded-[1.5rem] w-fit">
                <Sparkles className="w-8 h-8 fill-current" />
              </div>
              <h2 className="text-4xl font-black tracking-tight">Hire Top Ecom Talent</h2>
              <p className="text-xl text-white/80 max-w-md">Access our community of 50,000+ specialized ecommerce developers and designers.</p>
              <GlassButton className="bg-white text-primary hover:bg-white hover:scale-105 rounded-2xl px-10 h-14 text-lg font-black">
                Post a Job Listing
              </GlassButton>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
          </Card>
          
          <Card className="glass-card border-none bg-white/5 p-12 relative overflow-hidden">
            <div className="relative z-10 space-y-6">
              <div className="p-4 glass bg-primary/10 rounded-[1.5rem] w-fit">
                <Zap className="w-8 h-8 text-primary fill-current" />
              </div>
              <h2 className="text-4xl font-black tracking-tight">Job Alerts</h2>
              <p className="text-xl text-muted-foreground max-w-md">Get notified instantly when new jobs matching your skills are posted.</p>
              <div className="flex gap-3">
                <Input placeholder="Your email address..." className="glass border-none h-14 rounded-2xl text-lg font-medium focus-visible:ring-primary" />
                <GlassButton className="rounded-2xl px-8 h-14 font-black">Subscribe</GlassButton>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full -ml-32 -mb-32 blur-3xl" />
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Jobs;