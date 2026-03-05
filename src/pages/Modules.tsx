"use client";

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, CheckCircle2, PlayCircle, Lock, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import GlassButton from '@/components/ui/GlassButton';
import { useLearning } from '@/contexts/LearningContext';
import { cn } from '@/lib/utils';

const modules = [
  {
    id: "mod-1",
    title: "HTML & Structure",
    description: "Master the semantic foundation of ecommerce sites, from product grids to checkout forms.",
    lessons: 8,
    duration: "2.5h",
    color: "bg-emerald-500"
  },
  {
    id: "mod-2",
    title: "CSS & Modern Styling",
    description: "Learn Tailwind CSS, responsive design, and advanced layouts for high-converting stores.",
    lessons: 12,
    duration: "4h",
    color: "bg-primary"
  },
  {
    id: "mod-3",
    title: "JavaScript Cart Logic",
    description: "Build state management for shopping carts, local storage persistence, and dynamic UI updates.",
    lessons: 10,
    duration: "5h",
    color: "bg-amber-500"
  }
];

const Modules = () => {
  const { getModuleProgress, progress } = useLearning();

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="space-y-2">
          <Badge className="glass bg-primary/10 text-primary border-primary/20 px-4 py-1.5 rounded-full font-black uppercase tracking-widest text-[10px]">
            Curriculum
          </Badge>
          <h1 className="text-5xl font-black tracking-tight">Learning Path</h1>
          <p className="text-xl text-muted-foreground">Follow our structured curriculum to become a pro ecommerce developer.</p>
        </div>

        <div className="grid gap-8">
          {modules.map((module, index) => {
            const moduleProgress = getModuleProgress(module.id, module.lessons);
            const isCompleted = progress.completedModules.includes(module.id);
            const isLocked = index > 0 && !progress.completedModules.includes(modules[index-1].id);

            return (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={cn(
                  "glass-card border-none group overflow-hidden",
                  isLocked && "opacity-60 grayscale"
                )}>
                  <div className="flex flex-col md:flex-row">
                    <div className={cn("w-full md:w-3", isLocked ? "bg-white/10" : module.color)} />
                    <CardContent className="p-10 flex-1 flex flex-col md:flex-row items-center gap-10">
                      <div className="p-6 glass rounded-[2rem] shadow-xl group-hover:bg-primary/5 transition-colors">
                        {isCompleted ? (
                          <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                        ) : isLocked ? (
                          <Lock className="w-12 h-12 text-muted-foreground/30" />
                        ) : (
                          <BookOpen className="w-12 h-12 text-primary" />
                        )}
                      </div>
                      
                      <div className="flex-1 text-center md:text-left space-y-4">
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                          <h3 className="text-3xl font-black tracking-tight">{module.title}</h3>
                          {moduleProgress > 0 && moduleProgress < 100 && (
                            <Badge className="glass bg-primary/10 text-primary border-none px-3 py-1 rounded-lg font-black uppercase tracking-widest text-[10px]">In Progress</Badge>
                          )}
                        </div>
                        <p className="text-lg text-muted-foreground font-medium max-w-2xl leading-relaxed">{module.description}</p>
                        
                        <div className="flex items-center justify-center md:justify-start gap-6 text-xs font-black uppercase tracking-widest text-muted-foreground">
                          <span className="flex items-center gap-2"><PlayCircle className="w-4 h-4 text-primary" /> {module.lessons} Lessons</span>
                          <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary" /> {module.duration}</span>
                        </div>
                      </div>

                      <div className="w-full md:w-64 space-y-6">
                        <div className="space-y-3">
                          <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                            <span>Progress</span>
                            <span className="text-primary">{moduleProgress}%</span>
                          </div>
                          <div className="h-2 glass bg-white/5 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${moduleProgress}%` }}
                              className={cn("h-full shadow-[0_0_10px_rgba(99,102,241,0.3)]", isCompleted ? 'bg-emerald-500' : 'bg-primary')}
                            />
                          </div>
                        </div>
                        <GlassButton 
                          variant={isLocked ? 'secondary' : 'primary'}
                          className="w-full h-14 rounded-2xl font-black text-sm"
                          disabled={isLocked}
                          asChild={!isLocked}
                        >
                          {isLocked ? (
                            'Locked'
                          ) : (
                            <Link to={`/modules/${module.id}`}>
                              {isCompleted ? 'Review Module' : moduleProgress > 0 ? 'Continue' : 'Start Module'}
                            </Link>
                          )}
                        </GlassButton>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Modules;