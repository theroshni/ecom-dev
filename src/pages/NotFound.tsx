"use client";

import React from 'react';
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from 'framer-motion';
import { Code2, Home, ArrowLeft, Sparkles, Zap } from 'lucide-react';
import GlassButton from '@/components/ui/GlassButton';
import { Badge } from '@/components/ui/badge';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[10%] left-[10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[10%] right-[10%] w-[40%] h-[40%] bg-accent/10 rounded-full blur-[120px] animate-pulse" />
      </div>

      <div className="max-w-2xl w-full text-center space-y-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", damping: 12 }}
          className="inline-block"
        >
          <div className="relative">
            <h1 className="text-[12rem] md:text-[18rem] font-black tracking-tighter leading-none opacity-10 select-none">404</h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="p-8 glass rounded-[3rem] shadow-2xl shadow-primary/20 animate-bounce">
                <Zap size={80} className="text-primary fill-current" />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <Badge className="glass bg-primary/10 text-primary border-none px-4 py-1.5 rounded-full font-black uppercase tracking-widest text-[10px]">
            System Error: Route Not Found
          </Badge>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9]">
            You're Off the <span className="text-primary">Grid.</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-md mx-auto font-medium leading-relaxed">
            The page you're looking for doesn't exist or has been moved to a different dimension.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <GlassButton size="lg" className="rounded-full px-10 h-16 text-lg font-black group" asChild>
            <Link to="/dashboard">
              <Home className="mr-2 w-5 h-5" /> Back to Dashboard
            </Link>
          </GlassButton>
          <GlassButton variant="secondary" size="lg" className="rounded-full px-10 h-16 text-lg font-black" onClick={() => window.history.back()}>
            <ArrowLeft className="mr-2 w-5 h-5" /> Go Back
          </GlassButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="pt-12 flex items-center justify-center gap-3"
        >
          <div className="bg-primary p-1.5 rounded-lg">
            <Code2 className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-black tracking-tighter">EcomDev</span>
        </motion.div>
      </div>

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-primary/20 rounded-full"
          animate={{
            x: [Math.random() * 1000, Math.random() * 1000],
            y: [Math.random() * 1000, Math.random() * 1000],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
};

export default NotFound;