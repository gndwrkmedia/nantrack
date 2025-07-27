
'use client';

import { cn } from '@/lib/utils';
import type React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { useSidebar } from './ui/sidebar';

interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export function PageHeader({ title, description, children, className, ...props }: PageHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { toggleSidebar } = useSidebar();
  const isDashboard = pathname === '/dashboard';

  return (
    <header className={cn('mb-6 flex items-start justify-between', className)} {...props}>
      <div className="flex items-center gap-4">
        {!isDashboard && (
            <Button
                variant="outline"
                size="icon"
                className="md:hidden h-12 w-12 flex-shrink-0"
                onClick={() => router.back()}
            >
                <ArrowLeft className="h-6 w-6" />
                <span className="sr-only">Back</span>
            </Button>
        )}
        <div className="grid gap-1">
            <h1 className="font-headline text-3xl md:text-4xl font-bold tracking-tight text-foreground/90">{title}</h1>
            {description && (
            <p className="text-lg text-muted-foreground">{description}</p>
            )}
        </div>
      </div>
      <div className="hidden md:flex items-center gap-2">
        {children}
      </div>
    </header>
  );
}
