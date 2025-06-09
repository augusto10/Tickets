import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@app/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user } = useAuth();
  const router = useRouter();

  if (!user) {
    router.push('/auth');
    return null;
  }

  return <>{children}</>;
}
