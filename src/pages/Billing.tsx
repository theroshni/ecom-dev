"use client";

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  CreditCard, 
  Receipt, 
  Zap, 
  CheckCircle2, 
  Plus, 
  Download,
  ShieldCheck,
  TrendingUp,
  ArrowRight
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import GlassButton from '@/components/ui/GlassButton';
import { motion } from 'framer-motion';

const Billing = () => {
  const invoices = [
    { id: "INV-001", date: "Oct 01, 2024", amount: "$29.00", status: "Paid" },
    { id: "INV-002", date: "Sep 01, 2024", amount: "$29.00", status: "Paid" },
    { id: "INV-003", date: "Aug 01, 2024", amount: "$29.00", status: "Paid" }
  ];

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <Badge className="glass bg-primary/10 text-primary border-primary/20 px-4 py-1.5 rounded-full font-black uppercase tracking-widest text-[10px]">
              Account Management
            </Badge>
            <h1 className="text-5xl font-black tracking-tight">Billing & Plans</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Manage your subscription, payment methods, and view your transaction history.
            </p>
          </div>
          <GlassButton className="rounded-2xl px-8 shadow-2xl shadow-primary/20">
            <TrendingUp className="w-4 h-4 mr-2" /> Upgrade Plan
          </GlassButton>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Column: Plan & Usage */}
          <div className="lg:col-span-8 space-y-8">
            <Card className="glass-card border-none overflow-hidden bg-gradient-to-br from-primary to-accent text-white">
              <CardContent className="p-12">
                <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
                  <div className="space-y-4">
                    <Badge className="glass bg-white/20 text-white border-none px-4 py-1.5 rounded-full font-black uppercase tracking-widest text-[10px]">Current Plan</Badge>
                    <h2 className="text-5xl font-black tracking-tight">Pro Developer</h2>
                    <p className="text-xl text-white/80">Your next billing date is <span className="font-black">November 1, 2024</span>.</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-baseline justify-end gap-1">
                      <span className="text-6xl font-black">$29</span>
                      <span className="text-xl font-bold opacity-60">/mo</span>
                    </div>
                    <p className="text-xs font-black uppercase tracking-widest opacity-60 mt-2">Auto-renewing</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <GlassButton className="bg-white text-primary hover:bg-white hover:scale-105 rounded-2xl px-10 h-14 text-lg font-black shadow-2xl">
                    Manage Subscription
                  </GlassButton>
                  <GlassButton variant="secondary" className="bg-white/10 text-white hover:bg-white/20 rounded-2xl px-10 h-14 text-lg font-black">
                    Cancel Plan
                  </GlassButton>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-none">
              <CardHeader className="p-8 pb-4">
                <CardTitle className="text-2xl font-black">Plan Usage</CardTitle>
                <p className="text-sm text-muted-foreground font-medium">Monitor your resource consumption</p>
              </CardHeader>
              <CardContent className="p-8 pt-4 space-y-10">
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <div>
                      <h4 className="text-lg font-black">Active Projects</h4>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">4 of Unlimited</p>
                    </div>
                    <span className="text-2xl font-black text-primary">40%</span>
                  </div>
                  <div className="h-2 glass bg-white/5 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: "40%" }} className="h-full bg-primary shadow-[0_0_10px_rgba(99,102,241,0.3)]" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <div>
                      <h4 className="text-lg font-black">Team Members</h4>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">3 of 10 seats</p>
                    </div>
                    <span className="text-2xl font-black text-accent">30%</span>
                  </div>
                  <div className="h-2 glass bg-white/5 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: "30%" }} className="h-full bg-accent shadow-[0_0_10px_rgba(6,182,212,0.3)]" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-none overflow-hidden">
              <CardHeader className="p-8 pb-4">
                <CardTitle className="text-2xl font-black flex items-center gap-3">
                  <Receipt className="w-6 h-6 text-primary" /> Billing History
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-[10px] font-black text-muted-foreground uppercase tracking-widest border-b border-white/5">
                        <th className="px-8 py-6">Invoice ID</th>
                        <th className="px-8 py-6">Date</th>
                        <th className="px-8 py-6">Amount</th>
                        <th className="px-8 py-6">Status</th>
                        <th className="px-8 py-6 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {invoices.map((inv) => (
                        <tr key={inv.id} className="group hover:bg-white/5 transition-colors">
                          <td className="px-8 py-6 font-black text-foreground">{inv.id}</td>
                          <td className="px-8 py-6 text-sm font-bold text-muted-foreground">{inv.date}</td>
                          <td className="px-8 py-6 text-sm font-black text-foreground">{inv.amount}</td>
                          <td className="px-8 py-6">
                            <Badge className="glass bg-emerald-500/10 text-emerald-500 border-none text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg">
                              <CheckCircle2 className="w-3 h-3 mr-1.5" /> {inv.status}
                            </Badge>
                          </td>
                          <td className="px-8 py-6 text-right">
                            <GlassButton variant="ghost" size="icon" className="h-10 w-10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                              <Download className="w-4 h-4 text-muted-foreground" />
                            </GlassButton>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Payment Methods */}
          <div className="lg:col-span-4 space-y-8">
            <Card className="glass-card border-none">
              <CardHeader className="p-8 pb-4">
                <CardTitle className="text-xl font-black flex items-center gap-3">
                  <CreditCard className="w-6 h-6 text-primary" /> Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 pt-4 space-y-6">
                <div className="p-6 rounded-[2rem] glass border-2 border-primary/50 bg-primary/5 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16 blur-2xl" />
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-8">
                      <div className="w-14 h-10 glass bg-white rounded-xl flex items-center justify-center shadow-xl">
                        <span className="text-[10px] font-black text-blue-800 italic">VISA</span>
                      </div>
                      <Badge className="glass bg-primary text-white border-none text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg">Primary</Badge>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xl font-black tracking-widest text-foreground">•••• •••• •••• 4242</p>
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Expires 12/26</p>
                    </div>
                    <div className="mt-6 flex justify-end">
                      <GlassButton variant="ghost" size="sm" className="font-black text-primary">Edit Details</GlassButton>
                    </div>
                  </div>
                </div>
                
                <GlassButton variant="secondary" className="w-full h-14 rounded-2xl border-2 border-dashed border-white/10 hover:border-primary/50 hover:bg-primary/5 font-black">
                  <Plus className="w-5 h-5 mr-2" /> Add New Method
                </GlassButton>
              </CardContent>
            </Card>

            <Card className="glass-card border-none bg-white/5 p-8 relative overflow-hidden">
              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 glass rounded-xl bg-emerald-500/10">
                    <ShieldCheck className="w-6 h-6 text-emerald-500" />
                  </div>
                  <h3 className="text-lg font-black">Secure Billing</h3>
                </div>
                <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                  All transactions are secure and encrypted. We use Stripe for payment processing and never store your full card details.
                </p>
                <GlassButton variant="ghost" className="p-0 h-auto font-black text-primary group">
                  View Security Policy <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </GlassButton>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Billing;