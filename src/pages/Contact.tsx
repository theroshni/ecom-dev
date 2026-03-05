"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, MessageSquare, MapPin, Phone, Send } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6">
                Get in <span className="text-indigo-600">Touch.</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Have questions about our platform or need custom solutions? We're here to help you build your ecommerce empire.
              </p>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card className="border-none shadow-xl rounded-3xl overflow-hidden">
                <CardContent className="p-8">
                  <form className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="first-name">First Name</Label>
                        <Input id="first-name" placeholder="John" className="rounded-xl h-12" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name">Last Name</Label>
                        <Input id="last-name" placeholder="Doe" className="rounded-xl h-12" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" placeholder="john@example.com" className="rounded-xl h-12" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" placeholder="How can we help?" className="rounded-xl h-12" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea id="message" placeholder="Tell us more about your project..." className="rounded-xl min-h-[150px]" />
                    </div>
                    <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white h-14 rounded-2xl text-lg font-bold">
                      Send Message <Send className="ml-2 w-5 h-5" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { icon: Mail, title: "Email Us", detail: "support@ecomdev.com", desc: "We'll respond within 24 hours." },
                  { icon: MessageSquare, title: "Live Chat", detail: "Available 24/7", desc: "Chat with our support team." },
                  { icon: MapPin, title: "Visit Us", detail: "San Francisco, CA", desc: "123 Developer Lane, Suite 100" },
                  { icon: Phone, title: "Call Us", detail: "+1 (555) 000-0000", desc: "Mon-Fri from 9am to 5pm." }
                ].map((item, i) => (
                  <Card key={i} className="border-none shadow-sm rounded-2xl bg-gray-50">
                    <CardContent className="p-6">
                      <div className="bg-white w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-sm">
                        <item.icon className="w-6 h-6 text-indigo-600" />
                      </div>
                      <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-indigo-600 font-medium text-sm mb-1">{item.detail}</p>
                      <p className="text-gray-500 text-xs">{item.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="border-none shadow-sm rounded-3xl bg-indigo-600 text-white overflow-hidden relative">
                <CardContent className="p-8 relative z-10">
                  <h3 className="text-2xl font-bold mb-4">Join our community</h3>
                  <p className="text-indigo-100 mb-6">
                    Connect with thousands of other ecommerce developers in our Discord server.
                  </p>
                  <Button className="bg-white text-indigo-600 hover:bg-indigo-50 rounded-xl px-8 h-12 font-bold">
                    Join Discord
                  </Button>
                </CardContent>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
      <footer className="py-12 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p>© 2024 EcomDev Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Contact;