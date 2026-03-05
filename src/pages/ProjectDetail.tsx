"use client";

import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  ChevronLeft, 
  Github, 
  MessageSquare, 
  Settings,
  CheckCircle2,
  Circle,
  Clock,
  Users,
  LayoutDashboard,
  Plus,
  MoreHorizontal,
  TrendingUp,
  FolderKanban,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';
import GlassButton from '@/components/ui/GlassButton';
import { toast } from 'sonner';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useProjects } from '@/contexts/ProjectContext';
import AIProjectAnalyzer from '@/components/ai/AIProjectAnalyzer';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProject, updateTask } = useProjects();
  const project = getProject(id || "");

  if (!project) {
    return (
      <DashboardLayout>
        <div className="text-center py-20">
          <h2 className="text-2xl font-black">Project not found</h2>
          <GlassButton className="mt-4" onClick={() => navigate('/projects')}>Back to Projects</GlassButton>
        </div>
      </DashboardLayout>
    );
  }

  const chartData = [
    { name: 'Done', value: project.tasks.filter(t => t.status === 'done').length, color: '#10b981' },
    { name: 'In Progress', value: project.tasks.filter(t => t.status === 'in-progress' || t.status === 'review').length, color: '#f59e0b' },
    { name: 'To Do', value: project.tasks.filter(t => t.status === 'todo').length, color: '#e2e8f0' },
  ];

  const toggleTask = (taskId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'done' ? 'todo' : 'done';
    updateTask(project.id, taskId, { status: newStatus });
    toast.success(`Task marked as ${newStatus}`);
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <Link to="/projects" className="flex items-center text-sm font-bold text-muted-foreground hover:text-primary transition-colors group">
              <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" /> Back to Projects
            </Link>
            <div className="flex items-center gap-4">
              <div className="p-4 glass rounded-[2rem] shadow-xl shadow-primary/10">
                <FolderKanban className="w-8 h-8 text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-4xl font-black tracking-tight">{project.title}</h1>
                  <Badge className="glass bg-primary/10 text-primary border-none px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-widest">
                    {project.status}
                  </Badge>
                </div>
                <p className="text-muted-foreground font-medium max-w-2xl">{project.description}</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <GlassButton variant="secondary" size="icon" className="rounded-2xl">
              <Github className="w-5 h-5" />
            </GlassButton>
            <GlassButton variant="secondary" className="rounded-2xl" onClick={() => navigate(`/projects/${project.id}/board`)}>
              <LayoutDashboard className="w-4 h-4 mr-2" /> Board
            </GlassButton>
            <GlassButton className="rounded-2xl px-8" onClick={() => navigate(`/projects/${project.id}/settings`)}>
              <Settings className="w-4 h-4 mr-2" /> Manage
            </GlassButton>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            <Card className="glass-card border-none overflow-hidden">
              <CardHeader className="p-8 pb-4 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-black">Project Roadmap</CardTitle>
                  <p className="text-sm text-muted-foreground font-medium mt-1">Track your build milestones</p>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-black text-primary">{project.progress}%</span>
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Complete</p>
                </div>
              </CardHeader>
              <CardContent className="p-8 pt-4 space-y-8">
                <div className="relative h-3 glass rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${project.progress}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="absolute inset-y-0 left-0 bg-primary shadow-[0_0_20px_rgba(99,102,241,0.5)]"
                  />
                </div>
                
                <div className="space-y-3">
                  {project.tasks.map((task) => (
                    <motion.div 
                      key={task.id} 
                      whileHover={{ x: 4 }}
                      onClick={() => toggleTask(task.id, task.status)}
                      className="flex items-center gap-4 p-5 glass rounded-2xl border-none hover:bg-white/10 transition-all cursor-pointer group"
                    >
                      <div className={cn(
                        "w-6 h-6 rounded-full flex items-center justify-center transition-colors",
                        task.status === 'done' ? "bg-emerald-500 text-white" : "border-2 border-white/20 text-transparent group-hover:border-primary"
                      )}>
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <span className={cn(
                        "flex-1 font-bold text-lg transition-all",
                        task.status === 'done' ? "text-muted-foreground line-through opacity-50" : "text-foreground"
                      )}>
                        {task.title}
                      </span>
                      <Badge className={cn(
                        "glass border-none text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg",
                        task.status === 'done' ? "bg-emerald-500/10 text-emerald-500" : 
                        task.status === 'in-progress' ? "bg-amber-500/10 text-amber-500" : "bg-white/5 text-muted-foreground"
                      )}>
                        {task.status}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <AIProjectAnalyzer project={project} />

            <Card className="glass-card border-none">
              <CardHeader className="p-6 pb-2">
                <CardTitle className="text-lg font-black uppercase tracking-widest text-muted-foreground">Task Distribution</CardTitle>
              </CardHeader>
              <CardContent className="h-[240px] p-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={8}
                      dataKey="value"
                      stroke="none"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(0,0,0,0.8)', 
                        borderRadius: '16px', 
                        border: 'none', 
                        color: 'white',
                        fontWeight: 'bold'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-6 pb-6">
                  {chartData.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{item.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-none">
              <CardHeader className="p-6 pb-2">
                <CardTitle className="text-lg font-black uppercase tracking-widest text-muted-foreground">Tech Stack</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-4">
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <Badge key={t} className="glass bg-primary/5 text-primary border-primary/10 px-4 py-2 rounded-xl text-sm font-bold">
                      {t}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProjectDetail;