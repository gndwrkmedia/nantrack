
'use client';

import React from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight, Lightbulb, HeartPulse, Droplets, Pill, Smile } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { bpDataForChart, bsDataForChart, placeholderMedications } from '@/lib/placeholder-data';
import { HealthTip } from '@/components/health-tip';
import { useAuth } from '@/hooks/use-auth';

const bpChartConfig = {
  systolic: { label: "Systolic", color: "hsl(var(--primary))" },
  diastolic: { label: "Diastolic", color: "hsl(var(--accent))" },
} satisfies ChartConfig;

const bsChartConfig = {
  level: { label: "Glucose", color: "hsl(var(--primary))" },
} satisfies ChartConfig;

const moodData = [
  { day: 'Mon', mood: 4 },
  { day: 'Tue', mood: 3 },
  { day: 'Wed', mood: 5 },
  { day: 'Thu', mood: 4 },
  { day: 'Fri', mood: 3 },
  { day: 'Sat', mood: 5 },
  { day: 'Sun', mood: 4 },
];

const moodChartConfig = {
  mood: { label: "Mood", color: "hsl(var(--primary))" },
} satisfies ChartConfig;

export default function DashboardPage() {
  const { user } = useAuth();
  const nextMed = placeholderMedications[0];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };
  
  const displayName = user?.name || 'there';

  return (
    <div className="space-y-6">
      <PageHeader
        title={`${getGreeting()}, ${displayName}!`}
        description="Here’s a quick look at your health today."
      />

      <div className="space-y-6">
         <HealthTip
            icon={Lightbulb}
            title="Your Daily Health Tip"
            content="Remember to stay hydrated by drinking water throughout the day! It's great for your overall health."
          />
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Link href="/blood-pressure">
            <Card className="hover:border-primary transition-colors h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-3 text-2xl">
                        <HeartPulse className="h-8 w-8 text-primary" />
                        Blood Pressure
                    </CardTitle>
                    <ArrowRight className="h-6 w-6 text-muted-foreground"/>
                </div>
                <CardDescription>Last reading: 122/81</CardDescription>
              </CardHeader>
              <CardContent className="h-48">
                 <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={bpDataForChart}>
                        <Tooltip content={<ChartTooltipContent indicator="dot" />} />
                        <Line dataKey="systolic" type="monotone" stroke="var(--color-systolic)" strokeWidth={3} dot={false} />
                        <Line dataKey="diastolic" type="monotone" stroke="var(--color-diastolic)" strokeWidth={3} dot={false} />
                    </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Link>

          <Link href="/blood-sugar">
            <Card className="hover:border-primary transition-colors h-full">
              <CardHeader>
                 <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-3 text-2xl">
                        <Droplets className="h-8 w-8 text-primary" />
                        Blood Sugar
                    </CardTitle>
                    <ArrowRight className="h-6 w-6 text-muted-foreground"/>
                </div>
                <CardDescription>Last reading: 98 mg/dL</CardDescription>
              </CardHeader>
              <CardContent className="h-48">
                 <ResponsiveContainer width="100%" height="100%">
                     <LineChart data={bsDataForChart}>
                        <Tooltip content={<ChartTooltipContent indicator="dot" />} />
                        <Line dataKey="level" type="monotone" stroke="var(--color-level)" strokeWidth={3} dot={false} />
                    </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Link>
          
           <div className="space-y-6 flex flex-col justify-between">
                <Link href="/medications">
                    <Card className="hover:border-primary transition-colors">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center gap-3 text-2xl">
                                    <Pill className="h-8 w-8 text-primary" />
                                    Medications
                                </CardTitle>
                                <ArrowRight className="h-6 w-6 text-muted-foreground"/>
                            </div>
                            <CardDescription>Your next scheduled dose.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-center">
                                <p className="text-xl font-bold">{nextMed.name} ({nextMed.dosage})</p>
                                <p className="text-lg text-muted-foreground">Due at {nextMed.time[0]}</p>
                            </div>
                        </CardContent>
                    </Card>
                </Link>
                <Link href="/mood">
                     <Card className="hover:border-primary transition-colors">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center gap-3 text-2xl">
                                    <Smile className="h-8 w-8 text-primary" />
                                    Mood
                                </CardTitle>
                                <ArrowRight className="h-6 w-6 text-muted-foreground"/>
                            </div>
                            <CardDescription>Your mood over the last week.</CardDescription>
                        </CardHeader>
                        <CardContent className="h-20">
                           <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={moodData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                                    <Tooltip content={<ChartTooltipContent hideLabel hideIndicator />} />
                                    <Bar dataKey="mood" fill="var(--color-mood)" radius={4} />
                                </BarChart>
                           </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </Link>
           </div>
        </div>
      </div>
    </div>
  );
}
