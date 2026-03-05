"use client";

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  ChevronLeft, 
  Save, 
  Plus, 
  Trash2, 
  GripVertical, 
  PlayCircle, 
  FileText, 
  HelpCircle,
  Eye,
  Sparkles,
  Settings,
  Cloud,
  ArrowRight
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import GlassButton from '@/components/ui/GlassButton';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

const ModuleEditor = () => {
  const navigate = useNavigate();
  const [lessons, setLessons] = React.useState([
    { id: 1, title: "Introduction to Ecommerce", type: "video", duration: "10:00" },
    { id: 2, title: "Setting up your Environment", type: "text", duration: "5 mins" },
    { id: 3, title: "Module Quiz", type: "quiz", duration: "10 questions" }
  ]);

  const handleSave = () => {
    toast.success("Module saved to cloud!");
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <button onClick={() => navigate('/admin')} className="flex items-center text-sm font-bold text-muted-foreground hover:text-primary transition-colors group">
              <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" /> Back to Admin
            </button>
            <div className="flex items-center gap-4">
              <div className="p-4 glass rounded-[2rem] shadow-xl shadow-primary/10">
                <FileText className="w-8 h-8 text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-4xl font-black tracking-tight">Module Editor</h1>
                  <Badge className="glass bg-primary/10 text-primary border-none px-3 py-1 rounded-lg font-black uppercase tracking-widest text-[10px]">Draft</Badge>
                </div>
                <p className="text-muted-foreground font-medium">Creating: Advanced Stripe Integration</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <GlassButton variant="secondary" className="rounded-2xl px-6">
              <Eye className="w-4 h-4 mr-2" /> Preview
            </GlassButton>
            <GlassButton className="rounded-2xl px-10 h-14 font-black shadow-2xl shadow-primary/20" onClick={handleSave}>
              <Save className="w-5 h-5 mr-2" /> Save Module
            </GlassButton>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Main Editor */}
          <div className="lg:col-span-8 space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="glass-card border-none overflow-hidden">
                <CardHeader className="p-10 pb-4">
                  <CardTitle className="text-2xl font-black">Module Details</CardTitle>
                </CardHeader>
                <CardContent className="p-10 pt-4 space-y-8">
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Module Title</Label>
                    <Input placeholder="e.g. Advanced Stripe Integration" className="glass border-none h-14 rounded-2xl text-lg font-bold focus-visible:ring-primary" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Description</Label>
                    <Textarea placeholder="What will students learn in this module?" className="glass border-none min-h-[150px] rounded-2xl text-lg font-medium focus-visible:ring-primary resize-none" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Category</Label>
                      <select className="w-full glass border-none h-14 rounded-2xl px-4 outline-none focus:ring-2 focus:ring-primary font-bold">
                        <option>Frontend</option>
                        <option>Backend</option>
                        <option>Fullstack</option>
                        <option>Design</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Difficulty</Label>
                      <select className="w-full glass border-none h-14 rounded-2xl px-4 outline-none focus:ring-2 focus:ring-primary font-bold">
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Advanced</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Card className="glass-card border-none overflow-hidden">
                <CardHeader className="p-10 pb-4 flex flex-row items-center justify-between">
                  <CardTitle className="text-2xl font-black">Lessons & Content</CardTitle>
                  <GlassButton variant="ghost" size="sm" className="text-primary font-black">
                    <Plus className="w-4 h-4 mr-2" /> Add Lesson
                  </GlassButton>
                </CardHeader>
                <CardContent className="p-10 pt-4 space-y-4">
                  <AnimatePresence mode="popLayout">
                    {lessons.map((lesson, i) => (
                      <motion.div 
                        key={lesson.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-center gap-6 p-6 glass rounded-[2rem] border-none hover:bg-white/5 transition-all group"
                      >
                        <GripVertical className="w-6 h-6 text-muted-foreground/30 cursor-grab active:cursor-grabbing" />
                        <div className="p-4 glass rounded-2xl bg-primary/10 shadow-xl">
                          {lesson.type === 'video' ? <PlayCircle className="w-6 h-6 text-primary" /> : 
                           lesson.type === 'quiz' ? <HelpCircle className="w-6 h-6 text-primary" /> : 
                           <FileText className="w-6 h-6 text-primary" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-xl font-black group-hover:text-primary transition-colors">{lesson.title}</p>
                          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1">{lesson.type} • {lesson.duration}</p>
                        </div>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <GlassButton variant="ghost" size="icon" className="h-10 w-10 rounded-xl text-muted-foreground hover:text-primary">
                            <Settings className="w-5 h-5" />
                          </GlassButton>
                          <GlassButton variant="ghost" size="icon" className="h-10 w-10 rounded-xl text-muted-foreground hover:text-destructive">
                            <Trash2 className="w-5 h-5" />
                          </GlassButton>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar: Settings */}
          <div className="lg:col-span-4 space-y-8">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <Card className="glass-card border-none overflow-hidden">
                <CardHeader className="p-8 pb-4">
                  <CardTitle className="text-xl font-black">Publishing</CardTitle>
                </CardHeader>
                <CardContent className="p-8 pt-4 space-y-8">
                  <div className="flex items-center justify-between p-4 glass rounded-2xl border-none">
                    <Label className="font-bold">Published</Label>
                    <Badge className="glass bg-white/5 text-muted-foreground border-none px-3 py-1 rounded-lg font-black uppercase tracking-widest text-[10px]">No</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 glass rounded-2xl border-none">
                    <Label className="font-bold">Featured</Label>
                    <Badge className="glass bg-amber-500/10 text-amber-500 border-none px-3 py-1 rounded-lg font-black uppercase tracking-widest text-[10px]">No</Badge>
                  </div>
                  
                  <div className="pt-4 border-t border-white/10">
                    <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-4 block">Module Thumbnail</Label>
                    <div className="aspect-video glass rounded-[2rem] border-2 border-dashed border-white/10 flex flex-col items-center justify-center text-muted-foreground hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer group">
                      <div className="p-4 glass rounded-2xl mb-4 group-hover:bg-primary group-hover:text-white transition-all">
                        <Plus className="w-8 h-8" />
                      </div>
                      <span className="text-sm font-black uppercase tracking-widest">Upload Image</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <Card className="glass-card border-none bg-primary/5 p-8 relative overflow-hidden">
              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 glass rounded-xl bg-primary/10">
                    <Sparkles className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-black">Admin Tip</h3>
                </div>
                <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                  Keep lessons under 15 minutes for better student engagement. Use quizzes at the end of each module to verify learning.
                </p>
                <GlassButton variant="ghost" className="p-0 h-auto font-black text-primary group">
                  View Best Practices <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </GlassButton>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ModuleEditor;