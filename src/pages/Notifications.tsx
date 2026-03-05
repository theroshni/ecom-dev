"use client";

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Bell, 
  MoreVertical,
  Clock,
  Settings,
  Trash2,
  CheckCircle2
} from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import GlassButton from '@/components/ui/GlassButton';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { useNotifications } from '@/contexts/NotificationContext';

const Notifications = () => {
  const { notifications, markAsRead, markAllAsRead, deleteNotification } = useNotifications();

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <Badge className="glass bg-primary/10 text-primary border-primary/20 px-4 py-1.5 rounded-full font-black uppercase tracking-widest text-[10px]">
              Activity Feed
            </Badge>
            <h1 className="text-5xl font-black tracking-tight">Notifications</h1>
            <p className="text-xl text-muted-foreground">
              Stay updated with your projects, team, and learning progress.
            </p>
          </div>
          <div className="flex gap-3">
            <GlassButton variant="secondary" className="rounded-2xl px-6" onClick={() => {
              markAllAsRead();
              toast.success("All notifications marked as read");
            }}>
              Mark all as read
            </GlassButton>
            <GlassButton variant="secondary" size="icon" className="h-12 w-12 rounded-2xl">
              <Settings className="w-5 h-5" />
            </GlassButton>
          </div>
        </div>

        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {notifications.map((notification, i) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card 
                  className={cn(
                    "glass-card border-none overflow-hidden transition-all group",
                    !notification.read ? "bg-white/10 shadow-xl shadow-primary/5" : "opacity-70"
                  )}
                >
                  <CardContent className="p-8">
                    <div className="flex gap-6">
                      <div className={cn(
                        "w-16 h-16 rounded-[1.5rem] flex items-center justify-center shrink-0 shadow-inner",
                        notification.bg
                      )}>
                        <notification.icon className={cn("w-8 h-8", notification.color)} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className={cn(
                            "text-xl font-black tracking-tight truncate",
                            !notification.read ? "text-foreground" : "text-muted-foreground"
                          )}>
                            {notification.title}
                          </h3>
                          <div className="flex items-center gap-4">
                            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5" /> {notification.time}
                            </span>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <GlassButton variant="ghost" size="icon" className="h-9 w-9 rounded-xl">
                                  <MoreVertical className="w-4 h-4 text-muted-foreground" />
                                </GlassButton>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="glass border-none rounded-2xl p-2 min-w-[160px]">
                                {!notification.read && (
                                  <DropdownMenuItem className="rounded-xl font-bold" onClick={() => markAsRead(notification.id)}>
                                    <CheckCircle2 className="w-4 h-4 mr-2" /> Mark as read
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuItem className="rounded-xl font-bold text-destructive" onClick={() => deleteNotification(notification.id)}>
                                  <Trash2 className="w-4 h-4 mr-2" /> Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                        <p className="text-lg text-muted-foreground font-medium leading-relaxed mb-6">
                          {notification.description}
                        </p>
                        
                        {!notification.read && (
                          <div className="flex gap-3">
                            <GlassButton size="sm" className="rounded-xl px-6 h-10 font-black" onClick={() => markAsRead(notification.id)}>
                              View Details
                            </GlassButton>
                            <GlassButton variant="ghost" size="sm" className="rounded-xl px-6 h-10 font-black text-muted-foreground" onClick={() => markAsRead(notification.id)}>
                              Dismiss
                            </GlassButton>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {notifications.length === 0 && (
          <div className="text-center py-32 space-y-6">
            <div className="bg-primary/5 w-32 h-32 rounded-[3rem] flex items-center justify-center mx-auto shadow-inner">
              <Bell className="w-16 h-16 text-muted-foreground/20" />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-black tracking-tight">All caught up!</h2>
              <p className="text-muted-foreground font-medium">You don't have any new notifications at the moment.</p>
            </div>
            <GlassButton variant="secondary" className="rounded-2xl px-8">View Archive</GlassButton>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Notifications;