
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
import ForgotPassword from './pages/ForgotPassword';
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
import ProfilePage from './pages/dashboard/ProfilePage';
import AdminDashboard from './pages/admin/AdminDashboard';
import SchoolDashboard from './pages/admin/SchoolDashboard';
import { AchievementProvider } from './contexts/AchievementContext';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from '@/components/ui/toaster';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <AuthProvider>
      <AchievementProvider>
        <Router>
          <PageTransition>
            <Routes>
              {/* Public Routes with Navbar and Footer */}
              <Route path="/" element={
                <>
                  <Navbar />
                  <Index />
                  <Footer />
                </>
              } />
              <Route path="/about" element={
                <>
                  <Navbar />
                  <About />
                  <Footer />
                </>
              } />
              <Route path="/team" element={
                <>
                  <Navbar />
                  <Team />
                  <Footer />
                </>
              } />
              <Route path="/blog" element={
                <>
                  <Navbar />
                  <Blog />
                  <Footer />
                </>
              } />
              <Route path="/blog/:postId" element={
                <>
                  <Navbar />
                  <BlogPost />
                  <Footer />
                </>
              } />
              <Route path="/contact" element={
                <>
                  <Navbar />
                  <Contact />
                  <Footer />
                </>
              } />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
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
                <Route path="profile" element={<ProfilePage />} />
              </Route>
              
              {/* Admin and School Dashboards */}
              <Route path="/admin" element={
                <ProtectedRoute allowedAccountTypes={['organization']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              
              <Route path="/school-admin" element={
                <ProtectedRoute allowedAccountTypes={['organization']}>
                  <SchoolDashboard />
                </ProtectedRoute>
              } />
              
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
