
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Logo } from './logo';
import type { BloodPressureLog, BloodSugarLog, Medication, MoodLog, ActivityLog } from '@/lib/types';

interface ReportData {
  bpLog: BloodPressureLog[];
  bsLog: BloodSugarLog[];
  medications: Medication[];
  moodLog: MoodLog[];
  activityLog: ActivityLog[];
  user: {
      name: string;
  }
}

interface PrintableReportProps {
  data: ReportData;
}

export const PrintableReport = React.forwardRef<HTMLDivElement, PrintableReportProps>(({ data }, ref) => {
    const { bpLog, bsLog, medications, moodLog, activityLog, user } = data;
    const moodOptions = [
        { level: 1, emoji: '😞', label: 'Very Sad' },
        { level: 2, emoji: '😕', label: 'Sad' },
        { level: 3, emoji: '😐', label: 'Okay' },
        { level: 4, emoji: '😊', label: 'Good' },
        { level: 5, emoji: '😄', label: 'Very Good' },
    ];

    return (
        <div ref={ref} className="p-10 bg-white text-black" style={{ width: '210mm', minHeight: '297mm'}}>
            <header className="flex items-center justify-between pb-4 mb-8 border-b-2">
                <div className="flex items-center gap-4">
                    <Logo className="w-16 h-16" />
                    <div>
                        <h1 className="text-4xl font-bold">Nan-Track Health Report</h1>
                        <p className="text-lg">For: {user.name}</p>
                    </div>
                </div>
                <p className="text-lg">Generated: {new Date().toLocaleDateString()}</p>
            </header>

            <main className="space-y-8">
                <section>
                    <h2 className="text-2xl font-bold mb-4">Medication List</h2>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Medication</TableHead>
                                <TableHead>Dosage</TableHead>
                                <TableHead>Frequency</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {medications.map(med => (
                                <TableRow key={med.id}>
                                    <TableCell>{med.name}</TableCell>
                                    <TableCell>{med.dosage}</TableCell>
                                    <TableCell>{med.frequency}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </section>
                
                <section>
                    <h2 className="text-2xl font-bold mb-4">Blood Pressure Log</h2>
                     <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Reading (Sys/Dia)</TableHead>
                                <TableHead>Notes</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {bpLog.map(log => (
                                <TableRow key={log.id}>
                                    <TableCell>{log.timestamp.toLocaleDateString()}</TableCell>
                                    <TableCell>{log.systolic} / {log.diastolic}</TableCell>
                                    <TableCell>{log.notes}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </section>
                
                <section>
                    <h2 className="text-2xl font-bold mb-4">Blood Sugar Log</h2>
                     <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Level (mg/dL)</TableHead>
                                <TableHead>Time</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {bsLog.map(log => (
                                <TableRow key={log.id}>
                                    <TableCell>{log.timestamp.toLocaleDateString()}</TableCell>
                                    <TableCell>{log.level}</TableCell>
                                    <TableCell>{log.readingTime}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </section>

                 <section>
                    <h2 className="text-2xl font-bold mb-4">Mood Journal</h2>
                     <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Mood</TableHead>
                                <TableHead>Journal Entry</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {moodLog.map(log => (
                                <TableRow key={log.id}>
                                    <TableCell>{log.timestamp.toLocaleDateString()}</TableCell>
                                    <TableCell className="text-2xl">{moodOptions.find(m => m.level === log.mood)?.emoji}</TableCell>
                                    <TableCell>{log.journalEntry}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </section>
            </main>
        </div>
    );
});

PrintableReport.displayName = "PrintableReport";
