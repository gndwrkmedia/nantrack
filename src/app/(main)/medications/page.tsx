
'use client';

import React, { useState, useEffect } from 'react';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from '@/components/ui/dialog';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle, PlusCircle, Timer, Pill, Lightbulb, Trash2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { placeholderMedications } from '@/lib/placeholder-data';
import type { Medication, MedicationLog } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { HealthTip } from '@/components/health-tip';

// Helper to format remaining time
const formatTimeLeft = (ms: number) => {
  if (ms <= 0) return "Ready to take";
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

export default function MedicationsPage() {
  const { toast } = useToast();
  const [meds, setMeds] = useState<Medication[]>(placeholderMedications);
  
  // Store the timestamp of when a med was last taken
  const [takenLog, setTakenLog] = useState<Record<string, number>>({});
  
  // Store the time remaining for each med
  const [timeLeft, setTimeLeft] = useState<Record<string, number>>({});
  
  const [medicationTakenLog, setMedicationTakenLog] = useState<MedicationLog[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimeLeft: Record<string, number> = {};
      Object.entries(takenLog).forEach(([medId, takenTimestamp]) => {
        const med = meds.find(m => m.id === medId);
        if (med) {
          const nextDoseTime = takenTimestamp + med.intervalHours * 60 * 60 * 1000;
          const remaining = nextDoseTime - Date.now();
          newTimeLeft[medId] = Math.max(0, remaining);
        }
      });
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(interval);
  }, [takenLog, meds]);

  const handleTakeMed = (med: Medication) => {
    setTakenLog(prev => ({ ...prev, [med.id]: Date.now() }));
    
    const newLogEntry: MedicationLog = {
        id: `mlog-${Date.now()}`,
        medicationId: med.id,
        medicationName: med.name,
        dosage: med.dosage,
        timestamp: new Date(),
    };
    setMedicationTakenLog(prev => [newLogEntry, ...prev]);

    toast({
      title: "Medication Logged!",
      description: `You've marked ${med.name} as taken. Great job!`,
    });
  };

  const handleRemoveMed = (medId: string) => {
    setMeds(prev => prev.filter(m => m.id !== medId));
    toast({
        title: "Medication Removed",
        description: "The medication has been removed from your list.",
    });
  };

  return (
    <div>
      <PageHeader
        title="Medication Manager"
        description="Keep track of your medications and never miss a dose."
      />
    <div className="flex justify-end mb-4 md:hidden">
        <Dialog>
          <DialogTrigger asChild>
            <Button size="lg" className="text-lg h-12">
              <PlusCircle className="mr-2 h-6 w-6" />
              Add Medication
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-2xl">Add New Medication</DialogTitle>
              <DialogDescription>
                Fill in the details for your new medication here.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right text-base">Name</Label>
                <Input id="name" defaultValue="Aspirin" className="col-span-3 h-10 text-base" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="dosage" className="text-right text-base">Dosage</Label>
                <Input id="dosage" defaultValue="81mg" className="col-span-3 h-10 text-base" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="frequency" className="text-right text-base">Frequency</Label>
                <Input id="frequency" defaultValue="Once a day" className="col-span-3 h-10 text-base" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" size="lg">Save Medication</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
    </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {meds.map((med) => {
          const isTaken = takenLog[med.id] !== undefined;
          const remainingTime = timeLeft[med.id] || 0;
          const isReady = !isTaken || remainingTime <= 0;
          const progress = isTaken ? ((med.intervalHours * 3600 * 1000 - remainingTime) / (med.intervalHours * 3600 * 1000)) * 100 : 0;

          return (
            <Card key={med.id} className={cn("flex flex-col transition-all duration-200 hover:shadow-lg hover:-translate-y-1", !isReady ? 'bg-muted/50' : 'bg-card')}>
              <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="bg-primary/20 p-3 rounded-full">
                            <Pill className="h-8 w-8 text-primary" />
                        </div>
                        <div>
                            <CardTitle className="text-2xl">{med.name}</CardTitle>
                            <CardDescription className="text-base">{med.dosage} &bull; {med.frequency}</CardDescription>
                        </div>
                    </div>
                     <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
                                <Trash2 className="h-5 w-5 text-muted-foreground hover:text-destructive" />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This will permanently remove {med.name} from your medication list. This action cannot be undone.
                            </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleRemoveMed(med.id)}>
                                Yes, Remove
                            </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                  </div>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-between gap-4">
                <div className="space-y-4">
                    {isTaken && !isReady && (
                        <div className="space-y-2 text-center">
                            <p className="text-muted-foreground">Next dose in:</p>
                            <p className="font-mono text-3xl font-bold">{formatTimeLeft(remainingTime)}</p>
                            <Progress value={progress} className="h-3" />
                        </div>
                    )}
                    {!isTaken && (
                        <p className="text-center text-muted-foreground text-lg py-4">
                            Scheduled for {med.time.join(' & ')}
                        </p>
                    )}
                </div>
                <Button 
                  size="lg" 
                  className="w-full text-lg h-12"
                  onClick={() => handleTakeMed(med)}
                  disabled={!isReady}
                >
                  {isReady ? (
                    <>
                      <CheckCircle className="mr-2 h-6 w-6" />
                      Mark as Taken
                    </>
                  ) : (
                    <>
                      <Timer className="mr-2 h-6 w-6 animate-pulse" />
                      Next Dose Pending
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          );
        })}
        <Dialog>
          <DialogTrigger asChild>
            <Card className="hidden md:flex items-center justify-center border-dashed border-2 cursor-pointer hover:border-primary hover:text-primary transition-colors">
                <div className="text-center text-muted-foreground">
                    <PlusCircle className="h-12 w-12 mx-auto mb-2" />
                    <p className="text-lg font-semibold">Add New Medication</p>
                </div>
            </Card>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-2xl">Add New Medication</DialogTitle>
              <DialogDescription>
                Fill in the details for your new medication here.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right text-base">Name</Label>
                <Input id="name" defaultValue="Aspirin" className="col-span-3 h-10 text-base" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="dosage" className="text-right text-base">Dosage</Label>
                <Input id="dosage" defaultValue="81mg" className="col-span-3 h-10 text-base" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="frequency" className="text-right text-base">Frequency</Label>
                <Input id="frequency" defaultValue="Once a day" className="col-span-3 h-10 text-base" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" size="lg">Save Medication</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

       <div className="mt-6 space-y-6">
        <HealthTip
            icon={Lightbulb}
            title="Helpful Tip"
            content="If you add a new medication, be sure to enter the time between doses (in hours) correctly so the countdown timer is accurate."
           />
        <Card>
            <CardHeader>
              <CardTitle>Medication History</CardTitle>
              <CardDescription>A log of all the medications you've taken.</CardDescription>
            </CardHeader>
            <CardContent>
               <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-base">Date & Time</TableHead>
                    <TableHead className="text-base">Medication</TableHead>
                    <TableHead className="text-base">Dosage</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                    {medicationTakenLog.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={3} className="text-center text-lg text-muted-foreground h-24">
                                You haven't logged any medications yet.
                            </TableCell>
                        </TableRow>
                    )}
                    {medicationTakenLog.map((log) => (
                        <TableRow key={log.id}>
                            <TableCell className="text-base">
                                {log.timestamp.toLocaleDateString()} at {log.timestamp.toLocaleTimeString()}
                            </TableCell>
                            <TableCell className="text-base font-medium">{log.medicationName}</TableCell>
                            <TableCell className="text-base">{log.dosage}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
              </Table>