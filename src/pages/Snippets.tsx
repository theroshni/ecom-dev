"use client";

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Code2, 
  Copy, 
  Check, 
  Search, 
  Filter, 
  Zap, 
  Shield, 
  ShoppingCart, 
  Database,
  Plus,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import GlassButton from '@/components/ui/GlassButton';
import { motion, AnimatePresence } from 'framer-motion';

const Snippets = () => {
  const [copiedId, setCopiedId] = React.useState<number | null>(null);
  const [filter, setFilter] = React.useState("All");

  const snippets = [
    {
      id: 1,
      title: "Stripe Webhook Handler",
      description: "Securely handle Stripe events in Next.js 15 Route Handlers.",
      category: "API",
      icon: Shield,
      color: "text-indigo-500",
      bg: "bg-indigo-500/10",
      code: `export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature') as string;
  
  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    return new Response('Webhook Error', { status: 400 });
  }
  
  // Handle the event
  return new Response(null, { status: 200 });
}`
    },
    {
      id: 2,
      title: "Cart State Hook",
      description: "A simple React hook for managing shopping cart state with local storage.",
      category: "Frontend",
      icon: ShoppingCart,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      code: `export const useCart = () => {
  const [items, setItems] = useState([]);
  
  const addItem = (product) => {
    setItems(prev => [...prev, product]);
  };
  
  const removeItem = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };
  
  return { items, addItem, removeItem };
}`
    },
    {
      id: 3,
      title: "Supabase Auth Middleware",
      description: "Protect routes and handle sessions in Next.js middleware.",
      category: "Auth",
      icon: Zap,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
      code: `export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { ... } }
  );
  await supabase.auth.getUser();
  return response;
}`
    }
  ];

  const copyToClipboard = (id: number, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    toast.success("Snippet copied to clipboard!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <Badge className="glass bg-primary/10 text-primary border-primary/20 px-4 py-1.5 rounded-full font-black uppercase tracking-widest text-[10px]">
              Code Library
            </Badge>
            <h1 className="text-5xl font-black tracking-tight">Code Snippets</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Reusable logic and patterns for your high-performance ecommerce builds.
            </p>
          </div>
          <GlassButton className="rounded-2xl px-8 shadow-2xl shadow-primary/20">
            <Plus className="w-4 h-4 mr-2" /> Submit Snippet
          </GlassButton>
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input placeholder="Search snippets by title, category, or code..." className="glass border-none pl-12 h-14 rounded-2xl text-lg font-medium focus-visible:ring-primary" />
          </div>
          <div className="flex gap-3 overflow-x-auto no-scrollbar">
            {["All", "Frontend", "API", "Auth", "Database"].map((cat) => (
              <GlassButton 
                key={cat}
                variant={filter === cat ? 'primary' : 'secondary'}
                size="sm"
                className="rounded-full px-8 h-14"
                onClick={() => setFilter(cat)}
              >
                {cat}
              </GlassButton>
            ))}
          </div>
        </div>

        <div className="grid gap-8">
          {snippets.map((snippet, i) => (
            <motion.div
              key={snippet.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="glass-card border-none overflow-hidden group">
                <CardHeader className="p-10 pb-4 flex flex-col md:flex-row md:items-start justify-between gap-6">
                  <div className="flex gap-6">
                    <div className={cn("p-5 glass rounded-[1.5rem] shadow-xl shrink-0", snippet.bg)}>
                      <snippet.icon className={cn("w-8 h-8", snippet.color)} />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-3xl font-black">{snippet.title}</CardTitle>
                        <Badge className="glass bg-primary/10 text-primary border-none px-3 py-1 rounded-lg font-black uppercase tracking-widest text-[10px]">
                          {snippet.category}
                        </Badge>
                      </div>
                      <p className="text-lg text-muted-foreground font-medium leading-relaxed">{snippet.description}</p>
                    </div>
                  </div>
                  <GlassButton 
                    variant="secondary" 
                    className="rounded-xl h-12 px-8 font-black"
                    onClick={() => copyToClipboard(snippet.id, snippet.code)}
                  >
                    {copiedId === snippet.id ? (
                      <><Check className="w-4 h-4 mr-2 text-emerald-500" /> Copied!</>
                    ) : (
                      <><Copy className="w-4 h-4 mr-2" /> Copy Code</>
                    )}
                  </GlassButton>
                </CardHeader>
                <CardContent className="p-10 pt-4">
                  <div className="bg-slate-950 rounded-[2rem] p-8 relative group border border-white/5 shadow-2xl overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-2xl" />
                    <pre className="text-sm font-mono text-indigo-100 overflow-x-auto no-scrollbar relative z-10">
                      <code>{snippet.code}</code>
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* AI Snippet Generator */}
        <Card className="glass-card border-none bg-primary/5 p-12 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 text-primary">
                <Sparkles className="w-6 h-6 fill-current" />
                <span className="font-black uppercase tracking-widest text-sm">AI Snippet Generator</span>
              </div>
              <h2 className="text-3xl font-black tracking-tight">Need a specific logic pattern?</h2>
              <p className="text-muted-foreground max-w-md">
                Describe the functionality you need, and our AI will generate a production-ready code snippet for you.
              </p>
            </div>
            <GlassButton size="lg" className="rounded-2xl px-10">Generate Snippet</GlassButton>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Snippets;