import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import Modules from "./pages/Modules";
import Projects from "./pages/Projects";
import ProjectBuilder from "./pages/ProjectBuilder";
import ProjectDetail from "./pages/ProjectDetail";
import ProjectSettings from "./pages/ProjectSettings";
import ProjectBoard from "./pages/ProjectBoard";
import Teams from "./pages/Teams";
import TeamDetail from "./pages/TeamDetail";
import LessonDetail from "./pages/LessonDetail";
import Quiz from "./pages/Quiz";
import ModuleSuccess from "./pages/ModuleSuccess";
import Admin from "./pages/Admin";
import ModuleEditor from "./pages/ModuleEditor";
import Settings from "./pages/Settings";
import Resources from "./pages/Resources";
import ResourceDetail from "./pages/ResourceDetail";
import Pricing from "./pages/Pricing";
import Community from "./pages/Community";
import CommunityPost from "./pages/CommunityPost";
import GroupDetail from "./pages/GroupDetail";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import Search from "./pages/Search";
import Onboarding from "./pages/Onboarding";
import Mentorship from "./pages/Mentorship";
import MentorProfile from "./pages/MentorProfile";
import Templates from "./pages/Templates";
import TemplateDetail from "./pages/TemplateDetail";
import Showcase from "./pages/Showcase";
import ShowcaseDetail from "./pages/ShowcaseDetail";
import Snippets from "./pages/Snippets";
import Leaderboard from "./pages/Leaderboard";
import Support from "./pages/Support";
import Jobs from "./pages/Jobs";
import JobDetail from "./pages/JobDetail";
import Billing from "./pages/Billing";
import Certificates from "./pages/Certificates";
import Messages from "./pages/Messages";
import HelpCenter from "./pages/HelpCenter";
import Events from "./pages/Events";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Playground from "./pages/Playground";
import Courses from "./pages/Courses";
import TestReport from "./pages/TestReport";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-right" expand={true} richColors />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/auth/reset-password" element={<ResetPassword />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/modules" element={<Modules />} />
          <Route path="/modules/:id" element={<LessonDetail />} />
          <Route path="/modules/:id/quiz" element={<Quiz />} />
          <Route path="/modules/:id/success" element={<ModuleSuccess />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/new" element={<ProjectBuilder />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/projects/:id/settings" element={<ProjectSettings />} />
          <Route path="/projects/:id/board" element={<ProjectBoard />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/templates/:id" element={<TemplateDetail />} />
          <Route path="/showcase" element={<Showcase />} />
          <Route path="/showcase/:id" element={<ShowcaseDetail />} />
          <Route path="/snippets" element={<Snippets />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/events" element={<Events />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/teams/:id" element={<TeamDetail />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:id" element={<JobDetail />} />
          <Route path="/mentorship" element={<Mentorship />} />
          <Route path="/mentorship/:id" element={<MentorProfile />} />
          <Route path="/community" element={<Community />} />
          <Route path="/community/:id" element={<CommunityPost />} />
          <Route path="/community/groups/:id" element={<GroupDetail />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/resources/:id" element={<ResourceDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/search" element={<Search />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/certificates" element={<Certificates />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/support" element={<Support />} />
          <Route path="/help" element={<HelpCenter />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/modules/:id" element={<ModuleEditor />} />
          <Route path="/admin/modules/new" element={<ModuleEditor />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/playground" element={<Playground />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/test-report" element={<TestReport />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;