'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { placeholderBpLog, bpDataForChart } from '@/lib/placeholder-data';
import { useToast } from '@/hooks/use-toast';

const bpFormSchema = z.object({
  systolic: z.coerce.number().min(50, "Value must be at least 50").max(300, "Value must be less than 300"),
  diastolic: z.coerce.number().min(30, "Value must be at least 30").max(200, "Value must be less than 200"),
  notes: z.string().max(100, "Notes are too long").optional(),
});

type BpFormValues = z.infer<typeof bpFormSchema>;

const chartConfig = {
  systolic: {
    label: "Systolic",
    color: "hsl(var(--primary))",
  },
  diastolic: {
    label: "Diastolic",
    color: "hsl(var(--accent))",
  },
} satisfies ChartConfig;

export default function BloodPressurePage() {
  const { toast } = useToast();
  const form = useForm<BpFormValues>({
    resolver: zodResolver(bpFormSchema),
    defaultValues: {
        systolic: 120,
        diastolic: 80,
        notes: '',
    }
  });

  function onSubmit(data: BpFormValues) {
    console.log(data);
    toast({
      title: "Success!",
      description: "Your blood pressure reading has been saved.",
    });
    form.reset();
  }

  return (
    <div>
      <PageHeader
        title="Blood Pressure"
        description="Log your readings and see your trends over time."
      />
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Log New Reading</CardTitle>
              <CardDescription>Enter your systolic and diastolic values.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="systolic"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg">Systolic (Top Number)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="e.g., 120" {...field} className="text-lg h-12" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="diastolic"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg">Diastolic (Bottom Number)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="e.g., 80" {...field} className="text-lg h-12" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg">Notes (Optional)</FormLabel>
                        <FormControl>
                          <Textarea placeholder="e.g., after morning walk" {...field} className="text-lg"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" size="lg" className="w-full text-lg h-12">Save Reading</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Trend</CardTitle>
              <CardDescription>Your readings over the last 7 days.</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-64 w-full">
                <ResponsiveContainer>
                  <LineChart data={bpDataForChart}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
                    <YAxis domain={[60, 160]} />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Line dataKey="systolic" type="monotone" stroke="var(--color-systolic)" strokeWidth={3} dot={true} />
                    <Line dataKey="diastolic" type="monotone" stroke="var(--color-diastolic)" strokeWidth={3} dot={true} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>History</CardTitle>
              <CardDescription>Your most recent readings.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-base">Date</TableHead>
                    <TableHead className="text-base">Reading</TableHead>
                    <TableHead className="text-base">Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {placeholderBpLog.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="text-base">{log.timestamp.toLocaleDateString()}</TableCell>
                      <TableCell className="text-base font-medium">{log.systolic} / {log.diastolic}</TableCell>
                      <TableCell className="text-base text-muted-foreground">{log.notes}</TableCell>
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
