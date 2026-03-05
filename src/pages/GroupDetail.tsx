"use client";

import React from 'react';
import { Link, useParams } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronLeft, 
  Users, 
  MessageSquare, 
  TrendingUp, 
  Shield, 
  ShieldCheck,
  MoreVertical,
  ThumbsUp,
  Share2,
  Plus,
  Globe,
  Lock,
  Search
} from 'lucide-react';
import GlassButton from '@/components/ui/GlassButton';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useCommunity } from '@/contexts/CommunityContext';
import { Input } from '@/components/ui/input';

const GroupDetail = () => {
  const { id } = useParams();
  const { groups, posts, likePost } = useCommunity();
  const group = groups.find(g => g.id === id) || groups[0];
  
  const groupPosts = posts.filter(p => p.group === group.name);

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        <Link to="/community" className="flex items-center text-sm font-bold text-muted-foreground hover:text-primary transition-colors group">
          <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" /> Back to Community
        </Link>

        <div className="relative h-64 rounded-[3rem] overflow-hidden shadow-2xl">
          <img src={group.banner} className="w-full h-full object-cover" alt={group.name} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-[2rem] glass border-4 border-white/20 flex items-center justify-center overflow-hidden shadow-2xl">
                <img src={group.banner} className="w-full h-full object-cover" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h1 className="text-4xl font-black text-white tracking-tight">{group.name}</h1>
                  <Badge className="glass bg-white/20 text-white border-none px-3 py-1 rounded-lg font-black uppercase tracking-widest text-[10px]">
                    {group.type === 'Public' ? <Globe className="w-3 h-3 mr-1" /> : <Lock className="w-3 h-3 mr-1" />}
                    {group.type}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-white/70 font-bold text-sm">
                  <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> {group.members} Members</span>
                  <span className="flex items-center gap-1.5"><MessageSquare className="w-4 h-4" /> {groupPosts.length} Posts</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <GlassButton variant="secondary" className="rounded-xl px-6 bg-white/10 text-white hover:bg-white/20">
                Invite
              </GlassButton>
              <GlassButton className="rounded-xl px-8 bg-white text-primary hover:bg-white hover:scale-105">
                {group.isJoined ? 'Joined' : 'Join Group'}
              </GlassButton>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            <Card className="glass-card border-none overflow-hidden">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <Avatar className="h-12 w-12 border-2 border-white/20">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>AR</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Input 
                      placeholder={`Post something to ${group.name}...`} 
                      className="glass border-none h-12 rounded-2xl focus-visible:ring-primary"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-8">
              {groupPosts.map((post) => (
                <motion.div key={post.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  <Card className="glass-card border-none overflow-hidden">
                    <CardContent className="p-8">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-12 w-12 border-2 border-white/10">
                            <AvatarImage src={post.avatar} />
                            <AvatarFallback>{post.author[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-black text-lg">{post.author}</h4>
                              <Badge className="glass bg-primary/10 text-primary border-none text-[10px] px-2 py-0.5">
                                {post.role}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground font-medium">{post.time}</p>
                          </div>
                        </div>
                        <GlassButton variant="ghost" size="icon" className="rounded-xl"><MoreVertical className="w-5 h-5" /></GlassButton>
                      </div>
                      
                      <p className="text-lg leading-relaxed mb-6">{post.content}</p>
                      
                      {post.image && (
                        <div className="rounded-[2rem] overflow-hidden mb-6 border border-white/10">
                          <img src={post.image} className="w-full h-auto" />
                        </div>
                      )}

                      <div className="flex items-center gap-6 pt-6 border-t border-white/10">
                        <button 
                          className={cn(
                            "flex items-center gap-2 text-sm font-bold transition-colors group",
                            post.likedByMe ? "text-primary" : "text-muted-foreground hover:text-primary"
                          )} 
                          onClick={() => likePost(post.id)}
                        >
                          <div className={cn("p-2 rounded-xl transition-colors", post.likedByMe ? "bg-primary/10" : "group-hover:bg-primary/10")}>
                            <ThumbsUp className={cn("w-5 h-5", post.likedByMe && "fill-current")} />
                          </div>
                          {post.likes}
                        </button>
                        <button className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors group">
                          <div className="p-2 rounded-xl group-hover:bg-primary/10 transition-colors">
                            <MessageSquare className="w-5 h-5" />
                          </div>
                          {post.comments}
                        </button>
                        <button className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors group ml-auto">
                          <div className="p-2 rounded-xl group-hover:bg-primary/10 transition-colors">
                            <Share2 className="w-5 h-5" />
                          </div>
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <Card className="glass-card border-none p-8">
              <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground mb-6">About Group</h3>
              <p className="text-sm font-medium text-muted-foreground leading-relaxed mb-8">
                A specialized community for developers building high-performance ecommerce architectures. Share patterns, review code, and discuss the latest in the ecosystem.
              </p>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 glass rounded-2xl border-none">
                  <div className="flex items-center gap-3">
                    <div className="p-2 glass rounded-xl bg-primary/10">
                      <ShieldCheck className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-xs font-black uppercase tracking-widest">Moderated</span>
                  </div>
                  <Badge className="glass bg-emerald-500/10 text-emerald-500 border-none">Active</Badge>
                </div>
              </div>
            </Card>

            <Card className="glass-card border-none p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground">Top Contributors</h3>
                <TrendingUp className="w-4 h-4 text-primary" />
              </div>
              <div className="space-y-4">
                {[
                  { name: "Sarah Chen", role: "Leader", avatar: "https://i.pravatar.cc/150?u=sarah" },
                  { name: "Alex Rivera", role: "Pro Member", avatar: "https://github.com/shadcn.png" },
                  { name: "Mike Ross", role: "Member", avatar: "https://i.pravatar.cc/150?u=mike" }
                ].map((member, i) => (
                  <div key={i} className="flex items-center justify-between group">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border-2 border-white/10 group-hover:border-primary transition-colors">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>{member.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-bold text-sm group-hover:text-primary transition-colors">{member.name}</p>
                        <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">{member.role}</p>
                      </div>
                    </div>
                    <GlassButton variant="ghost" size="icon" className="h-8 w-8 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                      <MessageSquare className="w-4 h-4" />
                    </GlassButton>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default GroupDetail;