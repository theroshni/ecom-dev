"use client";

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Book, 
  MessageCircle, 
  Mail, 
  FileText, 
  HelpCircle,
  ChevronRight,
  ExternalLink,
  Zap,
  Sparkles,
  ArrowRight,
  LifeBuoy
} from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import GlassButton from '@/components/ui/GlassButton';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

const HelpCenter = () => {
  const categories = [
    { title: "Getting Started", icon: Zap, color: "text-amber-500", bg: "bg-amber-500/10", count: 12 },
    { title: "Learning Path", icon: Book, color: "text-primary", bg: "bg-primary/10", count: 24 },
    { title: "Project Builder", icon: FileText, color: "text-emerald-500", bg: "bg-emerald-500/10", count: 18 },
    { title: "Billing & Plans", icon: HelpCircle, color: "text-violet-500", bg: "bg-violet-500/10", count: 8 }
  ];

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Hero Search */}
        <div className="text-center space-y-8 py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Badge className="glass bg-primary/10 text-primary border-primary/20 px-4 py-1.5 rounded-full font-black uppercase tracking-widest text-[10px] mb-6">
              Support Hub
            </Badge>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
              How can we <span className="text-primary">help?</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-12">
              Search our knowledge base or browse categories below to find answers to your questions.
            </p>
            <div className="relative max-w-3xl mx-auto">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground" />
              <Input placeholder="Search for articles, guides, or FAQs..." className="glass border-none pl-16 h-20 rounded-[2.5rem] text-xl font-medium focus-visible:ring-primary shadow-2xl" />
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <GlassButton className="rounded-2xl px-8 h-12 font-black">Search</GlassButton>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Categories Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="glass-card border-none group cursor-pointer overflow-hidden">
                <CardContent className="p-10 text-center space-y-6">
                  <div className={`w-20 h-20 rounded-[2rem] ${cat.bg} flex items-center justify-center mx-auto shadow-xl group-hover:scale-110 transition-transform duration-500`}>
                    <cat.icon className={`w-10 h-10 ${cat.color}`} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black tracking-tight group-hover:text-primary transition-colors">{cat.title}</h3>
                    <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mt-2">{cat.count} Articles</p>
                  </div>
                  <GlassButton variant="ghost" size="sm" className="font-black text-primary group/btn">
                    Browse <ChevronRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                  </GlassButton>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-16">
          {/* FAQs */}
          <div className="lg:col-span-8 space-y-10">
            <h2 className="text-4xl font-black tracking-tight flex items-center gap-4">
              <div className="p-3 glass rounded-2xl"><Sparkles className="w-8 h-8 text-primary" /></div>
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="space-y-4">
              {[
                { q: "How do I export my project plan?", a: "You can export your project plan as a JSON file by clicking the 'Export JSON' button in the Project Builder header. This file can be used to jumpstart your development in any IDE." },
                { q: "Can I invite team members on the free plan?", a: "The Starter plan allows for public project sharing, but team collaboration features like shared workspaces are exclusive to the Pro and Team plans." },
                { q: "How do I earn certificates?", a: "Certificates are automatically generated once you complete all lessons and quizzes within a specific learning module. You can view them in the 'Certificates' section." },
                { q: "What tech stacks are supported?", a: "We currently support Next.js, React, and Vue for the frontend, and Supabase, MongoDB, and PostgreSQL for the backend. More stacks are being added regularly." }
              ].map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-none glass rounded-[2rem] px-8 shadow-sm overflow-hidden">
                  <AccordionTrigger className="hover:no-underline text-xl font-black text-foreground py-8 text-left">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-lg text-muted-foreground font-medium leading-relaxed pb-8">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Support Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <Card className="glass-card border-none bg-primary text-white p-10 relative overflow-hidden">
              <div className="relative z-10 space-y-6">
                <MessageCircle className="w-16 h-16 opacity-40" />
                <h3 className="text-3xl font-black tracking-tight">Still need help?</h3>
                <p className="text-lg text-white/80 font-medium leading-relaxed">Our support team is available 24/7 to help you with any technical or account issues.</p>
                <GlassButton className="w-full bg-white text-primary hover:bg-white hover:scale-105 rounded-2xl h-14 text-lg font-black shadow-2xl">
                  Contact Support
                </GlassButton>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
            </Card>

            <div className="space-y-6">
              <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground px-2">Quick Links</h3>
              <div className="space-y-3">
                {[
                  { title: "API Documentation", icon: FileText },
                  { title: "Community Forum", icon: MessageCircle },
                  { title: "Platform Status", icon: Zap },
                  { title: "Terms of Service", icon: FileText }
                ].map((link, i) => (
                  <button key={i} className="w-full flex items-center justify-between p-6 glass rounded-2xl hover:bg-white/5 transition-all group">
                    <div className="flex items-center gap-4">
                      <link.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      <span className="text-lg font-bold text-foreground">{link.title}</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-all group-hover:translate-x-1" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HelpCenter;