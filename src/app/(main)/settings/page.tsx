
'use client';

import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
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
import { Trash2, FileDown } from 'lucide-react';

export default function SettingsPage() {
  const { toast } = useToast();

  const handleClearData = () => {
    // This is a simplified approach for a prototype. It clears localStorage.
    // In a real app with a backend, this would make an API call.
    try {
        // This is a simple way to "clear" data in a prototype by resetting state via localStorage
        // In a real app this would be an API call to a backend to clear user-specific data.
        // For now, we assume other pages will check localStorage for updates, or this would
        // require a global state management solution (like Context or Redux) to propagate changes.
        // As a simple demo, we'll just show a toast.
        console.log("Clearing demo data...");
        // A more robust implementation would involve a global state manager.
        // For this prototype, we'll just show the toast as the action's effect.
         toast({
          title: "Demo Data Cleared",
          description: "All placeholder blood pressure, blood sugar, fitness, and mood logs have been removed.",
        });
    } catch (error) {
         toast({
            variant: "destructive",
            title: "Failed to clear data",
            description: "Could not clear demo data. Please try again.",
         });
    }
  };

  const handleExportPdf = () => {
    // This is a placeholder function. In a real app, this would be much more complex.
    // It would involve gathering data from all over the app, probably from a global state or context,
    // then formatting it into a hidden div, which would then be rendered to PDF.
    
    toast({
      title: "Generating PDF...",
      description: "This feature is for demonstration purposes. A full implementation would gather all logs and charts.",
    });
    
    const doc = new jsPDF();
    doc.text("Nan-Track Health Report", 20, 20);
    doc.text("Generated on: " + new Date().toLocaleDateString(), 20, 30);
    doc.text("This is a sample report.", 20, 40);
    
    // In a real implementation, you would loop through data and add it to the PDF.
    // For example:
    // doc.text("Blood Pressure Log:", 20, 50);
    // placeholderBpLog.forEach((log, index) => {
    //   doc.text(`${log.timestamp.toLocaleDateString()}: ${log.systolic}/${log.diastolic}`, 20, 60 + (index * 10));
    // });
    
    doc.save("Nan-Track_Health_Report.pdf");
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
            <CardTitle>Data Management</CardTitle>
            <CardDescription>Export or permanently remove your logged data.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <Button variant="outline" size="lg" className="h-12 w-full text-base" onClick={handleExportPdf}>
                <FileDown className="mr-2 h-5 w-5" />
                Export Health Report (PDF)
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="lg" className="h-12 w-full text-base">
                  <Trash2 className="mr-2 h-5 w-5" />
                  Clear All Demo Entries
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete all of the initial placeholder
                    blood pressure, blood sugar, fitness, mood, and hydration data. Recipe data will not be affected. Any new entries you have made will be kept.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleClearData}>
                    Yes, delete demo entries
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
