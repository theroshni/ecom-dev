"use client";

import React from 'react';
import { Link, useParams } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  ChevronLeft, 
  Plus, 
  MoreHorizontal, 
  MessageSquare, 
  Paperclip, 
  Settings,
  LayoutDashboard,
  Sparkles,
  Zap,
  Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';
import GlassButton from '@/components/ui/GlassButton';
import { motion } from 'framer-motion';
import { useProjects, Task } from '@/contexts/ProjectContext';
import { toast } from 'sonner';

const ProjectBoard = () => {
  const { id } = useParams();
  const { getProject, updateTask, addTask } = useProjects();
  const project = getProject(id || "");

  if (!project) return null;

  const columns: { id: Task['status'], title: string }[] = [
    { id: 'todo', title: 'To Do' },
    { id: 'in-progress', title: 'In Progress' },
    { id: 'review', title: 'Review' },
    { id: 'done', title: 'Done' }
  ];

  const handleMoveTask = (taskId: string, newStatus: Task['status']) => {
    updateTask(project.id, taskId, { status: newStatus });
    toast.success(`Task moved to ${newStatus}`);
  };

  const handleAddTask = (status: Task['status']) => {
    addTask(project.id, {
      title: "New Task",
      priority: "Medium",
      status,
      members: ["AR"],
      comments: 0,
      files: 0,
      time: "Just now"
    });
    toast.success("New task added");
  };

  return (
    <DashboardLayout>
      <div className="max-w-full mx-auto h-[calc(100vh-160px)] flex flex-col space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex items-center gap-6">
            <Link to={`/projects/${id}`} className="p-4 glass rounded-2xl hover:bg-primary/5 transition-all group">
              <ChevronLeft className="w-6 h-6 text-muted-foreground group-hover:text-primary group-hover:-translate-x-1 transition-all" />
            </Link>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-3xl font-black tracking-tight">Project Board</h1>
                <Badge className="glass bg-primary/10 text-primary border-none px-3 py-1 rounded-lg font-black uppercase tracking-widest text-[10px]">Kanban</Badge>
              </div>
              <p className="text-lg text-muted-foreground font-medium">{project.title} • Sprint 4</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <GlassButton variant="secondary" className="rounded-xl px-6">
              <Settings className="w-4 h-4 mr-2" /> Board Settings
            </GlassButton>
            <GlassButton className="rounded-xl px-8 shadow-2xl shadow-primary/20" onClick={() => handleAddTask('todo')}>
              <Plus className="w-4 h-4 mr-2" /> Add Task
            </GlassButton>
          </div>
        </div>

        <div className="flex-1 overflow-x-auto pb-6 no-scrollbar">
          <div className="flex gap-8 h-full min-w-max px-2">
            {columns.map((column, colIdx) => (
              <motion.div 
                key={column.id} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: colIdx * 0.1 }}
                className="w-80 flex flex-col h-full"
              >
                <div className="flex items-center justify-between mb-6 px-4">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-black tracking-tight">{column.title}</h3>
                    <div className="glass bg-white/5 text-muted-foreground rounded-full h-6 w-6 flex items-center justify-center text-[10px] font-black">
                      {project.tasks.filter(t => t.status === column.id).length}
                    </div>
                  </div>
                  <GlassButton variant="ghost" size="icon" className="h-9 w-9 rounded-xl" onClick={() => handleAddTask(column.id)}>
                    <Plus className="w-4 h-4" />
                  </GlassButton>
                </div>

                <div className="flex-1 glass bg-white/5 rounded-[2.5rem] p-4 space-y-4 overflow-y-auto no-scrollbar border-none shadow-inner">
                  {project.tasks.filter(t => t.status === column.id).map((task, taskIdx) => (
                    <motion.div
                      key={task.id}
                      whileHover={{ y: -4, scale: 1.02 }}
                      className="cursor-grab active:cursor-grabbing"
                    >
                      <Card className="glass-card border-none shadow-xl group overflow-hidden">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <Badge className={cn(
                              "glass border-none text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg",
                              task.priority === 'High' ? "bg-destructive/10 text-destructive" : 
                              task.priority === 'Medium' ? "bg-amber-500/10 text-amber-500" : "bg-emerald-500/10 text-emerald-500"
                            )}>
                              {task.priority}
                            </Badge>
                            <div className="flex gap-1">
                              {columns.filter(c => c.id !== column.id).map(c => (
                                <button 
                                  key={c.id}
                                  onClick={() => handleMoveTask(task.id, c.id)}
                                  className="w-6 h-6 glass rounded-lg flex items-center justify-center text-[8px] font-black hover:bg-primary hover:text-white transition-colors"
                                  title={`Move to ${c.title}`}
                                >
                                  {c.title[0]}
                                </button>
                              ))}
                            </div>
                          </div>
                          
                          <h4 className="text-lg font-black text-foreground mb-6 leading-tight group-hover:text-primary transition-colors">{task.title}</h4>
                          
                          <div className="flex items-center justify-between pt-6 border-t border-white/5">
                            <div className="flex items-center gap-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                              <span className="flex items-center gap-1.5"><MessageSquare className="w-3.5 h-3.5" /> {task.comments}</span>
                              <span className="flex items-center gap-1.5"><Paperclip className="w-3.5 h-3.5" /> {task.files}</span>
                              <span className="flex items-center gap-1.5 text-primary"><Clock className="w-3.5 h-3.5" /> {task.time}</span>
                            </div>
                            <div className="flex -space-x-3">
                              {task.members.map((m, i) => (
                                <Avatar key={i} className="h-8 w-8 border-2 border-background shadow-xl">
                                  <AvatarFallback className="bg-primary/10 text-primary text-[10px] font-black">{m}</AvatarFallback>
                                </Avatar>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                  <GlassButton variant="ghost" className="w-full h-14 rounded-2xl border-2 border-dashed border-white/10 hover:border-primary/50 hover:bg-primary/5 font-black text-muted-foreground hover:text-primary transition-all" onClick={() => handleAddTask(column.id)}>
                    <Plus className="w-5 h-5 mr-2" /> Add New Task
                  </GlassButton>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* AI Board Assistant */}
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-8 right-8 z-50"
        >
          <GlassButton className="h-16 px-8 rounded-[2rem] shadow-2xl shadow-primary/40 bg-primary text-white border-none">
            <Sparkles className="w-6 h-6 mr-3 fill-current" />
            <span className="font-black">AI Board Assistant</span>
            <div className="ml-4 px-2 py-1 bg-white/20 rounded-lg text-[10px]">Optimizing</div>
          </GlassButton>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default ProjectBoard;