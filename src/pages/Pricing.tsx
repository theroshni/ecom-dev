"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import { motion } from 'framer-motion';
import { Check, Zap, Sparkles, Star, ShieldCheck, Users } from 'lucide-react';
import GlassButton from '@/components/ui/GlassButton';
import { Badge } from '@/components/ui/badge';

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "0",
      desc: "Perfect for individuals exploring ecommerce.",
      features: ["Basic Learning Path", "1 Active Project", "Community Access", "Public Sharing"],
      icon: Zap,
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    },
    {
      name: "Pro",
      price: "29",
      desc: "For serious developers building professional stores.",
      features: ["All Learning Modules", "Unlimited Projects", "AI Coding Assistant", "Private Projects", "Priority Support"],
      popular: true,
      icon: Star,
      color: "text-primary",
      bg: "bg-primary/10"
    },
    {
      name: "Team",
      price: "99",
      desc: "Collaborate and scale with your entire team.",
      features: ["Everything in Pro", "Up to 10 Members", "Shared Workspaces", "Team Analytics", "Custom Branding"],
      icon: Users,
      color: "text-accent",
      bg: "bg-accent/10"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Badge className="glass bg-primary/10 text-primary border-primary/20 px-4 py-1.5 rounded-full font-black uppercase tracking-widest text-[10px] mb-6">
              Simple & Transparent
            </Badge>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
              Invest in Your <span className="text-primary">Future.</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that fits your stage of growth. No hidden fees, cancel anytime.
            </p>
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`relative glass-card p-10 flex flex-col ${plan.popular ? 'border-primary/50 shadow-2xl shadow-primary/10 scale-105 z-10' : 'border-white/10'}`}
            >
              {plan.popular && (
                <div className="absolute -top-5 left-1/2 -translate-y-1/2">
                  <Badge className="bg-primary text-white border-none px-6 py-2 rounded-full font-black uppercase tracking-widest text-[10px] shadow-xl">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <div className="mb-10">
                <div className={`w-14 h-14 rounded-2xl ${plan.bg} flex items-center justify-center mb-6`}>
                  <plan.icon className={`w-7 h-7 ${plan.color}`} />
                </div>
                <h3 className="text-3xl font-black mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-5xl font-black">${plan.price}</span>
                  <span className="text-muted-foreground font-bold">/mo</span>
                </div>
                <p className="text-muted-foreground font-medium leading-relaxed">{plan.desc}</p>
              </div>

              <div className="space-y-4 mb-12 flex-1">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3 text-sm font-bold">
                    <div className={`p-1 rounded-full ${plan.bg}`}>
                      <Check className={`w-3 h-3 ${plan.color}`} />
                    </div>
                    {feature}
                  </div>
                ))}
              </div>

              <GlassButton 
                variant={plan.popular ? 'primary' : 'secondary'} 
                className="w-full h-14 rounded-2xl text-lg font-black"
              >
                Get Started
              </GlassButton>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 px-4 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all">
          <div className="flex items-center gap-2 font-black text-2xl"><ShieldCheck className="w-8 h-8" /> SECURE</div>
          <div className="flex items-center gap-2 font-black text-2xl"><Zap className="w-8 h-8" /> FAST</div>
          <div className="flex items-center gap-2 font-black text-2xl"><Users className="w-8 h-8" /> TRUSTED</div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;