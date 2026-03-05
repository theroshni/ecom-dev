"use client";

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronLeft, 
  Users, 
  FolderKanban, 
  MessageSquare, 
  Settings, 
  Plus,
  MoreVertical,
  TrendingUp,
  Calendar
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';

const TeamDetail = () => {
  const { id } = useParams();
  
  const team = {
    name: "Alpha Developers",
    description: "Core development team for high-performance ecommerce storefronts.",
    members: [
      { name: "Alex Rivera", role: "Owner", avatar: "https://github.com/shadcn.png", status: "online" },
      { name: "Sarah Chen", role: "Developer", avatar: "https://i.pravatar.cc/150?u=sarah", status: "offline" },
      { name: "Mike Ross", role: "Reviewer", avatar: "https://i.pravatar.cc/150?u=mike", status: "online" }
    ],
    projects: [
      { title: "LuxeCart Storefront", progress: 75, status: "Active" },
      { title: "SwiftShip Dashboard", progress: 40, status: "Planning" }
    ],
    activity: [
      { user: "Sarah Chen", action: "updated", target: "LuxeCart UI", time: "2h ago" },
      { user: "Alex Rivera", action: "pushed to", target: "main branch", time: "5h ago" }
    ]
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <Link to="/teams" className="flex items-center text-sm text-gray-500 hover:text-indigo-600 transition-colors mb-6">
          <ChevronLeft className="w-4 h-4 mr-1" /> Back to Teams
        </Link>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="bg-indigo-600 p-3 rounded-2xl">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{team.name}</h1>
              <p className="text-gray-500 dark:text-gray-400">{team.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="rounded-xl border-gray-200 dark:border-gray-800 dark:text-gray-400">
              <MessageSquare className="w-4 h-4 mr-2" /> Team Chat
            </Button>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl">
              <Settings className="w-4 h-4 mr-2" /> Team Settings
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column: Projects & Activity */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="border-none shadow-sm rounded-3xl dark:bg-gray-950">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl">Team Projects</CardTitle>
                <Button variant="ghost" size="sm" className="text-indigo-600 dark:text-indigo-400">
                  <Plus className="w-4 h-4 mr-1" /> New Project
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {team.projects.map((project, i) => (
                  <div key={i} className="p-4 rounded-2xl border border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors group">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 transition-colors">{project.title}</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{project.status}</p>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                        <MoreVertical className="w-4 h-4 text-gray-400" />
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="dark:text-gray-400">Progress</span>
                        <span className="dark:text-white">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-1.5 bg-gray-100 dark:bg-gray-800" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm rounded-3xl dark:bg-gray-950">
              <CardHeader>
                <CardTitle className="text-xl">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {team.activity.map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-1 h-full bg-gray-100 dark:bg-gray-800 rounded-full" />
                    <div>
                      <p className="text-sm text-gray-900 dark:text-gray-300">
                        <span className="font-bold">{item.user}</span> {item.action} <span className="font-medium text-indigo-600 dark:text-indigo-400">{item.target}</span>
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{item.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Members & Stats */}
          <div className="space-y-8">
            <Card className="border-none shadow-sm rounded-3xl dark:bg-gray-950">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Members</CardTitle>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-indigo-600 dark:text-indigo-400">
                  <Plus className="w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {team.members.map((member, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="h-9 w-9 border border-gray-100 dark:border-gray-800">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {member.status === 'online' && (
                          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white dark:border-gray-950" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900 dark:text-white">{member.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{member.role}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-indigo-600">
                      <MessageSquare className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-700 text-white">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-indigo-200" />
                  <span className="text-sm font-bold">Team Performance</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 p-3 rounded-xl">
                    <p className="text-2xl font-bold">12</p>
                    <p className="text-[10px] uppercase tracking-wider opacity-80">Tasks Done</p>
                  </div>
                  <div className="bg-white/10 p-3 rounded-xl">
                    <p className="text-2xl font-bold">98%</p>
                    <p className="text-[10px] uppercase tracking-wider opacity-80">Efficiency</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TeamDetail;