
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PageTransition from './components/PageTransition';
import Index from './pages/Index';
import About from './pages/About';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import Team from './pages/Team';
import Login from './pages/Login';
import Register from './pages/Register';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './components/DashboardLayout';
import ProjectsPage from './pages/dashboard/ProjectsPage';
import ProjectDetailPage from './pages/dashboard/ProjectDetailPage';
import SettingsPage from './pages/dashboard/SettingsPage';
import ResourcesPage from './pages/dashboard/ResourcesPage';
import AchievementsPage from './pages/dashboard/AchievementsPage';
import AiSupportPage from './pages/dashboard/AiSupportPage';
import CalendarPage from './pages/dashboard/CalendarPage';
import GroupsPage from './pages/dashboard/GroupsPage';
import GroupDetailPage from './pages/dashboard/GroupDetailPage';
import NotificationsPage from './pages/dashboard/NotificationsPage';
import ChatsPage from './pages/dashboard/ChatsPage';
import { AchievementProvider } from './contexts/AchievementContext';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from '@/components/ui/toaster';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <AchievementProvider>
        <Router>
          <PageTransition>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/team" element={<Team />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:postId" element={<BlogPost />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/onboarding" element={<Onboarding />} />
              
              {/* Protected Dashboard Routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }>
                <Route index element={<Dashboard />} />
                <Route path="projects" element={<ProjectsPage />} />
                <Route path="projects/:projectId" element={<ProjectDetailPage />} />
                <Route path="resources" element={<ResourcesPage />} />
                <Route path="achievements" element={<AchievementsPage />} />
                <Route path="ai-support" element={<AiSupportPage />} />
                <Route path="calendar" element={<CalendarPage />} />
                <Route path="groups" element={<GroupsPage />} />
                <Route path="groups/:groupId" element={<GroupDetailPage />} />
                <Route path="notifications" element={<NotificationsPage />} />
                <Route path="settings" element={<SettingsPage />} />
                <Route path="chats" element={<ChatsPage />} />
              </Route>
              
              {/* Catch-all Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </PageTransition>
        </Router>
        <Toaster />
      </AchievementProvider>
    </AuthProvider>
  );
}

export default App;
