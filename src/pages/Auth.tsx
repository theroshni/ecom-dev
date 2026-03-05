"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Code2, Github, Mail, Sparkles, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import GlassButton from '@/components/ui/GlassButton';
import { toast } from 'sonner';

const Auth = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    toast.loading("Authenticating your workspace...");
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Welcome back, Alex!");
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-accent/10 rounded-full blur-[120px] animate-pulse" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="flex flex-col items-center mb-10">
          <Link to="/" className="flex items-center gap-3 mb-6 group">
            <div className="bg-primary p-2.5 rounded-2xl shadow-xl shadow-primary/20 group-hover:scale-110 transition-transform">
              <Code2 className="w-8 h-8 text-white" />
            </div>
            <span className="text-3xl font-black tracking-tighter">EcomDev</span>
          </Link>
          <h2 className="text-xl font-bold text-muted-foreground tracking-tight">The future of commerce starts here.</h2>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 glass p-1.5 rounded-[1.5rem] h-14">
            <TabsTrigger value="login" className="rounded-2xl font-bold data-[state=active]:bg-primary data-[state=active]:text-white transition-all">Login</TabsTrigger>
            <TabsTrigger value="register" className="rounded-2xl font-bold data-[state=active]:bg-primary data-[state=active]:text-white transition-all">Register</TabsTrigger>
          </TabsList>

          <Card className="glass-card border-none overflow-hidden">
            <TabsContent value="login" className="mt-0">
              <form onSubmit={handleAuth}>
                <CardHeader className="p-8 pb-4">
                  <CardTitle className="text-2xl font-black">Welcome Back</CardTitle>
                  <CardDescription className="font-medium">Enter your credentials to access your workspace.</CardDescription>
                </CardHeader>
                <CardContent className="p-8 space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-bold ml-1">Email Address</Label>
                    <Input id="email" type="email" placeholder="name@example.com" required className="glass border-none h-12 rounded-2xl focus-visible:ring-primary" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center mb-1">
                      <Label htmlFor="password" className="font-bold ml-1">Password</Label>
                      <Link to="/auth/reset-password" size="sm" className="text-xs font-bold text-primary hover:underline">Forgot password?</Link>
                    </div>
                    <Input id="password" type="password" required className="glass border-none h-12 rounded-2xl focus-visible:ring-primary" />
                  </div>
                </CardContent>
                <CardFooter className="p-8 pt-0 flex flex-col gap-6">
                  <GlassButton className="w-full h-14 rounded-2xl text-lg font-black" isLoading={isLoading}>
                    Sign In <ArrowRight className="ml-2 w-5 h-5" />
                  </GlassButton>
                  
                  <div className="relative w-full">
                    <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/10"></span></div>
                    <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest"><span className="bg-background/50 backdrop-blur-md px-4 text-muted-foreground">Or continue with</span></div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 w-full">
                    <GlassButton variant="secondary" className="rounded-2xl h-12 font-bold"><Github className="mr-2 w-4 h-4" /> Github</GlassButton>
                    <GlassButton variant="secondary" className="rounded-2xl h-12 font-bold"><Mail className="mr-2 w-4 h-4" /> Google</GlassButton>
                  </div>
                </CardFooter>
              </form>
            </TabsContent>

            <TabsContent value="register" className="mt-0">
              <form onSubmit={handleAuth}>
                <CardHeader className="p-8 pb-4">
                  <CardTitle className="text-2xl font-black">Create Account</CardTitle>
                  <CardDescription className="font-medium">Start your journey as an ecommerce developer today.</CardDescription>
                </CardHeader>
                <CardContent className="p-8 space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="font-bold ml-1">Full Name</Label>
                    <Input id="name" placeholder="John Doe" required className="glass border-none h-12 rounded-2xl focus-visible:ring-primary" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-email" className="font-bold ml-1">Email Address</Label>
                    <Input id="reg-email" type="email" placeholder="name@example.com" required className="glass border-none h-12 rounded-2xl focus-visible:ring-primary" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-password" className="font-bold ml-1">Password</Label>
                    <Input id="reg-password" type="password" required className="glass border-none h-12 rounded-2xl focus-visible:ring-primary" />
                  </div>
                </CardContent>
                <CardFooter className="p-8 pt-0">
                  <GlassButton className="w-full h-14 rounded-2xl text-lg font-black" isLoading={isLoading}>
                    Create Account <Sparkles className="ml-2 w-5 h-5 fill-current" />
                  </GlassButton>
                </CardFooter>
              </form>
            </TabsContent>
          </Card>
        </Tabs>
        
        <p className="text-center mt-8 text-sm font-medium text-muted-foreground">
          By continuing, you agree to our <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
        </p>
      </motion.div>
    </div>
  );
};

export default Auth;