'use client';

import { useAuth } from '../contexts/AuthContext';
import MainLayout from './MainLayout';

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  return (
    <MainLayout user={user}>
      {children}
    </MainLayout>
  );
}
