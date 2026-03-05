"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Task {
  id: string;
  title: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'todo' | 'in-progress' | 'review' | 'done';
  members: string[];
  comments: number;
  files: number;
  time: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  status: "Active" | "Planning" | "Completed";
  progress: number;
  updated: string;
  members: number;
  tasks: Task[];
}

interface ProjectContextType {
  projects: Project[];
  addProject: (project: Omit<Project, 'id' | 'updated' | 'members' | 'tasks'>) => void;
  getProject: (id: string) => Project | undefined;
  updateProject: (id: string, data: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  updateTask: (projectId: string, taskId: string, data: Partial<Task>) => void;
  addTask: (projectId: string, task: Omit<Task, 'id'>) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

const DEFAULT_TASKS: Task[] = [
  { id: 't1', title: 'Integrate Stripe Webhooks', priority: 'High', status: 'todo', members: ['AR'], comments: 4, files: 2, time: '2d' },
  { id: 't2', title: 'Design Product Detail Page', priority: 'Medium', status: 'todo', members: ['SC'], comments: 2, files: 5, time: '5d' },
  { id: 't3', title: 'Setup Supabase Auth', priority: 'High', status: 'in-progress', members: ['AR', 'SC'], comments: 8, files: 1, time: '1d' },
  { id: 't4', title: 'Optimize Image Loading', priority: 'Low', status: 'review', members: ['MR'], comments: 1, files: 0, time: '3h' },
  { id: 't5', title: 'Project Repository Setup', priority: 'Medium', status: 'done', members: ['AR'], comments: 0, files: 0, time: 'Completed' }
];

const INITIAL_PROJECTS: Project[] = [
  {
    id: "PRJ-9021",
    title: "LuxeCart Storefront",
    description: "A high-end fashion ecommerce template with Next.js 15 and Stripe.",
    tech: ["Next.js", "Tailwind", "Stripe"],
    members: 3,
    updated: "2 hours ago",
    status: "Active",
    progress: 75,
    tasks: DEFAULT_TASKS
  },
  {
    id: "PRJ-4432",
    title: "SwiftShip Dashboard",
    description: "Logistics and order management system for small businesses.",
    tech: ["React", "Supabase", "Recharts"],
    members: 2,
    updated: "Yesterday",
    status: "Planning",
    progress: 40,
    tasks: DEFAULT_TASKS.slice(0, 3)
  }
];

export const ProjectProvider = ({ children }: { children: React.ReactNode }) => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('ecomdev-projects');
    if (saved) {
      setProjects(JSON.parse(saved));
    } else {
      setProjects(INITIAL_PROJECTS);
    }
  }, []);

  const saveToStorage = (newProjects: Project[]) => {
    setProjects(newProjects);
    localStorage.setItem('ecomdev-projects', JSON.stringify(newProjects));
  };

  const calculateProgress = (tasks: Task[]) => {
    if (tasks.length === 0) return 0;
    const doneCount = tasks.filter(t => t.status === 'done').length;
    return Math.round((doneCount / tasks.length) * 100);
  };

  const addProject = (data: Omit<Project, 'id' | 'updated' | 'members' | 'tasks'>) => {
    const newProject: Project = {
      ...data,
      id: `PRJ-${Math.floor(1000 + Math.random() * 9000)}`,
      updated: "Just now",
      members: 1,
      tasks: [],
      progress: 0
    };
    saveToStorage([newProject, ...projects]);
  };

  const getProject = (id: string) => projects.find(p => p.id === id);

  const updateProject = (id: string, data: Partial<Project>) => {
    saveToStorage(projects.map(p => p.id === id ? { ...p, ...data, updated: "Just now" } : p));
  };

  const deleteProject = (id: string) => {
    saveToStorage(projects.filter(p => p.id !== id));
  };

  const updateTask = (projectId: string, taskId: string, data: Partial<Task>) => {
    const newProjects = projects.map(p => {
      if (p.id === projectId) {
        const newTasks = p.tasks.map(t => t.id === taskId ? { ...t, ...data } : t);
        return { ...p, tasks: newTasks, progress: calculateProgress(newTasks), updated: "Just now" };
      }
      return p;
    });
    saveToStorage(newProjects);
  };

  const addTask = (projectId: string, task: Omit<Task, 'id'>) => {
    const newProjects = projects.map(p => {
      if (p.id === projectId) {
        const newTasks = [...p.tasks, { ...task, id: `t-${Math.random().toString(36).substr(2, 9)}` }];
        return { ...p, tasks: newTasks, progress: calculateProgress(newTasks), updated: "Just now" };
      }
      return p;
    });
    saveToStorage(newProjects);
  };

  return (
    <ProjectContext.Provider value={{ projects, addProject, getProject, updateProject, deleteProject, updateTask, addTask }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};