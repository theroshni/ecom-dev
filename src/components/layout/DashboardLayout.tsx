"use client";

import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  FolderKanban, 
  Users, 
  Settings, 
  LogOut, 
  Bell, 
  Search,
  Code2,
  ChevronRight,
  Menu,
  Library,
  UserCircle,
  Award,
  Briefcase,
  Terminal,
  PlayCircle
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { ModeToggle } from '@/components/mode-toggle';
import { motion, AnimatePresence } from 'framer-motion';
import GlassButton from '@/components/ui/GlassButton';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { useNotifications } from '@/contexts/NotificationContext';
import AIChatOverlay from '@/components/ai/AIChatOverlay';

const SidebarItem = ({ icon: Icon, label, to, active, onClick }: { icon: any, label: string, to: string, active: boolean, onClick?: () => void }) => (
  <Link 
    to={to} 
    onClick={onClick}
    className={cn(
      "flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 group relative",
      active 
        ? "bg-primary text-white shadow-xl shadow-primary/20" 
        : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
    )}
  >
    <Icon className={cn("w-5 h-5 transition-transform duration-300 group-hover:scale-110", active ? "text-white" : "text-muted-foreground group-hover:text-primary")} />
    <span className="font-bold text-sm tracking-tight">{label}</span>
    {active && (
      <motion.div 
        layoutId="sidebar-active"
        className="absolute right-2 w-1.5 h-1.5 rounded-full bg-white"
      />
    )}
  </Link>
);

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { unreadCount } = useNotifications();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsCommandPaletteOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', to: '/dashboard' },
    { icon: PlayCircle, label: 'Courses', to: '/courses' },
    { icon: Terminal, label: 'AI Playground', to: '/playground' },
    { icon: BookOpen, label: 'Learning Path', to: '/modules' },
    { icon: FolderKanban, label: 'Projects', to: '/projects' },
    { icon: Users, label: 'Community', to: '/community' },
    { icon: Award, label: 'Mentorship', to: '/mentorship' },
    { icon: Briefcase, label: 'Job Board', to: '/jobs' },
    { icon: Library, label: 'Resources', to: '/resources' },
  ];

  const SidebarContent = ({ onItemClick }: { onItemClick?: () => void }) => (
    <div className="flex flex-col h-full p-6">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="bg-primary p-2 rounded-2xl shadow-lg shadow-primary/20">
          <Code2 className="w-6 h-6 text-white" />
        </div>
        <span className="text-2xl font-black tracking-tighter">EcomDev</span>
      </div>

      <nav className="flex-1 space-y-1.5 overflow-y-auto no-scrollbar">
        {menuItems.map((item) => (
          <SidebarItem 
            key={item.to} 
            {...item} 
            active={location.pathname === item.to} 
            onClick={onItemClick}
          />
        ))}
      </nav>

      <div className="mt-8 pt-8 border-t border-white/10 space-y-1.5">
        <SidebarItem 
          icon={UserCircle} 
          label="My Profile" 
          to="/profile" 
          active={location.pathname === '/profile'} 
          onClick={onItemClick}
        />
        <SidebarItem 
          icon={Settings} 
          label="Settings" 
          to="/settings" 
          active={location.pathname === '/settings'} 
          onClick={onItemClick}
        />
        <button 
          onClick={() => {
            toast.info("Logging out...");
            setTimeout(() => navigate('/auth'), 1000);
          }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-muted-foreground hover:bg-destructive/5 hover:text-destructive transition-all duration-300 group"
        >
          <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="font-bold text-sm tracking-tight">Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-background/50">
      {/* Command Palette Overlay */}
      <AnimatePresence>
        {isCommandPaletteOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsCommandPaletteOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: -20 }}
              className="w-full max-w-2xl glass rounded-[2.5rem] overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-white/10 flex items-center gap-4">
                <Search className="w-6 h-6 text-muted-foreground" />
                <input 
                  autoFocus
                  placeholder="Type a command or search..." 
                  className="flex-1 bg-transparent border-none outline-none text-xl font-medium placeholder:text-muted-foreground"
                />
                <div className="px-2 py-1 glass rounded-lg text-[10px] font-bold text-muted-foreground">ESC</div>
              </div>
              <div className="p-4 max-h-[60vh] overflow-y-auto">
                <div className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Quick Navigation</div>
                {menuItems.map((item) => (
                  <button 
                    key={item.to}
                    onClick={() => {
                      navigate(item.to);
                      setIsCommandPaletteOpen(false);
                    }}
                    className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl hover:bg-primary/10 group transition-all"
                  >
                    <div className="p-2 glass rounded-xl group-hover:bg-primary group-hover:text-white transition-colors">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-foreground">{item.label}</span>
                    <ChevronRight className="ml-auto w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all" />
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="w-72 hidden lg:block sticky top-0 h-screen p-4">
        <div className="glass h-full rounded-[2.5rem] overflow-hidden">
          <SidebarContent />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 p-4 lg:pl-0">
        <header className="glass h-20 rounded-[2rem] mb-6 flex items-center justify-between px-8 sticky top-4 z-40">
          <div className="flex items-center gap-4 flex-1">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <GlassButton variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="w-6 h-6" />
                </GlassButton>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-72 glass border-none">
                <SidebarContent onItemClick={() => setIsMobileMenuOpen(false)} />
              </SheetContent>
            </Sheet>
            
            <div 
              onClick={() => setIsCommandPaletteOpen(true)}
              className="flex-1 max-w-xl relative hidden md:flex items-center glass h-12 rounded-2xl px-4 cursor-pointer hover:bg-white/10 transition-colors group"
            >
              <Search className="w-4 h-4 text-muted-foreground mr-3" />
              <span className="text-muted-foreground text-sm font-medium">Search or press <kbd className="px-1.5 py-0.5 glass rounded-md text-[10px] font-bold ml-1">⌘ K</kbd></span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 mr-4">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Live System</span>
            </div>
            <ModeToggle />
            <GlassButton 
              variant="ghost" 
              size="icon" 
              className="relative"
              onClick={() => navigate('/notifications')}
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-3 right-3 w-4 h-4 bg-primary text-white text-[8px] font-black rounded-full border-2 border-background flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </GlassButton>
            <div className="h-8 w-[1px] bg-white/10 mx-2"></div>
            <Link to="/profile" className="flex items-center gap-3 hover:opacity-80 transition-opacity group">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-black tracking-tight">{user.name}</p>
                <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Pro Member</p>
              </div>
              <Avatar className="h-11 w-11 border-2 border-primary/20 group-hover:border-primary transition-colors">
                <AvatarImage src={user.avatar} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto no-scrollbar">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
        </div>
      </main>

      {/* Global AI Assistant */}
      <AIChatOverlay />
    </div>
  );
};

export default DashboardLayout;