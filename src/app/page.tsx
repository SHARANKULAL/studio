// src/app/page.tsx
"use client";

import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';


export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.replace('/dashboard');
      } else {
        router.replace('/login');
      }
    }
  }, [user, loading, router]);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-br from-background to-blue-100 dark:from-background dark:to-blue-900">
      <div className="flex flex-col items-center space-y-4 p-8 bg-card rounded-xl shadow-2xl">
        <Skeleton className="h-16 w-16 rounded-full bg-primary/20 mb-4" />
        <Skeleton className="h-6 w-[280px] bg-primary/20" />
        <Skeleton className="h-4 w-[220px] bg-primary/20" />
        <Skeleton className="h-4 w-[200px] bg-primary/20" />
      </div>
    </div>
  );
}
