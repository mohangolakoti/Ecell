import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { ThemeProvider } from './components/ThemeProvider';
import { Suspense, lazy } from 'react';
import MaintenanceBanner from './components/MaintenanceBanner';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import OfflineIndicator from './components/OfflineIndicator';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy loaded components
const Home = lazy(() => import('./pages/Home'));
const Events = lazy(() => import('./pages/public/Events'));
const Team = lazy(() => import('./pages/public/Team'));
const About = lazy(() => import('./pages/public/About'));
const CaseStudies = lazy(() => import('./pages/public/CaseStudies'));
const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const EventList = lazy(() => import('./pages/admin/EventList'));
const EventForm = lazy(() => import('./pages/admin/EventForm'));
const TeamManagement = lazy(() => import('./pages/admin/TeamManagement'));
const AdminCaseStudies = lazy(() => import('./pages/admin/CaseStudies'));
const EventJudging = lazy(() => import('./pages/admin/EventJudging'));
const JudgingCriteria = lazy(() => import('./pages/admin/JudgingCriteria'));
const RegistrationManagement = lazy(() => import('./pages/admin/RegistrationManagement'));
const EventAnalytics = lazy(() => import('./pages/admin/EventAnalytics'));
const Settings = lazy(() => import('./pages/admin/Settings'));

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <ThemeProvider>
          <NotificationProvider>
            <Router>
              <div className="min-h-screen bg-white">
                <MaintenanceBanner />
                <OfflineIndicator />
                <Navbar />
                <Suspense fallback={<LoadingSpinner />}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/events" element={<Events />} />
                    <Route path="/team" element={<Team />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/case-studies" element={<CaseStudies />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/admin" element={<AdminLayout />}>
                      <Route index element={<Dashboard />} />
                      <Route path="events" element={<EventList />} />
                      <Route path="events/new" element={<EventForm />} />
                      <Route path="events/:id/edit" element={<EventForm />} />
                      <Route path="events/judging" element={<EventJudging />} />
                      <Route path="judging-criteria" element={<JudgingCriteria />} />
                      <Route path="registrations" element={<RegistrationManagement />} />
                      <Route path="analytics" element={<EventAnalytics />} />
                      <Route path="team" element={<TeamManagement />} />
                      <Route path="case-studies" element={<AdminCaseStudies />} />
                      <Route path="settings" element={<Settings />} />
                    </Route>
                  </Routes>
                </Suspense>
                <Footer />
              </div>
            </Router>
          </NotificationProvider>
        </ThemeProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}