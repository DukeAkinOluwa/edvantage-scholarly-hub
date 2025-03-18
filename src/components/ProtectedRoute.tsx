
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import PageLoader from './PageLoader';

type ProtectedRouteProps = {
  children: React.ReactNode;
  allowedAccountTypes?: ('student' | 'organization')[];
};

const ProtectedRoute = ({ children, allowedAccountTypes }: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <PageLoader />;
  }

  if (!user) {
    // Redirect to login page but save the attempted URL
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If allowedAccountTypes is specified, check if user has the right account type
  if (allowedAccountTypes && user.accountType && !allowedAccountTypes.includes(user.accountType)) {
    // Redirect to appropriate dashboard based on account type
    const redirectTo = user.accountType === 'organization' ? '/school-admin' : '/dashboard';
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
