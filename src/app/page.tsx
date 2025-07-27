
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/logo';

// Function to check if a user session exists in localStorage
const checkUserSession = () => {
  if (typeof window !== 'undefined') {
    const session = localStorage.getItem('nan-track-session');
    return session ? JSON.parse(session) : null;
  }
  return null;
};

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    const user = checkUserSession();
    if (user) {
      router.replace('/dashboard');
    } else {
      router.replace('/login');
    }
  }, [router]);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-background">
        <div className="flex h-screen items-center justify-center">
            <Logo className="h-24 w-24" />
        </div>
    </div>
  );
}
