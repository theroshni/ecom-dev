"use client";

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronLeft, 
  Layout, 
  Code2, 
  Database, 
  ShieldCheck, 
  Zap, 
  Eye, 
  Download,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

const TemplateDetail = () => {
  const { id } = useParams();
  
  const template = {
    title: "Modern Storefront",
    description: "A clean, high-performance storefront built with Next.js 14 and Tailwind CSS. Optimized for Core Web Vitals and SEO out of the box.",
    category: "Frontend",
    icon: Layout,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    techStack: [
      { name: "Next.js 14", icon: Code2, desc: "App Router & Server Components" },
      { name: "Tailwind CSS", icon: Layout, desc: "Utility-first styling" },
      { name: "Lucide Icons", icon: Zap, desc: "Beautifully simple icons" },
      { name: "Shadcn UI", icon: Layout, desc: "Accessible component library" }
    ],
    features: [
      "Responsive Product Grids",
      "Optimized Image Loading",
      "SEO Meta Tag Management",
      "Dark Mode Support",
      "Framer Motion Animations"
    ]
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto">
        <Link to="/templates" className="flex items-center text-sm text-gray-500 hover:text-indigo-600 transition-colors mb-6">
          <ChevronLeft className="w-4 h-4 mr-1" /> Back to Templates
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="border-none shadow-sm rounded-3xl overflow-hidden dark:bg-gray-950">
              <div className="aspect-video bg-gray-100 dark:bg-gray-900 flex items-center justify-center relative">
                <template.icon className={`w-32 h-32 ${template.color} opacity-20`} />
                <div className="absolute bottom-6 right-6 flex gap-3">
                  <Button className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl shadow-lg">
                    <Eye className="w-4 h-4 mr-2" /> Live Preview
                  </Button>
                </div>
              </div>
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Badge className="bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 border-none">{template.category}</Badge>
                  <span className="text-xs text-gray-400 dark:text-gray-500">v1.2.0</span>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{template.title}</h1>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg mb-8">
                  {template.description}
                </p>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Tech Stack Breakdown</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {template.techStack.map((tech, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
                      <div className="bg-white dark:bg-gray-800 p-2 rounded-xl shadow-sm">
                        <tech.icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 dark:text-white text-sm">{tech.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{tech.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm rounded-3xl dark:bg-gray-950">
              <CardHeader>
                <CardTitle className="text-xl">Key Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  {template.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                      <span className="text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-none shadow-lg rounded-3xl bg-white dark:bg-gray-950 p-6 sticky top-24">
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl h-12 font-bold mb-4">
                Use This Template
              </Button>
              <Button variant="outline" className="w-full rounded-xl h-12 border-gray-200 dark:border-gray-800 dark:text-gray-400 mb-6">
                <Download className="w-4 h-4 mr-2" /> Download Source
              </Button>
              
              <div className="space-y-4 pt-6 border-t border-gray-50 dark:border-gray-800">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Difficulty</span>
                  <Badge variant="secondary" className="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-none">Beginner</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Last Updated</span>
                  <span className="font-bold text-gray-900 dark:text-white">2 days ago</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Downloads</span>
                  <span className="font-bold text-gray-900 dark:text-white">1.4k</span>
                </div>
              </div>
            </Card>

            <Card className="border-none shadow-sm rounded-3xl bg-indigo-50 dark:bg-indigo-900/20 p-6">
              <h3 className="font-bold text-indigo-900 dark:text-indigo-100 mb-2">Need Customization?</h3>
              <p className="text-xs text-indigo-700 dark:text-indigo-300 leading-relaxed mb-4">
                Our mentors can help you adapt this template to your specific business needs.
              </p>
              <Button variant="link" className="p-0 h-auto text-indigo-600 dark:text-indigo-400 text-xs font-bold" asChild>
                <Link to="/mentorship">Find a Mentor <ArrowRight className="w-3 h-3 ml-1" /></Link>
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TemplateDetail;