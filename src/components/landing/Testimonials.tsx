"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "Frontend Developer @ Vercel",
    content: "EcomDev completely changed how I approach ecommerce projects. The structured modules on Stripe and Next.js are world-class.",
    avatar: "https://i.pravatar.cc/150?u=sarahj",
    rating: 5
  },
  {
    name: "Marcus Thorne",
    role: "Founder of SwiftShop",
    content: "The project builder helped us plan our entire tech stack in hours instead of days. It's an essential tool for any serious ecom dev.",
    avatar: "https://i.pravatar.cc/150?u=marcus",
    rating: 5
  },
  {
    name: "Elena Rodriguez",
    role: "Full Stack Engineer",
    content: "I landed my dream job at a top Shopify agency thanks to the certificates and portfolio I built here. The community is incredibly supportive.",
    avatar: "https://i.pravatar.cc/150?u=elena",
    rating: 5
  }
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Trusted by developers worldwide</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Join thousands of developers who have accelerated their careers with EcomDev.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-gray-50 p-8 rounded-3xl relative group hover:bg-indigo-50/50 transition-colors"
            >
              <Quote className="absolute top-6 right-8 w-10 h-10 text-indigo-100 group-hover:text-indigo-200 transition-colors" />
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-8 leading-relaxed italic">"{testimonial.content}"</p>
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                  <AvatarImage src={testimonial.avatar} />
                  <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-xs text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;