"use client";

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Award, 
  Share2, 
  ArrowRight, 
  CheckCircle2,
  Download,
  Star,
  Sparkles,
  Rocket
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import GlassButton from '@/components/ui/GlassButton';
import { Badge } from '@/components/ui/badge';

const ModuleSuccess = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto py-12 space-y-16">
        <div className="text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", damping: 12 }}
            className="inline-block p-8 bg-emerald-500/10 rounded-[3rem] mb-4 shadow-inner"
          >
            <CheckCircle2 className="w-20 h-20 text-emerald-500" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Badge className="glass bg-primary/10 text-primary border-none px-4 py-1.5 rounded-full font-black uppercase tracking-widest text-[10px] mb-6">
              Module Mastered
            </Badge>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9]">
              You're a <span className="text-primary">Pro.</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mt-8 leading-relaxed">
              Congratulations! You've successfully mastered the "HTML & CSS for Modern Stores" module. 
              Your professional certificate is ready.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Certificate Card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="glass-card border-none overflow-hidden bg-gradient-to-br from-primary to-accent text-white p-1">
              <CardContent className="p-12 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
                <div className="relative z-10">
                  <Award className="w-32 h-32 mx-auto mb-10 text-white/40 animate-pulse" />
                  <h3 className="text-3xl font-black tracking-tight mb-4">Official Certificate</h3>
                  <p className="text-white/70 font-medium mb-12 leading-relaxed">
                    A verified credential has been added to your professional profile and is ready for sharing.
                  </p>
                  <div className="space-y-4">
                    <GlassButton className="w-full h-16 bg-white text-primary hover:bg-white hover:scale-105 rounded-2xl text-lg font-black shadow-2xl">
                      <Download className="w-5 h-5 mr-2" /> Download PDF
                    </GlassButton>
                    <GlassButton variant="secondary" className="w-full h-16 bg-white/10 text-white hover:bg-white/20 rounded-2xl text-lg font-black">
                      <Share2 className="w-5 h-5 mr-2" /> Share on LinkedIn
                    </GlassButton>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Next Steps Card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-8"
          >
            <Card className="glass-card border-none p-10">
              <h3 className="text-2xl font-black tracking-tight mb-8 flex items-center gap-3">
                <div className="p-2 glass rounded-xl bg-primary/10"><Sparkles className="w-6 h-6 text-primary" /></div>
                What's Next?
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-6 p-6 glass rounded-[2rem] border-none group cursor-pointer hover:bg-primary/5 transition-all">
                  <div className="bg-primary/10 p-4 rounded-2xl text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <Star className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <p className="font-black text-lg">Next Module</p>
                    <p className="text-sm text-muted-foreground font-medium">JavaScript Cart Logic</p>
                  </div>
                  <ArrowRight className="w-6 h-6 text-muted-foreground group-hover:text-primary group-hover:translate-x-2 transition-all" />
                </div>
                <div className="flex items-center gap-6 p-6 glass rounded-[2rem] border-none group cursor-pointer hover:bg-accent/5 transition-all">
                  <div className="bg-accent/10 p-4 rounded-2xl text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                    <Rocket className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <p className="font-black text-lg">Apply Skills</p>
                    <p className="text-sm text-muted-foreground font-medium">Start a new project plan</p>
                  </div>
                  <ArrowRight className="w-6 h-6 text-muted-foreground group-hover:text-accent group-hover:translate-x-2 transition-all" />
                </div>
              </div>
            </Card>

            <GlassButton 
              onClick={() => navigate('/dashboard')}
              className="w-full h-20 rounded-[2.5rem] text-2xl font-black shadow-2xl shadow-primary/20"
            >
              Go to Dashboard
            </GlassButton>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ModuleSuccess;