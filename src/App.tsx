// src/App.tsx
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { SOSButton } from '@/components/SOSButton';
import AIThreatButton from '@/components/AIThreatButton';
import { ReactNode, Suspense } from 'react';
import { Loader2 } from 'lucide-react';

// Page Imports
import Index from "./lib/pages/Index";
import NotFound from "./lib/pages/NotFound";
import FindNearbyHelp from "./lib/pages/FindNearbyHelp";
import SafetyLaws from "./lib/pages/SafetyLaws";
import AIAssistant from "./lib/pages/AIAssistant";
import WomenSchemes from "./lib/pages/WomenSchemes";
import Community from "./lib/pages/Community";
import Resources from "./lib/pages/Resources";
import AIThreatDetectionPage from "./lib/pages/AIThreatDetectionPage";
import VoiceDetectionPage from "./lib/pages/VoiceDetectionPage";
import Mentors from "./lib/pages/Mentors";
import MentorDetail from "./lib/pages/MentorDetail";
import TravelSafety from "./lib/pages/TravelSafety";
import OnlineSafety from "./lib/pages/OnlineSafety";
import WomensLawsAwareness from "./lib/pages/WomensLawsAwareness";
import SelfDefenseVideos from "./lib/pages/SelfDefenseVideos";
import AboutPage from "./lib/pages/AboutPage";
import Emergency from "./lib/pages/Emergency";
import WorkingWomenHostel from "./lib/pages/WorkingWomenHostel";
import FindNearbyAccommodation from "./lib/pages/FindNearbyAccommodation";
import EmergencyAlertPage from "./lib/pages/EmergencyAlertPage";
import SOSSetupPage from "./lib/pages/SOSSetupPage";
import EmergencyContactsPage from "./lib/pages/EmergencyContactsPage";
import SelfDefensePage from "./lib/pages/SelfDefensePage";
import SelfDefenseTechniquePage from "./lib/pages/SelfDefenseTechniquePage";
import SafetyTipsPage from "./lib/pages/SafetyTipsPage";
import Profile from './lib/pages/Profile';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return user ? <Outlet /> : <Navigate to="/login" replace state={{ from: window.location.pathname }} />;
};

// Public route component (for login/signup when already authenticated)
const PublicRoute = () => {
  const { user } = useAuth();
  return !user ? <Outlet /> : <Navigate to="/dashboard" replace />;
};

// AppRoutes component to handle routing
const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<div>Forgot Password</div>} />
      </Route>

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<div>Dashboard</div>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<div>Settings</div>} />
      </Route>

      {/* Public routes that don't require auth */}
      <Route path="/" element={<Index />} />
      <Route path="/find-nearby-help" element={<FindNearbyHelp />} />
      <Route path="/safety-laws" element={<SafetyLaws />} />
      <Route path="/ai-assistant" element={<AIAssistant />} />
      <Route path="/schemes" element={<WomenSchemes />} />
      <Route path="/community" element={<Community />} />
      <Route path="/resources" element={<Resources />} />
      <Route path="/ai-threat-detection" element={<AIThreatDetectionPage />} />
      <Route path="/voice-detection" element={<VoiceDetectionPage />} />
      <Route path="/mentors" element={<Mentors />} />
      <Route path="/mentors/:id" element={<MentorDetail />} />
      <Route path="/travel-safety" element={<TravelSafety />} />
      <Route path="/online-safety" element={<OnlineSafety />} />
      <Route path="/laws-awareness" element={<WomensLawsAwareness />} />
      <Route path="/self-defense-videos" element={<SelfDefenseVideos />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/emergency" element={<Emergency />} />
      <Route path="/working-women-hostel" element={<WorkingWomenHostel />} />
      <Route path="/find-accommodation" element={<FindNearbyAccommodation />} />
      <Route path="/emergency-alert" element={<EmergencyAlertPage />} />
      <Route path="/sos-setup" element={<SOSSetupPage />} />
      <Route path="/emergency-contacts" element={<EmergencyContactsPage />} />
      <Route path="/self-defense" element={<SelfDefensePage />} />
      <Route path="/self-defense/:id" element={<SelfDefenseTechniquePage />} />
      <Route path="/safety-tips" element={<SafetyTipsPage />} />
      
      {/* 404 - Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

// Main App component with providers
function App() {
  return (
    <Suspense 
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      }
    >
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <AppRoutes />
          <AIThreatButton />
        </TooltipProvider>
      </QueryClientProvider>
    </Suspense>
  );
};

export default App;