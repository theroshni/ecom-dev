"use client";

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, 
  Plus, 
  Search, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  ChevronRight,
  LifeBuoy
} from 'lucide-react';

const Support = () => {
  const tickets = [
    { id: "TKT-1024", subject: "Stripe Integration Error", status: "Open", priority: "High", date: "2 hours ago" },
    { id: "TKT-0982", subject: "Billing Question", status: "Resolved", priority: "Medium", date: "Yesterday" },
    { id: "TKT-0845", subject: "Module Access Issue", status: "In Progress", priority: "Low", date: "3 days ago" }
  ];

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Support Tickets</h1>
            <p className="text-gray-500 mt-1">Get help from our technical team and track your requests.</p>
          </div>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl h-11 px-6">
            <Plus className="w-4 h-4 mr-2" /> New Ticket
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Ticket List */}
          <div className="lg:col-span-2 space-y-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input placeholder="Search tickets..." className="pl-10 bg-white border-gray-200 rounded-xl h-11" />
            </div>

            <div className="space-y-4">
              {tickets.map((ticket) => (
                <Card key={ticket.id} className="border-none shadow-sm rounded-2xl hover:shadow-md transition-all cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="secondary" className="bg-gray-100 text-gray-500 border-none text-[10px] font-bold">
                        {ticket.id}
                      </Badge>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {ticket.date}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{ticket.subject}</h3>
                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center gap-1.5">
                            {ticket.status === 'Resolved' ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                            ) : ticket.status === 'Open' ? (
                              <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                            ) : (
                              <Clock className="w-3.5 h-3.5 text-indigo-500" />
                            )}
                            <span className="text-xs font-medium text-gray-500">{ticket.status}</span>
                          </div>
                          <Badge className={cn(
                            "text-[10px] uppercase tracking-wider border-none",
                            ticket.priority === 'High' ? "bg-red-50 text-red-600" : 
                            ticket.priority === 'Medium' ? "bg-amber-50 text-amber-600" : "bg-gray-50 text-gray-400"
                          )}>
                            {ticket.priority} Priority
                          </Badge>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-indigo-600 transition-colors" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Quick Support Form */}
          <div className="space-y-6">
            <Card className="border-none shadow-sm rounded-3xl bg-white">
              <CardHeader>
                <CardTitle className="text-lg">Quick Request</CardTitle>
                <CardDescription>Briefly describe your issue and we'll get back to you.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Subject</Label>
                  <Input placeholder="e.g. Payment failed" className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label>Priority</Label>
                  <select className="w-full bg-gray-50 border-none rounded-xl h-11 px-4 outline-none focus:ring-2 focus:ring-indigo-600 text-sm">
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Message</Label>
                  <Textarea placeholder="Describe your problem..." className="rounded-xl min-h-[100px] bg-gray-50 border-none" />
                </div>
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl h-11 font-bold">
                  Submit Ticket
                </Button>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm rounded-3xl bg-indigo-600 text-white">
              <CardContent className="p-6">
                <LifeBuoy className="w-10 h-10 mb-4 opacity-50" />
                <h3 className="font-bold mb-2">Live Chat</h3>
                <p className="text-xs text-indigo-100 leading-relaxed mb-4">
                  Need immediate help? Our support agents are online and ready to chat.
                </p>
                <Button className="w-full bg-white text-indigo-600 hover:bg-indigo-50 rounded-xl h-10 text-xs font-bold">
                  Start Live Chat
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Support;