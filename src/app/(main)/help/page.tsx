
'use client';

import React from 'react';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HeartPulse, Droplets, Pill, Bike, UtensilsCrossed, Smile, Settings, LayoutDashboard } from 'lucide-react';

const helpSections = [
    {
        id: 'dashboard',
        title: 'The Dashboard',
        icon: LayoutDashboard,
        content: "The Dashboard is your main screen. It provides a quick summary of your most recent health data, including blood pressure and blood sugar trends, your next scheduled medication, and your latest mood entry. It's designed to give you a helpful overview of your health at a glance."
    },
    {
        id: 'bp',
        title: 'Blood Pressure Tracker',
        icon: HeartPulse,
        content: "On this page, you can log your daily blood pressure readings. Enter the 'Systolic' (top number) and 'Diastolic' (bottom number) values from your monitor. You can also add optional notes, like whether you took the reading after a walk. The page will show you a chart of your weekly trends and a history of all your past readings."
    },
    {
        id: 'bs',
        title: 'Blood Sugar Tracker',
        icon: Droplets,
        content: "Use this page to keep a record of your blood sugar levels. Enter your glucose level in mg/dL and select the time of the reading (e.g., 'Fasting', 'After Meal'). Just like the blood pressure page, you can view your weekly trends in a chart and see a history of your previous logs."
    },
    {
        id: 'meds',
        title: 'Medication Manager',
        icon: Pill,
        content: "This page helps you manage your medications. Your prescribed medications are listed here. When you take a dose, click the 'Mark as Taken' button. The app will start a timer to show you when your next dose is due. You can also add new medications and view a complete history of every dose you've logged."
    },
    {
        id: 'fitness',
        title: 'Gentle Fitness',
        icon: Bike,
        content: "Discover senior-friendly, low-impact exercises designed to keep you moving safely. Click on any exercise to read the instructions. After you complete an exercise, click the 'Log this Activity' button to save it to your activity log. This helps you keep track of your physical activity over time."
    },
    {
        id: 'nutrition',
        title: 'Nutrition & Meals',
        icon: UtensilsCrossed,
        content: "Here you can find a catalog of diabetes-friendly recipes for breakfast, lunch, dinner, and snacks. Click on any recipe to see the ingredients, instructions, and nutritional information. This page also features a Hydration Tracker to help you make sure you're drinking enough water throughout the day."
    },
    {
        id: 'mood',
        title: 'Mood Journal',
        icon: Smile,
        content: "This page provides a space to check in with your feelings. Select an emoji that best represents your mood and, if you like, write down your thoughts in the journal area. Keeping track of your mood is an important part of your overall well-being. You can view your past entries in the mood history log."
    },
    {
        id: 'settings',
        title: 'Settings',
        icon: Settings,
        content: "In the Settings, you can update your personal information like your name and email. You can also manage notification preferences and use the 'Data Management' section to clear all your logged entries if you want to start fresh."
    },
]

export default function HelpPage() {
  return (
    <div>
      <PageHeader
        title="Help & About"
        description="Your guide to using the Nan-Track application."
      />
      <div className="max-w-4xl mx-auto">
        <Card>
            <CardHeader>
                <CardTitle>How to Use This App</CardTitle>
                <CardDescription>Click on a section below to learn more about it.</CardDescription>
            </CardHeader>
            <CardContent>
                <Accordion type="single" collapsible className="w-full">
                    {helpSections.map((section) => (
                    <AccordionItem value={section.id} key={section.id}>
                        <AccordionTrigger className="text-xl font-headline hover:no-underline">
                            <section.icon className="mr-4 h-6 w-6 text-primary" />
                            {section.title}
                        </AccordionTrigger>
                        <AccordionContent className="space-y-4 px-2">
                            <p className="text-lg text-muted-foreground">{section.content}</p>
                        </AccordionContent>
                    </AccordionItem>
                    ))}
                </Accordion>

                <div className="mt-8 pt-6 border-t">
                    <h3 className="text-2xl font-headline mb-4 text-center">About Nan-Track</h3>
                    <div className="space-y-4 text-lg text-muted-foreground text-center max-w-2xl mx-auto">
                        <p>
                            This application was built with love, especially for my Nan-Nan.
                        </p>
                        <p>
                            The goal was to create a simple, beautiful, and private place for her to easily keep track of her health—from blood sugar and blood pressure to daily moods and activities. It’s designed to be a helpful companion on her health journey, making it easier to see her progress and share it with her family and doctors.
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
