"use client";

import React, { useMemo } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  Plus, 
  BookOpen,
  FolderKanban,
  ChevronRight,
  Zap,
  Star,
  MessageSquare
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import GlassButton from '@/components/ui/GlassButton';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useProjects } from '@/contexts/ProjectContext';
import { useLearning } from '@/contexts/LearningContext';

const data = [
  { name: 'Mon', hours: 2 },
  { name: 'Tue', hours: 5 },
  { name: 'Wed', hours: 3 },
  { name: 'Thu', hours: 8 },
  { name: 'Fri', hours: 6 },
  { name: 'Sat', hours: 4 },
  { name: 'Sun', hours: 9 },
];

const StatCard = ({ title, value, icon: Icon, trend, color, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
  >
    <Card className="glass-card border-none overflow-hidden">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">{title}</p>
            <h3 className="text-3xl font-black tracking-tight">{value}</h3>
            {trend && (
              <p className="text-xs font-bold text-emerald-500 mt-2 flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" /> {trend}
              </p>
            )}
          </div>
          <div className={cn("p-3 glass rounded-2xl shadow-xl", color)}>
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

const Dashboard = () => {
  const { user } = useAuth();
  const { projects } = useProjects();
  const { modules, progress: learningProgress } = useLearning();

  const stats = useMemo(() => {
    const totalLessons = modules.reduce((acc, m) => acc + m.lessons, 0);
    const completedLessons = learningProgress.completedLessons.length;
    const overallLearningProgress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

    const totalTasks = projects.reduce((acc, p) => acc + p.tasks.length, 0);
    const completedTasks = projects.reduce((acc, p) => acc + p.tasks.filter(t => t.status === 'done').length, 0);

    return {
      learningProgress: overallLearningProgress,
      activeProjects: projects.length,
      completedTasks,
      totalTasks
    };
  }, [modules, learningProgress, projects]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-5xl font-black tracking-tight">
              {getGreeting()}, <span className="text-primary">{user.name.split(' ')[0]}!</span> 👋
            </h1>
            <p className="text-xl text-muted-foreground">Your workspace is optimized and ready for action.</p>
          </div>
          <div className="flex gap-3">
            <GlassButton variant="secondary" className="rounded-2xl px-6" asChild>
              <Link to="/community"><MessageSquare className="w-4 h-4 mr-2" /> Community</Link>
            </GlassButton>
            <GlassButton className="rounded-2xl px-8 shadow-2xl shadow-primary/20" asChild>
              <Link to="/projects/new"><Plus className="w-4 h-4 mr-2" /> New Project</Link>
            </GlassButton>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Learning Progress" 
            value={`${stats.learningProgress}%`} 
            icon={BookOpen} 
            trend="+12% this week"
            color="bg-primary"
            delay={0.1}
          />
          <StatCard 
            title="Active Projects" 
            value={stats.activeProjects.toString()} 
            icon={FolderKanban} 
            color="bg-accent"
            delay={0.2}
          />
          <StatCard 
            title="Completed Tasks" 
            value={stats.completedTasks.toString()} 
            icon={CheckCircle2} 
            trend={`of ${stats.totalTasks} total`}
            color="bg-emerald-500"
            delay={0.3}
          />
          <StatCard 
            title="Study Hours" 
            value="12.5h" 
            icon={Clock} 
            color="bg-amber-500"
            delay={0.4}
          />
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-10">
            <Card className="glass-card border-none overflow-hidden">
              <CardHeader className="p-8 pb-0">
                <CardTitle className="text-2xl font-black">Learning Activity</CardTitle>
                <p className="text-sm text-muted-foreground font-medium">Your engagement over the last 7 days</p>
              </CardHeader>
              <CardContent className="h-[350px] w-full p-8 pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 'bold' }}
                      dy={10}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 'bold' }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(0,0,0,0.8)', 
                        borderRadius: '16px', 
                        border: 'none', 
                        boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                        color: 'white'
                      }} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="hours" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={4}
                      fillOpacity={1} 
                      fill="url(#colorHours)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
                <div className="p-2 glass rounded-xl"><Star className="w-6 h-6 text-amber-500 fill-current" /></div>
                Recommended for You
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { title: "Advanced Stripe Flows", category: "Backend", time: "45 mins", icon: Zap, color: "text-amber-500", bg: "bg-amber-500/10" },
                  { title: "Next.js Image Optimization", category: "Frontend", time: "20 mins", icon: BookOpen, color: "text-primary", bg: "bg-primary/10" }
                ].map((item, i) => (
                  <motion.div key={i} whileHover={{ y: -5 }}>
                    <Card className="glass-card border-none group cursor-pointer">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-5">
                          <div className={cn("p-4 glass rounded-[1.5rem] shadow-xl", item.bg)}>
                            <item.icon className={cn("w-6 h-6", item.color)} />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-black text-lg group-hover:text-primary transition-colors">{item.title}</h4>
                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{item.category} • {item.time}</p>
                          </div>
                          <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-1" />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <h2 className="text-2xl font-black tracking-tight">Activity Feed</h2>
            <Card className="glass-card border-none">
              <CardContent className="p-8 space-y-8">
                {[
                  { user: "Sarah K.", action: "commented on", target: "LuxeCart UI", time: "2h ago", avatar: "https://i.pravatar.cc/150?u=sarah" },
                  { user: "You", action: "completed", target: "Auth Module", time: "5h ago", avatar: user.avatar },
                  { user: "Mike R.", action: "joined team", target: "SwiftShop", time: "Yesterday", avatar: "https://i.pravatar.cc/150?u=mike" }
                ].map((activity, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-primary transition-colors">
                        <img src={activity.avatar} className="w-full h-full object-cover" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary rounded-full border-2 border-background flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-white rounded-full" />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium leading-relaxed">
                        <span className="font-black">{activity.user}</span> {activity.action} <span className="font-black text-primary">{activity.target}</span>
                      </p>
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
                <GlassButton variant="secondary" className="w-full rounded-2xl h-12 font-black" asChild>
                  <Link to="/notifications">View All Activity</Link>
                </GlassButton>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;