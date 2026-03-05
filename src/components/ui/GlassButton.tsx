"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
  asChild?: boolean;
}

const GlassButton = React.forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
    const baseStyles = "relative inline-flex items-center justify-center font-black transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none overflow-hidden";
    
    const variants = {
      primary: "bg-primary text-white shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5",
      secondary: "glass bg-white/10 text-foreground hover:bg-white/20 border-white/10",
      ghost: "text-muted-foreground hover:text-primary hover:bg-primary/5"
    };

    const sizes = {
      sm: "h-10 px-4 rounded-xl text-xs uppercase tracking-widest",
      md: "h-12 px-6 rounded-2xl text-sm",
      lg: "h-16 px-10 rounded-[2rem] text-lg",
      icon: "h-12 w-12 rounded-2xl p-0"
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <>
            <span className="relative z-10 flex items-center gap-2">{children}</span>
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full"
              animate={{ x: ['100%', '-100%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </>
        )}
      </button>
    );
  }
);

GlassButton.displayName = "GlassButton";

export default GlassButton;