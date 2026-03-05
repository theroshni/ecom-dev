"use client";

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronLeft, 
  ThumbsUp, 
  MessageSquare, 
  Share2, 
  MoreVertical,
  Flag,
  Send,
  ShieldCheck,
  Shield,
  Sparkles
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import GlassButton from '@/components/ui/GlassButton';
import { motion, AnimatePresence } from 'framer-motion';

const CommunityPost = () => {
  const { id } = useParams();
  const [replyText, setReplyText] = React.useState("");
  
  const [post, setPost] = React.useState({
    title: "How to handle Stripe webhooks in Next.js 15?",
    author: "Sarah Chen",
    avatar: "https://i.pravatar.cc/150?u=sarah",
    role: "Leader",
    time: "2 hours ago",
    content: "I'm struggling with the new App Router structure in Next.js 15 when setting up Stripe webhooks. Specifically, I'm getting a signature verification error even though the secret matches. Has anyone successfully implemented this with the new route handlers?",
    tags: ["Next.js", "Stripe", "Backend"],
    likes: 45,
    replies: [
      {
        id: 1,
        author: "Alex Rivera",
        avatar: "https://github.com/shadcn.png",
        role: "Pro Member",
        time: "1 hour ago",
        content: "Make sure you're using `req.blob()` or `req.text()` to get the raw body. Stripe needs the exact raw body for signature verification. If you use `req.json()`, it will fail.",
        likes: 12
      },
      {
        id: 2,
        author: "Mike Ross",
        avatar: "https://i.pravatar.cc/150?u=mike",
        role: "Developer",
        time: "45 mins ago",
        content: "Also, check if you have any middleware that might be modifying the request body before it reaches your webhook handler.",
        likes: 5
      }
    ]
  });

  const handlePostReply = () => {
    if (!replyText.trim()) return;

    const newReply = {
      id: Date.now(),
      author: "Alex Rivera",
      avatar: "https://github.com/shadcn.png",
      role: "Pro Member",
      time: "Just now",
      content: replyText,
      likes: 0
    };

    setPost(prev => ({
      ...prev,
      replies: [...prev.replies, newReply]
    }));

    setReplyText("");
    toast.success("Reply posted successfully!");
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <Link to="/community" className="flex items-center text-sm font-bold text-muted-foreground hover:text-primary transition-colors group">
          <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" /> Back to Community
        </Link>

        <Card className="glass-card border-none overflow-hidden">
          <CardHeader className="p-10 pb-4">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-5">
                <div className="relative">
                  <Avatar className="h-14 w-14 border-2 border-white/10">
                    <AvatarImage src={post.avatar} />
                    <AvatarFallback className="font-black">{post.author[0]}</AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-4 border-background" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-black">{post.author}</h3>
                    <Badge className="glass bg-primary/10 text-primary border-none text-[10px] px-2 py-0.5 font-black uppercase tracking-widest">
                      {post.role === 'Leader' ? <ShieldCheck className="w-3 h-3 mr-1" /> : <Shield className="w-3 h-3 mr-1" />}
                      {post.role}
                    </Badge>
                  </div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1">{post.time}</p>
                </div>
              </div>
              <GlassButton variant="ghost" size="icon" className="rounded-xl">
                <MoreVertical className="w-5 h-5 text-muted-foreground" />
              </GlassButton>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-6 leading-tight">{post.title}</h1>
            
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <Badge key={tag} className="glass bg-white/5 text-muted-foreground border-none px-3 py-1 rounded-lg font-black uppercase tracking-widest text-[10px]">{tag}</Badge>
              ))}
            </div>
          </CardHeader>
          <CardContent className="p-10 pt-4">
            <p className="text-xl text-foreground leading-relaxed mb-10 font-medium">
              {post.content}
            </p>
            <div className="flex items-center gap-8 pt-8 border-t border-white/10">
              <button className="flex items-center gap-2 text-sm font-black text-muted-foreground hover:text-primary transition-colors group" onClick={() => toast.success("Liked!")}>
                <div className="p-2.5 rounded-xl group-hover:bg-primary/10 transition-colors">
                  <ThumbsUp className="w-5 h-5" />
                </div>
                {post.likes} Likes
              </button>
              <button className="flex items-center gap-2 text-sm font-black text-muted-foreground hover:text-primary transition-colors group">
                <div className="p-2.5 rounded-xl group-hover:bg-primary/10 transition-colors">
                  <MessageSquare className="w-5 h-5" />
                </div>
                {post.replies.length} Replies
              </button>
              <button className="flex items-center gap-2 text-sm font-black text-muted-foreground hover:text-primary transition-colors group ml-auto" onClick={() => toast.success("Link copied!")}>
                <div className="p-2.5 rounded-xl group-hover:bg-primary/10 transition-colors">
                  <Share2 className="w-5 h-5" />
                </div>
                Share
              </button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6 mb-32">
          <h2 className="text-2xl font-black tracking-tight flex items-center gap-3 px-2">
            <div className="p-2 glass rounded-xl"><MessageSquare className="w-6 h-6 text-primary" /></div>
            Discussion
          </h2>
          
          <AnimatePresence mode="popLayout">
            {post.replies.map((reply, i) => (
              <motion.div 
                key={reply.id} 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="glass-card border-none overflow-hidden">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <Avatar className="h-10 w-10 border-2 border-white/10">
                        <AvatarImage src={reply.avatar} />
                        <AvatarFallback className="font-black">{reply.author[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-black">{reply.author}</span>
                          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">• {reply.time}</span>
                        </div>
                        <p className="text-[10px] font-black text-primary uppercase tracking-widest">{reply.role}</p>
                      </div>
                    </div>
                    <p className="text-lg text-foreground font-medium leading-relaxed mb-6">
                      {reply.content}
                    </p>
                    <GlassButton variant="ghost" size="sm" className="text-muted-foreground hover:text-primary gap-2 h-10 px-4 font-black">
                      <ThumbsUp className="w-4 h-4" /> {reply.likes}
                    </GlassButton>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Sticky Reply Box */}
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-4xl px-4 z-50">
          <Card className="glass-card border-none shadow-[0_0_50px_rgba(0,0,0,0.3)] overflow-hidden">
            <CardContent className="p-4">
              <div className="flex gap-4">
                <Avatar className="h-12 w-12 border-2 border-primary/20 shrink-0">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback className="font-black">AR</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-4">
                  <Textarea 
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Write your reply..." 
                    className="min-h-[100px] glass border-none rounded-2xl focus-visible:ring-primary resize-none text-lg font-medium"
                  />
                  <div className="flex justify-end">
                    <GlassButton 
                      onClick={handlePostReply}
                      className="rounded-xl px-10 h-12 font-black shadow-xl shadow-primary/20"
                    >
                      Post Reply <Send className="w-4 h-4 ml-2" />
                    </GlassButton>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CommunityPost;