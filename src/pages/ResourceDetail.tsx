"use client";

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronLeft, 
  FileText, 
  Download, 
  ExternalLink, 
  Share2, 
  Eye, 
  Clock, 
  Users,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

const ResourceDetail = () => {
  const { id } = useParams();
  
  const resource = {
    title: "Ecom UI Kit (Figma)",
    description: "A comprehensive set of high-fidelity ecommerce components for Figma. Includes product cards, checkout flows, navigation patterns, and more.",
    category: "Design",
    icon: FileText,
    color: "text-pink-600",
    bg: "bg-pink-50",
    fileSize: "45.2 MB",
    format: "Figma File (.fig)",
    lastUpdated: "Oct 15, 2024",
    downloads: "2.8k",
    contents: [
      "50+ Responsive Components",
      "Full Checkout Flow Mockups",
      "Product Detail Page Templates",
      "Mobile & Desktop Layouts",
      "Design System Documentation"
    ]
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto">
        <Link to="/resources" className="flex items-center text-sm text-gray-500 hover:text-indigo-600 transition-colors mb-6">
          <ChevronLeft className="w-4 h-4 mr-1" /> Back to Resources
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="border-none shadow-sm rounded-3xl overflow-hidden">
              <div className={`aspect-video ${resource.bg} flex items-center justify-center relative`}>
                <resource.icon className={`w-32 h-32 ${resource.color} opacity-20`} />
                <div className="absolute bottom-6 right-6">
                  <Button className="bg-white text-gray-900 hover:bg-gray-100 rounded-xl shadow-lg">
                    <Eye className="w-4 h-4 mr-2" /> Preview File
                  </Button>
                </div>
              </div>
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Badge className={`${resource.bg} ${resource.color} border-none`}>{resource.category}</Badge>
                  <span className="text-xs text-gray-400">{resource.format}</span>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{resource.title}</h1>
                <p className="text-gray-600 leading-relaxed text-lg mb-8">
                  {resource.description}
                </p>

                <h3 className="text-xl font-bold text-gray-900 mb-6">What's Included</h3>
                <div className="space-y-4">
                  {resource.contents.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                      <div className="w-2 h-2 rounded-full bg-indigo-600" />
                      <span className="text-sm font-medium text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-none shadow-lg rounded-3xl bg-white p-6 sticky top-24">
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl h-12 font-bold mb-4">
                <Download className="w-4 h-4 mr-2" /> Download Resource
              </Button>
              <Button variant="outline" className="w-full rounded-xl h-12 border-gray-200 mb-6">
                <Share2 className="w-4 h-4 mr-2" /> Share Resource
              </Button>
              
              <div className="space-y-4 pt-6 border-t border-gray-50">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">File Size</span>
                  <span className="font-bold text-gray-900">{resource.fileSize}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Last Updated</span>
                  <span className="font-bold text-gray-900">{resource.lastUpdated}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Downloads</span>
                  <span className="font-bold text-gray-900">{resource.downloads}</span>
                </div>
              </div>
            </Card>

            <Card className="border-none shadow-sm rounded-3xl bg-gray-900 text-white p-6">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="w-6 h-6 text-indigo-400" />
                <h3 className="font-bold">Related Guide</h3>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed mb-4">
                Learn how to use this UI kit effectively in our "Design Systems for Ecom" guide.
              </p>
              <Button variant="link" className="p-0 h-auto text-indigo-400 text-xs font-bold">
                Read Guide <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ResourceDetail;