"use client";

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronLeft, 
  Building2, 
  MapPin, 
  DollarSign, 
  Clock, 
  Globe, 
  Share2, 
  Flag,
  CheckCircle2,
  Briefcase
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

const JobDetail = () => {
  const { id } = useParams();
  
  const job = {
    title: "Senior Frontend Engineer (Next.js)",
    company: "Shopify Plus Agency",
    location: "Remote",
    salary: "$120k - $160k",
    type: "Full-time",
    posted: "2 days ago",
    logo: "https://logo.clearbit.com/shopify.com",
    description: "We are looking for a Senior Frontend Engineer to join our award-winning Shopify Plus agency. You will be responsible for building high-performance, accessible, and scalable ecommerce storefronts using Next.js and Tailwind CSS.",
    requirements: [
      "5+ years of experience with React and modern JavaScript.",
      "Deep understanding of Next.js 14 App Router and Server Components.",
      "Experience with Shopify Hydrogen or headless commerce architectures.",
      "Strong proficiency in Tailwind CSS and responsive design.",
      "Excellent communication and collaboration skills."
    ],
    benefits: [
      "Competitive salary and equity package.",
      "100% remote work environment.",
      "Health, dental, and vision insurance.",
      "Professional development budget.",
      "Flexible PTO policy."
    ]
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto">
        <Link to="/jobs" className="flex items-center text-sm text-gray-500 hover:text-indigo-600 transition-colors mb-6">
          <ChevronLeft className="w-4 h-4 mr-1" /> Back to Job Board
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="border-none shadow-sm rounded-3xl overflow-hidden dark:bg-gray-950">
              <CardHeader className="p-8 pb-4">
                <div className="flex items-center gap-6 mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-gray-50 dark:bg-gray-900 flex items-center justify-center overflow-hidden border border-gray-100 dark:border-gray-800 shrink-0">
                    <img src={job.logo} alt={job.company} className="w-14 h-14 object-contain" />
                  </div>
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">{job.title}</h1>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1.5 font-bold text-indigo-600 dark:text-indigo-400"><Building2 className="w-4 h-4" /> {job.company}</span>
                      <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {job.location}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Badge variant="secondary" className="bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 border-none px-3 py-1">{job.type}</Badge>
                  <Badge variant="secondary" className="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-none px-3 py-1"><DollarSign className="w-3.5 h-3.5 mr-1" /> {job.salary}</Badge>
                  <Badge variant="secondary" className="bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-none px-3 py-1"><Clock className="w-3.5 h-3.5 mr-1" /> {job.posted}</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-8 pt-4">
                <div className="prose prose-indigo dark:prose-invert max-w-none">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">About the Role</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">{job.description}</p>
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Requirements</h3>
                  <ul className="space-y-3 mb-8">
                    {job.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-600 dark:text-gray-400">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                        {req}
                      </li>
                    ))}
                  </ul>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Benefits</h3>
                  <ul className="space-y-3">
                    {job.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-600 dark:text-gray-400">
                        <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar: Apply & Company Info */}
          <div className="space-y-6">
            <Card className="border-none shadow-lg rounded-3xl bg-white dark:bg-gray-950 p-6 sticky top-24">
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl h-12 font-bold mb-4">
                Apply for this Job
              </Button>
              <Button variant="outline" className="w-full rounded-xl h-12 border-gray-200 dark:border-gray-800 dark:text-gray-400 mb-6">
                Save Job
              </Button>
              
              <div className="space-y-4 pt-6 border-t border-gray-50 dark:border-gray-800">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Job ID</span>
                  <span className="font-bold text-gray-900 dark:text-white">#JB-9921</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Applicants</span>
                  <span className="font-bold text-gray-900 dark:text-white">24</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Views</span>
                  <span className="font-bold text-gray-900 dark:text-white">1.2k</span>
                </div>
              </div>

              <div className="flex gap-2 mt-8">
                <Button variant="ghost" size="icon" className="flex-1 rounded-xl border border-gray-100 dark:border-gray-800 text-gray-400 hover:text-indigo-600">
                  <Share2 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="flex-1 rounded-xl border border-gray-100 dark:border-gray-800 text-gray-400 hover:text-red-600">
                  <Flag className="w-4 h-4" />
                </Button>
              </div>
            </Card>

            <Card className="border-none shadow-sm rounded-3xl bg-gray-50 dark:bg-gray-900 p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">About the Company</h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-white dark:bg-gray-800 flex items-center justify-center border border-gray-100 dark:border-gray-700">
                  <Building2 className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{job.company}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">50-200 Employees</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
                Leading Shopify Plus agency specializing in high-growth ecommerce brands. We build the future of online shopping.
              </p>
              <Button variant="link" className="p-0 h-auto text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                View Company Profile <Globe className="w-3 h-3 ml-1" />
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default JobDetail;