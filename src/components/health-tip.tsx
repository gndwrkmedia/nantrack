
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

interface HealthTipProps {
    icon: LucideIcon;
    title: string;
    content: string;
    className?: string;
}

export function HealthTip({ icon: Icon, title, content, className }: HealthTipProps) {
  return (
    <Card className={cn("bg-accent/50 border-accent/50", className)}>
        <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-3 text-xl text-accent-foreground/90">
                <Icon className="h-7 w-7 text-accent-foreground/80" />
                {title}
            </CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-base text-accent-foreground/80">
                {content}
            </p>
        </CardContent>
    </Card>
  );
}
