"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

export interface Post {
  id: string;
  author: string;
  avatar: string;
  role: string;
  group: string;
  content: string;
  likes: number;
  comments: number;
  time: string;
  image?: string;
  likedByMe?: boolean;
}

export interface Group {
  id: string;
  name: string;
  members: number;
  type: 'Public' | 'Private';
  banner: string;
  role: string;
  isJoined: boolean;
}

interface CommunityContextType {
  posts: Post[];
  groups: Group[];
  addPost: (content: string, group: string) => void;
  likePost: (postId: string) => void;
  joinGroup: (groupId: string) => void;
}

const CommunityContext = createContext<CommunityContextType | undefined>(undefined);

const INITIAL_GROUPS: Group[] = [
  { id: 'g1', name: "Next.js Architects", members: 1240, type: "Public", banner: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&q=80&w=400", role: "Leader", isJoined: true },
  { id: 'g2', name: "Stripe Experts", members: 850, type: "Private", banner: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=400", role: "Member", isJoined: true },
  { id: 'g3', name: "UI/UX Wizards", members: 2100, type: "Public", banner: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=400", role: "Co-Leader", isJoined: false }
];

const INITIAL_POSTS: Post[] = [
  {
    id: 'p1',
    author: "Sarah Chen",
    avatar: "https://i.pravatar.cc/150?u=sarah",
    role: "Co-Leader",
    group: "Next.js Architects",
    content: "Just implemented the new Next.js 15 partial prerendering in our checkout flow. The performance boost is insane! 🚀",
    likes: 124,
    comments: 18,
    time: "2h ago",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 'p2',
    author: "Mike Ross",
    avatar: "https://i.pravatar.cc/150?u=mike",
    role: "Member",
    group: "Stripe Experts",
    content: "Does anyone have a clean pattern for handling multi-currency subscriptions with Stripe Tax?",
    likes: 45,
    comments: 32,
    time: "5h ago"
  }
];

export const CommunityProvider = ({ children }: { children: React.ReactNode }) => {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [groups, setGroups] = useState<Group[]>(INITIAL_GROUPS);

  useEffect(() => {
    const savedPosts = localStorage.getItem('ecomdev-posts');
    const savedGroups = localStorage.getItem('ecomdev-groups');
    if (savedPosts) setPosts(JSON.parse(savedPosts));
    if (savedGroups) setGroups(JSON.parse(savedGroups));
  }, []);

  const saveToStorage = (newPosts: Post[], newGroups: Group[]) => {
    setPosts(newPosts);
    setGroups(newGroups);
    localStorage.setItem('ecomdev-posts', JSON.stringify(newPosts));
    localStorage.setItem('ecomdev-groups', JSON.stringify(newGroups));
  };

  const addPost = (content: string, group: string) => {
    const newPost: Post = {
      id: Math.random().toString(36).substr(2, 9),
      author: "Alex Rivera",
      avatar: "https://github.com/shadcn.png",
      role: "Pro Member",
      group,
      content,
      likes: 0,
      comments: 0,
      time: "Just now"
    };
    saveToStorage([newPost, ...posts], groups);
    toast.success("Post published to the community!");
  };

  const likePost = (postId: string) => {
    const newPosts = posts.map(p => {
      if (p.id === postId) {
        const liked = !p.likedByMe;
        return { ...p, likes: liked ? p.likes + 1 : p.likes - 1, likedByMe: liked };
      }
      return p;
    });
    saveToStorage(newPosts, groups);
  };

  const joinGroup = (groupId: string) => {
    const newGroups = groups.map(g => {
      if (g.id === groupId) {
        const joined = !g.isJoined;
        toast.success(joined ? `Joined ${g.name}` : `Left ${g.name}`);
        return { ...g, isJoined: joined, members: joined ? g.members + 1 : g.members - 1 };
      }
      return g;
    });
    saveToStorage(posts, newGroups);
  };

  return (
    <CommunityContext.Provider value={{ posts, groups, addPost, likePost, joinGroup }}>
      {children}
    </CommunityContext.Provider>
  );
};

export const useCommunity = () => {
  const context = useContext(CommunityContext);
  if (context === undefined) {
    throw new Error('useCommunity must be used within a CommunityProvider');
  }
  return context;
};