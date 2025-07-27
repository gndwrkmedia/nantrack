
'use client';

import React, { useRef, useState, useEffect } from 'react';
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
import { PrintableReport } from '@/components/printable-report';
import { placeholderBpLog, placeholderBsLog, placeholderMedications, placeholderMoodLog, placeholderExercises } from '@/lib/placeholder-data';


export default function SettingsPage() {
  const { toast } = useToast();
  const reportRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  // State for notification toggles
  const [medReminders, setMedReminders] = useState(true);
  const [weeklySummary, setWeeklySummary] = useState(false);

  // Load saved preferences from localStorage
  useEffect(() => {
    const savedMedReminders = localStorage.getItem('nan-track-med-reminders');
    if (savedMedReminders !== null) {
      setMedReminders(JSON.parse(savedMedReminders));
    }
    const savedWeeklySummary = localStorage.getItem('nan-track-weekly-summary');
    if (savedWeeklySummary !== null) {
      setWeeklySummary(JSON.parse(savedWeeklySummary));
    }
  }, []);

  const handleToggle = (setter: React.Dispatch<React.SetStateAction<boolean>>, key: string, label: string) => {
    setter(prev => {
      const newValue = !prev;
      localStorage.setItem(key, JSON.stringify(newValue));
      toast({
        title: "Preference Updated",
        description: `${label} notifications have been turned ${newValue ? 'ON' : 'OFF'}.`,
      });
      return newValue;
    });
  };

  const handleClearData = () => {
    try {
        console.log("Clearing demo data...");
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

  const handleExportPdf = async () => {
    if (!reportRef.current) {
        toast({
            variant: "destructive",
            title: "Error",
            description: "Could not find the report content to export.",
        });
        return;
    }
    
    setIsExporting(true);
    toast({
        title: "Generating PDF...",
        description: "Please wait while your health report is being created.",
    });

    try {
        const canvas = await html2canvas(reportRef.current, {
            scale: 2, // Higher scale for better quality
            useCORS: true,
        });
        
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
            orientation: 'p',
            unit: 'mm',
            format: 'a4',
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const ratio = canvasWidth / canvasHeight;
        
        const width = pdfWidth - 20; // with some margin
        const height = width / ratio;

        pdf.addImage(imgData, 'PNG', 10, 10, width, height);
        pdf.save("Nan-Track_Health_Report.pdf");

        toast({
            title: "Export Successful!",
            description: "Your health report has been downloaded.",
        });

    } catch (error) {
        console.error("Failed to generate PDF:", error);
        toast({
            variant: "destructive",
            title: "Export Failed",
            description: "An error occurred while generating the PDF.",
        });
    } finally {
        setIsExporting(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Settings"
        description="Manage your account and application data."
      />

      {/* Hidden component for printing */}
      <div className="absolute top-0 left-0 -z-10 opacity-0" aria-hidden="true">
        <PrintableReport 
            ref={reportRef}
            data={{
                bpLog: placeholderBpLog,
                bsLog: placeholderBsLog,
                medications: placeholderMedications,
                moodLog: placeholderMoodLog,
                activityLog: [], // Assuming activity log is not in placeholder data
                user: { name: 'Nan-Nan' }
            }}
        />
      </div>

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
              <Input id="email" type="email" defaultValue="nan.nan@email.com" className="text-lg h-12" readOnly/>
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
              <Switch 
                id="med-reminders" 
                checked={medReminders}
                onCheckedChange={() => handleToggle(setMedReminders, 'nan-track-med-reminders', 'Medication Reminders')}
              />
            </div>
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="weekly-summary" className="flex flex-col space-y-1 flex-grow">
                 <span className="font-medium text-base">Weekly Summary</span>
                <span className="font-normal leading-snug text-muted-foreground">
                  Get a weekly email with your health progress and trends.
                </span>
              </Label>
              <Switch 
                id="weekly-summary"
                checked={weeklySummary}
                onCheckedChange={() => handleToggle(setWeeklySummary, 'nan-track-weekly-summary', 'Weekly Summary')}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Data Management</CardTitle>
            <CardDescription>Export or permanently remove your logged data.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <Button variant="outline" size="lg" className="h-12 w-full text-base" onClick={handleExportPdf} disabled={isExporting}>
                <FileDown className="mr-2 h-5 w-5" />
                {isExporting ? 'Exporting...' : 'Export Health Report (PDF)'}
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
