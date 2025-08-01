
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { placeholderBsLog, bsDataForChart } from '@/lib/placeholder-data';
import { useToast } from '@/hooks/use-toast';
import type { BloodSugarLog } from '@/lib/types';
import { HealthTip } from '@/components/health-tip';
import { Lightbulb } from 'lucide-react';

const bsFormSchema = z.object({
  level: z.coerce.number().min(20, "Value must be at least 20").max(600, "Value must be less than 600"),
  readingTime: z.enum(['Fasting', 'Before Meal', 'After Meal', 'Other']),
});

type BsFormValues = z.infer<typeof bsFormSchema>;

const chartConfig = {
  level: {
    label: "Glucose (mg/dL)",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

export default function BloodSugarPage() {
  const { toast } = useToast();
  const [bsLog, setBsLog] = React.useState<BloodSugarLog[]>(placeholderBsLog);

  const form = useForm<BsFormValues>({
    resolver: zodResolver(bsFormSchema),
    defaultValues: {
        level: 100,
        readingTime: 'Fasting',
    }
  });

  function onSubmit(data: BsFormValues) {
    const newReading: BloodSugarLog = {
      id: `bs-${Date.now()}`,
      level: data.level,
      readingTime: data.readingTime,
      timestamp: new Date(),
    };
    setBsLog(prev => [newReading, ...prev]);
    toast({
      title: "Success!",
      description: "Your blood sugar reading has been saved.",
    });
    form.reset();
  }

  return (
    <div>
      <PageHeader
        title="Blood Sugar"
        description="Log your glucose levels and watch your progress."
      />
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Log New Reading</CardTitle>
              <CardDescription>Enter your blood sugar value below.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="level"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg">Glucose Level (mg/dL)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="e.g., 105" {...field} className="text-lg h-12" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="readingTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg">Reading Time</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="text-lg h-12">
                              <SelectValue placeholder="Select a time" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Fasting" className="text-lg">Fasting</SelectItem>
                            <SelectItem value="Before Meal" className="text-lg">Before Meal</SelectItem>
                            <SelectItem value="After Meal" className="text-lg">After Meal</SelectItem>
                            <SelectItem value="Other" className="text-lg">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" size="lg" className="w-full text-lg h-12">Save Reading</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
          <HealthTip
            icon={Lightbulb}
            title="Helpful Tip"
            content="Logging your blood sugar around meals helps you see how different foods affect your levels. 'Fasting' means your first reading of the day before eating."
           />
        </div>
        <div className="lg:col-span-3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Trend</CardTitle>
              <CardDescription>Your levels over the last 7 days.</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-64 w-full">
                <ResponsiveContainer>
                  <LineChart data={bsDataForChart}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
                    <YAxis domain={[50, 200]} />
                    <Tooltip content={<ChartTooltipContent indicator="dot" />} />
                    <Line dataKey="level" type="monotone" stroke="var(--color-level)" strokeWidth={3} dot={true} />
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
                    <TableHead className="text-base">Level</TableHead>
                    <TableHead className="text-base">Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bsLog.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="text-base">{log.timestamp.toLocaleDateString()}</TableCell>
                      <TableCell className="text-base font-medium">{log.level} mg/dL</TableCell>
                      <TableCell className="text-base text-muted-foreground">{log.readingTime}</TableCell>
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
