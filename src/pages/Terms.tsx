"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import { motion } from 'framer-motion';

const Terms = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
            <div className="prose prose-indigo max-w-none text-gray-600 space-y-6">
              <p className="text-lg">Last updated: October 20, 2024</p>
              
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Agreement to Terms</h2>
                <p>
                  By accessing or using EcomDev, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Use License</h2>
                <p>
                  Permission is granted to temporarily download one copy of the materials (information or software) on EcomDev's website for personal, non-commercial transitory viewing only.
                </p>
                <p className="mt-4">This license shall automatically terminate if you violate any of these restrictions and may be terminated by EcomDev at any time.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Disclaimer</h2>
                <p>
                  The materials on EcomDev's website are provided on an 'as is' basis. EcomDev makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Limitations</h2>
                <p>
                  In no event shall EcomDev or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on EcomDev's website.
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

export default Terms;