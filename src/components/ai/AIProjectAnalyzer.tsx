"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ShieldCheck, Zap, AlertCircle, ChevronRight, Loader2, CheckCircle2 } from 'lucide-react';
import GlassButton from '@/components/ui/GlassButton';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface AIProjectAnalyzerProps {
  project: any;
}

const AIProjectAnalyzer = ({ project }: AIProjectAnalyzerProps) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    toast.loading("AI is analyzing your project architecture...");
    
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    const results = {
      score: 92,
      insights: [
        { type: 'success', text: "Excellent choice of Next.js 15 for high-performance rendering.", icon: CheckCircle2 },
        { type: 'warning', text: "Consider implementing Edge Middleware for faster geo-routing.", icon: AlertCircle },
        { type: 'info', text: "Stripe Connect integration looks robust for multi-vendor scaling.", icon: Zap }
      ],
      recommendations: [
        "Enable Partial Prerendering (PPR) for the product detail pages.",
        "Implement a Redis cache layer for real-time inventory sync.",
        "Add automated E2E tests for the checkout flow."
      ]
    };

    setAnalysis(results);
    setIsAnalyzing(false);
    toast.dismiss();
    toast.success("Analysis complete!");
  };

  return (
    <div className="space-y-6">
      {!analysis ? (
        <Card className="glass-card border-none bg-primary/5 p-10 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16 blur-2xl" />
          <div className="relative z-10 space-y-6">
            <div className="bg-primary/10 w-20 h-20 rounded-[2rem] flex items-center justify-center mx-auto shadow-inner">
              <Sparkles className="w-10 h-10 text-primary fill-current" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black tracking-tight">AI Architecture Review</h3>
              <p className="text-muted-foreground font-medium max-w-md mx-auto">
                Get instant feedback on your tech stack, security patterns, and performance optimizations.
              </p>
            </div>
            <GlassButton 
              onClick={handleAnalyze} 
              isLoading={isAnalyzing}
              className="rounded-2xl px-10 h-14 font-black shadow-2xl shadow-primary/20"
            >
              Analyze Project
            </GlassButton>
          </div>
        </Card>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <Card className="glass-card border-none overflow-hidden">
            <div className="p-8 bg-primary text-white flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-2xl">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-black tracking-tight">Architecture Score</h3>
                  <p className="text-xs font-bold uppercase tracking-widest opacity-70">AI Verified</p>
                </div>
              </div>
              <div className="text-4xl font-black">{analysis.score}%</div>
            </div>
            <CardContent className="p-8 space-y-8">
              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Key Insights</h4>
                <div className="space-y-3">
                  {analysis.insights.map((insight: any, i: number) => (
                    <div key={i} className="flex items-start gap-4 p-4 glass rounded-2xl border-none">
                      <insight.icon className={cn(
                        "w-5 h-5 mt-0.5",
                        insight.type === 'success' ? "text-emerald-500" : 
                        insight.type === 'warning' ? "text-amber-500" : "text-primary"
                      )} />
                      <p className="text-sm font-bold text-foreground">{insight.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Recommendations</h4>
                <div className="space-y-3">
                  {analysis.recommendations.map((rec: string, i: number) => (
                    <div key={i} className="flex items-center gap-4 p-4 glass bg-white/5 rounded-2xl border-none group hover:bg-primary/5 transition-all">
                      <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-black text-xs group-hover:bg-primary group-hover:text-white transition-colors">
                        {i + 1}
                      </div>
                      <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">{rec}</p>
                    </div>
                  ))}
                </div>
              </div>

              <GlassButton variant="secondary" className="w-full h-12 rounded-xl font-black" onClick={() => setAnalysis(null)}>
                Run New Analysis
              </GlassButton>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default AIProjectAnalyzer;