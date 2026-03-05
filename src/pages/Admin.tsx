"use client";

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  BookOpen, 
  BarChart3, 
  Settings as SettingsIcon,
  Plus,
  MoreVertical,
  Shield,
  Edit,
  Trash2,
  Search,
  Filter,
  ArrowUpRight,
  Activity,
  TrendingUp
} from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Link } from 'react-router-dom';
import GlassButton from '@/components/ui/GlassButton';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const Admin = () => {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <Badge className="glass bg-primary/10 text-primary border-primary/20 px-4 py-1.5 rounded-full font-black uppercase tracking-widest text-[10px]">
              System Administrator
            </Badge>
            <h1 className="text-5xl font-black tracking-tight">Command Center</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Monitor platform health, manage global content, and oversee user growth.
            </p>
          </div>
          <div className="flex gap-3">
            <GlassButton variant="secondary" className="rounded-2xl px-6">
              <BarChart3 className="w-4 h-4 mr-2" /> Analytics
            </GlassButton>
            <GlassButton className="rounded-2xl px-8" asChild>
              <Link to="/admin/modules/new"><Plus className="w-4 h-4 mr-2" /> New Module</Link>
            </GlassButton>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Total Users", value: "12,450", trend: "+12%", icon: Users, color: "text-primary" },
            { label: "Active Modules", value: "48", trend: "+3", icon: BookOpen, color: "text-accent" },
            { label: "Platform Revenue", value: "$84.2k", trend: "+18%", icon: BarChart3, color: "text-emerald-500" },
            { label: "System Health", value: "99.9%", trend: "Stable", icon: Activity, color: "text-indigo-500" }
          ].map((stat, i) => (
            <Card key={i} className="glass-card border-none">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">{stat.label}</p>
                    <h3 className="text-2xl font-black">{stat.value}</h3>
                    <p className="text-xs font-bold text-emerald-500 mt-1 flex items-center">
                      <TrendingUp className="w-3 h-3 mr-1" /> {stat.trend}
                    </p>
                  </div>
                  <div className="p-3 glass rounded-xl">
                    <stat.icon className={cn("w-5 h-5", stat.color)} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="users" className="space-y-8">
          <TabsList className="glass border-none p-1.5 rounded-[1.5rem] h-14 w-fit">
            <TabsTrigger value="users" className="rounded-2xl font-bold px-8 data-[state=active]:bg-primary data-[state=active]:text-white transition-all">
              <Users className="w-4 h-4 mr-2" /> Users
            </TabsTrigger>
            <TabsTrigger value="modules" className="rounded-2xl font-bold px-8 data-[state=active]:bg-primary data-[state=active]:text-white transition-all">
              <BookOpen className="w-4 h-4 mr-2" /> Modules
            </TabsTrigger>
            <TabsTrigger value="security" className="rounded-2xl font-bold px-8 data-[state=active]:bg-primary data-[state=active]:text-white transition-all">
              <Shield className="w-4 h-4 mr-2" /> Security
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search users by name or email..." className="glass border-none pl-11 h-12 rounded-2xl focus-visible:ring-primary" />
              </div>
              <GlassButton variant="secondary" className="rounded-2xl h-12 px-6">
                <Filter className="w-4 h-4 mr-2" /> Filter
              </GlassButton>
            </div>

            <Card className="glass-card border-none overflow-hidden">
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-white/5">
                    <TableRow className="border-white/10 hover:bg-transparent">
                      <TableHead className="px-8 py-5 font-black uppercase tracking-widest text-[10px]">User Identity</TableHead>
                      <TableHead className="font-black uppercase tracking-widest text-[10px]">Access Level</TableHead>
                      <TableHead className="font-black uppercase tracking-widest text-[10px]">Join Date</TableHead>
                      <TableHead className="font-black uppercase tracking-widest text-[10px]">Status</TableHead>
                      <TableHead className="text-right px-8 font-black uppercase tracking-widest text-[10px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { name: "Alex Rivera", email: "alex@example.com", role: "Admin", joined: "Jan 12, 2024", status: "Active", avatar: "https://github.com/shadcn.png" },
                      { name: "Sarah Chen", email: "sarah@example.com", role: "Student", joined: "Feb 05, 2024", status: "Active", avatar: "https://i.pravatar.cc/150?u=sarah" },
                      { name: "Mike Ross", email: "mike@example.com", role: "Team Lead", joined: "Mar 10, 2024", status: "Inactive", avatar: "https://i.pravatar.cc/150?u=mike" }
                    ].map((user, i) => (
                      <TableRow key={i} className="border-white/10 hover:bg-white/5 transition-colors group">
                        <TableCell className="px-8 py-5">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-primary transition-colors">
                              <img src={user.avatar} className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <p className="font-black text-sm">{user.name}</p>
                              <p className="text-xs text-muted-foreground font-medium">{user.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={cn(
                            "glass border-none text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg",
                            user.role === 'Admin' ? "bg-primary/10 text-primary" : "bg-white/5 text-muted-foreground"
                          )}>
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm font-bold text-muted-foreground">{user.joined}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className={cn("w-2 h-2 rounded-full", user.status === 'Active' ? "bg-emerald-500 animate-pulse" : "bg-white/20")} />
                            <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">{user.status}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right px-8">
                          <GlassButton variant="ghost" size="icon" className="rounded-xl">
                            <MoreVertical className="w-4 h-4 text-muted-foreground" />
                          </GlassButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="modules" className="grid md:grid-cols-2 gap-8">
            {[
              { id: 1, title: "HTML Basics", lessons: 8, students: 1240, status: "Published", color: "text-primary", bg: "bg-primary/10" },
              { id: 2, title: "CSS Styling", lessons: 12, students: 980, status: "Published", color: "text-accent", bg: "bg-accent/10" },
              { id: 3, title: "JS Cart Logic", lessons: 10, students: 450, status: "Draft", color: "text-emerald-500", bg: "bg-emerald-500/10" }
            ].map((module, i) => (
              <Card key={i} className="glass-card border-none group">
                <CardContent className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div className={cn("p-4 glass rounded-[1.5rem]", module.bg)}>
                      <BookOpen className={cn("w-8 h-8", module.color)} />
                    </div>
                    <Badge className={cn(
                      "glass border-none text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full",
                      module.status === 'Published' ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500"
                    )}>
                      {module.status}
                    </Badge>
                  </div>
                  <h3 className="text-2xl font-black mb-2 group-hover:text-primary transition-colors">{module.title}</h3>
                  <p className="text-muted-foreground font-medium mb-8">{module.lessons} Lessons • {module.students} Students enrolled</p>
                  <div className="flex gap-3">
                    <GlassButton variant="secondary" className="flex-1 rounded-xl h-12 font-bold" asChild>
                      <Link to={`/admin/modules/${module.id}`}><Edit className="w-4 h-4 mr-2" /> Edit Content</Link>
                    </GlassButton>
                    <GlassButton variant="ghost" size="icon" className="rounded-xl h-12 w-12 text-destructive hover:bg-destructive/10">
                      <Trash2 className="w-5 h-5" />
                    </GlassButton>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Admin;