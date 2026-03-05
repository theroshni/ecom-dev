"use client";

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Users, 
  Plus, 
  Search, 
  MessageSquare, 
  ThumbsUp, 
  Share2, 
  MoreVertical,
  Shield,
  ShieldCheck,
  Image as ImageIcon,
  Link as LinkIcon,
  FileText,
  TrendingUp,
  Globe,
  Lock,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import GlassButton from '@/components/ui/GlassButton';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useCommunity } from '@/contexts/CommunityContext';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const Community = () => {
  const { posts, groups, addPost, likePost, joinGroup } = useCommunity();
  const [activeTab, setActiveTab] = useState("Feed");
  const [postContent, setPostContent] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("General");
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);

  const handleCreatePost = () => {
    if (!postContent.trim()) return;
    addPost(postContent, selectedGroup);
    setPostContent("");
  };

  const handleCreateGroup = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Group creation request sent! Our moderators will review it shortly.");
    setIsCreateGroupOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8">
        {/* Left Sidebar: Groups */}
        <div className="lg:col-span-3 space-y-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-lg font-black uppercase tracking-widest text-muted-foreground">My Groups</h2>
              <Dialog open={isCreateGroupOpen} onOpenChange={setIsCreateGroupOpen}>
                <DialogTrigger asChild>
                  <GlassButton variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-lg">
                    <Plus className="w-4 h-4" />
                  </GlassButton>
                </DialogTrigger>
                <DialogContent className="glass border-none rounded-[2.5rem] sm:max-w-[500px]">
                  <form onSubmit={handleCreateGroup}>
                    <DialogHeader>
                      <DialogTitle className="text-3xl font-black">Create a Group</DialogTitle>
                      <DialogDescription className="font-medium">Start a new community for specialized ecommerce discussion.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6 py-8">
                      <div className="space-y-2">
                        <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Group Name</Label>
                        <Input placeholder="e.g. Shopify Hydrogen Experts" className="glass border-none h-14 rounded-2xl font-bold focus-visible:ring-primary" required />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Description</Label>
                        <Textarea placeholder="What is this group about?" className="glass border-none min-h-[100px] rounded-2xl font-medium focus-visible:ring-primary resize-none" required />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Privacy</Label>
                        <select className="w-full glass border-none h-14 rounded-2xl px-4 outline-none focus:ring-2 focus:ring-primary font-bold">
                          <option>Public</option>
                          <option>Private (Invite Only)</option>
                        </select>
                      </div>
                    </div>
                    <DialogFooter>
                      <GlassButton type="submit" className="w-full h-14 rounded-2xl text-lg font-black shadow-2xl shadow-primary/20">
                        Create Group <Sparkles className="ml-2 w-5 h-5 fill-current" />
                      </GlassButton>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            <div className="space-y-2">
              {groups.filter(g => g.isJoined).map((group) => (
                <Link 
                  key={group.id}
                  to={`/community/groups/${group.id}`}
                  className="w-full flex items-center gap-3 p-3 glass-card border-none rounded-2xl hover:bg-primary/5 group transition-all"
                >
                  <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0">
                    <img src={group.banner} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <p className="font-bold text-sm truncate group-hover:text-primary transition-colors">{group.name}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-muted-foreground font-medium">{group.members} members</span>
                      <Badge className="h-4 px-1.5 text-[8px] glass bg-primary/10 text-primary border-none">{group.role}</Badge>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <Card className="glass-card border-none bg-primary/5">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-primary" />
                <h3 className="font-black text-sm uppercase tracking-widest">Trending Now</h3>
              </div>
              <div className="space-y-3">
                {["#NextJS15", "#StripeTax", "#Tailwind4", "#Headless"].map(tag => (
                  <button key={tag} className="block text-sm font-bold text-muted-foreground hover:text-primary transition-colors">
                    {tag}
                    <span className="block text-[10px] font-medium opacity-50">1.2k posts today</span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content: Feed */}
        <div className="lg:col-span-6 space-y-8">
          <Card className="glass-card border-none overflow-hidden">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <Avatar className="h-12 w-12 border-2 border-white/20">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>AR</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-4">
                  <Textarea 
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    placeholder="Share an update, code snippet, or resource..." 
                    className="glass border-none min-h-[100px] rounded-2xl focus-visible:ring-primary resize-none"
                  />
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <GlassButton variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-xl"><ImageIcon className="w-5 h-5" /></GlassButton>
                      <GlassButton variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-xl"><LinkIcon className="w-5 h-5" /></GlassButton>
                    </div>
                    <GlassButton className="px-8 rounded-xl" onClick={handleCreatePost}>Post</GlassButton>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-8">
            {posts.map((post) => (
              <motion.div key={post.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Card className="glass-card border-none overflow-hidden">
                  <CardContent className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12 border-2 border-white/20">
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
                          <p className="text-xs text-muted-foreground font-medium">
                            posted in <span className="text-primary font-bold">{post.group}</span> • {post.time}
                          </p>
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
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Sidebar: Suggestions */}
        <div className="lg:col-span-3 space-y-8">
          <Card className="glass-card border-none">
            <CardContent className="p-6 space-y-6">
              <h3 className="font-black text-sm uppercase tracking-widest text-muted-foreground">Suggested Groups</h3>
              <div className="space-y-4">
                {groups.filter(g => !g.isJoined).map((g) => (
                  <div key={g.id} className="flex items-center justify-between group">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl overflow-hidden">
                        <img src={g.banner} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-bold text-sm group-hover:text-primary transition-colors">{g.name}</p>
                        <p className="text-[10px] text-muted-foreground">{g.members} members</p>
                      </div>
                    </div>
                    <GlassButton variant="ghost" size="sm" className="h-8 px-3 text-[10px] font-black" onClick={() => joinGroup(g.id)}>Join</GlassButton>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Community;