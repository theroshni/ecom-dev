"use client";

import React, { useState, useMemo } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search as SearchIcon, 
  BookOpen, 
  FolderKanban, 
  MessageSquare, 
  ArrowRight,
  Filter,
  Sparkles,
  TrendingUp,
  History
} from 'lucide-react';
import { useSearchParams, Link } from 'react-router-dom';
import GlassButton from '@/components/ui/GlassButton';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useProjects } from '@/contexts/ProjectContext';
import { useLearning } from '@/contexts/LearningContext';
import { useCommunity } from '@/contexts/CommunityContext';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);

  const { projects } = useProjects();
  const { modules } = useLearning();
  const { posts } = useCommunity();

  const results = useMemo(() => {
    const q = query.toLowerCase();
    if (!q) return { modules: [], projects: [], community: [] };

    return {
      modules: modules.filter(m => m.title.toLowerCase().includes(q) || m.description.toLowerCase().includes(q)),
      projects: projects.filter(p => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)),
      community: posts.filter(p => p.content.toLowerCase().includes(q) || p.author.toLowerCase().includes(q))
    };
  }, [query, modules, projects, posts]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    setSearchParams({ q: newQuery });
  };

  const trendingSearches = ["Stripe Webhooks", "Next.js 15 App Router", "Tailwind 4 Config", "Supabase Auth"];

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <Badge className="glass bg-primary/10 text-primary border-primary/20 px-4 py-1.5 rounded-full font-black uppercase tracking-widest text-[10px]">
              Global Search
            </Badge>
            <h1 className="text-5xl font-black tracking-tight">Search Results</h1>
            <p className="text-xl text-muted-foreground">
              {query ? (
                <>Showing results for "<span className="text-primary font-black">{query}</span>"</>
              ) : (
                "Start typing to search across the platform..."
              )}
            </p>
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input 
                value={query}
                onChange={handleSearchChange}
                placeholder="Search everything..." 
                className="glass border-none pl-12 h-14 w-full md:w-80 rounded-2xl focus-visible:ring-primary" 
              />
            </div>
            <GlassButton variant="secondary" size="icon" className="h-14 w-14 rounded-2xl">
              <Filter className="w-6 h-6" />
            </GlassButton>
          </div>
        </div>

        {!query && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid md:grid-cols-2 gap-8">
            <Card className="glass-card border-none p-8">
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="w-5 h-5 text-primary" />
                <h3 className="font-black text-sm uppercase tracking-widest">Trending Searches</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {trendingSearches.map(s => (
                  <button 
                    key={s} 
                    onClick={() => { setQuery(s); setSearchParams({ q: s }); }}
                    className="px-4 py-2 glass rounded-xl text-sm font-bold hover:bg-primary hover:text-white transition-all"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </Card>
            <Card className="glass-card border-none p-8">
              <div className="flex items-center gap-3 mb-6">
                <History className="w-5 h-5 text-accent" />
                <h3 className="font-black text-sm uppercase tracking-widest">Recent Activity</h3>
              </div>
              <div className="space-y-3">
                <p className="text-sm font-medium text-muted-foreground">You recently viewed <span className="text-foreground font-bold">LuxeCart Storefront</span></p>
                <p className="text-sm font-medium text-muted-foreground">You recently completed <span className="text-foreground font-bold">HTML Basics</span></p>
              </div>
            </Card>
          </motion.div>
        )}

        {query && (
          <Tabs defaultValue="all" className="space-y-12">
            <TabsList className="glass border-none p-1.5 rounded-[1.5rem] h-14 w-fit">
              <TabsTrigger value="all" className="rounded-2xl font-bold px-8 data-[state=active]:bg-primary data-[state=active]:text-white transition-all">All Results</TabsTrigger>
              <TabsTrigger value="modules" className="rounded-2xl font-bold px-8 data-[state=active]:bg-primary data-[state=active]:text-white transition-all">Learning</TabsTrigger>
              <TabsTrigger value="projects" className="rounded-2xl font-bold px-8 data-[state=active]:bg-primary data-[state=active]:text-white transition-all">Projects</TabsTrigger>
              <TabsTrigger value="community" className="rounded-2xl font-bold px-8 data-[state=active]:bg-primary data-[state=active]:text-white transition-all">Community</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-16">
              {/* Modules Section */}
              {results.modules.length > 0 && (
                <section className="space-y-8">
                  <div className="flex items-center justify-between px-2">
                    <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
                      <div className="p-2 glass rounded-xl"><BookOpen className="w-6 h-6 text-primary" /></div>
                      Learning Modules
                    </h2>
                  </div>
                  <div className="grid md:grid-cols-2 gap-8">
                    {results.modules.map((item, i) => (
                      <motion.div key={item.id} whileHover={{ y: -5 }}>
                        <Card className="glass-card border-none group cursor-pointer">
                          <CardContent className="p-8">
                            <div className="flex justify-between items-start mb-6">
                              <div className={cn("p-4 glass rounded-2xl bg-primary/10")}>
                                <BookOpen className="w-8 h-8 text-primary" />
                              </div>
                              <Badge className="glass bg-primary/10 text-primary border-none px-3 py-1 rounded-lg font-black uppercase tracking-widest text-[10px]">
                                {item.category}
                              </Badge>
                            </div>
                            <h3 className="text-2xl font-black mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                            <p className="text-muted-foreground font-medium mb-8 line-clamp-2">{item.description}</p>
                            <GlassButton variant="ghost" className="p-0 h-auto font-black text-primary group-hover:translate-x-2 transition-transform" asChild>
                              <Link to={`/modules/${item.id}`}>Start Learning <ArrowRight className="ml-2 w-5 h-5" /></Link>
                            </GlassButton>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </section>
              )}

              {/* Projects Section */}
              {results.projects.length > 0 && (
                <section className="space-y-8">
                  <div className="flex items-center justify-between px-2">
                    <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
                      <div className="p-2 glass rounded-xl"><FolderKanban className="w-6 h-6 text-accent" /></div>
                      Projects
                    </h2>
                  </div>
                  <div className="grid md:grid-cols-2 gap-8">
                    {results.projects.map((item, i) => (
                      <motion.div key={item.id} whileHover={{ y: -5 }}>
                        <Card className="glass-card border-none group cursor-pointer">
                          <CardContent className="p-8">
                            <div className="flex justify-between items-start mb-6">
                              <div className="p-4 glass rounded-2xl bg-accent/10">
                                <FolderKanban className="w-8 h-8 text-accent" />
                              </div>
                              <Badge className="glass bg-accent/10 text-accent border-none px-3 py-1 rounded-lg font-black uppercase tracking-widest text-[10px]">
                                {item.status}
                              </Badge>
                            </div>
                            <h3 className="text-2xl font-black mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                            <p className="text-muted-foreground font-medium mb-8 line-clamp-2">{item.description}</p>
                            <GlassButton variant="ghost" className="p-0 h-auto font-black text-primary group-hover:translate-x-2 transition-transform" asChild>
                              <Link to={`/projects/${item.id}`}>Open Project <ArrowRight className="ml-2 w-5 h-5" /></Link>
                            </GlassButton>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </section>
              )}

              {/* Community Section */}
              {results.community.length > 0 && (
                <section className="space-y-8">
                  <div className="flex items-center justify-between px-2">
                    <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
                      <div className="p-2 glass rounded-xl"><MessageSquare className="w-6 h-6 text-indigo-500" /></div>
                      Community Posts
                    </h2>
                  </div>
                  <div className="grid md:grid-cols-2 gap-8">
                    {results.community.map((item, i) => (
                      <motion.div key={item.id} whileHover={{ y: -5 }}>
                        <Card className="glass-card border-none group cursor-pointer">
                          <CardContent className="p-8">
                            <div className="flex justify-between items-start mb-6">
                              <div className="p-4 glass rounded-2xl bg-indigo-500/10">
                                <MessageSquare className="w-8 h-8 text-indigo-500" />
                              </div>
                              <Badge className="glass bg-indigo-500/10 text-indigo-500 border-none px-3 py-1 rounded-lg font-black uppercase tracking-widest text-[10px]">
                                Discussion
                              </Badge>
                            </div>
                            <h3 className="text-xl font-black mb-2 group-hover:text-primary transition-colors line-clamp-1">{item.author}'s Post</h3>
                            <p className="text-muted-foreground font-medium mb-8 line-clamp-2">{item.content}</p>
                            <GlassButton variant="ghost" className="p-0 h-auto font-black text-primary group-hover:translate-x-2 transition-transform" asChild>
                              <Link to={`/community/${item.id}`}>View Discussion <ArrowRight className="ml-2 w-5 h-5" /></Link>
                            </GlassButton>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </section>
              )}

              {query && results.modules.length === 0 && results.projects.length === 0 && results.community.length === 0 && (
                <div className="text-center py-32 space-y-6">
                  <div className="bg-primary/5 w-32 h-32 rounded-[3rem] flex items-center justify-center mx-auto shadow-inner">
                    <SearchIcon className="w-16 h-16 text-muted-foreground/20" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-3xl font-black tracking-tight">No results found</h2>
                    <p className="text-muted-foreground font-medium">We couldn't find anything matching "{query}". Try a different keyword.</p>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        )}

        {/* AI Search Suggestion */}
        <Card className="glass-card border-none bg-primary/5 p-12 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 text-primary">
                <Sparkles className="w-6 h-6 fill-current" />
                <span className="font-black uppercase tracking-widest text-sm">AI Search Assistant</span>
              </div>
              <h2 className="text-3xl font-black tracking-tight">Didn't find what you were looking for?</h2>
              <p className="text-muted-foreground max-w-md">
                Our AI can help you find specific code snippets or learning resources based on your current project context.
              </p>
            </div>
            <GlassButton size="lg" className="rounded-2xl px-10">Ask AI Assistant</GlassButton>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Search;