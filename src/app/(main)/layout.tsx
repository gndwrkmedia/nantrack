
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarFooter,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/logo';
import { LayoutDashboard, HeartPulse, Droplets, Pill, Bike, UtensilsCrossed, Smile, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/blood-pressure', label: 'Blood Pressure', icon: HeartPulse },
  { href: '/blood-sugar', label: 'Blood Sugar', icon: Droplets },
  { href: '/medications', label: 'Medications', icon: Pill },
  { href: '/fitness', label: 'Fitness', icon: Bike },
  { href: '/nutrition', label: 'Nutrition', icon: UtensilsCrossed },
  { href: '/mood', label: 'Mood', icon: Smile },
];

const settingsItem = { href: '/settings', label: 'Settings', icon: Settings };

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <Sidebar variant="floating" collapsible="icon">
        <SidebarHeader className="p-4">
          <Link href="/" className="flex items-center gap-3">
            <Logo className="w-10 h-10" />
            <span className="font-headline text-2xl font-bold text-foreground/90 group-data-[collapsible=icon]:hidden">
              Nan-Track
            </span>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  variant="default"
                  className="text-lg py-6"
                  isActive={pathname === item.href}
                  tooltip={{ children: item.label, side: 'right' }}
                >
                  <Link href={item.href}>
                    <item.icon className="h-6 w-6" />
                    <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
            <SidebarSeparator />
            <SidebarMenu>
                 <SidebarMenuItem>
                    <SidebarMenuButton
                        asChild
                        variant="default"
                        className="text-lg py-6"
                        isActive={pathname === settingsItem.href}
                        tooltip={{ children: settingsItem.label, side: 'right' }}
                    >
                        <Link href={settingsItem.href}>
                            <settingsItem.icon className="h-6 w-6" />
                            <span className="group-data-[collapsible=icon]:hidden">{settingsItem.label}</span>
                        </Link>
                    </SidebarMenuButton>
                 </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <main className="min-h-screen p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
