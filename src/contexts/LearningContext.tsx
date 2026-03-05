"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: number;
  duration: string;
  color: string;
  category: string;
}

interface Progress {
  completedLessons: string[];
  completedModules: string[];
  quizScores: Record<string, number>;
}

interface LearningContextType {
  modules: Module[];
  progress: Progress;
  completeLesson: (lessonId: string) => void;
  completeModule: (moduleId: string, score: number) => void;
  isLessonComplete: (lessonId: string) => boolean;
  getModuleProgress: (moduleId: string, totalLessons: number) => number;
}

const LearningContext = createContext<LearningContextType | undefined>(undefined);

const INITIAL_MODULES: Module[] = [
  {
    id: "mod-1",
    title: "HTML & Structure",
    description: "Master the semantic foundation of ecommerce sites, from product grids to checkout forms.",
    lessons: 8,
    duration: "2.5h",
    color: "bg-emerald-500",
    category: "Frontend"
  },
  {
    id: "mod-2",
    title: "CSS & Modern Styling",
    description: "Learn Tailwind CSS, responsive design, and advanced layouts for high-converting stores.",
    lessons: 12,
    duration: "4h",
    color: "bg-primary",
    category: "Frontend"
  },
  {
    id: "mod-3",
    title: "JavaScript Cart Logic",
    description: "Build state management for shopping carts, local storage persistence, and dynamic UI updates.",
    lessons: 10,
    duration: "5h",
    color: "bg-amber-500",
    category: "Backend"
  }
];

export const LearningProvider = ({ children }: { children: React.ReactNode }) => {
  const [modules] = useState<Module[]>(INITIAL_MODULES);
  const [progress, setProgress] = useState<Progress>({
    completedLessons: [],
    completedModules: [],
    quizScores: {}
  });

  useEffect(() => {
    const saved = localStorage.getItem('ecomdev-learning');
    if (saved) {
      setProgress(JSON.parse(saved));
    }
  }, []);

  const saveProgress = (newProgress: Progress) => {
    setProgress(newProgress);
    localStorage.setItem('ecomdev-learning', JSON.stringify(newProgress));
  };

  const completeLesson = (lessonId: string) => {
    if (!progress.completedLessons.includes(lessonId)) {
      const newProgress = {
        ...progress,
        completedLessons: [...progress.completedLessons, lessonId]
      };
      saveProgress(newProgress);
      toast.success("Lesson marked as complete!");
    }
  };

  const completeModule = (moduleId: string, score: number) => {
    const newProgress = {
      ...progress,
      completedModules: progress.completedModules.includes(moduleId) 
        ? progress.completedModules 
        : [...progress.completedModules, moduleId],
      quizScores: { ...progress.quizScores, [moduleId]: score }
    };
    saveProgress(newProgress);
  };

  const isLessonComplete = (lessonId: string) => progress.completedLessons.includes(lessonId);

  const getModuleProgress = (moduleId: string, totalLessons: number) => {
    const moduleLessons = progress.completedLessons.filter(id => id.startsWith(`${moduleId}-`));
    return Math.round((moduleLessons.length / totalLessons) * 100);
  };

  return (
    <LearningContext.Provider value={{ modules, progress, completeLesson, completeModule, isLessonComplete, getModuleProgress }}>
      {children}
    </LearningContext.Provider>
  );
};

export const useLearning = () => {
  const context = useContext(LearningContext);
  if (context === undefined) {
    throw new Error('useLearning must be used within a LearningProvider');
  }
  return context;
};