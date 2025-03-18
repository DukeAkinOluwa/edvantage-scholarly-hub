import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";

// Auth Context
import { AuthProvider, useAuth } from "./contexts/AuthContext";

// Layouts
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PageLoader from "./components/PageLoader";
import DashboardLayout from "./components/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";

// Landing Pages
import Index from "./pages/Index";
const About = lazy(() => import("./pages/About"));
const Team = lazy(() => import("./pages/Team"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Auth Pages
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Onboarding = lazy(() => import("./pages/Onboarding"));

// Dashboard Pages
const Dashboard = lazy(() => import("./pages/Dashboard"));
const CalendarPage = lazy(() => import("./pages/dashboard/CalendarPage"));
const GroupsPage = lazy(() => import("./pages/dashboard/GroupsPage"));
const GroupDetailPage = lazy(() => import("./pages/dashboard/GroupDetailPage"));
const ProjectsPage = lazy(() => import("./pages/dashboard/ProjectsPage"));
const ResourcesPage = lazy(() => import("./pages/dashboard/ResourcesPage"));
const AiSupportPage = lazy(() => import("./pages/dashboard/AiSupportPage"));
const AchievementsPage = lazy(() => import("./pages/dashboard/AchievementsPage"));
const NotificationsPage = lazy(() => import("./pages/dashboard/NotificationsPage"));
const SettingsPage = lazy(() => import("./pages/dashboard/SettingsPage"));

// Admin Pages
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const SchoolDashboard = lazy(() => import("./pages/admin/SchoolDashboard"));

const queryClient = new QueryClient();

// Root component to handle redirects based on auth state
const Root = () => {
  const { user, isLoading } = useAuth();
  
  // If still loading auth state, show loader
  if (isLoading) {
    return <PageLoader />;
  }
  
  // If logged in, redirect to appropriate dashboard based on account type
  if (user) {
    if (user.accountType === 'organization') {
      return <Navigate to="/school-admin" replace />;
    } else {
      return <Navigate to="/dashboard" replace />;
    }
  }
  
  // Otherwise render the landing page
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/team" element={<Team />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  );
};

const App = () => {
  // Initialize app-wide settings
  useEffect(() => {
    // Check for dark mode preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="flex flex-col min-h-screen">
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  {/* Auth routes */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  
                  {/* Protected student dashboard routes */}
                  <Route 
                    path="/dashboard" 
                    element={
                      <ProtectedRoute allowedAccountTypes={['student']}>
                        <DashboardLayout />
                      </ProtectedRoute>
                    }
                  >
                    <Route index element={<Dashboard />} />
                    <Route path="calendar" element={<CalendarPage />} />
                    <Route path="groups" element={<GroupsPage />} />
                    <Route path="groups/:groupId" element={<GroupDetailPage />} />
                    <Route path="projects" element={<ProjectsPage />} />
                    <Route path="resources" element={<ResourcesPage />} />
                    <Route path="ai-support" element={<AiSupportPage />} />
                    <Route path="achievements" element={<AchievementsPage />} />
                    <Route path="notifications" element={<NotificationsPage />} />
                    <Route path="settings" element={<SettingsPage />} />
                  </Route>
                  
                  {/* Onboarding route */}
                  <Route 
                    path="/onboarding" 
                    element={
                      <ProtectedRoute>
                        <Onboarding />
                      </ProtectedRoute>
                    } 
                  />
                  
                  {/* Admin routes */}
                  <Route 
                    path="/admin" 
                    element={
                      <ProtectedRoute>
                        <AdminDashboard />
                      </ProtectedRoute>
                    } 
                  />
                  
                  {/* School/Organization admin dashboard */}
                  <Route 
                    path="/school-admin" 
                    element={
                      <ProtectedRoute allowedAccountTypes={['organization']}>
                        <SchoolDashboard />
                      </ProtectedRoute>
                    } 
                  />
                  
                  {/* Root route - Show landing or redirect */}
                  <Route path="/*" element={<Root />} />
                </Routes>
              </Suspense>
            </div>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
