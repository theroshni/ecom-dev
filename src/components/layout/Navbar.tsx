"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Code2, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { ModeToggle } from '@/components/mode-toggle';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
              EcomDev
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Features</Link>
            <Link to="/pricing" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Pricing</Link>
            <Link to="/community" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Community</Link>
            <div className="flex items-center gap-3">
              <ModeToggle />
              <Button variant="ghost" asChild className="dark:text-gray-400">
                <Link to="/auth">Log in</Link>
              </Button>
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-6" asChild>
                <Link to="/auth">Get Started</Link>
              </Button>
            </div>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <ModeToggle />
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 dark:text-gray-400">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800 p-4 space-y-4"
        >
          <Link to="/" className="block text-base font-medium text-gray-600 dark:text-gray-400">Features</Link>
          <Link to="/pricing" className="block text-base font-medium text-gray-600 dark:text-gray-400">Pricing</Link>
          <Link to="/community" className="block text-base font-medium text-gray-600 dark:text-gray-400">Community</Link>
          <div className="pt-4 flex flex-col gap-2">
            <Button variant="outline" className="w-full dark:border-gray-800 dark:text-gray-400" asChild>
              <Link to="/auth">Log in</Link>
            </Button>
            <Button className="w-full bg-indigo-600 text-white" asChild>
              <Link to="/auth">Get Started</Link>
            </Button>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;