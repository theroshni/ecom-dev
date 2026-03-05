"use client";

import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  XCircle, 
  HelpCircle,
  Trophy,
  ArrowRight,
  Sparkles,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';
import GlassButton from '@/components/ui/GlassButton';
import { Badge } from '@/components/ui/badge';

const Quiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [selectedOption, setSelectedOption] = React.useState<number | null>(null);
  const [isAnswered, setIsAnswered] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [showResults, setShowResults] = React.useState(false);

  const questions = [
    {
      question: "Which Next.js 15 feature is best for handling sensitive API keys on the server?",
      options: [
        "Client Components",
        "Server Components",
        "Route Handlers",
        "Middleware"
      ],
      correct: 1
    },
    {
      question: "What is the primary benefit of using Stripe Webhooks?",
      options: [
        "Faster checkout speed",
        "Asynchronous event handling",
        "Client-side validation",
        "Automatic UI updates"
      ],
      correct: 1
    },
    {
      question: "In Tailwind CSS, which class would you use to create a responsive grid with 3 columns on desktop?",
      options: [
        "grid-cols-3",
        "md:grid-cols-3",
        "lg:grid-cols-3",
        "sm:grid-cols-3"
      ],
      correct: 1
    }
  ];

  const handleOptionSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null) return;
    setIsAnswered(true);
    if (selectedOption === questions[currentQuestion].correct) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(c => c + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResults(true);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResults) {
    return (
      <DashboardLayout>
        <div className="max-w-3xl mx-auto text-center py-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card border-none p-16 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -mr-32 -mt-32 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full -ml-32 -mb-32 blur-3xl" />
            
            <div className="relative z-10">
              <div className="bg-amber-500/10 w-32 h-32 rounded-[3rem] flex items-center justify-center mx-auto mb-10 shadow-inner">
                <Trophy className="w-16 h-16 text-amber-500" />
              </div>
              <h1 className="text-5xl font-black tracking-tight mb-4">Quiz Completed!</h1>
              <p className="text-xl text-muted-foreground font-medium mb-12">
                You've mastered this section with a score of <br />
                <span className="text-4xl font-black text-primary">{score} / {questions.length}</span>
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <GlassButton 
                  onClick={() => navigate('/modules/1/success')}
                  className="h-16 px-12 rounded-2xl text-lg font-black shadow-2xl shadow-primary/20"
                >
                  Claim Certificate <Sparkles className="ml-2 w-5 h-5 fill-current" />
                </GlassButton>
                <GlassButton 
                  variant="secondary"
                  onClick={() => {
                    setCurrentQuestion(0);
                    setSelectedOption(null);
                    setIsAnswered(false);
                    setScore(0);
                    setShowResults(false);
                  }}
                  className="h-16 px-10 rounded-2xl text-lg font-black"
                >
                  Retake Quiz
                </GlassButton>
              </div>
            </div>
          </motion.div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="flex items-center justify-between">
          <GlassButton variant="ghost" onClick={() => navigate(-1)} className="text-muted-foreground hover:text-primary font-black">
            <ChevronLeft className="w-5 h-5 mr-2" /> Exit Quiz
          </GlassButton>
          <div className="text-right">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Assessment Progress</p>
            <p className="text-xl font-black text-primary">Question {currentQuestion + 1} of {questions.length}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="h-3 glass bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-primary shadow-[0_0_15px_rgba(99,102,241,0.5)]"
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-10"
          >
            <Card className="glass-card border-none p-12">
              <div className="flex items-center gap-3 mb-10">
                <div className="p-3 glass rounded-2xl bg-primary/10">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-3xl font-black tracking-tight">
                  {questions[currentQuestion].question}
                </h2>
              </div>

              <div className="grid gap-4">
                {questions[currentQuestion].options.map((option, i) => (
                  <button
                    key={i}
                    onClick={() => handleOptionSelect(i)}
                    className={cn(
                      "w-full text-left p-6 rounded-[2rem] border-2 transition-all flex items-center justify-between group relative overflow-hidden",
                      selectedOption === i 
                        ? "border-primary bg-primary/5" 
                        : "border-white/5 glass hover:border-primary/30 hover:bg-white/5",
                      isAnswered && i === questions[currentQuestion].correct && "border-emerald-500 bg-emerald-500/5",
                      isAnswered && selectedOption === i && i !== questions[currentQuestion].correct && "border-destructive bg-destructive/5"
                    )}
                    disabled={isAnswered}
                  >
                    <div className="flex items-center gap-5 relative z-10">
                      <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg transition-colors",
                        selectedOption === i ? "bg-primary text-white" : "glass text-muted-foreground"
                      )}>
                        {String.fromCharCode(65 + i)}
                      </div>
                      <span className={cn(
                        "text-xl font-bold transition-all",
                        selectedOption === i ? "text-foreground" : "text-muted-foreground",
                        isAnswered && i === questions[currentQuestion].correct && "text-emerald-500",
                        isAnswered && selectedOption === i && i !== questions[currentQuestion].correct && "text-destructive"
                      )}>
                        {option}
                      </span>
                    </div>
                    
                    <div className="relative z-10">
                      {isAnswered && i === questions[currentQuestion].correct && (
                        <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                      )}
                      {isAnswered && selectedOption === i && i !== questions[currentQuestion].correct && (
                        <XCircle className="w-8 h-8 text-destructive" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </Card>

            <div className="flex justify-end">
              {!isAnswered ? (
                <GlassButton 
                  onClick={handleCheckAnswer}
                  disabled={selectedOption === null}
                  className="h-16 px-12 rounded-2xl text-lg font-black shadow-2xl shadow-primary/20"
                >
                  Check Answer
                </GlassButton>
              ) : (
                <GlassButton 
                  onClick={handleNext}
                  className="h-16 px-12 rounded-2xl text-lg font-black shadow-2xl shadow-primary/20"
                >
                  {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'} <ChevronRight className="ml-2 w-5 h-5" />
                </GlassButton>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
};

export default Quiz;