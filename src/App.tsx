import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { Toaster } from 'react-hot-toast';

// Layouts
import MainLayout from './components/layout/MainLayout';

// Public Pages
import LandingPage from './pages/landing/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import Verify2FAPage from './pages/auth/Verify2FAPage';
import PendingApprovalPage from './pages/auth/PendingApprovalPage';

// Protected Dashboard Pages
import HomePage from './pages/dashboard/HomePage';
import DiscoverPage from './pages/dashboard/DiscoverPage';
import MessagesPage from './pages/dashboard/MessagesPage';
import ProfilePage from './pages/dashboard/ProfilePage';
import SettingsPage from './pages/dashboard/SettingsPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';

export default function App() {
  const { token, user } = useAuthStore();

  // Onboarding pending approval redirect guard
  if (token && user?.account_status === 'pending_approval') {
    return (
      <BrowserRouter>
        <Toaster
          position="top-center"
          toastOptions={{
            className: 'font-sans text-xs font-semibold p-4 rounded-xl border border-charcoal/5 shadow-xl bg-white text-charcoal',
            duration: 4000,
          }}
        />
        <Routes>
          <Route path="*" element={<PendingApprovalPage />} />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      {/* React Hot Toast Notifications setup */}
      <Toaster
        position="top-center"
        toastOptions={{
          className: 'font-sans text-xs font-semibold p-4 rounded-xl border border-charcoal/5 shadow-xl bg-white text-charcoal',
          duration: 4000,
          success: {
            iconTheme: {
              primary: '#3D5941',
              secondary: '#FFFFFF',
            },
          },
          error: {
            iconTheme: {
              primary: '#C4956D',
              secondary: '#FFFFFF',
            },
          },
        }}
      />

      <Routes>
        {/* PUBLIC ACCESS CHANNELS */}
        {!token ? (
          <>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/verify-2fa" element={<Verify2FAPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        ) : (
          /* PROTECTED COMMUNITY CHANNELS */
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/discover" element={<DiscoverPage />} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/admin" element={
              user?.role === 'admin' ? (
                <AdminDashboardPage />
              ) : (
                <Navigate to="/" replace />
              )
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  );
}
