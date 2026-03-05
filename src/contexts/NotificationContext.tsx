"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Bell, MessageSquare, Star, Users, Zap } from 'lucide-react';

export interface Notification {
  id: string;
  type: 'message' | 'achievement' | 'team' | 'system';
  title: string;
  description: string;
  time: string;
  read: boolean;
  icon: any;
  color: string;
  bg: string;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'time' | 'read' | 'icon' | 'color' | 'bg'> & { type: Notification['type'] }) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'message',
    title: 'New message from Sarah Chen',
    description: 'The Stripe webhook is working now! Check the PR.',
    time: '10 minutes ago',
    read: false,
    icon: MessageSquare,
    color: 'text-primary',
    bg: 'bg-primary/10'
  },
  {
    id: '2',
    type: 'achievement',
    title: 'Certificate Earned!',
    description: 'You have completed the "HTML & CSS for Modern Stores" module.',
    time: '2 hours ago',
    read: false,
    icon: Star,
    color: 'text-amber-500',
    bg: 'bg-amber-500/10'
  }
];

const TYPE_CONFIG = {
  message: { icon: MessageSquare, color: 'text-primary', bg: 'bg-primary/10' },
  achievement: { icon: Star, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  team: { icon: Users, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  system: { icon: Bell, color: 'text-indigo-500', bg: 'bg-indigo-500/10' }
};

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('ecomdev-notifications');
    if (saved) {
      // We need to re-attach the icons since they can't be stringified
      const parsed = JSON.parse(saved).map((n: any) => ({
        ...n,
        icon: TYPE_CONFIG[n.type as keyof typeof TYPE_CONFIG].icon,
        color: TYPE_CONFIG[n.type as keyof typeof TYPE_CONFIG].color,
        bg: TYPE_CONFIG[n.type as keyof typeof TYPE_CONFIG].bg
      }));
      setNotifications(parsed);
    } else {
      setNotifications(INITIAL_NOTIFICATIONS);
    }
  }, []);

  const saveToStorage = (newNotifications: Notification[]) => {
    setNotifications(newNotifications);
    // Strip icons before saving to localStorage
    const toSave = newNotifications.map(({ icon, ...rest }) => rest);
    localStorage.setItem('ecomdev-notifications', JSON.stringify(toSave));
  };

  const addNotification = (data: any) => {
    const config = TYPE_CONFIG[data.type as keyof typeof TYPE_CONFIG];
    const newNotification: Notification = {
      ...data,
      ...config,
      id: Math.random().toString(36).substr(2, 9),
      time: 'Just now',
      read: false
    };
    saveToStorage([newNotification, ...notifications]);
  };

  const markAsRead = (id: string) => {
    saveToStorage(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    saveToStorage(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    saveToStorage(notifications.filter(n => n.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, addNotification, markAsRead, markAllAsRead, deleteNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};