"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import { motion } from 'framer-motion';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
            <div className="prose prose-indigo max-w-none text-gray-600 space-y-6">
              <p className="text-lg">Last updated: October 20, 2024</p>
              
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
                <p>
                  Welcome to EcomDev. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Data We Collect</h2>
                <p>
                  We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
                  <li><strong>Contact Data:</strong> includes email address and telephone numbers.</li>
                  <li><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location.</li>
                  <li><strong>Usage Data:</strong> includes information about how you use our website, products and services.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Data</h2>
                <p>
                  We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                  <li>Where it is necessary for our legitimate interests and your interests and fundamental rights do not override those interests.</li>
                  <li>Where we need to comply with a legal obligation.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Security</h2>
                <p>
                  We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
                </p>
              </section>
            </div>
          </motion.div>
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

export default Privacy;