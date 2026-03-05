"use client";

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  Play, 
  FileCode, 
  MessageSquare,
  Copy,
  Sparkles,
  Clock,
  BookOpen
} from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import GlassButton from '@/components/ui/GlassButton';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { useLearning } from '@/contexts/LearningContext';
import { cn } from '@/lib/utils';

const LessonDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { completeLesson, isLessonComplete, modules } = useLearning();
  
  const currentModule = modules.find(m => m.id === id) || modules[0];
  const lessonId = `${currentModule.id}-4`; // Simulating lesson 4

  const handleComplete = () => {
    completeLesson(lessonId);
    toast.success("Progress saved!");
    setTimeout(() => navigate(`/modules/${id}/quiz`), 1000);
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <Link to="/modules" className="flex items-center text-sm font-bold text-muted-foreground hover:text-primary transition-colors group">
              <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" /> Back to Modules
            </Link>
            <div className="flex items-center gap-3">
              <Badge className="glass bg-primary/10 text-primary border-none px-3 py-1 rounded-lg font-black uppercase tracking-widest text-[10px]">
                Lesson 4 of {currentModule.lessons}
              </Badge>
              <h1 className="text-3xl font-black tracking-tight">Building RESTful Endpoints</h1>
              {isLessonComplete(lessonId) && (
                <Badge className="bg-emerald-500/10 text-emerald-500 border-none px-3 py-1 rounded-lg font-black uppercase tracking-widest text-[10px] flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Completed
                </Badge>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <GlassButton variant="secondary" className="rounded-xl px-6">
              <MessageSquare className="w-4 h-4 mr-2" /> Discussion
            </GlassButton>
            <GlassButton className="rounded-xl px-8 shadow-xl shadow-primary/20" onClick={() => navigate(`/modules/${id}/quiz`)}>
              Take Quiz <ChevronRight className="ml-2 w-4 h-4" />
            </GlassButton>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="aspect-video glass rounded-[2.5rem] overflow-hidden relative group cursor-pointer shadow-2xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=1200" 
                className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700"
                alt="Lesson Preview"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                  <Play className="w-10 h-10 text-primary fill-current ml-1" />
                </div>
              </div>
            </motion.div>

            <Card className="glass-card border-none">
              <CardContent className="p-10 prose prose-invert max-w-none">
                <h2 className="text-3xl font-black text-foreground mb-6">The Product Controller</h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  The controller is where your business logic lives. For an ecommerce site, your product controller 
                  needs to handle filtering, pagination, and search queries efficiently.
                </p>
                
                <div className="bg-slate-950 rounded-[2rem] p-8 my-10 relative group border border-white/5 shadow-2xl">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 glass rounded-xl">
                        <FileCode className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">controllers/productController.js</span>
                    </div>
                    <GlassButton 
                      variant="ghost" 
                      size="sm" 
                      className="h-9 px-4 rounded-xl text-xs font-black"
                      onClick={() => {
                        navigator.clipboard.writeText('const getProducts = async...');
                        toast.success("Code copied to clipboard!");
                      }}
                    >
                      <Copy className="w-4 h-4 mr-2" /> Copy Code
                    </GlassButton>
                  </div>
                  <pre className="text-sm font-mono text-indigo-100 overflow-x-auto no-scrollbar">
{`const getProducts = async (req, res) => {
  try {
    const { category, limit = 10 } = req.query;
    const products = await Product.find({ category })
      .limit(Number(limit))
      .sort({ createdAt: -1 });
      
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};`}
                  </pre>
                </div>
              </CardContent>
            </Card>

            <div className="flex items-center justify-between pt-8 border-t border-white/10">
              <GlassButton variant="secondary" className="rounded-2xl h-14 px-8 font-black">
                <ChevronLeft className="w-5 h-5 mr-2" /> Previous Lesson
              </GlassButton>
              <GlassButton 
                onClick={handleComplete}
                className={cn(
                  "rounded-2xl h-14 px-10 font-black shadow-2xl transition-all",
                  isLessonComplete(lessonId) ? "bg-emerald-500 hover:bg-emerald-400 shadow-emerald-500/20" : "shadow-primary/20"
                )}
              >
                {isLessonComplete(lessonId) ? 'Completed' : 'Complete & Next'} <ChevronRight className="w-5 h-5 ml-2" />
              </GlassButton>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <Card className="glass-card border-none">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 glass rounded-xl bg-primary/10">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-black">Module Progress</h3>
                </div>
                
                <div className="space-y-3 pt-4">
                  {[
                    { id: '1', title: "Intro to Express" },
                    { id: '2', title: "Middleware Basics" },
                    { id: '3', title: "Database Connection" },
                    { id: '4', title: "RESTful Endpoints" },
                    { id: '5', title: "Error Handling" }
                  ].map((item) => {
                    const currentLessonId = `${currentModule.id}-${item.id}`;
                    const isDone = isLessonComplete(currentLessonId);
                    const isCurrent = item.id === '4';

                    return (
                      <div key={item.id} className={cn(
                        "flex items-center gap-4 p-4 rounded-2xl transition-all",
                        isCurrent ? "glass bg-primary/5 border-primary/20" : "hover:bg-white/5"
                      )}>
                        {isDone ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        ) : isCurrent ? (
                          <div className="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center">
                            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                          </div>
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-white/10" />
                        )}
                        <span className={cn(
                          "text-sm font-bold",
                          isDone ? 'text-muted-foreground line-through' : isCurrent ? 'text-foreground' : 'text-muted-foreground'
                        )}>
                          {item.title}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default LessonDetail;