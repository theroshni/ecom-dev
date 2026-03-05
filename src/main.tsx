import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProjectProvider } from "@/contexts/ProjectContext";
import { LearningProvider } from "@/contexts/LearningContext";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { CommunityProvider } from "@/contexts/CommunityContext";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="light" storageKey="ecomdev-theme" attribute="class">
    <AuthProvider>
      <ProjectProvider>
        <LearningProvider>
          <NotificationProvider>
            <CommunityProvider>
              <App />
            </CommunityProvider>
          </NotificationProvider>
        </LearningProvider>
      </ProjectProvider>
    </AuthProvider>
  </ThemeProvider>
);