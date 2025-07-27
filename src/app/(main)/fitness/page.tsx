
'use client';

import React, { useState, useEffect } from 'react';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle, Lightbulb } from 'lucide-react';
import { placeholderExercises } from '@/lib/placeholder-data';
import type { ActivityLog } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

export default function FitnessPage() {
    const { toast } = useToast();
    const [activityLog, setActivityLog] = React.useState<ActivityLog[]>([]);
    const [tip, setTip] = useState('');
    const [isTipLoading, setIsTipLoading] = useState(true);

    useEffect(() => {
        const fetchTip = async () => {
          setIsTipLoading(true);
          try {
            const response = await fetch('/api/generate-tip', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ context: 'User is viewing the fitness page, which includes low-impact exercises like chair squats. Provide a tip about the benefits of gentle exercise.' }),
            });
             if (!response.ok) {
                throw new Error('API call failed with status: ' + response.status);
             }
            const data = await response.json();
            setTip(data.tip);
          } catch (error) {
             console.error("Failed to fetch tip:", error);
             setTip("Could not load a tip right now. Remember, consistency is key!");
          } finally {
            setIsTipLoading(false);
          }
        };

        fetchTip();
    }, []);

    const handleLogActivity = (exerciseName: string) => {
        // This is a simplified log entry. In a real app, a form in the dialog would provide the values.
        const newLog: ActivityLog = {
            id: `log-${Date.now()}`,
            exerciseId: 'dummy-id',
            exerciseName,
            duration: 15, // placeholder
            effort: 3, // placeholder
            timestamp: new Date(),
        };
        setActivityLog(prev => [newLog, ...prev]);
        toast({
          title: "Activity Logged!",
          description: `Great job completing your ${exerciseName} workout!`,
        });
    }

  return (
    <div>
      <PageHeader
        title="Gentle Fitness"
        description="Low-impact exercises to keep you moving safely."
      />

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Hip-Friendly Exercises</CardTitle>
              <CardDescription>Choose an exercise to see instructions.</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {placeholderExercises.map((exercise) => (
                  <AccordionItem value={exercise.id} key={exercise.id}>
                    <AccordionTrigger className="text-xl font-headline hover:no-underline">
                      {exercise.name}
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 px-2">
                      <p className="text-lg text-muted-foreground">{exercise.description}</p>
                      
                       <Dialog>
                        <DialogTrigger asChild>
                            <Button size="lg" className="text-base h-11">
                                <PlusCircle className="mr-2 h-5 w-5" />
                                Log this Activity
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle className="text-2xl">Log: {exercise.name}</DialogTitle>
                                <DialogDescription>How did your workout go?</DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="space-y-2">
                                    <Label htmlFor="duration" className="text-base">Duration (minutes)</Label>
                                    <Input id="duration" type="number" defaultValue="15" className="h-10 text-base" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="effort" className="text-base">Effort (1-5)</Label>
                                    <Input id="effort" type="number" defaultValue="3" min="1" max="5" className="h-10 text-base" />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit" size="lg" onClick={() => handleLogActivity(exercise.name)}>Save Log</Button>
                            </DialogFooter>
                        </DialogContent>
                       </Dialog>

                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Activity Log</CardTitle>
              <CardDescription>A history of your recent workouts.</CardDescription>
            </CardHeader>
            <CardContent>
               <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-base">Date</TableHead>
                    <TableHead className="text-base">Activity</TableHead>
                    <TableHead className="text-base text-right">Duration</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                    {activityLog.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={3} className="text-center text-lg text-muted-foreground h-24">
                                You haven't logged any activities yet.
                            </TableCell>
                        </TableRow>
                    )}
                    {activityLog.map((log) => (
                        <TableRow key={log.id}>
                            <TableCell className="text-base">{log.timestamp.toLocaleDateString()}</TableCell>
                            <TableCell className="text-base font-medium">{log.exerciseName}</TableCell>
                            <TableCell className="text-base text-right">{log.duration} min</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                    <Lightbulb className="h-8 w-8 text-primary"/>
                    <span>Personalized Tip</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                {isTipLoading ? (
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                    </div>
                ) : (
                    <p className="text-lg text-muted-foreground">{tip}</p>
                )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
