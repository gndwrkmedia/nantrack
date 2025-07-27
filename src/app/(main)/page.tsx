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
import { HeartPulse, Droplets, Pill, Smile, Lightbulb, Bike, UtensilsCrossed } from 'lucide-react';
import { generateDailySummaryTip } from '@/ai/flows/generate-daily-summary-tip-flow';
import { placeholderBpLog, placeholderBsLog, placeholderMoodLog } from '@/lib/placeholder-data';
import type { ActivityLog } from '@/lib/types';


const mobileNavItems = [
  { href: '/blood-pressure', label: 'BP', icon: HeartPulse },
  { href: '/blood-sugar', label: 'Sugar', icon: Droplets },
  { href: '/medications', label: 'Meds', icon: Pill },
  { href: '/fitness', label: 'Fitness', icon: Bike },
  { href: '/nutrition', label: 'Meals', icon: UtensilsCrossed },
  { href: '/mood', label: 'Mood', icon: Smile },
]

export default function DashboardPage() {
  const [dailyTip, setDailyTip] = useState('');
  const [tipLoading, setTipLoading] = useState(true);

  // A friendly greeting based on the time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  useEffect(() => {
    const fetchTip = async () => {
      setTipLoading(true);
      try {
        const bpData = placeholderBpLog.map(d => ({
            systolic: d.systolic, 
            diastolic: d.diastolic, 
            timestamp: d.timestamp.toISOString()
        }));

        const bsData = placeholderBsLog.map(d => ({
            level: d.level, 
            timestamp: d.timestamp.toISOString()
        }));
        
        const moodData = placeholderMoodLog.map(log => ({...log, journalEntry: log.journalEntry || '', timestamp: log.timestamp.toISOString()}));

        // In a real app, this would be fetched from a database
        const activityLog: ActivityLog[] = []; 
        const waterCount = 3;

        const response = await generateDailySummaryTip({
          bloodPressure: {
            currentReading: bpData[0],
            historicalData: bpData,
          },
          bloodSugar: {
            currentReading: bsData[0],
            historicalData: bsData,
          },
          fitness: {
            activityLog: activityLog.map(log => ({...log, timestamp: log.timestamp.toISOString()}))
          },
          nutrition: {
            waterCount: waterCount,
          },
          mood: {
            moodLog: moodData,
          }
        });

        if (response.tip) {
          setDailyTip(response.tip);
        }
      } catch (error) {
        console.error("Error generating daily tip:", error);
        setDailyTip("Have a wonderful day! Remember to stay hydrated and take your medications as scheduled.");
      } finally {
        setTipLoading(false);
      }
    };
    fetchTip();
  }, []);
  
  return (
    <div className="w-full">
      <PageHeader
        title={`${getGreeting()}, Grandma!`}
        description={`Here's your health summary for ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}.`}
      />

      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-6 md:hidden">
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
        
        <Card className="flex flex-col md:col-span-2 lg:col-span-3 bg-accent/50 border-accent">
            <CardHeader>
                 <CardTitle className="flex items-center gap-3 text-2xl">
                    <Lightbulb className="h-8 w-8 text-accent-foreground" />
                    <span>Tip of the Day</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                {tipLoading ? (
                  <p className="text-xl text-accent-foreground/90 animate-pulse">Generating your daily tip...</p>
                ) : (
                  <p className="text-xl text-accent-foreground/90">{dailyTip}</p>
                )}
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
