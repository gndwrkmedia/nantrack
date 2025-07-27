
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/page-header';
import { HeartPulse, Droplets, Pill, Smile, Bike, UtensilsCrossed, LayoutDashboard } from 'lucide-react';
import { bpDataForChart, bsDataForChart } from '@/lib/placeholder-data';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mobileNavItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/blood-pressure', label: 'BP', icon: HeartPulse },
  { href: '/blood-sugar', label: 'Sugar', icon: Droplets },
  { href: '/medications', label: 'Meds', icon: Pill },
  { href: '/fitness', label: 'Fitness', icon: Bike },
  { href: '/nutrition', label: 'Meals', icon: UtensilsCrossed },
  { href: '/mood', label: 'Mood', icon: Smile },
]

const bpChartConfig = {
  systolic: {
    label: "Systolic",
    color: "hsl(var(--primary))",
  },
  diastolic: {
    label: "Diastolic",
    color: "hsl(var(--accent))",
  },
} satisfies ChartConfig;

const bsChartConfig = {
  level: {
    label: "Glucose",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

export default function DashboardPage() {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good Morning";
        if (hour < 18) return "Good Afternoon";
        return "Good Evening";
    };
    setGreeting(getGreeting());
  }, []);
  
  return (
    <div className="w-full">
      <PageHeader
        title={`${greeting}, Nan-Nan!`}
        description={`Here's your health summary for ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}.`}
      />

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-6 md:hidden">
        {mobileNavItems.map(item => (
            <Button asChild variant="outline" className="w-full h-20 flex-col gap-2" key={item.href}>
              <Link href={item.href}>
                <item.icon className="h-7 w-7" />
                <span className="text-sm font-semibold">{item.label}</span>
              </Link>
            </Button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                  <HeartPulse className="h-8 w-8 text-primary" />
                  <span>Blood Pressure Trend</span>
              </CardTitle>
              <CardDescription>Your 7-day overview.</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={bpChartConfig} className="h-48 w-full">
                <ResponsiveContainer>
                  <LineChart data={bpDataForChart} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
                    <YAxis domain={[60, 160]} tickLine={false} axisLine={false} />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Line dataKey="systolic" type="monotone" stroke="var(--color-systolic)" strokeWidth={3} dot={true} />
                    <Line dataKey="diastolic" type="monotone" stroke="var(--color-diastolic)" strokeWidth={3} dot={true} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                  <Droplets className="h-8 w-8 text-primary" />
                  <span>Blood Sugar Trend</span>
              </CardTitle>
              <CardDescription>Your 7-day overview.</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={bsChartConfig} className="h-48 w-full">
                <ResponsiveContainer>
                  <LineChart data={bsDataForChart} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
                    <YAxis domain={[50, 200]} tickLine={false} axisLine={false} />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Line dataKey="level" type="monotone" stroke="var(--color-level)" strokeWidth={3} dot={true} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <Pill className="h-8 w-8 text-primary" />
              <span>Medication</span>
            </CardTitle>
            <CardDescription>Your upcoming medication schedule.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col justify-center gap-4">
            <div className="text-center">
                <p className="text-lg text-muted-foreground">Next up:</p>
                <p className="text-2xl font-bold">Metformin</p>
                <p className="text-lg text-muted-foreground">at 8:00 PM</p>
            </div>
            <Button asChild size="lg" className="w-full text-lg py-6">
              <Link href="/medications">View & Log Medications</Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <Smile className="h-8 w-8 text-primary" />
              <span>Your Mood</span>
            </CardTitle>
            <CardDescription>How are you feeling right now?</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col justify-center gap-4">
             <p className="text-center text-lg">You last logged your mood as feeling <span className="font-bold">Good</span>.</p>
             <Button asChild size="lg" variant="outline" className="w-full text-lg py-6">
              <Link href="/mood">Track Your Mood</Link>
            </Button>
          </CardContent>
        </Card>

         <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <UtensilsCrossed className="h-8 w-8 text-primary" />
              <span>Today's Vitals</span>
            </CardTitle>
            <CardDescription>A quick look at your key numbers.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow grid gap-4 text-lg">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Blood Pressure</span>
              <span className="font-bold">122/81 mmHg</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Blood Sugar</span>
              <span className="font-bold">98 mg/dL</span>
            </div>
             <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Water Intake</span>
              <span className="font-bold">3 of 8 glasses</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
