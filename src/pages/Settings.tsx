"use client";

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe,
  Camera,
  Mail,
  Lock,
  Smartphone,
  Trash2,
  Save,
  Sparkles,
  Loader2
} from 'lucide-react';
import GlassButton from '@/components/ui/GlassButton';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

const Settings = () => {
  const { user, updateUser } = useAuth();
  const [isSaving, setIsSaving] = React.useState(false);
  const [formData, setFormData] = React.useState(user);

  React.useEffect(() => {
    setFormData(user);
  }, [user]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateUser(formData);
      toast.success("Settings updated successfully");
    } catch (error) {
      toast.error("Failed to save settings");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <Badge className="glass bg-primary/10 text-primary border-primary/20 px-4 py-1.5 rounded-full font-black uppercase tracking-widest text-[10px]">
              Preferences
            </Badge>
            <h1 className="text-5xl font-black tracking-tight">Account Settings</h1>
            <p className="text-xl text-muted-foreground">Manage your digital identity and platform experience.</p>
          </div>
          <GlassButton 
            className="rounded-2xl px-10 h-14 font-black shadow-2xl shadow-primary/20" 
            onClick={handleSave}
            isLoading={isSaving}
          >
            <Save className="w-5 h-5 mr-2" /> Save Changes
          </GlassButton>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3 space-y-2">
            {[
              { label: "Profile", icon: User, active: true },
              { label: "Notifications", icon: Bell },
              { label: "Security", icon: Shield },
              { label: "Appearance", icon: Palette },
              { label: "Billing", icon: Globe }
            ].map((item) => (
              <button
                key={item.label}
                className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold text-sm transition-all ${
                  item.active 
                    ? "bg-primary text-white shadow-xl shadow-primary/20" 
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </div>

          <div className="lg:col-span-9 space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="glass-card border-none overflow-hidden">
                <CardHeader className="p-10 pb-4">
                  <CardTitle className="text-2xl font-black flex items-center gap-3">
                    <div className="p-2 glass rounded-xl bg-primary/10"><User className="w-6 h-6 text-primary" /></div>
                    Profile Information
                  </CardTitle>
                  <CardDescription className="text-lg font-medium">Update your personal details and public presence.</CardDescription>
                </CardHeader>
                <CardContent className="p-10 pt-4 space-y-10">
                  <div className="flex flex-col sm:flex-row items-center gap-8">
                    <div className="relative group">
                      <Avatar className="h-32 w-32 border-4 border-white/10 shadow-2xl">
                        <AvatarImage src={formData.avatar} />
                        <AvatarFallback className="text-2xl font-black">{formData.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <button className="absolute bottom-0 right-0 bg-primary p-3 rounded-2xl text-white shadow-xl hover:scale-110 transition-transform active:scale-95">
                        <Camera className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="text-center sm:text-left space-y-2">
                      <h3 className="text-2xl font-black">{formData.name}</h3>
                      <p className="text-muted-foreground font-medium">{formData.role}</p>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Full Name</Label>
                      <Input 
                        value={formData.name} 
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="glass border-none h-14 rounded-2xl text-lg font-bold focus-visible:ring-primary" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Job Title</Label>
                      <Input 
                        value={formData.role} 
                        onChange={(e) => setFormData({...formData, role: e.target.value})}
                        className="glass border-none h-14 rounded-2xl text-lg font-bold focus-visible:ring-primary" 
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Card className="glass-card border-none overflow-hidden">
                <CardHeader className="p-10 pb-4">
                  <CardTitle className="text-2xl font-black flex items-center gap-3">
                    <div className="p-2 glass rounded-xl bg-accent/10"><Bell className="w-6 h-6 text-accent" /></div>
                    Notification Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-10 pt-4 space-y-4">
                  {[
                    { title: "Email Notifications", desc: "Weekly progress reports and team updates.", icon: Mail },
                    { title: "Project Activity", desc: "Real-time alerts for comments and task changes.", icon: Sparkles }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-6 glass rounded-[2rem] border-none group hover:bg-white/5 transition-all">
                      <div className="flex items-center gap-6">
                        <div className="p-3 glass rounded-2xl group-hover:bg-primary/10 transition-colors">
                          <item.icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                        <div>
                          <p className="text-lg font-black">{item.title}</p>
                          <p className="text-sm text-muted-foreground font-medium">{item.desc}</p>
                        </div>
                      </div>
                      <Switch defaultChecked className="data-[state=checked]:bg-primary" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;