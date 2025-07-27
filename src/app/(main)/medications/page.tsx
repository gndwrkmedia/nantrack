'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle, PlusCircle } from 'lucide-react';
import { placeholderMedications } from '@/lib/placeholder-data';
import type { Medication } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

export default function MedicationsPage() {
  const { toast } = useToast();
  const [meds, setMeds] = useState<Medication[]>(placeholderMedications);
  const [takenLog, setTakenLog] = useState<Record<string, boolean>>({});

  const handleTakeMed = (medId: string) => {
    setTakenLog(prev => ({ ...prev, [medId]: true }));
    const med = meds.find(m => m.id === medId);
    toast({
      title: "Medication Logged!",
      description: `You've marked ${med?.name} as taken. Great job!`,
    });
  };

  return (
    <div>
      <PageHeader
        title="Medication Manager"
        description="Keep track of your medications and never miss a dose."
      >
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
      </PageHeader>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Your Medication Schedule</CardTitle>
            <CardDescription>Here are the medications you need to take.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {meds.map((med) => (
              <Card key={med.id} className={takenLog[med.id] ? 'bg-accent/50 border-accent' : ''}>
                <CardHeader>
                  <CardTitle className="text-2xl">{med.name}</CardTitle>
                  <CardDescription className="text-base">{med.dosage}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-lg">
                    <span className="text-muted-foreground">Frequency: </span>{med.frequency}
                  </p>
                  <p className="text-lg">
                    <span className="text-muted-foreground">Time: </span>{med.time.join(', ')}
                  </p>
                  <Button 
                    size="lg" 
                    className="w-full text-lg h-12"
                    onClick={() => handleTakeMed(med.id)}
                    disabled={takenLog[med.id]}
                  >
                    {takenLog[med.id] ? (
                      <>
                        <CheckCircle className="mr-2 h-6 w-6" />
                        Taken
                      </>
                    ) : (
                      "Mark as Taken"
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
