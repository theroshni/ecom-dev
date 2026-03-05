"use client";

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Trophy, Medal, Star, TrendingUp, Search, Filter, Sparkles, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import GlassButton from '@/components/ui/GlassButton';
import { motion } from 'framer-motion';

const Leaderboard = () => {
  const topLearners = [
    { rank: 1, name: "Sarah Chen", points: 12450, modules: 15, avatar: "https://i.pravatar.cc/150?u=sarah", trend: "up" },
    { rank: 2, name: "Alex Rivera", points: 11200, modules: 12, avatar: "https://github.com/shadcn.png", trend: "down" },
    { rank: 3, name: "Mike Ross", points: 9800, modules: 10, avatar: "https://i.pravatar.cc/150?u=mike", trend: "up" },
    { rank: 4, name: "Jessica Day", points: 8500, modules: 9, avatar: "https://i.pravatar.cc/150?u=jess", trend: "stable" },
    { rank: 5, name: "David Miller", points: 7200, modules: 8, avatar: "https://i.pravatar.cc/150?u=david", trend: "up" }
  ];

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-16">
        <div className="text-center space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Badge className="glass bg-primary/10 text-primary border-primary/20 px-4 py-1.5 rounded-full font-black uppercase tracking-widest text-[10px] mb-6">
              Community Rankings
            </Badge>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
              The <span className="text-primary">Elite</span> Circle.
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Celebrating the top learners and contributors building the future of ecommerce.
            </p>
          </motion.div>
        </div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-end px-4">
          {/* 2nd Place */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.2 }}
            className="order-2 md:order-1"
          >
            <Card className="glass-card border-none p-10 text-center relative pt-20">
              <div className="absolute -top-10 left-1/2 -translate-x-1/2">
                <div className="relative">
                  <Avatar className="h-24 w-24 border-4 border-white/10 shadow-2xl">
                    <AvatarImage src={topLearners[1].avatar} />
                    <AvatarFallback className="font-black">AR</AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-2 -right-2 bg-slate-400 text-white w-10 h-10 rounded-full flex items-center justify-center font-black border-4 border-background shadow-lg">2</div>
                </div>
              </div>
              <h3 className="text-2xl font-black mb-1">{topLearners[1].name}</h3>
              <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-6">{topLearners[1].modules} Modules</p>
              <Badge className="glass bg-primary/10 text-primary border-none px-6 py-2 rounded-xl font-black text-lg">{topLearners[1].points} pts</Badge>
            </Card>
          </motion.div>

          {/* 1st Place */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 40 }} 
            animate={{ opacity: 1, scale: 1.1, y: 0 }} 
            transition={{ delay: 0.1 }}
            className="order-1 md:order-2 z-10"
          >
            <Card className="glass-card border-none bg-gradient-to-br from-primary to-accent text-white p-12 text-center relative pt-24 shadow-[0_0_50px_rgba(99,102,241,0.3)]">
              <div className="absolute -top-12 left-1/2 -translate-x-1/2">
                <div className="relative">
                  <Avatar className="h-32 w-32 border-4 border-white shadow-2xl">
                    <AvatarImage src={topLearners[0].avatar} />
                    <AvatarFallback className="font-black">SC</AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-3 -right-3 bg-amber-400 text-white w-14 h-14 rounded-full flex items-center justify-center font-black border-4 border-white shadow-2xl">
                    <Trophy className="w-7 h-7" />
                  </div>
                </div>
              </div>
              <h3 className="text-3xl font-black mb-1">{topLearners[0].name}</h3>
              <p className="text-white/70 font-bold uppercase tracking-widest mb-8">{topLearners[0].modules} Modules</p>
              <Badge className="bg-white text-primary border-none px-8 py-3 rounded-2xl font-black text-xl shadow-2xl">{topLearners[0].points} pts</Badge>
            </Card>
          </motion.div>

          {/* 3rd Place */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.3 }}
            className="order-3"
          >
            <Card className="glass-card border-none p-10 text-center relative pt-20">
              <div className="absolute -top-10 left-1/2 -translate-x-1/2">
                <div className="relative">
                  <Avatar className="h-24 w-24 border-4 border-white/10 shadow-2xl">
                    <AvatarImage src={topLearners[2].avatar} />
                    <AvatarFallback className="font-black">MR</AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-2 -right-2 bg-amber-700 text-white w-10 h-10 rounded-full flex items-center justify-center font-black border-4 border-background shadow-lg">3</div>
                </div>
              </div>
              <h3 className="text-2xl font-black mb-1">{topLearners[2].name}</h3>
              <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-6">{topLearners[2].modules} Modules</p>
              <Badge className="glass bg-amber-500/10 text-amber-500 border-none px-6 py-2 rounded-xl font-black text-lg">{topLearners[2].points} pts</Badge>
            </Card>
          </motion.div>
        </div>

        {/* Full List */}
        <Card className="glass-card border-none overflow-hidden">
          <CardHeader className="p-10 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <CardTitle className="text-2xl font-black">Global Rankings</CardTitle>
            <div className="flex gap-4">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search learners..." className="glass border-none pl-11 h-12 rounded-2xl focus-visible:ring-primary" />
              </div>
              <GlassButton variant="secondary" size="icon" className="h-12 w-12 rounded-2xl">
                <Filter className="w-5 h-5" />
              </GlassButton>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-white/5">
              {topLearners.map((learner, i) => (
                <motion.div 
                  key={learner.rank} 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-6 p-8 hover:bg-white/5 transition-all group cursor-pointer"
                >
                  <div className="w-12 text-center font-black text-2xl text-muted-foreground group-hover:text-primary transition-colors">{learner.rank}</div>
                  <Avatar className="h-14 w-14 border-2 border-white/10 group-hover:border-primary transition-colors">
                    <AvatarImage src={learner.avatar} />
                    <AvatarFallback className="font-black">{learner.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="text-xl font-black group-hover:text-primary transition-colors">{learner.name}</h4>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1">{learner.modules} Modules Completed</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-primary">{learner.points} pts</p>
                    <div className="flex items-center justify-end gap-2 mt-1">
                      {learner.trend === 'up' && <TrendingUp className="w-4 h-4 text-emerald-500" />}
                      <span className={cn(
                        "text-[10px] font-black uppercase tracking-widest",
                        learner.trend === 'up' ? "text-emerald-500" : learner.trend === 'down' ? "text-red-500" : "text-muted-foreground"
                      )}>
                        {learner.trend}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="p-10 bg-white/5 border-t border-white/5 text-center">
              <GlassButton variant="ghost" className="font-black text-primary group">
                View Full Leaderboard <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-all" />
              </GlassButton>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Leaderboard;