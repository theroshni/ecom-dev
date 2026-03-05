"use client";

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, 
  Github, 
  Twitter, 
  Globe, 
  Check, 
  X, 
  Loader2, 
  Shield, 
  Eye,
  Plus,
  Save,
  Link as LinkIcon
} from 'lucide-react';
import GlassButton from '@/components/ui/GlassButton';
import { useAuth } from '@/contexts/AuthContext';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState(user);
  const [newSkill, setNewSkill] = useState("");

  useEffect(() => {
    setFormData(user);
  }, [user]);

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSocialChange = (platform: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      socials: { ...prev.socials, [platform]: value }
    }));
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.trim()) return;
    if (formData.skills.includes(newSkill.trim())) {
      toast.error("Skill already exists");
      return;
    }
    handleChange('skills', [...formData.skills, newSkill.trim()]);
    setNewSkill("");
  };

  const handleSaveAll = async () => {
    setIsSaving(true);
    const loadingToast = toast.loading("Updating your profile...");
    
    try {
      await updateUser(formData);
      toast.dismiss(loadingToast);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Failed to update profile.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange('avatar', reader.result as string);
        toast.info("Avatar preview updated. Click Save to persist.");
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black tracking-tight">Profile Settings</h1>
            <p className="text-muted-foreground mt-1">Manage your digital identity and platform presence.</p>
          </div>
          <GlassButton 
            onClick={handleSaveAll} 
            isLoading={isSaving}
            className="rounded-2xl px-10 h-14 font-black shadow-2xl shadow-primary/20"
          >
            <Save className="w-5 h-5 mr-2" /> Save All Changes
          </GlassButton>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-8">
            <Card className="glass-card overflow-hidden border-none">
              <CardContent className="p-8 text-center">
                <div className="relative inline-block group">
                  <Avatar className="h-32 w-32 border-4 border-white/20 shadow-2xl">
                    <AvatarImage src={formData.avatar} />
                    <AvatarFallback className="text-2xl font-bold">{formData.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <label className="absolute bottom-0 right-0 bg-primary text-white p-2.5 rounded-2xl shadow-xl cursor-pointer hover:scale-110 transition-transform active:scale-95">
                    <Camera className="w-5 h-5" />
                    <input type="file" className="hidden" onChange={handleAvatarChange} accept="image/*" />
                  </label>
                </div>
                <h2 className="text-2xl font-bold mt-6">{formData.name}</h2>
                <p className="text-muted-foreground text-sm">{formData.role}</p>
              </CardContent>
            </Card>

            <Card className="glass-card border-none">
              <CardContent className="p-8 space-y-6">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <LinkIcon className="w-5 h-5 text-primary" /> Social Links
                </h3>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">GitHub</Label>
                    <div className="relative">
                      <Github className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input 
                        value={formData.socials.github} 
                        onChange={(e) => handleSocialChange('github', e.target.value)}
                        className="glass border-none pl-10 h-10 rounded-xl text-sm" 
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Twitter</Label>
                    <div className="relative">
                      <Twitter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input 
                        value={formData.socials.twitter} 
                        onChange={(e) => handleSocialChange('twitter', e.target.value)}
                        className="glass border-none pl-10 h-10 rounded-xl text-sm" 
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Website</Label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input 
                        value={formData.socials.web} 
                        onChange={(e) => handleSocialChange('web', e.target.value)}
                        className="glass border-none pl-10 h-10 rounded-xl text-sm" 
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <Card className="glass-card border-none">
              <CardContent className="p-8 space-y-6">
                <h3 className="text-xl font-bold">Personal Information</h3>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Full Name</Label>
                    <Input 
                      value={formData.name} 
                      onChange={(e) => handleChange('name', e.target.value)}
                      className="glass border-none h-12 rounded-xl focus-visible:ring-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Job Title</Label>
                    <Input 
                      value={formData.role} 
                      onChange={(e) => handleChange('role', e.target.value)}
                      className="glass border-none h-12 rounded-xl focus-visible:ring-primary"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Bio</Label>
                  <Textarea 
                    value={formData.bio} 
                    onChange={(e) => handleChange('bio', e.target.value)}
                    className="glass border-none min-h-[120px] rounded-xl focus-visible:ring-primary resize-none"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-none">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-6">Skills & Expertise</h3>
                <form onSubmit={handleAddSkill} className="flex gap-3 mb-6">
                  <Input 
                    placeholder="Add a skill (e.g. TypeScript)" 
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    className="glass border-none h-12 rounded-xl"
                  />
                  <GlassButton type="submit" variant="secondary" className="rounded-xl px-6">
                    <Plus className="w-4 h-4 mr-2" /> Add
                  </GlassButton>
                </form>
                <div className="flex flex-wrap gap-3">
                  <AnimatePresence>
                    {formData.skills.map((skill) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                      >
                        <Badge className="glass bg-primary/5 text-primary border-primary/10 px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 group">
                          {skill}
                          <X 
                            className="w-3 h-3 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity" 
                            onClick={() => handleChange('skills', formData.skills.filter(s => s !== skill))} 
                          />
                        </Badge>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;