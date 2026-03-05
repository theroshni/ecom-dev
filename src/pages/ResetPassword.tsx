"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Code2, ArrowLeft, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ResetPassword = () => {
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="flex flex-col items-center mb-8">
          <Link to="/" className="flex items-center gap-2 mb-4">
            <div className="bg-indigo-600 p-1.5 rounded-lg">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">EcomDev</span>
          </Link>
        </div>

        <Card className="border-none shadow-xl rounded-3xl overflow-hidden">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Reset Password</CardTitle>
                <CardDescription>Enter your email address and we'll send you a link to reset your password.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="name@example.com" required className="rounded-xl h-11" />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white h-11 rounded-xl">
                  Send Reset Link
                </Button>
                <Button variant="ghost" className="w-full rounded-xl" asChild>
                  <Link to="/auth"><ArrowLeft className="mr-2 w-4 h-4" /> Back to Login</Link>
                </Button>
              </CardFooter>
            </form>
          ) : (
            <div className="p-8 text-center">
              <div className="bg-indigo-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Check your email</h2>
              <p className="text-gray-500 mb-8">
                We've sent a password reset link to your email address. Please check your inbox and follow the instructions.
              </p>
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white h-11 rounded-xl" asChild>
                <Link to="/auth">Return to Login</Link>
              </Button>
            </div>
          )}
        </Card>
      </motion.div>
    </div>
  );
};

export default ResetPassword;