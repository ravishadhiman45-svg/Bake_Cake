import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PageLoader } from '../components/ui/LoadingSpinner';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading, isSessionExpired } = useAuth();
  if (loading) return <PageLoader />;
  if (!isAuthenticated || isSessionExpired()) return <Navigate to="/login" replace />;
  return children;
}
