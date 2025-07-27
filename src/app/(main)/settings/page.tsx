
'use client';

import React from 'react';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { Trash2 } from 'lucide-react';

export default function SettingsPage() {
  const { toast } = useToast();

  const handleClearData = () => {
    // In a real app, you'd call an API to clear data from a database.
    // Here, we'll just show a toast to simulate the action.
    // To make this functional, you would need to lift state up to a global context or use a state management library.
    toast({
      title: "Demo Data Cleared",
      description: "All blood pressure, blood sugar, fitness, and mood logs have been removed.",
    });
  };

  return (
    <div>
      <PageHeader
        title="Settings"
        description="Manage your account and application data."
      />

      <div className="grid gap-6 max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>This information helps personalize your experience.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-base">Name</Label>
              <Input id="name" defaultValue="Nan-Nan" className="text-lg h-12"/>
            </div>
             <div className="space-y-2">
              <Label htmlFor="email" className="text-base">Email Address</Label>
              <Input id="email" type="email" defaultValue="chausenfluck@gmail.com" className="text-lg h-12"/>
            </div>
            <Button size="lg" className="text-lg h-12">Save Changes</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Set how you receive alerts and reminders.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="med-reminders" className="flex flex-col space-y-1 flex-grow">
                <span className="font-medium text-base">Medication Reminders</span>
                <span className="font-normal leading-snug text-muted-foreground">
                  Receive alerts when it's time to take your medication.
                </span>
              </Label>
              <Switch id="med-reminders" defaultChecked />
            </div>
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="weekly-summary" className="flex flex-col space-y-1 flex-grow">
                 <span className="font-medium text-base">Weekly Summary</span>
                <span className="font-normal leading-snug text-muted-foreground">
                  Get a weekly email with your health progress and trends.
                </span>
              </Label>
              <Switch id="weekly-summary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-destructive">Data Management</CardTitle>
            <CardDescription>Permanently remove your logged data.</CardDescription>
          </CardHeader>
          <CardContent>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="lg" className="text-lg h-12 w-full">
                  <Trash2 className="mr-2 h-5 w-5" />
                  Clear All Demo Entries
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete all of your logged
                    blood pressure, blood sugar, fitness, mood, and hydration data. Recipe data will not be affected.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleClearData}>
                    Yes, delete everything
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
