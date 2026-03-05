"use client";

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  UserPlus, 
  Mail, 
  MoreHorizontal, 
  Shield, 
  ShieldCheck,
  MessageSquare,
  ArrowRight,
  FolderKanban,
  TrendingUp
} from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Link } from 'react-router-dom';
import GlassButton from '@/components/ui/GlassButton';
import { motion } from 'framer-motion';

const Teams = () => {
  const teams = [
    {
      id: 1,
      name: "Alpha Developers",
      members: [
        { name: "Alex Rivera", role: "Owner", avatar: "https://github.com/shadcn.png", status: "online" },
        { name: "Sarah Chen", role: "Developer", avatar: "https://i.pravatar.cc/150?u=sarah", status: "offline" },
        { name: "Mike Ross", role: "Reviewer", avatar: "https://i.pravatar.cc/150?u=mike", status: "online" }
      ],
      projects: 2,
      efficiency: 98
    },
    {
      id: 2,
      name: "Ecom Wizards",
      members: [
        { name: "Alex Rivera", role: "Developer", avatar: "https://github.com/shadcn.png", status: "online" },
        { name: "Jessica Day", role: "Owner", avatar: "https://i.pravatar.cc/150?u=jess", status: "online" }
      ],
      projects: 1,
      efficiency: 92
    }
  ];

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <Badge className="glass bg-primary/10 text-primary border-primary/20 px-4 py-1.5 rounded-full font-black uppercase tracking-widest text-[10px]">
              Collaboration
            </Badge>
            <h1 className="text-5xl font-black tracking-tight">Teams</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Manage your professional circles and shared workspaces.
            </p>
          </div>
          <GlassButton className="rounded-2xl px-8 shadow-2xl shadow-primary/20">
            <UserPlus className="w-4 h-4 mr-2" /> Create New Team
          </GlassButton>
        </div>

        <div className="grid gap-8">
          {teams.map((team, i) => (
            <motion.div
              key={team.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="glass-card border-none overflow-hidden">
                <CardHeader className="p-8 border-b border-white/5">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                      <div className="p-4 glass rounded-[2rem] shadow-xl shadow-primary/10">
                        <Users className="w-8 h-8 text-primary" />
                      </div>
                      <div>
                        <Link to={`/teams/${team.id}`} className="group/title">
                          <CardTitle className="text-3xl font-black flex items-center gap-3 group-hover/title:text-primary transition-colors">
                            {team.name} <ArrowRight className="w-6 h-6 opacity-0 group-hover/title:opacity-100 group-hover/title:translate-x-2 transition-all" />
                          </CardTitle>
                        </Link>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                            <FolderKanban className="w-3.5 h-3.5" /> {team.projects} Active Projects
                          </span>
                          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500 flex items-center gap-1.5">
                            <TrendingUp className="w-3.5 h-3.5" /> {team.efficiency}% Efficiency
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <GlassButton variant="secondary" className="rounded-xl px-6" asChild>
                        <Link to={`/teams/${team.id}`}>Dashboard</Link>
                      </GlassButton>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <GlassButton variant="ghost" size="icon" className="h-11 w-11 rounded-xl">
                            <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
                          </GlassButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="glass border-none rounded-2xl p-2 min-w-[160px]">
                          <DropdownMenuItem className="rounded-xl font-bold">Team Settings</DropdownMenuItem>
                          <DropdownMenuItem className="rounded-xl font-bold">Manage Members</DropdownMenuItem>
                          <DropdownMenuItem className="rounded-xl font-bold text-destructive">Leave Team</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="text-[10px] font-black text-muted-foreground uppercase tracking-widest border-b border-white/5">
                          <th className="px-8 py-6">Member Identity</th>
                          <th className="px-8 py-6">Access Level</th>
                          <th className="px-8 py-6">Current Status</th>
                          <th className="px-8 py-6 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {team.members.map((member, j) => (
                          <tr key={j} className="group hover:bg-white/5 transition-colors">
                            <td className="px-8 py-6">
                              <div className="flex items-center gap-4">
                                <div className="relative">
                                  <Avatar className="h-11 w-11 border-2 border-white/10 group-hover:border-primary transition-colors">
                                    <AvatarImage src={member.avatar} />
                                    <AvatarFallback className="font-black">{member.name[0]}</AvatarFallback>
                                  </Avatar>
                                  {member.status === 'online' && (
                                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-background" />
                                  )}
                                </div>
                                <span className="font-black text-foreground">{member.name}</span>
                              </div>
                            </td>
                            <td className="px-8 py-6">
                              <div className="flex items-center gap-2">
                                {member.role === 'Owner' ? (
                                  <ShieldCheck className="w-4 h-4 text-amber-500" />
                                ) : (
                                  <Shield className="w-4 h-4 text-primary" />
                                )}
                                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{member.role}</span>
                              </div>
                            </td>
                            <td className="px-8 py-6">
                              <div className="flex items-center gap-2">
                                <div className={cn("w-2 h-2 rounded-full", member.status === 'online' ? 'bg-emerald-500 animate-pulse' : 'bg-white/20')} />
                                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{member.status}</span>
                              </div>
                            </td>
                            <td className="px-8 py-6 text-right">
                              <GlassButton variant="ghost" size="icon" className="h-9 w-9 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                                <Mail className="w-4 h-4 text-muted-foreground" />
                              </GlassButton>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="p-8 bg-white/5 border-t border-white/5">
                    <GlassButton variant="ghost" className="w-full h-14 rounded-2xl border-2 border-dashed border-white/10 hover:border-primary/50 hover:bg-primary/5 font-black">
                      <UserPlus className="w-5 h-5 mr-2" /> Invite New Collaborator
                    </GlassButton>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Teams;