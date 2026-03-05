"use client";

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Star, 
  Calendar, 
  Clock, 
  MessageSquare, 
  Video, 
  Search,
  Filter,
  Award,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter,
  DialogDescription
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import GlassButton from '@/components/ui/GlassButton';
import { motion } from 'framer-motion';

const Mentorship = () => {
  const [isBookingOpen, setIsBookingOpen] = React.useState(false);
  const [selectedMentor, setSelectedMentor] = React.useState<any>(null);

  const mentors = [
    {
      id: 1,
      name: "David Miller",
      role: "Senior Ecom Architect",
      specialty: ["Next.js", "Stripe", "Architecture"],
      rating: 4.9,
      reviews: 124,
      price: "$80/hr",
      avatar: "https://i.pravatar.cc/150?u=david",
      available: "Today"
    },
    {
      id: 2,
      name: "Elena Rodriguez",
      role: "UX/UI Specialist",
      specialty: ["Conversion", "Design Systems", "Figma"],
      rating: 5.0,
      reviews: 89,
      price: "$65/hr",
      avatar: "https://i.pravatar.cc/150?u=elena",
      available: "Tomorrow"
    },
    {
      id: 3,
      name: "James Wilson",
      role: "Backend Lead",
      specialty: ["Node.js", "Supabase", "Security"],
      rating: 4.8,
      reviews: 56,
      price: "$75/hr",
      avatar: "https://i.pravatar.cc/150?u=james",
      available: "Mon, Oct 21"
    }
  ];

  const handleBookSession = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Session booked with ${selectedMentor.name}! Check your email for details.`);
    setIsBookingOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <Badge className="glass bg-primary/10 text-primary border-primary/20 px-4 py-1.5 rounded-full font-black uppercase tracking-widest text-[10px]">
              Expert Network
            </Badge>
            <h1 className="text-5xl font-black tracking-tight">Expert Mentorship</h1>
            <p className="text-xl text-muted-foreground">Book 1-on-1 sessions with industry leaders to accelerate your growth.</p>
          </div>
          <GlassButton className="rounded-2xl px-8 shadow-2xl shadow-primary/20">
            <Award className="w-4 h-4 mr-2" /> Become a Mentor
          </GlassButton>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input placeholder="Search by specialty or name..." className="glass border-none pl-12 h-14 rounded-2xl text-lg font-medium focus-visible:ring-primary" />
          </div>
          <GlassButton variant="secondary" size="icon" className="h-14 w-14 rounded-2xl">
            <Filter className="w-6 h-6" />
          </GlassButton>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mentors.map((mentor, i) => (
            <motion.div
              key={mentor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="glass-card border-none group overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-8">
                    <Link to={`/mentorship/${mentor.id}`} className="flex items-center gap-5 hover:opacity-80 transition-opacity">
                      <div className="relative">
                        <Avatar className="h-20 w-20 border-4 border-white/10 shadow-2xl">
                          <AvatarImage src={mentor.avatar} />
                          <AvatarFallback className="font-black">{mentor.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-4 border-background flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-2xl font-black tracking-tight">{mentor.name}</h3>
                        <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">{mentor.role}</p>
                      </div>
                    </Link>
                    <div className="flex items-center gap-1.5 glass bg-amber-500/10 text-amber-500 border-none px-3 py-1.5 rounded-xl text-sm font-black">
                      <Star className="w-4 h-4 fill-current" /> {mentor.rating}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {mentor.specialty.map((s) => (
                      <Badge key={s} className="glass bg-primary/5 text-primary border-primary/10 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest">
                        {s}
                      </Badge>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-8 py-6 border-y border-white/5">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Rate</p>
                      <div className="flex items-center gap-2 font-black text-lg">
                        <Clock className="w-4 h-4 text-primary" />
                        <span>{mentor.price}</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Next Slot</p>
                      <div className="flex items-center gap-2 font-black text-lg">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span>{mentor.available}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <GlassButton 
                      onClick={() => {
                        setSelectedMentor(mentor);
                        setIsBookingOpen(true);
                      }}
                      className="flex-1 h-12 rounded-xl font-black"
                    >
                      Book Session
                    </GlassButton>
                    <GlassButton variant="secondary" size="icon" className="h-12 w-12 rounded-xl">
                      <MessageSquare className="w-5 h-5" />
                    </GlassButton>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Booking Dialog */}
        <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
          <DialogContent className="glass border-none rounded-[2.5rem] sm:max-w-[500px]">
            {selectedMentor && (
              <form onSubmit={handleBookSession}>
                <DialogHeader>
                  <DialogTitle className="text-3xl font-black">Book a Session</DialogTitle>
                  <DialogDescription className="font-medium">Schedule a 1-on-1 session with {selectedMentor.name}.</DialogDescription>
                </DialogHeader>
                <div className="space-y-8 py-8">
                  <div className="flex items-center gap-5 p-6 glass rounded-[2rem] border-none">
                    <Avatar className="h-16 w-16 border-2 border-white/10">
                      <AvatarImage src={selectedMentor.avatar} />
                      <AvatarFallback className="font-black">{selectedMentor.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-xl font-black">{selectedMentor.name}</p>
                      <p className="text-sm font-bold text-primary uppercase tracking-widest">{selectedMentor.price} / hour</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Select Date</Label>
                    <Input type="date" className="glass border-none h-14 rounded-2xl font-bold focus-visible:ring-primary" required />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Select Time</Label>
                    <select className="w-full glass border-none h-14 rounded-2xl px-4 outline-none focus:ring-2 focus:ring-primary font-bold">
                      <option>10:00 AM</option>
                      <option>11:00 AM</option>
                      <option>02:00 PM</option>
                      <option>04:00 PM</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Discussion Topic</Label>
                    <Input placeholder="e.g. Stripe integration issues" className="glass border-none h-14 rounded-2xl font-bold focus-visible:ring-primary" required />
                  </div>
                </div>
                <DialogFooter className="gap-3">
                  <GlassButton type="button" variant="secondary" onClick={() => setIsBookingOpen(false)} className="rounded-2xl h-14 px-8 font-black">Cancel</GlassButton>
                  <GlassButton type="submit" className="rounded-2xl h-14 px-10 font-black shadow-2xl shadow-primary/20">Confirm Booking</GlassButton>
                </DialogFooter>
              </form>
            )}
          </DialogContent>
        </Dialog>

        {/* Featured Banner */}
        <Card className="glass-card border-none bg-primary/5 p-12 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
            <div className="p-6 glass rounded-[2.5rem] shadow-2xl bg-white/5">
              <Video className="w-16 h-16 text-primary" />
            </div>
            <div className="flex-1 text-center md:text-left space-y-4">
              <h2 className="text-3xl font-black tracking-tight">Free Group Q&A Session</h2>
              <p className="text-lg text-muted-foreground font-medium max-w-2xl">Join our weekly live session where experts answer your toughest ecommerce questions.</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-6">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary">
                  <Calendar className="w-4 h-4" /> Every Friday
                </div>
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary">
                  <Clock className="w-4 h-4" /> 10:00 AM PST
                </div>
              </div>
            </div>
            <GlassButton className="rounded-2xl px-10 h-14 font-black shadow-2xl shadow-primary/20">
              Register Now
            </GlassButton>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -mr-32 -mt-32 blur-3xl" />
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Mentorship;