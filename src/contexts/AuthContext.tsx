"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

interface User {
  name: string;
  role: string;
  bio: string;
  avatar: string;
  skills: string[];
  isPublic: boolean;
  socials: {
    github: string;
    twitter: string;
    web: string;
  };
}

interface AuthContextType {
  user: User;
  updateUser: (data: Partial<User>) => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEFAULT_USER: User = {
  name: "Alex Rivera",
  role: "Full Stack Developer",
  bio: "Passionate about building high-performance ecommerce experiences.",
  avatar: "https://github.com/shadcn.png",
  skills: ["React", "Next.js", "Tailwind", "Stripe"],
  isPublic: true,
  socials: { github: "alexrivera", twitter: "arivera_dev", web: "alexrivera.dev" }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>(DEFAULT_USER);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from persistence on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('ecomdev-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const updateUser = async (newData: Partial<User>) => {
    try {
      // Simulate API Call to PUT /api/users/update-profile
      // In a real app, you would do:
      // const response = await fetch('/api/users/update-profile', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json', 'Authorization': \`Bearer \${token}\` },
      //   body: JSON.stringify(newData)
      // });
      // const updatedUser = await response.json();
      
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      
      const updatedUser = { ...user, ...newData };
      
      // Update State
      setUser(updatedUser);
      
      // Persist to LocalStorage (Simulating DB persistence)
      localStorage.setItem('ecomdev-user', JSON.stringify(updatedUser));
      
      return Promise.resolve();
    } catch (error) {
      console.error("Failed to update profile:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, updateUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};