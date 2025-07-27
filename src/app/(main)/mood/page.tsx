
'use client';

import React, { useEffect, useState } from 'react';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { placeholderMoodLog } from '@/lib/placeholder-data';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import type { MoodLog } from '@/lib/types';
import { Lightbulb } from 'lucide-react';
import { generateLifestyleTip } from '@/ai/flows/generate-lifestyle-tips-flow';

const moodOptions = [
  { level: 1, emoji: '😞', label: 'Very Sad' },
  { level: 2, emoji: '😕', label: 'Sad' },
  { level: 3, emoji: '😐', label: 'Okay' },
  { level: 4, emoji: '😊', label: 'Good' },
  { level: 5, emoji: '😄', label: 'Very Good' },
];

export default function MoodPage() {
  const { toast } = useToast();
  const [moodLog, setMoodLog] = useState<MoodLog[]>(placeholderMoodLog);
  const [selectedMood, setSelectedMood] = React.useState<number | null>(4);
  const [journalEntry, setJournalEntry] = React.useState('');
  const [healthTip, setHealthTip] = useState<string>('');
  const [tipLoading, setTipLoading] = useState(true);

  const handleSave = () => {
    if (!selectedMood) {
      toast({
        variant: "destructive",
        title: "Oh no!",
        description: "Please select a mood before saving.",
      });
      return;
    }
    const newEntry: MoodLog = {
      id: `mood-${Date.now()}`,
      mood: selectedMood,
      journalEntry,
      timestamp: new Date(),
    };
    setMoodLog(prev => [newEntry, ...prev]);
    toast({
      title: "Entry Saved!",
      description: "Your mood has been logged. Thank you for sharing.",
    });
    setSelectedMood(4);
    setJournalEntry('');
  };

  useEffect(() => {
    const fetchTip = async () => {
      setTipLoading(true);
      try {
        const response = await generateLifestyleTip({
          tipType: 'mood',
          moodData: { 
            moodLog: moodLog.map(log => ({...log, timestamp: log.timestamp.toISOString()}))
          },
        });
        if (response.tip) {
          setHealthTip(response.tip);
        }
      } catch (error) {
        console.error("Error generating mood tip:", error);
        setHealthTip("Could not load a tip right now. Remember to be kind to yourself today!");
      } finally {
        setTipLoading(false);
      }
    };
    fetchTip();
  }, [moodLog]);

  return (
    <div>
      <PageHeader
        title="Mood Journal"
        description="Take a moment to check in with yourself."
      />

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>How are you feeling today?</CardTitle>
              <CardDescription>Select an emoji that best describes your current mood.</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-around items-center pt-4">
              {moodOptions.map(mood => (
                <button
                  key={mood.level}
                  title={mood.label}
                  onClick={() => setSelectedMood(mood.level)}
                  className={cn(
                    "p-3 rounded-full transition-all duration-200",
                    selectedMood === mood.level ? 'bg-primary/40 scale-125' : 'hover:bg-primary/20'
                  )}
                >
                  <span className="text-5xl">{mood.emoji}</span>
                </button>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Today's Thoughts</CardTitle>
              <CardDescription>If you'd like, you can write down what's on your mind.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Write about your day, your feelings, or anything else..."
                className="text-lg min-h-[150px]"
                value={journalEntry}
                onChange={(e) => setJournalEntry(e.target.value)}
              />
              <Button size="lg" className="w-full text-lg h-12" onClick={handleSave}>Save Entry</Button>
            </CardContent>
          </Card>
           <Card className="bg-accent/50 border-accent">
            <CardHeader>
                 <CardTitle className="flex items-center gap-3 text-xl">
                    <Lightbulb className="h-7 w-7 text-accent-foreground" />
                    <span>Friendly Reminder</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                {tipLoading ? (
                  <p className="text-lg text-accent-foreground/90 animate-pulse">Thinking of something helpful...</p>
                ) : (
                  <p className="text-lg text-accent-foreground/90">{healthTip}</p>
                )}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Your Mood History</CardTitle>
              <CardDescription>A look back at your recent journal entries.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-base">Date</TableHead>
                    <TableHead className="text-base">Mood</TableHead>
                    <TableHead className="text-base">Entry</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {moodLog.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="text-base">{log.timestamp.toLocaleDateString()}</TableCell>
                      <TableCell className="text-4xl">{moodOptions.find(m => m.level === log.mood)?.emoji}</TableCell>
                      <TableCell className="text-base text-muted-foreground truncate max-w-xs">{log.journalEntry}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
