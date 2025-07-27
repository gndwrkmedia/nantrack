
'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
import { LayoutDashboard, HeartPulse, Droplets, Pill, Bike, UtensilsCrossed, Smile, Settings, HelpCircle, LogOut } from 'lucide-react';
import { useAuth, AuthProvider } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/blood-pressure', label: 'Blood Pressure', icon: HeartPulse },
  { href: '/blood-sugar', label: 'Blood Sugar', icon: Droplets },
  { href: '/medications', label: 'Medications', icon: Pill },
  { href: '/fitness', label: 'Fitness', icon: Bike },
  { href: '/nutrition', label: 'Nutrition', icon: UtensilsCrossed },
  { href: '/mood', label: 'Mood', icon: Smile },
];

const bottomNavItems = [
    { href: '/help', label: 'Help & About', icon: HelpCircle },
    { href: '/settings', label: 'Settings', icon: Settings }
];

function MainLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      router.replace('/login');
    }
  }, [user, router]);

  if (!user) {
    return (
       <div className="flex h-screen w-screen items-center justify-center bg-background">
          <Logo className="h-24 w-24" />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <Sidebar variant="floating" collapsible="icon">
        <SidebarHeader className="p-4">
          <Link href="/dashboard" className="flex items-center gap-3">
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
                 {bottomNavItems.map((item) => (
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
                 <SidebarMenuItem>
                    <SidebarMenuButton
                        variant="default"
                        className="text-lg py-6"
                        onClick={logout}
                        tooltip={{ children: "Logout", side: 'right' }}
                    >
                         <LogOut className="h-6 w-6" />
                         <span className="group-data-[collapsible=icon]:hidden">Logout</span>
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

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <MainLayoutContent>{children}</MainLayoutContent>
    </AuthProvider>
  )
}
