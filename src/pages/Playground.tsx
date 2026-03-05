"use client";

import React, { useState, useEffect, useCallback } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Editor from '@monaco-editor/react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Save, 
  Sparkles, 
  Terminal, 
  Layout, 
  Code2, 
  RefreshCw,
  Zap,
  CheckCircle2,
  AlertCircle,
  Loader2,
  MessageSquare
} from 'lucide-react';
import GlassButton from '@/components/ui/GlassButton';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const INITIAL_CODE = `// Welcome to EcomDev AI Playground
// Build your ecommerce components here!

const cartData = [
  { id: 1, name: 'Premium Hoodie', price: 89.99 },
  { id: 2, name: 'Liquid Glass Case', price: 24.99 }
];

console.log("Cart initialized with", cartData.length, "items");
console.log("Total value:", cartData.reduce((a, b) => a + b.price, 0).toFixed(2));`;

const Playground = () => {
  const [code, setCode] = useState(INITIAL_CODE);
  const [output, setOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [previewData, setPreviewData] = useState<any[]>([]);
  const [hasError, setHasError] = useState(false);

  const executeCode = useCallback((currentCode: string) => {
    setHasError(false);
    const logs: string[] = [];
    
    try {
      const mockConsole = {
        log: (...args: any[]) => logs.push("> " + args.join(' ')),
        error: (...args: any[]) => {
          logs.push("[ERROR] " + args.join(' '));
          setHasError(true);
        },
        warn: (...args: any[]) => logs.push("[WARN] " + args.join(' '))
      };

      // Extract data for preview
      const dataMatch = currentCode.match(/const cartData = (\[[\s\S]*?\]);/);
      if (dataMatch) {
        try {
          const data = new Function("return " + dataMatch[1])();
          setPreviewData(data);
        } catch (e) {
          // Ignore parsing errors during typing
        }
      }

      // Execute in a sandbox
      const runner = new Function('console', currentCode);
      runner(mockConsole);
      
      setOutput(logs);
    } catch (err: any) {
      setHasError(true);
      setOutput(prev => [...prev, "[RUNTIME ERROR] " + err.message]);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      executeCode(code);
    }, 800);
    return () => clearTimeout(timer);
  }, [code, executeCode]);

  const handleRun = () => {
    setIsRunning(true);
    executeCode(code);
    setTimeout(() => {
      setIsRunning(false);
      toast.success("Build successful");
    }, 600);
  };

  const handleAiAssist = async () => {
    setIsAiThinking(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsAiThinking(false);
    toast.success("AI: I've optimized your cart logic!");
    const aiCode = "\n\n// AI Suggestion: Added tax calculation\nconst tax = 0.08;\nconsole.log('Total with tax:', (cartData.reduce((a, b) => a + b.price, 0) * (1 + tax)).toFixed(2));";
    setCode(prev => prev + aiCode);
  };

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-120px)] flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-2xl shadow-xl shadow-primary/5">
              <Code2 className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight">AI Coding Sandbox</h1>
              <div className="flex items-center gap-2">
                <div className={cn("h-2 w-2 rounded-full animate-pulse", hasError ? "bg-destructive" : "bg-emerald-500")} />
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  {hasError ? "Runtime Error" : "System Ready"}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <GlassButton variant="secondary" size="icon" className="rounded-xl" onClick={() => toast.success("Saved")}>
              <Save className="w-5 h-5" />
            </GlassButton>
            <GlassButton onClick={handleRun} isLoading={isRunning} className="bg-emerald-500 hover:bg-emerald-400 shadow-emerald-500/20 rounded-xl px-6">
              <Play className="w-4 h-4 mr-2 fill-current" /> Run
            </GlassButton>
          </div>
        </div>

        <div className="flex-1 grid lg:grid-cols-2 gap-6 min-h-0">
          <Card className="glass-card border-none flex flex-col overflow-hidden">
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
                </div>
                <span className="text-[10px] font-black text-muted-foreground ml-4 uppercase tracking-widest">main.tsx</span>
              </div>
              <GlassButton 
                variant="ghost" 
                size="sm" 
                className="h-8 text-primary font-black text-[10px]"
                onClick={handleAiAssist}
                isLoading={isAiThinking}
              >
                <Sparkles className="w-3 h-3 mr-2" /> AI OPTIMIZE
              </GlassButton>
            </div>
            <div className="flex-1 relative">
              <Editor
                height="100%"
                defaultLanguage="javascript"
                theme="vs-dark"
                value={code}
                onChange={(val) => setCode(val || "")}
                loading={<div className="flex items-center justify-center h-full text-muted-foreground"><Loader2 className="w-6 h-6 animate-spin mr-2" /> Loading Editor...</div>}
                options={{
                  fontSize: 14,
                  fontFamily: "'JetBrains Mono', monospace",
                  minimap: { enabled: false },
                  padding: { top: 20 },
                  smoothScrolling: true,
                  cursorBlinking: "smooth",
                  lineNumbers: "on",
                  roundedSelection: true,
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                }}
              />
            </div>
          </Card>

          <div className="flex flex-col gap-6 min-h-0">
            <Card className="glass-card border-none flex-[2] overflow-hidden flex flex-col">
              <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Live Preview</span>
                <div className="flex gap-2">
                  <GlassButton variant="ghost" size="sm" className="h-7 w-7 p-0 rounded-lg"><RefreshCw className="w-3 h-3" /></GlassButton>
                  <GlassButton variant="ghost" size="sm" className="h-7 w-7 p-0 rounded-lg"><Layout className="w-3 h-3" /></GlassButton>
                </div>
              </div>
              <div className="flex-1 bg-slate-950 flex items-center justify-center p-8 overflow-y-auto">
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={JSON.stringify(previewData)}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-md"
                  >
                    <div className="p-8 bg-slate-900 text-white rounded-[2.5rem] shadow-2xl border border-white/10">
                      <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-indigo-500 rounded-xl shadow-lg shadow-indigo-500/20"><Zap className="w-5 h-5" /></div>
                          <h2 className="text-2xl font-black tracking-tight">EcomCart</h2>
                        </div>
                        <Badge className="glass bg-white/5 text-white border-none px-3 py-1 rounded-lg font-black text-[10px] uppercase tracking-widest">
                          {previewData.length} Items
                        </Badge>
                      </div>
                      
                      <div className="space-y-3">
                        {previewData.length > 0 ? previewData.map((item, idx) => (
                          <motion.div 
                            key={item.id || idx}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex justify-between items-center p-5 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors"
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center">
                                <Code2 className="w-5 h-5 text-indigo-400" />
                              </div>
                              <span className="font-bold">{item.name}</span>
                            </div>
                            <span className="font-black text-cyan-400">${item.price}</span>
                          </motion.div>
                        )) : (
                          <div className="py-12 text-center space-y-4">
                            <AlertCircle className="w-12 h-12 text-muted-foreground/20 mx-auto" />
                            <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">No data detected</p>
                          </div>
                        )}
                      </div>

                      {previewData.length > 0 && (
                        <div className="mt-8 pt-8 border-t border-white/5">
                          <div className="flex justify-between items-center mb-8">
                            <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Total Amount</span>
                            <span className="text-3xl font-black text-white">
                              ${previewData.reduce((acc, item) => acc + (item.price || 0), 0).toFixed(2)}
                            </span>
                          </div>
                          <button className="w-full py-5 bg-indigo-600 rounded-2xl font-black text-lg shadow-xl shadow-indigo-500/20 hover:bg-indigo-500 transition-all active:scale-95">
                            Checkout Now
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </Card>

            <Card className="glass-card border-none flex-1 overflow-hidden flex flex-col">
              <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-muted-foreground" />
                  <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Console Output</span>
                </div>
                <GlassButton variant="ghost" size="sm" className="h-7 text-[10px] font-black" onClick={() => setOutput([])}>CLEAR</GlassButton>
              </div>
              <div className="flex-1 bg-black/40 p-6 font-mono text-sm overflow-y-auto no-scrollbar">
                <div className="space-y-2">
                  {output.length > 0 ? output.map((log, i) => (
                    <div key={i} className={cn(
                      "flex gap-3",
                      log.includes('[ERROR]') ? "text-red-400" : 
                      log.includes('[WARN]') ? "text-amber-400" : "text-emerald-400"
                    )}>
                      <span className="opacity-30 select-none">[{i + 1}]</span>
                      <span className="font-medium">{log}</span>
                    </div>
                  )) : (
                    <div className="flex items-center gap-2 text-muted-foreground/40 italic">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Ready for execution...</span>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>
        </div>

        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-8 right-8 z-50"
        >
          <GlassButton className="h-16 px-8 rounded-[2rem] shadow-2xl shadow-primary/40 bg-primary text-white border-none group">
            <MessageSquare className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
            <span className="font-black">AI Assistant</span>
            <div className="ml-4 px-2 py-1 bg-white/20 rounded-lg text-[10px] font-black">ONLINE</div>
          </GlassButton>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Playground;