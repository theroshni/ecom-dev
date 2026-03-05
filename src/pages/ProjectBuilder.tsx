"use client";

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Plus, 
  CheckCircle2, 
  Circle,
  Layout,
  Database,
  ShieldCheck,
  Rocket,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Loader2,
  Trash2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import GlassButton from '@/components/ui/GlassButton';
import { Badge } from '@/components/ui/badge';
import { useProjects } from '@/contexts/ProjectContext';
import { useNavigate } from 'react-router-dom';

const ProjectBuilder = () => {
  const navigate = useNavigate();
  const { addProject } = useProjects();
  const [step, setStep] = React.useState(1);
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [formData, setFormData] = React.useState({
    title: "",
    description: "",
    tech: ["Next.js 15", "Supabase", "Clerk", "Tailwind CSS 4"]
  });

  const [milestones, setMilestones] = React.useState([
    { id: 1, text: "Setup project repository and basic structure", completed: false },
    { id: 2, text: "Design product listing and detail pages", completed: false }
  ]);

  const handleGenerateRoadmap = async () => {
    if (!formData.description) {
      toast.error("Please provide a description first so the AI can analyze it.");
      return;
    }

    setIsGenerating(true);
    toast.loading("AI is architecting your roadmap...");
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const aiMilestones = [
      { id: Date.now() + 1, text: `Initialize ${formData.tech[0]} application with TypeScript`, completed: false },
      { id: Date.now() + 2, text: "Configure database schema and authentication", completed: false },
      { id: Date.now() + 3, text: "Implement core ecommerce logic and cart state", completed: false },
      { id: Date.now() + 4, text: "Integrate payment gateway and webhook handlers", completed: false },
      { id: Date.now() + 5, text: "Optimize for production and SEO", completed: false }
    ];

    setMilestones(aiMilestones);
    setIsGenerating(false);
    toast.dismiss();
    toast.success("AI Roadmap generated successfully!");
  };

  const handleFinalize = () => {
    if (!formData.title) {
      toast.error("Please enter a project name");
      setStep(1);
      return;
    }

    addProject({
      title: formData.title,
      description: formData.description,
      tech: formData.tech,
      status: "Planning",
      progress: 0
    });

    toast.success("Project plan finalized and saved!");
    navigate('/projects');
  };

  const steps = [
    { id: 1, title: "Basics", icon: Rocket },
    { id: 2, title: "Tech Stack", icon: Sparkles },
    { id: 3, title: "Roadmap", icon: Layout }
  ];

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <Badge className="glass bg-primary/10 text-primary border-primary/20 px-4 py-1.5 rounded-full font-black uppercase tracking-widest text-[10px]">
                Architect Mode
              </Badge>
              <h1 className="text-5xl font-black tracking-tight">Project Builder</h1>
              <p className="text-xl text-muted-foreground">Let's architect your next ecommerce masterpiece.</p>
            </div>
          </div>

          <div className="flex items-center justify-between relative px-4">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-white/5 -translate-y-1/2 z-0 rounded-full" />
            <motion.div 
              className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 z-0 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.5)]"
              initial={{ width: "0%" }}
              animate={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
            {steps.map((s) => (
              <div key={s.id} className="relative z-10 flex flex-col items-center gap-3">
                <motion.div 
                  className={cn(
                    "w-14 h-14 rounded-[1.5rem] flex items-center justify-center transition-all duration-500 border-4 border-background shadow-2xl",
                    step >= s.id ? "bg-primary text-white" : "glass text-muted-foreground"
                  )}
                  animate={{ scale: step === s.id ? 1.1 : 1 }}
                >
                  <s.icon className="w-6 h-6" />
                </motion.div>
                <span className={cn(
                  "text-[10px] font-black uppercase tracking-widest",
                  step >= s.id ? "text-primary" : "text-muted-foreground"
                )}>{s.title}</span>
              </div>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
              <Card className="glass-card border-none p-10">
                <div className="space-y-8">
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Project Name</Label>
                    <Input 
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      placeholder="e.g. LuxeCart Storefront" 
                      className="glass border-none h-14 rounded-2xl text-lg font-bold focus-visible:ring-primary" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Description</Label>
                    <Textarea 
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      placeholder="What are you building? (e.g. A high-end fashion store with real-time inventory)" 
                      className="glass border-none min-h-[150px] rounded-2xl text-lg font-medium focus-visible:ring-primary resize-none" 
                    />
                  </div>
                </div>
              </Card>
              <div className="flex justify-end">
                <GlassButton onClick={() => setStep(2)} className="h-14 px-10 rounded-2xl text-lg font-black">
                  Next Step <ChevronRight className="ml-2 w-5 h-5" />
                </GlassButton>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
              <Card className="glass-card border-none p-10">
                <div className="grid sm:grid-cols-2 gap-8">
                  {[
                    { icon: Layout, label: "Frontend", options: ["Next.js 15", "React (Vite)", "Vue 3"] },
                    { icon: Database, label: "Database", options: ["Supabase", "MongoDB", "PostgreSQL"] },
                    { icon: ShieldCheck, label: "Auth", options: ["Clerk", "NextAuth.js", "Firebase"] },
                    { icon: Sparkles, label: "Styling", options: ["Tailwind CSS 4", "Styled Components", "Framer Motion"] }
                  ].map((stack, i) => (
                    <div key={i} className="space-y-4 p-8 glass rounded-[2rem] border-none group hover:bg-primary/5 transition-all">
                      <div className="flex items-center gap-3">
                        <div className="p-3 glass rounded-2xl group-hover:bg-primary group-hover:text-white transition-colors">
                          <stack.icon className="w-6 h-6" />
                        </div>
                        <Label className="text-sm font-black uppercase tracking-widest">{stack.label}</Label>
                      </div>
                      <select 
                        className="w-full glass border-none h-12 rounded-xl px-4 outline-none focus:ring-2 focus:ring-primary font-bold"
                        onChange={(e) => {
                          const newTech = [...formData.tech];
                          newTech[i] = e.target.value;
                          setFormData({...formData, tech: newTech});
                        }}
                      >
                        {stack.options.map(opt => <option key={opt}>{opt}</option>)}
                      </select>
                    </div>
                  ))}
                </div>
              </Card>
              <div className="flex justify-between">
                <GlassButton variant="secondary" onClick={() => setStep(1)} className="h-14 px-10 rounded-2xl text-lg font-black">
                  <ChevronLeft className="mr-2 w-5 h-5" /> Back
                </GlassButton>
                <GlassButton onClick={() => setStep(3)} className="h-14 px-10 rounded-2xl text-lg font-black">
                  Next Step <ChevronRight className="ml-2 w-5 h-5" />
                </GlassButton>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
              <Card className="glass-card border-none p-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                  <div>
                    <h3 className="text-2xl font-black">Project Roadmap</h3>
                    <p className="text-sm text-muted-foreground font-medium">Define the milestones for your build.</p>
                  </div>
                  <GlassButton 
                    variant="secondary" 
                    className="rounded-xl h-12 px-6 font-black text-primary"
                    onClick={handleGenerateRoadmap}
                    isLoading={isGenerating}
                  >
                    <Sparkles className="w-4 h-4 mr-2 fill-current" /> Generate AI Roadmap
                  </GlassButton>
                </div>
                <div className="space-y-3">
                  {milestones.map((m, idx) => (
                    <motion.div 
                      key={m.id} 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center gap-5 p-6 glass rounded-[2rem] border-none group"
                    >
                      <Circle className="w-6 h-6 text-muted-foreground" />
                      <span className="flex-1 text-lg font-bold">{m.text}</span>
                      <button 
                        onClick={() => setMilestones(milestones.filter(item => item.id !== m.id))}
                        className="opacity-0 group-hover:opacity-100 p-2 hover:bg-destructive/10 rounded-xl text-destructive transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                  <button 
                    onClick={() => setMilestones([...milestones, { id: Date.now(), text: "New Milestone", completed: false }])}
                    className="w-full flex items-center justify-center gap-2 p-6 glass rounded-[2rem] border-2 border-dashed border-white/10 hover:border-primary/50 hover:bg-primary/5 transition-all text-muted-foreground hover:text-primary font-black"
                  >
                    <Plus className="w-5 h-5" /> Add Custom Milestone
                  </button>
                </div>
              </Card>
              <div className="flex justify-between">
                <GlassButton variant="secondary" onClick={() => setStep(2)} className="h-14 px-10 rounded-2xl text-lg font-black">
                  <ChevronLeft className="mr-2 w-5 h-5" /> Back
                </GlassButton>
                <GlassButton onClick={handleFinalize} className="h-14 px-10 rounded-2xl text-lg font-black shadow-2xl shadow-primary/20">
                  Finalize Plan <Rocket className="ml-2 w-5 h-5" />
                </GlassButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
};

export default ProjectBuilder;