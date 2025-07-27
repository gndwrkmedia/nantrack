'use client';

import React from 'react';
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
import { HeartPulse, Droplets, Pill, Smile, Lightbulb, GlassWater } from 'lucide-react';

export default function DashboardPage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  
  // A friendly greeting based on the time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };
  
  return (
    <div className="w-full">
      <PageHeader
        title={`${getGreeting()}, Grandma!`}
        description={`Here's your health summary for ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}.`}
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <HeartPulse className="h-8 w-8 text-primary" />
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
            <Link href="/medications" passHref>
              <Button size="lg" className="w-full text-lg py-6">View & Log Medications</Button>
            </Link>
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
             <Link href="/mood" passHref>
              <Button size="lg" variant="outline" className="w-full text-lg py-6">Track Your Mood</Button>
            </Link>
          </CardContent>
        </Card>
        
        <Card className="flex flex-col md:col-span-2 lg:col-span-3 bg-accent/50 border-accent">
            <CardHeader>
                 <CardTitle className="flex items-center gap-3 text-2xl">
                    <Lightbulb className="h-8 w-8 text-accent-foreground" />
                    <span>Tip of the Day</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-xl text-accent-foreground/90">
                    A short, 10-minute walk after meals can do wonders for managing blood sugar levels. It helps your body use sugar more effectively.
                </p>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
