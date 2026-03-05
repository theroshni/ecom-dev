"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Rocket, Target, Users, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import GlassButton from '@/components/ui/GlassButton';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

const Onboarding = () => {
  const [step, setStep] = React.useState(1);
  const [role, setRole] = React.useState("");
  const navigate = useNavigate();
  const { updateUser } = useAuth();

  const nextStep = () => setStep(s => s + 1);
  
  const finish = async () => {
    try {
      await updateUser({ role: role || "Developer" });
      toast.success("Your workspace is ready!");
      navigate('/dashboard');
    } catch (error) {
      toast.error("Failed to save preferences");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[20%] left-[10%] w-[30%] h-[30%] bg-accent/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-xl w-full relative z-10">
        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-3">
            <div className="bg-primary p-2 rounded-xl shadow-lg shadow-primary/20">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-black tracking-tighter">EcomDev</span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card className="glass-card border-none p-10">
                <div className="text-center mb-10">
                  <div className="bg-primary/10 w-20 h-20 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-inner">
                    <Target className="w-10 h-10 text-primary" />
                  </div>
                  <h1 className="text-3xl font-black tracking-tight mb-3">What's your primary goal?</h1>
                  <p className="text-muted-foreground font-medium">We'll tailor your experience based on your choice.</p>
                </div>
                <div className="space-y-4">
                  {[
                    { id: 'learn', title: 'Master the Craft', desc: 'Learn ecommerce development from zero to pro.', icon: Sparkles },
                    { id: 'build', title: 'Build a Project', desc: 'Architect and launch a specific store idea.', icon: Rocket },
                    { id: 'team', title: 'Scale a Team', desc: 'Collaborate with developers and manage builds.', icon: Users }
                  ].map((goal) => (
                    <button
                      key={goal.id}
                      onClick={nextStep}
                      className="w-full text-left p-6 glass rounded-[2rem] border-none hover:bg-primary/5 group transition-all"
                    >
                      <div className="flex items-center gap-5">
                        <div className="p-3 glass rounded-2xl group-hover:bg-primary group-hover:text-white transition-colors">
                          <goal.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-black text-lg group-hover:text-primary transition-colors">{goal.title}</h3>
                          <p className="text-sm text-muted-foreground font-medium">{goal.desc}</p>
                        </div>
                        <ArrowRight className="ml-auto w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </div>
                    </button>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card className="glass-card border-none p-10">
                <div className="text-center mb-10">
                  <div className="bg-accent/10 w-20 h-20 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-inner">
                    <Rocket className="w-10 h-10 text-accent" />
                  </div>
                  <h1 className="text-3xl font-black tracking-tight mb-3">Tell us about yourself</h1>
                  <p className="text-muted-foreground font-medium">Help us personalize your developer profile.</p>
                </div>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label className="font-bold ml-1">Your Professional Role</Label>
                    <Input 
                      placeholder="e.g. Senior Frontend Engineer" 
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="glass border-none h-14 rounded-2xl focus-visible:ring-primary" 
                    />
                  </div>
                  <div className="pt-4">
                    <GlassButton onClick={nextStep} className="w-full h-14 rounded-2xl text-lg font-black">
                      Continue <ArrowRight className="ml-2 w-5 h-5" />
                    </GlassButton>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Card className="glass-card border-none p-12 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16 blur-2xl" />
                <div className="relative z-10">
                  <div className="bg-emerald-500/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                    <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                  </div>
                  <h1 className="text-4xl font-black tracking-tighter mb-4">You're all set!</h1>
                  <p className="text-lg text-muted-foreground font-medium mb-10 leading-relaxed">
                    Welcome to EcomDev. Your personalized workspace is ready.
                  </p>
                  <GlassButton onClick={finish} className="w-full h-16 rounded-[2rem] text-xl font-black shadow-2xl shadow-primary/20">
                    Enter Dashboard
                  </GlassButton>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Onboarding;