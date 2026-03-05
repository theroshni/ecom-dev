"use client";

import React from 'react';
import { Link, useParams } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronLeft, 
  Star, 
  Calendar, 
  Clock, 
  MessageSquare, 
  Video, 
  Award, 
  Globe, 
  Github, 
  Twitter,
  CheckCircle2
} from 'lucide-react';

const MentorProfile = () => {
  const { id } = useParams();
  
  const mentor = {
    name: "David Miller",
    role: "Senior Ecom Architect",
    company: "Ex-Shopify Engineer",
    location: "Berlin, Germany",
    rating: 4.9,
    reviews: 124,
    price: "$80/hr",
    avatar: "https://i.pravatar.cc/150?u=david",
    bio: "I help developers build scalable ecommerce platforms. With over 10 years of experience in the industry, I specialize in high-performance frontend architectures and secure payment integrations.",
    expertise: ["Next.js", "Stripe", "Architecture", "Performance", "Node.js"],
    achievements: [
      "Top Rated Mentor 2023",
      "1000+ Hours Mentored",
      "Open Source Contributor"
    ]
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto">
        <Link to="/mentorship" className="flex items-center text-sm text-gray-500 hover:text-indigo-600 transition-colors mb-6">
          <ChevronLeft className="w-4 h-4 mr-1" /> Back to Mentors
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="border-none shadow-sm rounded-3xl overflow-hidden">
              <div className="h-32 bg-gradient-to-r from-indigo-600 to-violet-700" />
              <CardContent className="relative pt-0 pb-8 px-8">
                <div className="flex flex-col md:flex-row items-end gap-6 -mt-12 mb-6">
                  <Avatar className="h-32 w-32 border-4 border-white shadow-xl">
                    <AvatarImage src={mentor.avatar} />
                    <AvatarFallback>DM</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 pb-2">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h1 className="text-3xl font-bold text-gray-900">{mentor.name}</h1>
                        <p className="text-gray-500 font-medium">{mentor.role} @ {mentor.company}</p>
                      </div>
                      <div className="flex items-center gap-1 bg-amber-50 text-amber-600 px-3 py-1.5 rounded-xl text-sm font-bold">
                        <Star className="w-4 h-4 fill-amber-600" /> {mentor.rating} ({mentor.reviews} reviews)
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6 pt-6 border-t border-gray-50">
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">About Me</h3>
                    <p className="text-gray-600 leading-relaxed">{mentor.bio}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-gray-900 mb-3">Expertise</h3>
                    <div className="flex flex-wrap gap-2">
                      {mentor.expertise.map((exp) => (
                        <Badge key={exp} variant="secondary" className="bg-indigo-50 text-indigo-600 border-none px-3 py-1">
                          {exp}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" size="icon" className="rounded-xl border-gray-200"><Github className="w-4 h-4" /></Button>
                    <Button variant="outline" size="icon" className="rounded-xl border-gray-200"><Twitter className="w-4 h-4" /></Button>
                    <Button variant="outline" size="icon" className="rounded-xl border-gray-200"><Globe className="w-4 h-4" /></Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm rounded-3xl">
              <CardHeader>
                <CardTitle className="text-xl">Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  {mentor.achievements.map((ach, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                      <Award className="w-5 h-5 text-amber-500" />
                      <span className="text-sm font-bold text-gray-700">{ach}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-none shadow-lg rounded-3xl bg-white p-6 sticky top-24">
              <div className="text-center mb-6">
                <p className="text-3xl font-bold text-gray-900">{mentor.price}</p>
                <p className="text-xs text-gray-500">per 60-minute session</p>
              </div>
              
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl h-12 font-bold mb-4">
                Book a Session
              </Button>
              <Button variant="outline" className="w-full rounded-xl h-12 border-gray-200 mb-6">
                <MessageSquare className="w-4 h-4 mr-2" /> Send Message
              </Button>
              
              <div className="space-y-4 pt-6 border-t border-gray-50">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Calendar className="w-4 h-4 text-indigo-600" />
                  <span>Next available: <span className="font-bold text-gray-900">Today</span></span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Video className="w-4 h-4 text-indigo-600" />
                  <span>Session via <span className="font-bold text-gray-900">Google Meet</span></span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Clock className="w-4 h-4 text-indigo-600" />
                  <span>Response time: <span className="font-bold text-gray-900">{"< 2 hours"}</span></span>
                </div>
              </div>
            </Card>

            <Card className="border-none shadow-sm rounded-3xl bg-emerald-50 p-6">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span className="text-sm font-bold text-emerald-900">Verified Mentor</span>
              </div>
              <p className="text-xs text-emerald-700 leading-relaxed">
                This mentor has been vetted by the EcomDev team for their technical expertise and teaching ability.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MentorProfile;