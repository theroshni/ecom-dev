"use client";

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Users, 
  Calendar,
  ArrowRight
} from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Link } from 'react-router-dom';
import GlassButton from '@/components/ui/GlassButton';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { useProjects } from '@/contexts/ProjectContext';

const Projects = () => {
  const { projects, deleteProject } = useProjects();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <Badge className="glass bg-primary/10 text-primary border-primary/20 px-4 py-1.5 rounded-full font-black uppercase tracking-widest text-[10px]">
              Workspace
            </Badge>
            <h1 className="text-5xl font-black tracking-tight">My Projects</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Manage and collaborate on your high-performance ecommerce builds.
            </p>
          </div>
          <GlassButton className="rounded-2xl px-8 shadow-2xl shadow-primary/20" asChild>
            <Link to="/projects/new"><Plus className="w-4 h-4 mr-2" /> Create Project</Link>
          </GlassButton>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input 
              placeholder="Search projects by name or ID..." 
              className="glass border-none pl-12 h-14 rounded-2xl text-lg font-medium focus-visible:ring-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <GlassButton variant="secondary" size="icon" className="h-14 w-14 rounded-2xl">
            <Filter className="w-6 h-6" />
          </GlassButton>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="glass-card border-none group overflow-hidden">
                <CardHeader className="p-8 pb-4">
                  <div className="flex justify-between items-start mb-6">
                    <Badge className="glass bg-primary/10 text-primary border-none px-3 py-1 rounded-lg font-black uppercase tracking-widest text-[10px]">
                      {project.id}
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <GlassButton variant="ghost" size="icon" className="h-9 w-9 rounded-xl">
                          <MoreVertical className="w-4 h-4 text-muted-foreground" />
                        </GlassButton>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="glass border-none rounded-2xl p-2 min-w-[160px]">
                        <DropdownMenuItem className="rounded-xl font-bold">Edit Details</DropdownMenuItem>
                        <DropdownMenuItem className="rounded-xl font-bold text-destructive" onClick={() => deleteProject(project.id)}>Delete Project</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <CardTitle className="text-2xl font-black group-hover:text-primary transition-colors">
                    {project.title}
                  </CardTitle>
                  <p className="text-muted-foreground font-medium line-clamp-2 mt-2">{project.description}</p>
                </CardHeader>
                <CardContent className="p-8 pt-4">
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tech.map((t) => (
                      <Badge key={t} className="glass bg-white/5 text-muted-foreground border-none px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">
                        {t}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                        <span>Progress</span>
                        <span className="text-primary">{project.progress}%</span>
                      </div>
                      <div className="h-1.5 glass bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${project.progress}%` }}
                          className="h-full bg-primary shadow-[0_0_10px_rgba(99,102,241,0.3)]"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-white/10">
                      <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                        <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> {project.members}</span>
                        <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {project.updated}</span>
                      </div>
                      <GlassButton variant="ghost" size="sm" className="group/btn" asChild>
                        <Link to={`/projects/${project.id}`}>
                          Open <ArrowRight className="ml-1.5 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                      </GlassButton>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
          
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}>
            <Link to="/projects/new" className="group h-full block">
              <Card className="glass-card border-2 border-dashed border-white/10 bg-transparent shadow-none h-full flex flex-col items-center justify-center p-12 hover:border-primary/50 hover:bg-primary/5 transition-all">
                <div className="w-20 h-20 rounded-[2.5rem] glass flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-500 group-hover:scale-110">
                  <Plus className="w-10 h-10 text-muted-foreground group-hover:text-white" />
                </div>
                <h3 className="text-2xl font-black text-foreground">Start New Project</h3>
              </Card>
            </Link>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Projects;