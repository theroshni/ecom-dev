"use client";

import React from 'react';
import { Link, useParams } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronLeft, 
  Settings, 
  Users, 
  Shield, 
  Zap, 
  Trash2, 
  Save,
  Globe,
  Lock,
  Eye,
  UserPlus,
  Github,
  Cloud
} from 'lucide-react';
import { cn } from '@/lib/utils';
import GlassButton from '@/components/ui/GlassButton';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const ProjectSettings = () => {
  const { id } = useParams();

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="space-y-4">
          <Link to={`/projects/${id}`} className="flex items-center text-sm font-bold text-muted-foreground hover:text-primary transition-colors group">
            <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" /> Back to Project
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <Badge className="glass bg-primary/10 text-primary border-none px-3 py-1 rounded-lg font-black uppercase tracking-widest text-[10px]">
                Configuration
              </Badge>
              <h1 className="text-5xl font-black tracking-tight">Project Settings</h1>
              <p className="text-xl text-muted-foreground">Manage LuxeCart Storefront's core parameters.</p>
            </div>
            <GlassButton className="rounded-2xl px-10 h-14 font-black shadow-2xl shadow-primary/20" onClick={() => toast.success("Settings saved successfully")}>
              <Save className="w-5 h-5 mr-2" /> Save Changes
            </GlassButton>
          </div>
        </div>

        <div className="grid gap-10">
          {/* General Settings */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="glass-card border-none overflow-hidden">
              <CardHeader className="p-10 pb-4">
                <div className="flex items-center gap-4 mb-2">
                  <div className="p-3 glass rounded-2xl bg-primary/10">
                    <Settings className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-black">General Configuration</CardTitle>
                    <CardDescription className="text-lg font-medium">Update your project's identity and visibility.</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-10 pt-4 space-y-8">
                <div className="grid sm:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Project Name</Label>
                    <Input defaultValue="LuxeCart Storefront" className="glass border-none h-14 rounded-2xl text-lg font-bold focus-visible:ring-primary" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Project ID</Label>
                    <Input defaultValue="PRJ-9021" disabled className="glass border-none h-14 rounded-2xl text-lg font-bold opacity-50" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Description</Label>
                  <Input defaultValue="A high-end fashion ecommerce template with Next.js 14." className="glass border-none h-14 rounded-2xl text-lg font-medium focus-visible:ring-primary" />
                </div>
                <div className="flex items-center justify-between p-8 glass rounded-[2rem] border-none group hover:bg-primary/5 transition-all">
                  <div className="flex items-center gap-6">
                    <div className="p-4 glass rounded-2xl group-hover:bg-primary group-hover:text-white transition-colors">
                      <Globe className="w-8 h-8" />
                    </div>
                    <div>
                      <p className="text-xl font-black">Public Visibility</p>
                      <p className="text-muted-foreground font-medium">Allow anyone with the link to view this project plan.</p>
                    </div>
                  </div>
                  <Switch defaultChecked className="data-[state=checked]:bg-primary" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Team Access */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="glass-card border-none overflow-hidden">
              <CardHeader className="p-10 pb-4">
                <div className="flex items-center gap-4 mb-2">
                  <div className="p-3 glass rounded-2xl bg-accent/10">
                    <Users className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-black">Team & Permissions</CardTitle>
                    <CardDescription className="text-lg font-medium">Manage who can collaborate on this build.</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-10 pt-4 space-y-6">
                <div className="flex items-center justify-between p-6 glass rounded-2xl border-none">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-black text-xl shadow-inner">AR</div>
                    <div>
                      <p className="text-lg font-black">Alex Rivera (You)</p>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Owner • Full Access</p>
                    </div>
                  </div>
                  <Badge className="glass bg-primary/10 text-primary border-none px-4 py-1.5 rounded-lg font-black uppercase tracking-widest text-[10px]">Primary</Badge>
                </div>
                <GlassButton variant="ghost" className="w-full h-16 rounded-[2rem] border-2 border-dashed border-white/10 hover:border-primary/50 hover:bg-primary/5 font-black text-lg">
                  <UserPlus className="w-6 h-6 mr-3" /> Invite Team Member
                </GlassButton>
              </CardContent>
            </Card>
          </motion.div>

          {/* Integrations */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="glass-card border-none overflow-hidden">
              <CardHeader className="p-10 pb-4">
                <div className="flex items-center gap-4 mb-2">
                  <div className="p-3 glass rounded-2xl bg-emerald-500/10">
                    <Zap className="w-6 h-6 text-emerald-500" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-black">Integrations</CardTitle>
                    <CardDescription className="text-lg font-medium">Connect your project to external services.</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-10 pt-4 space-y-4">
                {[
                  { name: "GitHub", status: "Connected", desc: "Sync your code repository.", icon: Github, color: "text-foreground" },
                  { name: "Vercel", status: "Connected", desc: "Automatic deployments.", icon: Cloud, color: "text-primary" },
                  { name: "Stripe", status: "Not Connected", desc: "Handle payments and subscriptions.", icon: Zap, color: "text-amber-500" }
                ].map((int, i) => (
                  <div key={i} className="flex items-center justify-between p-6 glass rounded-2xl border-none group hover:bg-white/5 transition-all">
                    <div className="flex items-center gap-5">
                      <div className={cn("p-3 glass rounded-xl", int.color === 'text-foreground' ? 'bg-white/10' : 'bg-primary/10')}>
                        <int.icon className={cn("w-6 h-6", int.color)} />
                      </div>
                      <div>
                        <p className="text-lg font-black">{int.name}</p>
                        <p className="text-sm text-muted-foreground font-medium">{int.desc}</p>
                      </div>
                    </div>
                    <GlassButton variant={int.status === 'Connected' ? 'secondary' : 'primary'} className="rounded-xl h-11 px-6 font-black">
                      {int.status === 'Connected' ? 'Configure' : 'Connect'}
                    </GlassButton>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Danger Zone */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="glass-card border-2 border-destructive/20 bg-destructive/5 overflow-hidden">
              <CardHeader className="p-10 pb-4">
                <div className="flex items-center gap-4 mb-2">
                  <div className="p-3 glass rounded-2xl bg-destructive/10">
                    <Shield className="w-6 h-6 text-destructive" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-black text-destructive">Danger Zone</CardTitle>
                    <CardDescription className="text-lg font-medium text-destructive/60">Irreversible actions for this project.</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-10 pt-4 space-y-4">
                <div className="flex items-center justify-between p-6 glass bg-white/5 rounded-2xl border-none">
                  <div>
                    <p className="text-lg font-black">Archive Project</p>
                    <p className="text-sm text-muted-foreground font-medium">Make this project read-only and hide it from active lists.</p>
                  </div>
                  <GlassButton variant="secondary" className="rounded-xl h-11 px-8 font-black">Archive</GlassButton>
                </div>
                <div className="flex items-center justify-between p-6 glass bg-white/5 rounded-2xl border-none">
                  <div>
                    <p className="text-lg font-black text-destructive">Delete Project</p>
                    <p className="text-sm text-muted-foreground font-medium">Permanently remove this project and all its associated data.</p>
                  </div>
                  <GlassButton className="bg-destructive hover:bg-destructive/80 rounded-xl h-11 px-8 font-black shadow-xl shadow-destructive/20">
                    <Trash2 className="w-5 h-5 mr-2" /> Delete
                  </GlassButton>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProjectSettings;