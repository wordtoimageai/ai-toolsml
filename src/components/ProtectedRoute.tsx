import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { ToolsGridSkeleton } from './LoadingStates';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAuth?: boolean;
  requireVendor?: boolean;
  requireAdmin?: boolean;
  redirectTo?: string;
}

export const ProtectedRoute = ({ 
  children, 
  requireAuth = true, 
  requireVendor = false,
  requireAdmin = false,
  redirectTo = '/auth' 
}: ProtectedRouteProps) => {
  const { isAuthenticated, isVendor, isAdmin, loading } = useAuth();

  if (loading) {
    return <ToolsGridSkeleton />;
  }

  if (requireAuth && !isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  if (requireVendor && !isVendor) {
    return <Navigate to="/" replace />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};