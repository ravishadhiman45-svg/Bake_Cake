import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";

import ProtectedRoute from "./routes/ProtectedRoutes";
import AdminLayout from "./layouts/AdminLayout";

// Customer Website Components
import NavBar from "./components/NavBar";
import HeroSection from "./components/HeroSection";
import MenuSection from "./components/MenuSection";
import PromotionalSection from "./components/PromotionalSection";
import OurPromiseSection from "./components/OurPromiseSection";
import NewsletterSection from "./components/NewsletterSection";

// Auth Pages
import LoginPage from "./pages/admin/auth/LoginPage";
import OTPVerificationPage from "./pages/admin/auth/OTPVerificationPage";
import ForgotAccessPage from "./pages/admin/auth/ForgotAccessPage";

// Admin Pages
import DashboardPage from "./pages/admin/dashboard/Dashboard";
import CakesPage from "./pages/admin/cakes/CakesPage";
import CreateCakePage from "./pages/admin/cakes/CreateCakePage";
import EditCakePage from "./pages/admin/cakes/EditCakePage";
import ViewCakePage from "./pages/admin/cakes/ViewCakePage";
import CategoriesPage from "./pages/admin/cakes/CategoriesPage";
import OrdersPage from "./pages/admin/orders/OrdersPage";
import OrderDetailPage from "./pages/admin/orders/OrderDetailPage";
import ReviewsPage from "./pages/admin/reviews/ReviewsPage";
import FeedbacksPage from "./pages/admin/feedbacks/FeedbacksPage";
import SocialsPage from "./pages/admin/socials/SocialsPage";
import ReelsPage from "./pages/admin/reels/ReelsPage";
import TermsConditionsPage from "./pages/admin/legal/TermsConditionsPage";
import PrivacyPolicyPage from "./pages/admin/legal/PrivacyPolicyPage";
import SettingsPage from "./pages/admin/SettingsPage";
import ProfilePage from "./pages/admin/profile/ProfilePage";

// Customer Home Page
function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <NavBar />
      <HeroSection />
      <MenuSection />
      <PromotionalSection />
      <OurPromiseSection />
      <NewsletterSection />
    </main>
  );
}

// Error UI
function ErrorFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-6">
      <div className="text-center">
        <div className="w-16 h-16 rounded-2xl bg-error-500/10 flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">!</span>
        </div>

        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Something went wrong
        </h2>

        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          An unexpected error occurred
        </p>

        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-primary-500 text-white rounded-xl text-sm font-medium hover:bg-primary-600 transition-colors"
        >
          Reload Page
        </button>
      </div>
    </div>
  );
}

// Error Boundary
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }

    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: {
                  borderRadius: "12px",
                  background: "#1f2937",
                  color: "#f9fafb",
                  fontSize: "14px",
                },
              }}
            />

            <Routes>
              {/* Customer Website */}
              <Route path="/" element={<HomePage />} />

              {/* Auth Routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/verify-otp" element={<OTPVerificationPage />} />
              <Route path="/forgot-access" element={<ForgotAccessPage />} />

              {/* Admin Routes */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route
                  index
                  element={<Navigate to="dashboard" replace />}
                />

                <Route path="dashboard" element={<DashboardPage />} />

                <Route path="cakes" element={<CakesPage />} />
                <Route path="cakes/create" element={<CreateCakePage />} />
                <Route path="cakes/edit/:id" element={<EditCakePage />} />
                <Route path="cakes/:id" element={<ViewCakePage />} />

                <Route path="categories" element={<CategoriesPage />} />

                <Route path="orders" element={<OrdersPage />} />
                <Route path="orders/:id" element={<OrderDetailPage />} />

                <Route path="reviews" element={<ReviewsPage />} />
                <Route path="feedbacks" element={<FeedbacksPage />} />

                <Route path="socials" element={<SocialsPage />} />
                <Route path="reels" element={<ReelsPage />} />

                <Route
                  path="terms-conditions"
                  element={<TermsConditionsPage />}
                />

                <Route
                  path="privacy-policy"
                  element={<PrivacyPolicyPage />}
                />

                <Route path="settings" element={<SettingsPage />} />
                <Route path="profile" element={<ProfilePage />} />
              </Route>

              {/* 404 */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}