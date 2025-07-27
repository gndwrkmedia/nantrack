
# All Project Files

Here is the complete code for every file in your Nan-Track project. You can copy the contents of each file from here and create them on your local machine.

---
---

### File: `/.env`

```
```

---
---

### File: `/README.md`

```md
# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## Setting up your Gemini API Key

This project uses the Gemini API for its AI-powered features. To use them, you'll need to get an API key and add it to your project.

1.  Create an API key for the Gemini API in Google AI Studio.
2.  Open the `.env` file in the root of your project.
3.  Add your API key to the file like this: `GEMINI_API_KEY=YOUR_API_KEY_HERE`
```

---
---

### File: `/components.json`

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}
```

---
---

### File: `/next.config.ts`

```ts
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
```

---
---

### File: `/package.json`

```json
{
  "name": "nextn",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack -p 9002",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@hookform/resolvers": "^4.1.3",
    "@radix-ui/react-accordion": "^1.2.3",
    "@radix-ui/react-alert-dialog": "^1.1.6",
    "@radix-ui/react-avatar": "^1.1.3",
    "@radix-ui/react-checkbox": "^1.1.4",
    "@radix-ui/react-collapsible": "^1.1.11",
    "@radix-ui/react-dialog": "^1.1.6",
    "@radix-ui/react-dropdown-menu": "^2.1.6",
    "@radix-ui/react-label": "^2.1.2",
    "@radix-ui/react-menubar": "^1.1.6",
    "@radix-ui/react-popover": "^1.1.6",
    "@radix-ui/react-progress": "^1.1.2",
    "@radix-ui/react-radio-group": "^1.2.3",
    "@radix-ui/react-scroll-area": "^1.2.3",
    "@radix-ui/react-select": "^2.1.6",
    "@radix-ui/react-separator": "^1.1.2",
    "@radix-ui/react-slider": "^1.2.3",
    "@radix-ui/react-slot": "^1.2.3",
    "@radix-ui/react-switch": "^1.1.3",
    "@radix-ui/react-tabs": "^1.1.3",
    "@radix-ui/react-toast": "^1.2.6",
    "@radix-ui/react-tooltip": "^1.1.8",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "date-fns": "^3.6.0",
    "embla-carousel-react": "^8.6.0",
    "firebase": "^11.9.1",
    "html2canvas": "^1.4.1",
    "jspdf": "^2.5.1",
    "lucide-react": "^0.475.0",
    "next": "15.3.3",
    "patch-package": "^8.0.0",
    "react": "^18.3.1",
    "react-day-picker": "^8.10.1",
    "react-dom": "^18.3.1",
    "react-hook-form": "^7.54.2",
    "recharts": "^2.15.1",
    "tailwind-merge": "^3.0.1",
    "tailwindcss-animate": "^1.0.7",
    "zod": "^3.24.2"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "postcss": "^8",
    "tailwindcss": "^3.4.1",
    "typescript": "^5"
  }
}
```

---
---

### File: `/src/ai/flows/generate-tip-flow.ts`

```ts
'use server';
/**
 * @fileOverview A flow that generates a health tip based on user context.
 * - generateTip - A function that generates a health tip.
 * - GenerateTipInput - The input type for the generateTip function.
 * - GenerateTipOutput - The return type for the generateTip function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const GenerateTipInputSchema = z.object({
  context: z.string().describe('The health context for which to generate a tip. For example, "Recent blood pressure readings."'),
});
export type GenerateTipInput = z.infer<typeof GenerateTipInputSchema>;

const GenerateTipOutputSchema = z.object({
  tip: z.string().describe('The generated health tip.'),
});
export type GenerateTipOutput = z.infer<typeof GenerateTipOutputSchema>;

export async function generateTip(input: GenerateTipInput): Promise<GenerateTipOutput> {
  return generateTipFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateTipPrompt',
  input: {schema: GenerateTipInputSchema},
  output: {schema: GenerateTipOutputSchema},
  prompt: `You are a friendly and encouraging health assistant for a senior user.
  Generate a short, simple, and actionable health tip based on the following context.
  The tip should be positive and easy to understand. Keep it to one or two sentences.

  Context: {{{context}}}`,
});

const generateTipFlow = ai.defineFlow(
  {
    name: 'generateTipFlow',
    inputSchema: GenerateTipInputSchema,
    outputSchema: GenerateTipOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
```

---
---

### File: `/src/ai/genkit.ts`

```ts
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: process.env.GEMINI_API_KEY,
    }),
  ],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});
```

---
---

### File: `/src/app/(main)/blood-pressure/page.tsx`

```tsx
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
import type { BloodPressureLog } from '@/lib/types';
import { HealthTip } from '@/components/health-tip';
import { Lightbulb } from 'lucide-react';

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
  const [bpLog, setBpLog] = React.useState<BloodPressureLog[]>(placeholderBpLog);

  const form = useForm<BpFormValues>({
    resolver: zodResolver(bpFormSchema),
    defaultValues: {
        systolic: 120,
        diastolic: 80,
        notes: '',
    }
  });

  function onSubmit(data: BpFormValues) {
    const newReading: BloodPressureLog = {
      id: `bp-${Date.now()}`,
      systolic: data.systolic,
      diastolic: data.diastolic,
      notes: data.notes || '',
      timestamp: new Date(),
    };
    setBpLog(prev => [newReading, ...prev]);

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
        <div className="lg:col-span-2 space-y-6">
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
           <HealthTip
            icon={Lightbulb}
            title="Helpful Tip"
            content="Use the 'Notes' section to mention things like activity, stress, or diet. This helps you and your doctor understand what affects your readings."
           />
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
                  {bpLog.map((log) => (
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
```

---
---

### File: `/src/app/(main)/blood-sugar/page.tsx`

```tsx
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
```

---
---

### File: `/src/app/(main)/fitness/page.tsx`

```tsx
'use client';

import React from 'react';
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
import { HealthTip } from '@/components/health-tip';

export default function FitnessPage() {
    const { toast } = useToast();
    const [activityLog, setActivityLog] = React.useState<ActivityLog[]>([]);

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
           <HealthTip
            icon={Lightbulb}
            title="Helpful Tip"
            content="Consistency is key! Even 15 minutes of gentle movement each day can make a big difference in your strength, balance, and overall well-being."
           />
        </div>
      </div>
    </div>
  );
}
```

---
---

### File: `/src/app/(main)/help/page.tsx`

```tsx
'use client';

import React from 'react';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HeartPulse, Droplets, Pill, Bike, UtensilsCrossed, Smile, Settings, LayoutDashboard } from 'lucide-react';

const helpSections = [
    {
        id: 'dashboard',
        title: 'The Dashboard',
        icon: LayoutDashboard,
        content: "The Dashboard is your main screen. It provides a quick summary of your most recent health data, including blood pressure and blood sugar trends, your next scheduled medication, and your latest mood entry. It's designed to give you a helpful overview of your health at a glance."
    },
    {
        id: 'bp',
        title: 'Blood Pressure Tracker',
        icon: HeartPulse,
        content: "On this page, you can log your daily blood pressure readings. Enter the 'Systolic' (top number) and 'Diastolic' (bottom number) values from your monitor. You can also add optional notes, like whether you took the reading after a walk. The page will show you a chart of your weekly trends and a history of all your past readings."
    },
    {
        id: 'bs',
        title: 'Blood Sugar Tracker',
        icon: Droplets,
        content: "Use this page to keep a record of your blood sugar levels. Enter your glucose level in mg/dL and select the time of the reading (e.g., 'Fasting', 'After Meal'). Just like the blood pressure page, you can view your weekly trends in a chart and see a history of your previous logs."
    },
    {
        id: 'meds',
        title: 'Medication Manager',
        icon: Pill,
        content: "This page helps you manage your medications. Your prescribed medications are listed here. When you take a dose, click the 'Mark as Taken' button. The app will start a timer to show you when your next dose is due. You can also add new medications and view a complete history of every dose you've logged."
    },
    {
        id: 'fitness',
        title: 'Gentle Fitness',
        icon: Bike,
        content: "Discover senior-friendly, low-impact exercises designed to keep you moving safely. Click on any exercise to read the instructions. After you complete an exercise, click the 'Log this Activity' button to save it to your activity log. This helps you keep track of your physical activity over time."
    },
    {
        id: 'nutrition',
        title: 'Nutrition & Meals',
        icon: UtensilsCrossed,
        content: "Here you can find a catalog of diabetes-friendly recipes for breakfast, lunch, dinner, and snacks. Click on any recipe to see the ingredients, instructions, and nutritional information. This page also features a Hydration Tracker to help you make sure you're drinking enough water throughout the day."
    },
    {
        id: 'mood',
        title: 'Mood Journal',
        icon: Smile,
        content: "This page provides a space to check in with your feelings. Select an emoji that best represents your mood and, if you like, write down your thoughts in the journal area. Keeping track of your mood is an important part of your overall well-being. You can view your past entries in the mood history log."
    },
    {
        id: 'settings',
        title: 'Settings',
        icon: Settings,
        content: "In the Settings, you can update your personal information like your name and email. You can also manage notification preferences and use the 'Data Management' section to clear all your logged entries if you want to start fresh."
    },
]

export default function HelpPage() {
  return (
    <div>
      <PageHeader
        title="Help & About"
        description="Your guide to using the Nan-Track application."
      />
      <div className="max-w-4xl mx-auto">
        <Card>
            <CardHeader>
                <CardTitle>How to Use This App</CardTitle>
                <CardDescription>Click on a section below to learn more about it.</CardDescription>
            </CardHeader>
            <CardContent>
                <Accordion type="single" collapsible className="w-full">
                    {helpSections.map((section) => (
                    <AccordionItem value={section.id} key={section.id}>
                        <AccordionTrigger className="text-xl font-headline hover:no-underline">
                            <section.icon className="mr-4 h-6 w-6 text-primary" />
                            {section.title}
                        </AccordionTrigger>
                        <AccordionContent className="space-y-4 px-2">
                            <p className="text-lg text-muted-foreground">{section.content}</p>
                        </AccordionContent>
                    </AccordionItem>
                    ))}
                </Accordion>

                <div className="mt-8 pt-6 border-t">
                    <h3 className="text-2xl font-headline mb-4 text-center">About Nan-Track</h3>
                    <div className="space-y-4 text-lg text-muted-foreground text-center max-w-2xl mx-auto">
                        <p>
                            This application was built with love, especially for my Nan-Nan.
                        </p>
                        <p>
                            The goal was to create a simple, beautiful, and private place for her to easily keep track of her health—from blood sugar and blood pressure to daily moods and activities. It’s designed to be a helpful companion on her health journey, making it easier to see her progress and share it with her family and doctors.
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
```

---
---

### File: `/src/app/(main)/layout.tsx`

```tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarFooter,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/logo';
import { LayoutDashboard, HeartPulse, Droplets, Pill, Bike, UtensilsCrossed, Smile, Settings, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/blood-pressure', label: 'Blood Pressure', icon: HeartPulse },
  { href: '/blood-sugar', label: 'Blood Sugar', icon: Droplets },
  { href: '/medications', label: 'Medications', icon: Pill },
  { href: '/fitness', label: 'Fitness', icon: Bike },
  { href: '/nutrition', label: 'Nutrition', icon: UtensilsCrossed },
  { href: '/mood', label: 'Mood', icon: Smile },
];

const bottomNavItems = [
    { href: '/help', label: 'Help & About', icon: HelpCircle },
    { href: '/settings', label: 'Settings', icon: Settings }
];

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <Sidebar variant="floating" collapsible="icon">
        <SidebarHeader className="p-4">
          <Link href="/" className="flex items-center gap-3">
            <Logo className="w-10 h-10" />
            <span className="font-headline text-2xl font-bold text-foreground/90 group-data-[collapsible=icon]:hidden">
              Nan-Track
            </span>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  variant="default"
                  className="text-lg py-6"
                  isActive={pathname === item.href}
                  tooltip={{ children: item.label, side: 'right' }}
                >
                  <Link href={item.href}>
                    <item.icon className="h-6 w-6" />
                    <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
            <SidebarSeparator />
            <SidebarMenu>
                 {bottomNavItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                        <SidebarMenuButton
                            asChild
                            variant="default"
                            className="text-lg py-6"
                            isActive={pathname === item.href}
                            tooltip={{ children: item.label, side: 'right' }}
                        >
                            <Link href={item.href}>
                                <item.icon className="h-6 w-6" />
                                <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                 ))}
            </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <main className="min-h-screen p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
```

---
---

### File: `/src/app/(main)/medications/page.tsx`

```tsx
'use client';

import React, { useState, useEffect } from 'react';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle, PlusCircle, Timer, Pill, Lightbulb } from 'lucide-react';
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

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {meds.map((med) => {
          const isTaken = takenLog[med.id] !== undefined;
          const remainingTime = timeLeft[med.id] || 0;
          const isReady = !isTaken || remainingTime <= 0;
          const progress = isTaken ? ((med.intervalHours * 3600 * 1000 - remainingTime) / (med.intervalHours * 3600 * 1000)) * 100 : 0;

          return (
            <Card key={med.id} className={cn("flex flex-col transition-all duration-200 hover:shadow-lg hover:-translate-y-1", !isReady ? 'bg-muted/50' : 'bg-card')}>
              <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/20 p-3 rounded-full">
                        <Pill className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                        <CardTitle className="text-2xl">{med.name}</CardTitle>
                        <CardDescription className="text-base">{med.dosage} &bull; {med.frequency}</CardDescription>
                    </div>
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
            </CardContent>
          </Card>
      </div>
    </div>
  );
}
```

---
---

### File: `/src/app/(main)/mood/page.tsx`

```tsx
'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { placeholderMoodLog } from '@/lib/placeholder-data';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import type { MoodLog } from '@/lib/types';
import { HealthTip } from '@/components/health-tip';
import { Lightbulb } from 'lucide-react';

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
           <HealthTip
            icon={Lightbulb}
            title="Helpful Tip"
            content="Don't be afraid to write down your thoughts, both good and bad. Journaling is a wonderful way to understand your feelings and see how they connect to your health."
           />
        </div>

        <div className="lg:col-span-2 space-y-6">
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
                    <Dialog key={log.id}>
                        <DialogTrigger asChild>
                            <TableRow className="cursor-pointer">
                                <TableCell className="text-base">{log.timestamp.toLocaleDateString()}</TableCell>
                                <TableCell className="text-4xl">{moodOptions.find(m => m.level === log.mood)?.emoji}</TableCell>
                                <TableCell className="text-base text-muted-foreground truncate max-w-[150px]">{log.journalEntry}</TableCell>
                            </TableRow>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle className='text-2xl'>
                                    Mood on {log.timestamp.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                </DialogTitle>
                                <DialogDescription className='text-center sm:text-left'>
                                    <span className="text-6xl my-4 block">{moodOptions.find(m => m.level === log.mood)?.emoji}</span>
                                    <span className="text-xl font-medium text-foreground">{moodOptions.find(m => m.level === log.mood)?.label}</span>
                                </DialogDescription>
                            </DialogHeader>
                            <div>
                                <h3 className="font-bold text-lg mb-2">Your Journal Entry:</h3>
                                <p className="text-base text-muted-foreground bg-muted/50 p-4 rounded-md min-h-[100px]">
                                    {log.journalEntry || "No entry written."}
                                </p>
                            </div>
                        </DialogContent>
                    </Dialog>
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
```

---
---

### File: `/src/app/(main)/nutrition/page.tsx`

```tsx
'use client';

import React from 'react';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { placeholderRecipes } from '@/lib/placeholder-data';
import type { Recipe, MealLog } from '@/lib/types';
import { Minus, Plus, GlassWater, Lightbulb } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { HealthTip } from '@/components/health-tip';

export default function NutritionPage() {
  const { toast } = useToast();
  const [waterCount, setWaterCount] = React.useState(3);
  const [mealLog, setMealLog] = React.useState<MealLog[]>([]);

  const handleLogMeal = (recipe: Recipe) => {
    const newMealLog: MealLog = {
      id: `meal-${Date.now()}`,
      recipeName: recipe.name,
      category: recipe.category,
      timestamp: new Date(),
    };
    setMealLog(prev => [newMealLog, ...prev]);
    toast({
      title: "Meal Logged!",
      description: `You've logged "${recipe.name}". Enjoy!`,
    });
  }

  const renderRecipeCard = (recipe: Recipe) => (
    <Dialog key={recipe.id}>
      <DialogTrigger asChild>
        <Card className="cursor-pointer hover:shadow-lg transition-shadow h-full flex flex-col">
          <CardHeader>
            <CardTitle className="text-2xl font-headline">{recipe.name}</CardTitle>
            <CardDescription className="text-base">Prep: {recipe.prepTime} min, Cook: {recipe.cookTime} min</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-muted-foreground text-base">Click to see recipe and nutritional info.</p>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-3xl font-headline">{recipe.name}</DialogTitle>
          <DialogDescription className="text-base">Category: {recipe.category}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-4">
            <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-muted p-3 rounded-lg">
                    <p className="font-bold text-base">Carbs</p>
                    <p className="text-lg">{recipe.nutritionalInfo.carbs}</p>
                </div>
                 <div className="bg-muted p-3 rounded-lg">
                    <p className="font-bold text-base">Sugar</p>
                    <p className="text-lg">{recipe.nutritionalInfo.sugar}</p>
                </div>
                 <div className="bg-muted p-3 rounded-lg">
                    <p className="font-bold text-base">Sodium</p>
                    <p className="text-lg">{recipe.nutritionalInfo.sodium}</p>
                </div>
                 <div className="bg-muted p-3 rounded-lg">
                    <p className="font-bold text-base">Protein</p>
                    <p className="text-lg">{recipe.nutritionalInfo.protein}</p>
                </div>
            </div>
          <div>
            <h3 className="font-bold text-xl mb-2">Ingredients</h3>
            <ul className="list-disc list-inside text-base space-y-1">
              {recipe.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-xl mb-2">Instructions</h3>
            <ol className="list-decimal list-inside text-base space-y-2">
              {recipe.instructions.map((step, i) => <li key={i}>{step}</li>)}
            </ol>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" size="lg" onClick={() => handleLogMeal(recipe)}>Log This Meal</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return (
    <div>
      <PageHeader
        title="Nutrition & Meals"
        description="Discover diabetes-friendly recipes and track your hydration."
      />

        <div className="grid gap-6 mb-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-2xl">
                        <GlassWater className="h-8 w-8 text-primary"/>
                        Hydration Tracker
                    </CardTitle>
                    <CardDescription>Aim for at least 8 glasses of water a day.</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-center gap-6 pt-2">
                    <Button size="icon" variant="outline" className="h-14 w-14 rounded-full" onClick={() => setWaterCount(p => Math.max(0, p-1))} disabled={waterCount === 0}>
                        <Minus className="h-8 w-8"/>
                    </Button>
                    <span className="text-5xl font-bold w-24 text-center">{waterCount}</span>
                     <Button size="icon" variant="outline" className="h-14 w-14 rounded-full" onClick={() => setWaterCount(p => p+1)}>
                        <Plus className="h-8 w-8"/>
                    </Button>
                </CardContent>
            </Card>
            <HealthTip
            icon={Lightbulb}
            title="Helpful Tip"
            content="Staying hydrated is crucial for managing blood sugar levels and overall health. Try to sip water consistently throughout the day!"
           />
        </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>5-Star Diabetes-Safe Meal Catalog</CardTitle>
                    <CardDescription>Delicious, healthy recipes curated just for you.</CardDescription>
                </CardHeader>
                <CardContent>
                <Tabs defaultValue="Breakfast" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
                    <TabsTrigger value="Breakfast" className="text-base md:text-lg py-3">Breakfast</TabsTrigger>
                    <TabsTrigger value="Lunch" className="text-base md:text-lg py-3">Lunch</TabsTrigger>
                    <TabsTrigger value="Dinner" className="text-base md:text-lg py-3">Dinner</TabsTrigger>
                    <TabsTrigger value="Snacks" className="text-base md:text-lg py-3">Snacks</TabsTrigger>
                    </TabsList>
                    <TabsContent value="Breakfast" className="mt-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {placeholderRecipes.filter(r => r.category === 'Breakfast').map(renderRecipeCard)}
                    </div>
                    </TabsContent>
                    <TabsContent value="Lunch" className="mt-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {placeholderRecipes.filter(r => r.category === 'Lunch').map(renderRecipeCard)}
                    </div>
                    </TabsContent>
                    <TabsContent value="Dinner" className="mt-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {placeholderRecipes.filter(r => r.category === 'Dinner').map(renderRecipeCard)}
                    </div>
                    </TabsContent>
                    <TabsContent value="Snacks" className="mt-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {placeholderRecipes.filter(r => r.category === 'Snacks').map(renderRecipeCard)}
                    </div>
                    </TabsContent>
                </Tabs>
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-2 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Recent Meals</CardTitle>
                    <CardDescription>A log of what you've eaten recently.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Meal</TableHead>
                                <TableHead>Category</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mealLog.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={3} className="text-center text-lg text-muted-foreground h-24">
                                        You haven't logged any meals yet.
                                    </TableCell>
                                </TableRow>
                            )}
                            {mealLog.map((log) => (
                                <TableRow key={log.id}>
                                    <TableCell>{log.timestamp.toLocaleDateString()}</TableCell>
                                    <TableCell className="font-medium">{log.recipeName}</TableCell>
                                    <TableCell className="text-muted-foreground">{log.category}</TableCell>
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
```

---
---

### File: `/src/app/(main)/page.tsx`

```tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/page-header';
import { HeartPulse, Droplets, Pill, Smile, UtensilsCrossed, Bike, Settings, HelpCircle, Lightbulb } from 'lucide-react';
import { bpDataForChart, bsDataForChart } from '@/lib/placeholder-data';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Logo } from '@/components/logo';
import { cn } from '@/lib/utils';
import { HealthTip } from '@/components/health-tip';


const bpChartConfig = {
  systolic: {
    label: "Systolic",
    color: "hsl(var(--primary))",
  },
  diastolic: {
    label: "Diastolic",
    color: "hsl(var(--accent))",
  },
} satisfies ChartConfig;

const bsChartConfig = {
  level: {
    label: "Glucose",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

const mobileNavItems = [
  { href: '/blood-pressure', label: 'Blood Pressure', icon: HeartPulse },
  { href: '/blood-sugar', label: 'Blood Sugar', icon: Droplets },
  { href: '/medications', label: 'Medications', icon: Pill },
  { href: '/fitness', label: 'Fitness', icon: Bike },
  { href: '/nutrition', label: 'Nutrition', icon: UtensilsCrossed },
  { href: '/mood', label: 'Mood', icon: Smile },
  { href: '/help', label: 'Help', icon: HelpCircle },
  { href: '/settings', label: 'Settings', icon: Settings },
];


export default function DashboardPage() {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good Morning";
        if (hour < 18) return "Good Afternoon";
        return "Good Evening";
    };
    setGreeting(getGreeting());
  }, []);
  
  return (
    <div className="w-full">
      <div className="md:hidden mb-6">
        <div className="flex justify-center items-center gap-3 mb-6">
            <Logo className="w-12 h-12" />
            <h1 className="font-headline text-3xl font-bold text-foreground/90">
              Nan-Track
            </h1>
        </div>
        <div className="grid grid-cols-4 gap-2">
            {mobileNavItems.map((item) => (
                <Link href={item.href} key={item.href} className="flex flex-col items-center justify-center gap-1 p-2 rounded-lg bg-card text-card-foreground hover:bg-accent transition-colors">
                    <item.icon className="w-8 h-8 text-primary" />
                    <span className="text-xs text-center">{item.label}</span>
                </Link>
            ))}
        </div>
      </div>
      
      <PageHeader
        title={`${greeting}, Nan-Nan!`}
        description={`Here's your health summary for ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}.`}
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2 transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                  <HeartPulse className="h-8 w-8 text-primary" />
                  <span>Blood Pressure Trend</span>
              </CardTitle>
              <CardDescription>Your 7-day overview.</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={bpChartConfig} className="h-48 w-full">
                <ResponsiveContainer>
                  <LineChart data={bpDataForChart} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
                    <YAxis domain={[60, 160]} tickLine={false} axisLine={false} />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Line dataKey="systolic" type="monotone" stroke="var(--color-systolic)" strokeWidth={3} dot={true} />
                    <Line dataKey="diastolic" type="monotone" stroke="var(--color-diastolic)" strokeWidth={3} dot={true} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
        </Card>

        <Card className="transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                  <Droplets className="h-8 w-8 text-primary" />
                  <span>Blood Sugar Trend</span>
              </CardTitle>
              <CardDescription>Your 7-day overview.</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={bsChartConfig} className="h-48 w-full">
                <ResponsiveContainer>
                  <LineChart data={bsDataForChart} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
                    <YAxis domain={[50, 200]} tickLine={false} axisLine={false} />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Line dataKey="level" type="monotone" stroke="var(--color-level)" strokeWidth={3} dot={true} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
        </Card>

        <Card className="flex flex-col transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <Pill className="h-8 w-8 text-primary" />
              <span>Medication</span>
            </CardTitle>
            <CardDescription>Your upcoming medication schedule.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col justify-center gap-4">
            <div className="text-center">
                <p className="text-lg text-muted-foreground">Next up:</p>
                <p className="text-2xl font-bold">Metformin</p>
                <p className="text-lg text-muted-foreground">at 8:00 PM</p>
            </div>
            <Button asChild size="lg" className="w-full text-lg py-6">
              <Link href="/medications">View & Log Medications</Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card className="flex flex-col transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <Smile className="h-8 w-8 text-primary" />
              <span>Your Mood</span>
            </CardTitle>
            <CardDescription>How are you feeling right now?</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col justify-center gap-4">
             <p className="text-center text-lg">You last logged your mood as feeling <span className="font-bold">Good</span>.</p>
             <Button asChild size="lg" variant="outline" className="w-full text-lg py-6">
              <Link href="/mood">Track Your Mood</Link>
            </Button>
          </CardContent>
        </Card>

         <Card className="lg:col-span-1 transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <UtensilsCrossed className="h-8 w-8 text-primary" />
              <span>Today's Vitals</span>
            </CardTitle>
            <CardDescription>A quick look at your key numbers.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow grid gap-4 text-lg">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Blood Pressure</span>
              <span className="font-bold">122/81 mmHg</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Blood Sugar</span>
              <span className="font-bold">98 mg/dL</span>
            </div>
             <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Water Intake</span>
              <span className="font-bold">3 of 8 glasses</span>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="mt-6">
        <HealthTip 
            icon={Lightbulb}
            title="Today's Tip"
            content="Consistency is more important than perfection. Just logging one thing today is a step in the right direction. You're doing great!"
        />
      </div>
    </div>
  );
}
```

---
---

### File: `/src/app/(main)/settings/page.tsx`

```tsx
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
```

---
---

### File: `/src/app/api/generate-tip/route.ts`

```ts
import { generateTip } from '@/ai/flows/generate-tip-flow';
import {NextResponse} from 'next/server';

export async function POST(req: Request) {
  try {
    const {context} = await req.json();

    if (!context) {
      return NextResponse.json(
        {error: 'Context is required.'},
        {status: 400}
      );
    }

    const {tip} = await generateTip({context});

    return NextResponse.json({tip});
  } catch (error) {
    console.error('API Error:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json(
      {error: 'Failed to generate tip.', details: errorMessage},
      {status: 500}
    );
  }
}
```

---
---

### File: `/src/app/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 284 25% 95%;
    --foreground: 285 10% 20%;
    --card: 284 25% 100%;
    --card-foreground: 285 10% 20%;
    --popover: 284 25% 100%;
    --popover-foreground: 285 10% 20%;
    --primary: 285 45% 70%;
    --primary-foreground: 285 10% 10%;
    --secondary: 284 25% 92%;
    --secondary-foreground: 285 10% 20%;
    --muted: 284 25% 92%;
    --muted-foreground: 285 10% 45%;
    --accent: 101 19% 69%;
    --accent-foreground: 101 10% 20%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 284 25% 88%;
    --input: 284 25% 88%;
    --ring: 285 45% 70%;
    --chart-1: 285 45% 70%;
    --chart-2: 101 19% 69%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;
    --radius: 0.8rem;
    --sidebar-background: 284 25% 92%;
    --sidebar-foreground: 285 10% 20%;
    --sidebar-primary: 285 45% 70%;
    --sidebar-primary-foreground: 285 10% 10%;
    --sidebar-accent: 284 25% 95%;
    --sidebar-accent-foreground: 285 10% 20%;
    --sidebar-border: 284 25% 85%;
    --sidebar-ring: 285 45% 70%;
  }
  .dark {
    --background: 285 10% 10%;
    --foreground: 284 25% 95%;
    --card: 285 10% 12%;
    --card-foreground: 284 25% 95%;
    --popover: 285 10% 10%;
    --popover-foreground: 284 25% 95%;
    --primary: 285 45% 70%;
    --primary-foreground: 285 10% 10%;
    --secondary: 285 10% 18%;
    --secondary-foreground: 284 25% 95%;
    --muted: 285 10% 18%;
    --muted-foreground: 285 10% 65%;
    --accent: 101 19% 25%;
    --accent-foreground: 101 10% 80%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 285 10% 22%;
    --input: 285 10% 22%;
    --ring: 285 45% 70%;
    --chart-1: 285 45% 70%;
    --chart-2: 101 19% 69%;
    --chart-3: 30 80% 55%;
    --chart-4: 280 65% 60%;
    --chart-5: 340 75% 55%;
    --sidebar-background: 285 10% 12%;
    --sidebar-foreground: 284 25% 95%;
    --sidebar-primary: 285 45% 70%;
    --sidebar-primary-foreground: 285 10% 10%;
    --sidebar-accent: 285 10% 18%;
    --sidebar-accent-foreground: 284 25% 95%;
    --sidebar-border: 285 10% 22%;
    --sidebar-ring: 285 45% 70%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}

@layer utilities {
  .animate-pulse-slow {
    animation: pulse-slow 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  @keyframes pulse-slow {
    50% {
      opacity: .8;
      transform: scale(1.05);
    }
  }
}
```

---
---

### File: `/src/app/layout.tsx`

```tsx
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Nan-Track',
  description: 'A senior-friendly health management tool for tracking health, fitness, and nutrition.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("font-body antialiased", inter.variable)}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
```

---
---

### File: `/src/components/health-tip.tsx`

```tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

interface HealthTipProps {
    icon: LucideIcon;
    title: string;
    content: string;
    className?: string;
}

export function HealthTip({ icon: Icon, title, content, className }: HealthTipProps) {
  return (
    <Card className={cn("bg-accent/50 border-accent/50", className)}>
        <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-3 text-xl text-accent-foreground/90">
                <Icon className="h-7 w-7 text-accent-foreground/80" />
                {title}
            </CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-base text-accent-foreground/80">
                {content}
            </p>
        </CardContent>
    </Card>
  );
}
```

---
---

### File: `/src/components/logo.tsx`

```tsx
import React from 'react';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      className={cn("animate-pulse-slow", className)}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Nan-Track Logo"
    >
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <path
        fill="url(#gradient)"
        d="M85.7,26.2c-8.1-8.1-21.2-8.1-29.3,0L50,32.6L43.6,26.2c-8.1-8.1-21.2-8.1-29.3,0c-8.1,8.1-8.1,21.2,0,29.3l29.3,29.3l29.3-29.3C93.8,47.4,93.8,34.3,85.7,26.2z M53,50h12v6H53v12h-6V56H35v-6h12V38h6V50z"
      />
    </svg>
  );
}
```

---
---

### File: `/src/components/page-header.tsx`

```tsx
'use client';

import { cn } from '@/lib/utils';
import type React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export function PageHeader({ title, description, children, className, ...props }: PageHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isDashboard = pathname === '/';

  return (
    <header className={cn('mb-6 flex items-start justify-between', isDashboard && 'hidden md:flex', className)} {...props}>
      <div className="flex items-center gap-4">
        {!isDashboard && (
            <Button
                variant="outline"
                size="icon"
                className="md:hidden h-12 w-12 flex-shrink-0"
                onClick={() => router.back()}
            >
                <ArrowLeft className="h-6 w-6" />
                <span className="sr-only">Back</span>
            </Button>
        )}
        <div className="grid gap-1">
            <h1 className="font-headline text-3xl md:text-4xl font-bold tracking-tight text-foreground/90">{title}</h1>
            {description && (
            <p className="text-lg text-muted-foreground">{description}</p>
            )}
        </div>
      </div>
      <div className="hidden md:flex items-center gap-2">
        {children}
      </div>
    </header>
  );
}
```

---
---

### File: `/src/lib/placeholder-data.ts`

```ts
import type { Recipe, Exercise, Medication, BloodPressureLog, BloodSugarLog, MoodLog } from './types';

export const placeholderRecipes: Recipe[] = [
  // Breakfast
  {
    id: 'b1',
    name: 'Avocado Toast with Egg',
    category: 'Breakfast',
    ingredients: ['1 slice whole-wheat bread', '1/2 avocado', '1 large egg', 'Red pepper flakes'],
    instructions: ['Toast the bread.', 'Mash avocado and spread it on the toast.', 'Top with a cooked egg and red pepper flakes.'],
    prepTime: 5,
    cookTime: 5,
    nutritionalInfo: { carbs: '20g', sugar: '1g', sodium: '200mg', protein: '15g' },
  },
  {
    id: 'b2',
    name: 'Oatmeal with Berries and Nuts',
    category: 'Breakfast',
    ingredients: ['1/2 cup rolled oats', '1 cup water or milk', '1/2 cup mixed berries', '1 tbsp chopped walnuts'],
    instructions: ['Cook oats with water or milk.', 'Top with berries and nuts.'],
    prepTime: 2,
    cookTime: 5,
    nutritionalInfo: { carbs: '40g', sugar: '12g', sodium: '5mg', protein: '10g' },
  },
  {
    id: 'b3',
    name: 'Greek Yogurt Parfait',
    category: 'Breakfast',
    ingredients: ['1 cup Greek yogurt', '1/4 cup granola', '1/2 cup sliced strawberries'],
    instructions: ['Layer yogurt, granola, and strawberries in a glass.'],
    prepTime: 5,
    cookTime: 0,
    nutritionalInfo: { carbs: '30g', sugar: '18g', sodium: '80mg', protein: '22g' },
  },
    { id: 'b4', name: 'Scrambled Eggs with Spinach', category: 'Breakfast', ingredients: ['2 large eggs', '1 cup spinach', '1 tbsp milk', 'Salt and pepper'], instructions: ['Wilt spinach in a pan.', 'Whisk eggs with milk, salt, and pepper.', 'Scramble eggs with spinach.'], prepTime: 3, cookTime: 5, nutritionalInfo: { carbs: '2g', sugar: '1g', sodium: '250mg', protein: '14g' } },
    { id: 'b5', name: 'Whole Wheat Pancakes', category: 'Breakfast', ingredients: ['1 cup whole wheat flour', '1 tsp baking powder', '1 egg', '1 cup milk', '1 tbsp maple syrup'], instructions: ['Mix ingredients.', 'Cook on a griddle.'], prepTime: 5, cookTime: 10, nutritionalInfo: { carbs: '35g', sugar: '15g', sodium: '400mg', protein: '8g' } },
    { id: 'b6', name: 'Cottage Cheese with Peaches', category: 'Breakfast', ingredients: ['1 cup cottage cheese', '1/2 cup sliced peaches'], instructions: ['Combine ingredients in a bowl.'], prepTime: 3, cookTime: 0, nutritionalInfo: { carbs: '15g', sugar: '12g', sodium: '450mg', protein: '25g' } },
    { id: 'b7', name: 'Breakfast Burrito', category: 'Breakfast', ingredients: ['1 whole wheat tortilla', '2 scrambled eggs', '1/4 cup black beans', '2 tbsp salsa'], instructions: ['Warm tortilla.', 'Fill with eggs, beans, and salsa.'], prepTime: 5, cookTime: 5, nutritionalInfo: { carbs: '30g', sugar: '4g', sodium: '500mg', protein: '20g' } },
    { id: 'b8', name: 'Smoothie with Kale and Apple', category: 'Breakfast', ingredients: ['1 cup kale', '1/2 apple', '1/2 banana', '1 cup almond milk'], instructions: ['Blend all ingredients until smooth.'], prepTime: 5, cookTime: 0, nutritionalInfo: { carbs: '35g', sugar: '20g', sodium: '180mg', protein: '5g' } },
    { id: 'b9', name: 'Chia Seed Pudding', category: 'Breakfast', ingredients: ['3 tbsp chia seeds', '1 cup almond milk', '1 tsp vanilla extract', 'Mixed berries'], instructions: ['Mix chia seeds, milk, and vanilla.', 'Refrigerate overnight.', 'Top with berries.'], prepTime: 5, cookTime: 0, nutritionalInfo: { carbs: '20g', sugar: '8g', sodium: '170mg', protein: '8g' } },
    { id: 'b10', name: 'English Muffin with Peanut Butter', category: 'Breakfast', ingredients: ['1 whole wheat English muffin', '2 tbsp peanut butter'], instructions: ['Toast muffin.', 'Spread with peanut butter.'], prepTime: 2, cookTime: 2, nutritionalInfo: { carbs: '30g', sugar: '5g', sodium: '300mg', protein: '12g' } },
    { id: 'b11', name: 'Mushroom and Feta Omelette', category: 'Breakfast', ingredients: ['2 large eggs', '1/4 cup sliced mushrooms', '2 tbsp feta cheese', '1 tbsp chopped chives'], instructions: ['Sauté mushrooms until soft.', 'Whisk eggs and pour into pan.', 'Add feta and chives, then fold omelette.'], prepTime: 5, cookTime: 7, nutritionalInfo: { carbs: '3g', sugar: '2g', sodium: '350mg', protein: '16g' } },
    { id: 'b12', name: 'Cinnamon Quinoa Bowl', category: 'Breakfast', ingredients: ['1 cup cooked quinoa', '1/2 tsp cinnamon', '1 tbsp sliced almonds', '1/2 cup unsweetened applesauce'], instructions: ['Combine warm cooked quinoa with cinnamon and almonds.', 'Top with applesauce.'], prepTime: 2, cookTime: 0, nutritionalInfo: { carbs: '50g', sugar: '15g', sodium: '10mg', protein: '10g' } },
    { id: 'b13', name: 'Ricotta Toast with Tomato', category: 'Breakfast', ingredients: ['1 slice rye bread', '1/4 cup part-skim ricotta', '3 cherry tomatoes, halved', 'Fresh basil'], instructions: ['Toast the bread.', 'Spread ricotta on toast.', 'Top with tomatoes and basil.'], prepTime: 5, cookTime: 2, nutritionalInfo: { carbs: '22g', sugar: '4g', sodium: '220mg', protein: '12g' } },
    { id: 'b14', name: 'Banana-Oat Muffins', category: 'Breakfast', ingredients: ['1 cup rolled oats', '1 ripe banana, mashed', '1 egg', '1/4 cup Greek yogurt', '1/2 tsp baking soda'], instructions: ['Mix all ingredients together.', 'Pour into muffin cups.', 'Bake at 375°F for 15-18 minutes.'], prepTime: 10, cookTime: 18, nutritionalInfo: { carbs: '25g', sugar: '10g', sodium: '180mg', protein: '6g' } },
    { id: 'b15', name: 'Poached Egg on Asparagus', category: 'Breakfast', ingredients: ['1 large egg', '5-6 asparagus spears', '1 tsp olive oil', 'Parmesan cheese shavings'], instructions: ['Steam or lightly sauté asparagus.', 'Poach an egg.', 'Place poached egg on top of asparagus and drizzle with olive oil and parmesan.'], prepTime: 5, cookTime: 8, nutritionalInfo: { carbs: '5g', sugar: '3g', sodium: '150mg', protein: '10g' } },
    { id: 'b16', name: 'Savory Yogurt Bowl', category: 'Breakfast', ingredients: ['1 cup plain Greek yogurt', '1/2 cucumber, diced', '1 tbsp olive oil', 'Pinch of dried dill'], instructions: ['Combine all ingredients in a bowl.', 'Season with salt and pepper to taste.'], prepTime: 7, cookTime: 0, nutritionalInfo: { carbs: '12g', sugar: '8g', sodium: '100mg', protein: '23g' } },
    { id: 'b17', name: 'Tofu Scramble', category: 'Breakfast', ingredients: ['1/2 block firm tofu, crumbled', '1/4 tsp turmeric', '1 cup chopped bell peppers and onions', '1 tbsp nutritional yeast'], instructions: ['Sauté peppers and onions.', 'Add crumbled tofu, turmeric, and nutritional yeast.', 'Cook until heated through.'], prepTime: 5, cookTime: 10, nutritionalInfo: { carbs: '10g', sugar: '5g', sodium: '20mg', protein: '20g' } },
    { id: 'b18', name: 'Berry and Spinach Smoothie', category: 'Breakfast', ingredients: ['1 cup spinach', '1/2 cup mixed berries', '1/4 cup Greek yogurt', '1 cup unsweetened almond milk'], instructions: ['Blend all ingredients until smooth.'], prepTime: 5, cookTime: 0, nutritionalInfo: { carbs: '18g', sugar: '10g', sodium: '190mg', protein: '12g' } },
    { id: 'b19', name: 'Smoked Salmon on Rye Crisp', category: 'Breakfast', ingredients: ['2 rye crackers', '2 oz smoked salmon', '1 tbsp cream cheese', 'Capers and fresh dill'], instructions: ['Spread cream cheese on crackers.', 'Top with smoked salmon, capers, and dill.'], prepTime: 5, cookTime: 0, nutritionalInfo: { carbs: '18g', sugar: '2g', sodium: '600mg', protein: '15g' } },
    { id: 'b20', name: 'Apple Cinnamon Oatmeal', category: 'Breakfast', ingredients: ['1/2 cup rolled oats', '1 cup water', '1/2 apple, chopped', '1/2 tsp cinnamon'], instructions: ['Cook oats and apple in water until soft.', 'Stir in cinnamon before serving.'], prepTime: 3, cookTime: 7, nutritionalInfo: { carbs: '45g', sugar: '14g', sodium: '5mg', protein: '8g' } },
    { id: 'b21', name: 'Hard Boiled Eggs and Fruit', category: 'Breakfast', ingredients: ['2 large hard-boiled eggs', '1 orange'], instructions: ['Peel and eat eggs.', 'Serve with a fresh orange.'], prepTime: 1, cookTime: 12, nutritionalInfo: { carbs: '15g', sugar: '12g', sodium: '140mg', protein: '12g' } },
    { id: 'b22', name: 'Kefir with Sliced Almonds', category: 'Breakfast', ingredients: ['1 cup plain kefir', '2 tbsp sliced almonds'], instructions: ['Pour kefir in a bowl and top with almonds.'], prepTime: 2, cookTime: 0, nutritionalInfo: { carbs: '15g', sugar: '12g', sodium: '130mg', protein: '12g' } },
    { id: 'b23', name: 'Breakfast Quesadilla', category: 'Breakfast', ingredients: ['1 small whole wheat tortilla', '1 scrambled egg', '2 tbsp shredded cheese', '1 tbsp black beans'], instructions: ['Place egg, cheese, and beans on one half of the tortilla.', 'Fold and cook in a pan until golden.'], prepTime: 3, cookTime: 5, nutritionalInfo: { carbs: '25g', sugar: '1g', sodium: '450mg', protein: '15g' } },
    { id: 'b24', name: 'Peach and Ginger Smoothie', category: 'Breakfast', ingredients: ['1 cup sliced peaches', '1 tsp grated ginger', '1/2 cup plain yogurt', '1/2 cup water'], instructions: ['Blend all ingredients until smooth.'], prepTime: 5, cookTime: 0, nutritionalInfo: { carbs: '28g', sugar: '22g', sodium: '70mg', protein: '8g' } },
    { id: 'b25', name: 'Buckwheat Groats with Walnuts', category: 'Breakfast', ingredients: ['1/2 cup cooked buckwheat groats', '2 tbsp chopped walnuts', 'A drizzle of honey'], instructions: ['Serve warm buckwheat topped with walnuts and a small drizzle of honey.'], prepTime: 2, cookTime: 15, nutritionalInfo: { carbs: '40g', sugar: '8g', sodium: '10mg', protein: '8g' } },
    { id: 'b26', name: 'Tomato and Basil Frittata Muffin', category: 'Breakfast', ingredients: ['2 eggs', '3 cherry tomatoes, chopped', 'Fresh basil', '1 tbsp parmesan'], instructions: ['Whisk eggs and stir in other ingredients.', 'Pour into a muffin tin.', 'Bake at 375°F for 15-20 minutes.'], prepTime: 5, cookTime: 20, nutritionalInfo: { carbs: '3g', sugar: '2g', sodium: '250mg', protein: '14g' } },
    { id: 'b27', name: 'Pumpkin Spice Yogurt', category: 'Breakfast', ingredients: ['1 cup plain Greek yogurt', '2 tbsp pumpkin puree', '1/4 tsp pumpkin pie spice'], instructions: ['Stir all ingredients together in a bowl.'], prepTime: 3, cookTime: 0, nutritionalInfo: { carbs: '15g', sugar: '10g', sodium: '90mg', protein: '22g' } },
    { id: 'b28', name: 'Almond Flour Waffle', category: 'Breakfast', ingredients: ['1/2 cup almond flour', '1 egg', '2 tbsp almond milk', '1/2 tsp baking powder'], instructions: ['Mix ingredients to form a batter.', 'Cook in a waffle iron.'], prepTime: 5, cookTime: 5, nutritionalInfo: { carbs: '10g', sugar: '2g', sodium: '200mg', protein: '12g' } },
    { id: 'b29', name: 'Cantaloupe with Cottage Cheese', category: 'Breakfast', ingredients: ['1 cup cubed cantaloupe', '1/2 cup cottage cheese'], instructions: ['Serve cottage cheese with a side of fresh cantaloupe.'], prepTime: 5, cookTime: 0, nutritionalInfo: { carbs: '18g', sugar: '15g', sodium: '460mg', protein: '15g' } },
    { id: 'b30', name: 'Overnight Oats with Peanut Butter', category: 'Breakfast', ingredients: ['1/2 cup rolled oats', '1/2 cup almond milk', '1 tbsp peanut butter', '1 tbsp chia seeds'], instructions: ['Combine all ingredients in a jar.', 'Shake well and refrigerate overnight.'], prepTime: 5, cookTime: 0, nutritionalInfo: { carbs: '40g', sugar: '8g', sodium: '180mg', protein: '15g' } },

  // Lunch
  {
    id: 'l1',
    name: 'Quinoa Salad with Chickpeas',
    category: 'Lunch',
    ingredients: ['1 cup cooked quinoa', '1/2 cup chickpeas', 'Cucumber', 'Cherry tomatoes', 'Feta cheese', 'Lemon vinaigrette'],
    instructions: ['Combine quinoa, chickpeas, cucumber, and tomatoes.', 'Top with feta and vinaigrette.'],
    prepTime: 10,
    cookTime: 0,
    nutritionalInfo: { carbs: '45g', sugar: '5g', sodium: '300mg', protein: '18g' },
  },
  {
    id: 'l2',
    name: 'Grilled Chicken Salad',
    category: 'Lunch',
    ingredients: ['4 oz grilled chicken breast', 'Mixed greens', '1/4 avocado', 'Vinaigrette dressing'],
    instructions: ['Slice chicken.', 'Toss with greens, avocado, and dressing.'],
    prepTime: 5,
    cookTime: 10,
    nutritionalInfo: { carbs: '10g', sugar: '3g', sodium: '250mg', protein: '35g' },
  },
  {
    id: 'l3',
    name: 'Lentil Soup',
    category: 'Lunch',
    ingredients: ['1 cup brown lentils', '1 carrot', '1 celery stalk', '4 cups vegetable broth'],
    instructions: ['Sauté chopped vegetables.', 'Add lentils and broth.', 'Simmer for 30 minutes.'],
    prepTime: 10,
    cookTime: 30,
    nutritionalInfo: { carbs: '40g', sugar: '8g', sodium: '600mg', protein: '20g' },
  },
    { id: 'l4', name: 'Tuna Salad Sandwich', category: 'Lunch', ingredients: ['1 can tuna in water', '2 tbsp Greek yogurt', '1 celery stalk', '2 slices whole wheat bread'], instructions: ['Mix tuna, yogurt, and chopped celery.', 'Serve on bread.'], prepTime: 10, cookTime: 0, nutritionalInfo: { carbs: '30g', sugar: '6g', sodium: '500mg', protein: '25g' } },
    { id: 'l5', name: 'Turkey and Cheese Wrap', category: 'Lunch', ingredients: ['3 slices turkey breast', '1 slice provolone cheese', '1 whole wheat tortilla', 'Lettuce and tomato'], instructions: ['Layer ingredients on tortilla and roll up.'], prepTime: 5, cookTime: 0, nutritionalInfo: { carbs: '25g', sugar: '3g', sodium: '800mg', protein: '20g' } },
    { id: 'l6', name: 'Black Bean Burger', category: 'Lunch', ingredients: ['1 black bean patty', '1 whole wheat bun', 'Lettuce, tomato, onion'], instructions: ['Cook patty.', 'Serve on bun with toppings.'], prepTime: 5, cookTime: 8, nutritionalInfo: { carbs: '45g', sugar: '7g', sodium: '600mg', protein: '15g' } },
    { id: 'l7', name: 'Caprese Salad', category: 'Lunch', ingredients: ['1 large tomato', '4 oz fresh mozzarella', 'Fresh basil', 'Balsamic glaze'], instructions: ['Alternate slices of tomato and mozzarella.', 'Top with basil and glaze.'], prepTime: 10, cookTime: 0, nutritionalInfo: { carbs: '10g', sugar: '8g', sodium: '400mg', protein: '20g' } },
    { id: 'l8', name: 'Leftover Salmon Salad', category: 'Lunch', ingredients: ['4 oz cooked salmon', 'Mixed greens', 'Cucumber', 'Lemon juice'], instructions: ['Flake salmon over greens.', 'Add cucumber and a squeeze of lemon.'], prepTime: 5, cookTime: 0, nutritionalInfo: { carbs: '5g', sugar: '2g', sodium: '200mg', protein: '25g' } },
    { id: 'l9', name: 'Vegetable Stir-fry with Tofu', category: 'Lunch', ingredients: ['1/2 block tofu', '1 cup mixed vegetables (broccoli, peppers)', '1 tbsp soy sauce'], instructions: ['Stir-fry tofu and vegetables.', 'Add soy sauce.'], prepTime: 10, cookTime: 10, nutritionalInfo: { carbs: '20g', sugar: '8g', sodium: '500mg', protein: '20g' } },
    { id: 'l10', name: 'Chicken Noodle Soup', category: 'Lunch', ingredients: ['1 cup cooked chicken', '1/2 cup egg noodles', '4 cups chicken broth', 'Carrots and celery'], instructions: ['Simmer ingredients until noodles and vegetables are tender.'], prepTime: 10, cookTime: 20, nutritionalInfo: { carbs: '25g', sugar: '5g', sodium: '700mg', protein: '15g' } },
    { id: 'l11', name: 'Greek Salad with Grilled Shrimp', category: 'Lunch', ingredients: ['4 oz grilled shrimp', 'Romaine lettuce', 'Cucumber', 'Olives', 'Feta cheese', 'Vinaigrette'], instructions: ['Toss all ingredients together.'], prepTime: 15, cookTime: 5, nutritionalInfo: { carbs: '12g', sugar: '6g', sodium: '700mg', protein: '25g' } },
    { id: 'l12', name: 'Egg Salad Lettuce Wraps', category: 'Lunch', ingredients: ['2 hard-boiled eggs, chopped', '2 tbsp Greek yogurt', '1 tsp Dijon mustard', 'Large lettuce leaves'], instructions: ['Mix eggs, yogurt, and mustard.', 'Serve scoops in lettuce leaves.'], prepTime: 10, cookTime: 0, nutritionalInfo: { carbs: '4g', sugar: '3g', sodium: '250mg', protein: '14g' } },
    { id: 'l13', name: 'Tomato Basil Soup', category: 'Lunch', ingredients: ['1 can diced tomatoes', '1/2 cup vegetable broth', 'Fresh basil leaves', '1 tbsp olive oil'], instructions: ['Simmer tomatoes and broth for 15 minutes.', 'Blend with basil and olive oil until smooth.'], prepTime: 5, cookTime: 15, nutritionalInfo: { carbs: '20g', sugar: '14g', sodium: '550mg', protein: '4g' } },
    { id: 'l14', name: 'Avocado and White Bean Salad', category: 'Lunch', ingredients: ['1/2 avocado, diced', '1/2 cup cannellini beans', '1/4 red onion, finely chopped', 'Lemon juice'], instructions: ['Gently toss all ingredients together.'], prepTime: 10, cookTime: 0, nutritionalInfo: { carbs: '30g', sugar: '2g', sodium: '200mg', protein: '10g' } },
    { id: 'l15', name: 'Cottage Cheese and Tomato Bowl', category: 'Lunch', ingredients: ['1 cup cottage cheese', '1/2 cup cherry tomatoes, halved', 'Freshly ground black pepper'], instructions: ['Combine cottage cheese and tomatoes in a bowl and season with pepper.'], prepTime: 5, cookTime: 0, nutritionalInfo: { carbs: '12g', sugar: '9g', sodium: '500mg', protein: '28g' } },
    { id: 'l16', name: 'Sardine and Avocado Toast', category: 'Lunch', ingredients: ['1 slice Ezekiel bread, toasted', '1 can sardines in olive oil, mashed', '1/4 avocado'], instructions: ['Spread mashed sardines and avocado on toast.'], prepTime: 5, cookTime: 2, nutritionalInfo: { carbs: '18g', sugar: '1g', sodium: '350mg', protein: '20g' } },
    { id: 'l17', name: 'Simple Cucumber Salad', category: 'Lunch', ingredients: ['1 large cucumber, thinly sliced', '2 tbsp rice vinegar', '1 tbsp sesame oil', 'Sesame seeds'], instructions: ['Toss cucumber with vinegar and oil.', 'Garnish with sesame seeds.'], prepTime: 8, cookTime: 0, nutritionalInfo: { carbs: '8g', sugar: '4g', sodium: '15mg', protein: '2g' } },
    { id: 'l18', name: 'Roast Beef and Swiss Roll-ups', category: 'Lunch', ingredients: ['4 slices roast beef', '2 slices Swiss cheese'], instructions: ['Lay out roast beef slices, top with cheese, and roll up tightly.'], prepTime: 5, cookTime: 0, nutritionalInfo: { carbs: '2g', sugar: '1g', sodium: '600mg', protein: '22g' } },
    { id: 'l19', name: 'Cold Soba Noodle Salad', category: 'Lunch', ingredients: ['1 bundle soba noodles, cooked and cooled', '1/2 cup shelled edamame', 'Scallions, chopped', 'Soy-ginger dressing'], instructions: ['Toss cold noodles with edamame, scallions, and dressing.'], prepTime: 5, cookTime: 10, nutritionalInfo: { carbs: '50g', sugar: '6g', sodium: '500mg', protein: '20g' } },
    { id: 'l20', name: 'Open-Faced Chicken Salad Sandwich', category: 'Lunch', ingredients: ['1 slice rye bread', '1/2 cup cooked chicken, shredded', '2 tbsp plain yogurt', 'Chopped celery'], instructions: ['Mix chicken, yogurt, and celery.', 'Spread on a slice of toasted rye bread.'], prepTime: 10, cookTime: 2, nutritionalInfo: { carbs: '25g', sugar: '4g', sodium: '400mg', protein: '20g' } },
    { id: 'l21', name: 'Minestrone Soup', category: 'Lunch', ingredients: ['Mixed vegetables (carrots, celery, zucchini)', '1/2 cup kidney beans', '1/2 cup small pasta', '4 cups vegetable broth'], instructions: ['Simmer vegetables, beans, and broth until tender.', 'Add pasta and cook until al dente.'], prepTime: 15, cookTime: 25, nutritionalInfo: { carbs: '40g', sugar: '10g', sodium: '700mg', protein: '15g' } },
    { id: 'l22', name: 'Three-Bean Salad', category: 'Lunch', ingredients: ['1/4 cup each of kidney, garbanzo, and green beans', '1/4 red onion, chopped', 'Light vinaigrette'], instructions: ['Combine all beans and onion.', 'Toss with vinaigrette and chill.'], prepTime: 10, cookTime: 0, nutritionalInfo: { carbs: '35g', sugar: '8g', sodium: '300mg', protein: '12g' } },
    { id: 'l23', name: 'Spinach and Feta Stuffed Chicken', category: 'Lunch', ingredients: ['1 small chicken breast', '1/4 cup spinach', '2 tbsp feta cheese'], instructions: ['Butterfly the chicken breast.', 'Stuff with spinach and feta.', 'Bake at 375°F for 20-25 minutes.'], prepTime: 10, cookTime: 25, nutritionalInfo: { carbs: '3g', sugar: '1g', sodium: '400mg', protein: '30g' } },
    { id: 'l24', name: 'Smoked Turkey and Apple Slices', category: 'Lunch', ingredients: ['4 slices smoked turkey', '1/2 apple, sliced'], instructions: ['Serve turkey slices alongside fresh apple slices.'], prepTime: 5, cookTime: 0, nutritionalInfo: { carbs: '15g', sugar: '12g', sodium: '700mg', protein: '18g' } },
    { id: 'l25', name: 'Broccoli Cheddar Soup', category: 'Lunch', ingredients: ['1 cup broccoli florets', '1/4 cup shredded cheddar', '1/2 cup milk', '1/2 cup chicken broth'], instructions: ['Steam broccoli until tender.', 'Blend with milk and broth.', 'Stir in cheese until melted.'], prepTime: 5, cookTime: 15, nutritionalInfo: { carbs: '15g', sugar: '8g', sodium: '600mg', protein: '12g' } },
    { id: 'l26', name: 'BLT Salad', category: 'Lunch', ingredients: ['2 cups romaine lettuce', '2 strips cooked bacon, crumbled', '1/4 cup cherry tomatoes', 'Ranch dressing'], instructions: ['Toss lettuce, bacon, and tomatoes with dressing.'], prepTime: 10, cookTime: 5, nutritionalInfo: { carbs: '10g', sugar: '6g', sodium: '500mg', protein: '10g' } },
    { id: 'l27', name: 'Shrimp and Avocado Ceviche', category: 'Lunch', ingredients: ['4 oz cooked shrimp, chopped', '1/2 avocado, diced', '1/4 cup diced onion and tomato', 'Lime juice'], instructions: ['Mix all ingredients.', 'Let marinate in lime juice for 10 minutes.'], prepTime: 15, cookTime: 0, nutritionalInfo: { carbs: '15g', sugar: '5g', sodium: '250mg', protein: '20g' } },
    { id: 'l28', name: 'Mushroom and Barley Soup', category: 'Lunch', ingredients: ['1/2 cup sliced mushrooms', '1/4 cup pearl barley', '4 cups beef or vegetable broth'], instructions: ['Sauté mushrooms.', 'Add barley and broth, simmer for 40-50 minutes until barley is tender.'], prepTime: 5, cookTime: 50, nutritionalInfo: { carbs: '35g', sugar: '4g', sodium: '650mg', protein: '8g' } },
    { id: 'l29', name: 'Pizza on English Muffin', category: 'Lunch', ingredients: ['1 whole wheat English muffin, split', '2 tbsp tomato sauce', '1/4 cup shredded mozzarella'], instructions: ['Top muffin halves with sauce and cheese.', 'Toast or bake until cheese is bubbly.'], prepTime: 3, cookTime: 8, nutritionalInfo: { carbs: '30g', sugar: '6g', sodium: '550mg', protein: '14g' } },
    { id: 'l30', name: 'Deconstructed Sushi Bowl', category: 'Lunch', ingredients: ['1/2 cup cooked brown rice', '2 oz smoked salmon', 'Diced cucumber and avocado', 'Soy sauce'], instructions: ['Layer rice, salmon, cucumber, and avocado in a bowl.', 'Drizzle with soy sauce.'], prepTime: 10, cookTime: 0, nutritionalInfo: { carbs: '45g', sugar: '4g', sodium: '500mg', protein: '18g' } },

  // Dinner
  {
    id: 'd1',
    name: 'Lemon Herb Baked Salmon',
    category: 'Dinner',
    ingredients: ['Salmon fillet', '1 lemon', 'Fresh dill', 'Olive oil', 'Salt', 'Pepper'],
    instructions: ['Preheat oven to 400°F.', 'Season salmon with oil, dill, salt, and pepper.', 'Top with lemon slices and bake for 12-15 mins.'],
    prepTime: 5,
    cookTime: 15,
    nutritionalInfo: { carbs: '2g', sugar: '1g', sodium: '150mg', protein: '40g' },
  },
  {
    id: 'd2',
    name: 'Sheet Pan Chicken and Veggies',
    category: 'Dinner',
    ingredients: ['1 chicken breast', 'Broccoli florets', 'Bell pepper strips', 'Olive oil', 'Italian seasoning'],
    instructions: ['Toss chicken and veggies with oil and seasoning.', 'Roast at 400°F for 20-25 mins.'],
    prepTime: 10,
    cookTime: 25,
    nutritionalInfo: { carbs: '15g', sugar: '7g', sodium: '200mg', protein: '30g' },
  },
  {
    id: 'd3',
    name: 'Spaghetti with Turkey Meatballs',
    category: 'Dinner',
    ingredients: ['1 serving whole wheat spaghetti', '4 turkey meatballs', '1/2 cup marinara sauce'],
    instructions: ['Cook spaghetti.', 'Heat meatballs in marinara sauce.', 'Serve meatballs over spaghetti.'],
    prepTime: 5,
    cookTime: 20,
    nutritionalInfo: { carbs: '50g', sugar: '12g', sodium: '700mg', protein: '30g' },
  },
    { id: 'd4', name: 'Beef and Broccoli', category: 'Dinner', ingredients: ['4 oz sirloin steak', '1 cup broccoli florets', '2 tbsp soy sauce', '1 tsp ginger'], instructions: ['Slice and cook steak.', 'Add broccoli and stir-fry.', 'Add sauce and ginger.'], prepTime: 15, cookTime: 10, nutritionalInfo: { carbs: '12g', sugar: '5g', sodium: '600mg', protein: '35g' } },
    { id: 'd5', name: 'Baked Cod with Asparagus', category: 'Dinner', ingredients: ['6 oz cod fillet', '1 bunch asparagus', '1 lemon', 'Olive oil'], instructions: ['Toss asparagus with olive oil.', 'Place cod and asparagus on a baking sheet.', 'Top with lemon slices.', 'Bake at 400°F for 15 mins.'], prepTime: 5, cookTime: 15, nutritionalInfo: { carbs: '10g', sugar: '4g', sodium: '180mg', protein: '35g' } },
    { id: 'd6', name: 'Chicken and Vegetable Skewers', category: 'Dinner', ingredients: ['1 chicken breast, cubed', 'Cherry tomatoes', 'Zucchini chunks', 'Onion pieces'], instructions: ['Thread chicken and veggies onto skewers.', 'Grill or bake until chicken is cooked.'], prepTime: 15, cookTime: 15, nutritionalInfo: { carbs: '10g', sugar: '6g', sodium: '150mg', protein: '28g' } },
    { id: 'd7', name: 'Stuffed Bell Peppers', category: 'Dinner', ingredients: ['2 bell peppers', '1/2 cup cooked ground turkey', '1/4 cup cooked brown rice', '2 tbsp tomato sauce'], instructions: ['Cut peppers in half and remove seeds.', 'Mix turkey, rice, and sauce.', 'Stuff peppers and bake at 375°F for 25 mins.'], prepTime: 10, cookTime: 30, nutritionalInfo: { carbs: '25g', sugar: '10g', sodium: '400mg', protein: '20g' } },
    { id: 'd8', name: 'Pork Chops with Roasted Apples', category: 'Dinner', ingredients: ['1 boneless pork chop', '1/2 apple, sliced', '1 tsp cinnamon', 'Olive oil'], instructions: ['Sear pork chop.', 'In the same pan, cook apple slices with cinnamon.', 'Serve apples over pork chop.'], prepTime: 5, cookTime: 15, nutritionalInfo: { carbs: '15g', sugar: '12g', sodium: '100mg', protein: '30g' } },
    { id: 'd9', name: 'Shrimp Scampi with Zucchini Noodles', category: 'Dinner', ingredients: ['5 oz shrimp', '2 zucchini, spiralized', '2 cloves garlic', '1 tbsp olive oil', 'Lemon juice'], instructions: ['Sauté garlic in olive oil.', 'Add shrimp and cook through.', 'Toss with zucchini noodles and lemon juice.'], prepTime: 10, cookTime: 8, nutritionalInfo: { carbs: '15g', sugar: '8g', sodium: '300mg', protein: '25g' } },
    { id: 'd10', name: 'Vegetarian Chili', category: 'Dinner', ingredients: ['1/2 cup kidney beans', '1/2 cup black beans', '1/2 cup canned tomatoes', 'Chili powder'], instructions: ['Combine all ingredients in a pot.', 'Simmer for at least 30 minutes.'], prepTime: 5, cookTime: 30, nutritionalInfo: { carbs: '50g', sugar: '10g', sodium: '700mg', protein: '15g' } },
    { id: 'd11', name: 'Shepherds Pie with Cauliflower Mash', category: 'Dinner', ingredients: ['1 lb lean ground turkey', '1 cup mixed vegetables', '1 head cauliflower, steamed and mashed', 'Beef broth'], instructions: ['Brown the turkey and add vegetables.', 'Top with cauliflower mash.', 'Bake at 375°F for 20 minutes.'], prepTime: 20, cookTime: 30, nutritionalInfo: { carbs: '20g', sugar: '10g', sodium: '500mg', protein: '40g' } },
    { id: 'd12', name: 'Lemon Dill Chicken', category: 'Dinner', ingredients: ['1 chicken breast', '1 lemon, juiced', '1 tbsp fresh dill', '1 tbsp olive oil'], instructions: ['Marinate chicken in lemon juice, dill, and olive oil.', 'Bake or grill until cooked through.'], prepTime: 15, cookTime: 20, nutritionalInfo: { carbs: '5g', sugar: '2g', sodium: '150mg', protein: '35g' } },
    { id: 'd13', name: 'Tuna Patties', category: 'Dinner', ingredients: ['1 can tuna', '1 egg', '2 tbsp almond flour', 'Herbs of choice'], instructions: ['Mix all ingredients.', 'Form into patties and pan-fry until golden brown.'], prepTime: 10, cookTime: 8, nutritionalInfo: { carbs: '5g', sugar: '1g', sodium: '300mg', protein: '25g' } },
    { id: 'd14', name: 'Ratatouille', category: 'Dinner', ingredients: ['Eggplant, Zucchini, Bell peppers, Tomato', 'Onion and garlic', 'Olive oil'], instructions: ['Sauté onion and garlic.', 'Layer sliced vegetables in a baking dish, drizzle with oil.', 'Bake at 375°F for 45-60 minutes.'], prepTime: 20, cookTime: 60, nutritionalInfo: { carbs: '25g', sugar: '15g', sodium: '50mg', protein: '5g' } },
    { id: 'd15', name: 'Cauliflower Crust Pizza', category: 'Dinner', ingredients: ['1 cauliflower head, riced', '1 egg', '1/4 cup mozzarella', 'Tomato sauce and toppings'], instructions: ['Mix riced cauliflower with egg and half the cheese.', 'Form crust and bake.', 'Add sauce, cheese, and toppings, then bake again.'], prepTime: 20, cookTime: 25, nutritionalInfo: { carbs: '15g', sugar: '8g', sodium: '450mg', protein: '20g' } },
    { id: 'd16', name: 'Blackened Tilapia', category: 'Dinner', ingredients: ['1 tilapia fillet', '1 tbsp blackening seasoning', '1 tbsp olive oil'], instructions: ['Coat tilapia with seasoning.', 'Pan-sear in olive oil for 3-4 minutes per side.'], prepTime: 5, cookTime: 8, nutritionalInfo: { carbs: '1g', sugar: '0g', sodium: '400mg', protein: '30g' } },
    { id: 'd17', name: 'Chicken Cacciatore', category: 'Dinner', ingredients: ['1 chicken breast', '1/2 cup mushrooms', '1/2 cup bell peppers', '1/2 cup tomato sauce'], instructions: ['Sear chicken.', 'Sauté vegetables.', 'Add back chicken and sauce, simmer for 20 minutes.'], prepTime: 10, cookTime: 30, nutritionalInfo: { carbs: '18g', sugar: '12g', sodium: '600mg', protein: '35g' } },
    { id: 'd18', name: 'Lentil Loaf', category: 'Dinner', ingredients: ['2 cups cooked lentils', '1/2 cup breadcrumbs', '1 egg', 'Chopped onions and carrots'], instructions: ['Mash lentils and mix with other ingredients.', 'Form into a loaf and bake at 350°F for 45 minutes.'], prepTime: 15, cookTime: 45, nutritionalInfo: { carbs: '55g', sugar: '10g', sodium: '300mg', protein: '25g' } },
    { id: 'd19', name: 'Sausage and Peppers', category: 'Dinner', ingredients: ['2 links Italian chicken sausage', '1 sliced bell pepper', '1/2 sliced onion'], instructions: ['Sauté sausage, peppers, and onion until cooked through.'], prepTime: 10, cookTime: 20, nutritionalInfo: { carbs: '15g', sugar: '8g', sodium: '700mg', protein: '25g' } },
    { id: 'd20', name: 'Eggplant Parmesan', category: 'Dinner', ingredients: ['1 small eggplant, sliced', '1/2 cup marinara sauce', '1/4 cup mozzarella cheese'], instructions: ['Bake or grill eggplant slices.', 'Layer with sauce and cheese in a baking dish.', 'Bake until bubbly.'], prepTime: 15, cookTime: 30, nutritionalInfo: { carbs: '25g', sugar: '15g', sodium: '550mg', protein: '15g' } },
    { id: 'd21', name: 'Garlic Herb Roasted Chicken Thighs', category: 'Dinner', ingredients: ['2 chicken thighs', '3 cloves garlic, minced', '1 tbsp mixed herbs (rosemary, thyme)', 'Olive oil'], instructions: ['Rub chicken with garlic, herbs, and oil.', 'Roast at 400°F for 25-30 minutes.'], prepTime: 10, cookTime: 30, nutritionalInfo: { carbs: '2g', sugar: '0g', sodium: '200mg', protein: '30g' } },
    { id: 'd22', name: 'Vegetable Curry', category: 'Dinner', ingredients: ['2 cups mixed vegetables (cauliflower, peas, carrots)', '1/2 cup coconut milk', '1 tbsp curry powder'], instructions: ['Simmer vegetables in coconut milk with curry powder until tender.'], prepTime: 10, cookTime: 20, nutritionalInfo: { carbs: '25g', sugar: '12g', sodium: '100mg', protein: '8g' } },
    { id: 'd23', name: 'Turkey Burgers on Lettuce', category: 'Dinner', ingredients: ['4 oz ground turkey patty', 'Large lettuce leaf for bun', 'Tomato and onion slices'], instructions: ['Grill or pan-fry turkey patty.', 'Serve on a lettuce leaf with desired toppings.'], prepTime: 5, cookTime: 10, nutritionalInfo: { carbs: '5g', sugar: '3g', sodium: '250mg', protein: '28g' } },
    { id: 'd24', name: 'Poached Cod in Tomato Broth', category: 'Dinner', ingredients: ['6 oz cod fillet', '1 cup canned diced tomatoes', 'Herbs (basil, oregano)'], instructions: ['Bring tomatoes and herbs to a simmer in a pan.', 'Gently place cod in the broth and poach for 8-10 minutes.'], prepTime: 5, cookTime: 15, nutritionalInfo: { carbs: '10g', sugar: '8g', sodium: '400mg', protein: '35g' } },
    { id: 'd25', name: 'Zucchini Boats', category: 'Dinner', ingredients: ['2 medium zucchini', '1/2 cup lean ground beef, cooked', '2 tbsp tomato sauce', '1/4 cup shredded cheese'], instructions: ['Halve zucchini and scoop out flesh.', 'Mix flesh with beef and sauce.', 'Refill boats, top with cheese, and bake at 375°F for 20 minutes.'], prepTime: 15, cookTime: 25, nutritionalInfo: { carbs: '12g', sugar: '8g', sodium: '450mg', protein: '25g' } },
    { id: 'd26', name: 'Mushroom Risotto (with brown rice)', category: 'Dinner', ingredients: ['1/2 cup Arborio brown rice', '1 cup sliced mushrooms', '3 cups vegetable broth, warm', '1/4 cup Parmesan cheese'], instructions: ['Sauté mushrooms.', 'Toast rice, then gradually add warm broth, stirring constantly.', 'Stir in Parmesan at the end.'], prepTime: 10, cookTime: 45, nutritionalInfo: { carbs: '50g', sugar: '4g', sodium: '700mg', protein: '15g' } },
    { id: 'd27', name: 'Foil-Packet Lemon Herb White Fish', category: 'Dinner', ingredients: ['1 white fish fillet (e.g., flounder)', '1/2 lemon, sliced', 'Zucchini ribbons', 'Fresh thyme sprigs'], instructions: ['Place fish and vegetables on a sheet of foil.', 'Top with lemon and thyme.', 'Seal packet and bake at 400°F for 15-20 minutes.'], prepTime: 10, cookTime: 20, nutritionalInfo: { carbs: '8g', sugar: '4g', sodium: '180mg', protein: '28g' } },
    { id: 'd28', name: 'Unstuffed Cabbage Rolls', category: 'Dinner', ingredients: ['1/2 lb lean ground turkey', '1/2 head cabbage, chopped', '1 can diced tomatoes, undrained', '1/4 cup brown rice'], instructions: ['Brown turkey, then add cabbage and cook until wilted.', 'Stir in tomatoes and uncooked rice.', 'Simmer for 25-30 minutes until rice is cooked.'], prepTime: 10, cookTime: 40, nutritionalInfo: { carbs: '30g', sugar: '15g', sodium: '500mg', protein: '30g' } },
    { id: 'd29', name: 'Rosemary Roasted Pork Tenderloin', category: 'Dinner', ingredients: ['1 lb pork tenderloin', '2 tbsp fresh rosemary, chopped', '2 cloves garlic, minced', 'Olive oil'], instructions: ['Rub pork with rosemary, garlic, and oil.', 'Roast at 400°F for 20-25 minutes, or until internal temperature reaches 145°F.'], prepTime: 10, cookTime: 25, nutritionalInfo: { carbs: '1g', sugar: '0g', sodium: '150mg', protein: '45g' } },
    { id: 'd30', name: 'Simple Salmon Chowder', category: 'Dinner', ingredients: ['4 oz cooked salmon, flaked', '1/2 cup diced potatoes', '1/4 cup diced celery and carrots', '1 cup milk'], instructions: ['Boil vegetables until tender.', 'Reduce heat, add milk and salmon.', 'Warm through gently without boiling.'], prepTime: 15, cookTime: 20, nutritionalInfo: { carbs: '25g', sugar: '10g', sodium: '300mg', protein: '28g' } },

  // Snacks
  {
    id: 's1',
    name: 'Greek Yogurt with Berries',
    category: 'Snacks',
    ingredients: ['1 cup Greek yogurt', '1/2 cup mixed berries', '1 tbsp chopped nuts'],
    instructions: ['Combine yogurt, berries, and nuts in a bowl.'],
    prepTime: 3,
    cookTime: 0,
    nutritionalInfo: { carbs: '15g', sugar: '10g', sodium: '80mg', protein: '20g' },
  },
  {
    id: 's2',
    name: 'Apple Slices with Peanut Butter',
    category: 'Snacks',
    ingredients: ['1 medium apple', '2 tbsp peanut butter'],
    instructions: ['Slice the apple and serve with peanut butter.'],
    prepTime: 5,
    cookTime: 0,
    nutritionalInfo: { carbs: '30g', sugar: '20g', sodium: '150mg', protein: '8g' },
  },
  {
    id: 's3',
    name: 'Handful of Almonds',
    category: 'Snacks',
    ingredients: ['1/4 cup raw almonds'],
    instructions: ['Enjoy a handful of almonds.'],
    prepTime: 1,
    cookTime: 0,
    nutritionalInfo: { carbs: '7g', sugar: '1g', sodium: '0mg', protein: '7g' },
  },
    { id: 's4', name: 'Hard-Boiled Egg', category: 'Snacks', ingredients: ['1 large egg'], instructions: ['Boil egg for 10-12 minutes.'], prepTime: 1, cookTime: 12, nutritionalInfo: { carbs: '1g', sugar: '1g', sodium: '70mg', protein: '6g' } },
    { id: 's5', name: 'Celery Sticks with Cream Cheese', category: 'Snacks', ingredients: ['2 celery stalks', '2 tbsp cream cheese'], instructions: ['Spread cream cheese on celery.'], prepTime: 5, cookTime: 0, nutritionalInfo: { carbs: '4g', sugar: '2g', sodium: '200mg', protein: '3g' } },
    { id: 's6', name: 'Baby Carrots with Hummus', category: 'Snacks', ingredients: ['1 cup baby carrots', '1/4 cup hummus'], instructions: ['Serve carrots with hummus for dipping.'], prepTime: 3, cookTime: 0, nutritionalInfo: { carbs: '20g', sugar: '8g', sodium: '300mg', protein: '5g' } },
    { id: 's7', name: 'A Pear', category: 'Snacks', ingredients: ['1 medium pear'], instructions: ['Wash and eat.'], prepTime: 1, cookTime: 0, nutritionalInfo: { carbs: '25g', sugar: '17g', sodium: '0mg', protein: '1g' } },
    { id: 's8', name: 'String Cheese', category: 'Snacks', ingredients: ['1 stick of mozzarella string cheese'], instructions: ['Unwrap and enjoy.'], prepTime: 1, cookTime: 0, nutritionalInfo: { carbs: '1g', sugar: '0g', sodium: '200mg', protein: '7g' } },
    { id: 's9', name: 'Small Bowl of Olives', category: 'Snacks', ingredients: ['1/4 cup mixed olives'], instructions: ['Serve in a small bowl.'], prepTime: 2, cookTime: 0, nutritionalInfo: { carbs: '2g', sugar: '0g', sodium: '400mg', protein: '0.5g' } },
    { id: 's10', name: 'Edamame (Steamed)', category: 'Snacks', ingredients: ['1/2 cup shelled edamame', 'Pinch of salt'], instructions: ['Steam edamame for 5-7 minutes.', 'Sprinkle with salt.'], prepTime: 2, cookTime: 7, nutritionalInfo: { carbs: '10g', sugar: '3g', sodium: '150mg', protein: '11g' } },
    { id: 's11', name: 'Cottage Cheese with Cantaloupe', category: 'Snacks', ingredients: ['1/2 cup cottage cheese', '1/2 cup cubed cantaloupe'], instructions: ['Mix cottage cheese and cantaloupe together.'], prepTime: 5, cookTime: 0, nutritionalInfo: { carbs: '10g', sugar: '8g', sodium: '400mg', protein: '14g' } },
    { id: 's12', name: 'A Handful of Walnuts', category: 'Snacks', ingredients: ['1/4 cup walnuts'], instructions: ['Enjoy a handful of walnuts.'], prepTime: 1, cookTime: 0, nutritionalInfo: { carbs: '4g', sugar: '1g', sodium: '0mg', protein: '4g' } },
    { id: 's13', name: 'Cucumber Slices with Dill Dip', category: 'Snacks', ingredients: ['1/2 cucumber, sliced', '1/4 cup Greek yogurt', '1 tsp fresh dill'], instructions: ['Mix yogurt and dill for a dip.', 'Serve with cucumber slices.'], prepTime: 8, cookTime: 0, nutritionalInfo: { carbs: '7g', sugar: '5g', sodium: '50mg', protein: '6g' } },
    { id: 's14', name: 'Beef Jerky', category: 'Snacks', ingredients: ['1 oz low-sodium beef jerky'], instructions: ['Choose a brand with minimal added sugars and nitrates.'], prepTime: 1, cookTime: 0, nutritionalInfo: { carbs: '3g', sugar: '2g', sodium: '450mg', protein: '12g' } },
    { id: 's15', name: 'Roasted Chickpeas', category: 'Snacks', ingredients: ['1/2 cup chickpeas, rinsed and dried', '1 tsp olive oil', 'Spices (paprika, garlic powder)'], instructions: ['Toss chickpeas with oil and spices.', 'Roast at 400°F for 20-25 minutes until crispy.'], prepTime: 5, cookTime: 25, nutritionalInfo: { carbs: '25g', sugar: '2g', sodium: '250mg', protein: '8g' } },
    { id: 's16', name: 'Bell Pepper Strips', category: 'Snacks', ingredients: ['1/2 bell pepper (any color), sliced'], instructions: ['Enjoy raw bell pepper strips.'], prepTime: 5, cookTime: 0, nutritionalInfo: { carbs: '7g', sugar: '5g', sodium: '5mg', protein: '1g' } },
    { id: 's17', name: 'Cherry Tomatoes with Feta', category: 'Snacks', ingredients: ['1/2 cup cherry tomatoes', '2 tbsp crumbled feta cheese'], instructions: ['Toss tomatoes with feta.'], prepTime: 4, cookTime: 0, nutritionalInfo: { carbs: '6g', sugar: '4g', sodium: '250mg', protein: '4g' } },
    { id: 's18', name: 'Rice Cake with Avocado', category: 'Snacks', ingredients: ['1 plain rice cake', '1/4 avocado, mashed'], instructions: ['Spread mashed avocado on a rice cake.'], prepTime: 3, cookTime: 0, nutritionalInfo: { carbs: '12g', sugar: '0g', sodium: '40mg', protein: '2g' } },
    { id: 's19', name: 'Small Portion of Leftover Lean Protein', category: 'Snacks', ingredients: ['2-3 oz leftover grilled chicken or fish'], instructions: ['A great way to use leftovers for a protein boost.'], prepTime: 2, cookTime: 0, nutritionalInfo: { carbs: '0g', sugar: '0g', sodium: '100mg', protein: '20g' } },
    { id: 's20', name: 'Unsweetened Almond Milk', category: 'Snacks', ingredients: ['1 cup unsweetened almond milk'], instructions: ['A light and hydrating snack.'], prepTime: 1, cookTime: 0, nutritionalInfo: { carbs: '1g', sugar: '0g', sodium: '180mg', protein: '1g' } },
    { id: 's21', name: 'Small Orange', category: 'Snacks', ingredients: ['1 small orange'], instructions: ['Peel and enjoy.'], prepTime: 2, cookTime: 0, nutritionalInfo: { carbs: '12g', sugar: '9g', sodium: '0mg', protein: '1g' } },
    { id: 's22', name: 'Pistachios (in-shell)', category: 'Snacks', ingredients: ['1/4 cup in-shell pistachios'], instructions: ['The act of shelling them can promote mindful eating.'], prepTime: 1, cookTime: 0, nutritionalInfo: { carbs: '8g', sugar: '2g', sodium: '5mg', protein: '6g' } },
    { id: 's23', name: 'Sugar-Free Gelatin', category: 'Snacks', ingredients: ['1 serving of sugar-free gelatin'], instructions: ['Prepare according to package directions.'], prepTime: 5, cookTime: 0, nutritionalInfo: { carbs: '0g', sugar: '0g', sodium: '50mg', protein: '2g' } },
    { id: 's24', name: 'Turkey Roll-Up', category: 'Snacks', ingredients: ['2 slices of turkey breast', '1 thin slice of cheese'], instructions: ['Roll the cheese up inside the turkey slices.'], prepTime: 3, cookTime: 0, nutritionalInfo: { carbs: '1g', sugar: '1g', sodium: '500mg', protein: '12g' } },
    { id: 's25', name: 'A Few Blackberries', category: 'Snacks', ingredients: ['1/2 cup blackberries'], instructions: ['Wash and enjoy this low-sugar fruit.'], prepTime: 2, cookTime: 0, nutritionalInfo: { carbs: '10g', sugar: '5g', sodium: '0mg', protein: '1g' } },
    { id: 's26', name: 'Chia Seed Drink', category: 'Snacks', ingredients: ['1 tbsp chia seeds', '1 cup water', 'Squeeze of lemon'], instructions: ['Stir chia seeds in water and let sit for 10 minutes.', 'Add lemon juice.'], prepTime: 2, cookTime: 0, nutritionalInfo: { carbs: '6g', sugar: '0g', sodium: '5mg', protein: '3g' } },
    { id: 's27', name: 'Pumpkin Seeds', category: 'Snacks', ingredients: ['2 tbsp roasted pumpkin seeds (pepitas)'], instructions: ['Enjoy a small handful of pumpkin seeds.'], prepTime: 1, cookTime: 0, nutritionalInfo: { carbs: '4g', sugar: '0g', sodium: '5mg', protein: '5g' } },
    { id: 's28', name: 'Seaweed Snacks', category: 'Snacks', ingredients: ['1 package of roasted seaweed snacks'], instructions: ['A savory, low-carb snack.'], prepTime: 1, cookTime: 0, nutritionalInfo: { carbs: '1g', sugar: '0g', sodium: '75mg', protein: '1g' } },
    { id: 's29', name: 'A Single Dill Pickle', category: 'Snacks', ingredients: ['1 medium dill pickle'], instructions: ['Great for a savory, crunchy craving.'], prepTime: 1, cookTime: 0, nutritionalInfo: { carbs: '4g', sugar: '2g', sodium: '800mg', protein: '0g' } },
    { id: 's30', name: 'Plain Greek Yogurt', category: 'Snacks', ingredients: ['1/2 cup plain, non-fat Greek yogurt'], instructions: ['A simple, protein-packed snack.'], prepTime: 2, cookTime: 0, nutritionalInfo: { carbs: '5g', sugar: '5g', sodium: '50mg', protein: '12g' } },
];


export const placeholderExercises: Exercise[] = [
  {
    id: 'ex1',
    name: 'Chair Squats',
    description: 'Stand in front of a sturdy chair. Lower your hips towards the chair as if you are about to sit, keeping your chest up. Lightly touch the chair before standing back up. Repeat 10-15 times.',
    category: 'Strength'
  },
  {
    id: 'ex2',
    name: 'Seated Leg Lifts',
    description: 'Sit tall in a chair. Extend one leg straight out in front of you, hold for 2-3 seconds, and then lower it slowly. Alternate legs. Do 10 repetitions for each leg.',
    category: 'Strength'
  },
  {
    id: 'ex3',
    name: 'Gentle Walking',
    description: 'Walk at a comfortable pace for 15-30 minutes. Focus on maintaining good posture. Choose a flat, even surface.',
    category: 'Cardio'
  },
    {
    id: 'ex4',
    name: 'Ankle Circles',
    description: 'While seated, lift one foot off the floor. Rotate your ankle slowly in a circular motion, 5 times clockwise and 5 times counter-clockwise. Switch to the other foot.',
    category: 'Flexibility'
  },
  {
    id: 'ex5',
    name: 'Wall Push-ups',
    description: 'Stand facing a wall, about arm\'s length away. Place your hands on the wall, slightly wider than your shoulders. Slowly bend your elbows and lower your chest towards the wall. Push back to the starting position. Repeat 10-12 times.',
    category: 'Strength'
  },
  {
    id: 'ex6',
    name: 'Seated Marching',
    description: 'Sit upright in a chair with your feet flat on the floor. Lift one knee up towards your chest, then lower it. Alternate legs, as if you are marching in place. Continue for 1-2 minutes.',
    category: 'Cardio'
  },
  {
    id: 'ex7',
    name: 'Arm Circles',
    description: 'Sit or stand tall. Extend your arms out to the sides at shoulder height. Make small circles forward for 15 seconds, then backward for 15 seconds.',
    category: 'Flexibility'
  },
  {
    id: 'ex8',
    name: 'Calf Raises',
    description: 'Stand straight, holding onto the back of a chair for support. Slowly raise your heels off the floor, so you are on your tiptoes. Hold for a moment, then slowly lower your heels. Repeat 10-15 times.',
    category: 'Strength'
  },
  {
    id: 'ex9',
    name: 'Seated Torso Twist',
    description: 'Sit in a chair with your feet flat on the floor. Cross your arms over your chest. Gently twist your upper body to one side, hold for 3 seconds, then return to center and twist to the other side. Repeat 5 times on each side.',
    category: 'Flexibility'
  },
  {
    id: 'ex10',
    name: 'Standing Side Leg Raise',
    description: 'Stand behind a chair, holding on for balance. Keeping your back straight, slowly lift one leg out to the side. Hold for a moment, then lower it. Do 10 repetitions for each leg.',
    category: 'Strength'
  },
  {
    id: 'ex11',
    name: 'Shoulder Rolls',
    description: 'Sit or stand tall. Gently roll your shoulders up towards your ears, then back and down. Repeat 5 times, then reverse the direction for 5 more rolls.',
    category: 'Flexibility'
  },
  {
    id: 'ex12',
    name: 'Heel-to-Toe Walk',
    description: 'Walk in a straight line, placing the heel of one foot directly in front of the toes of the other foot. Use a wall or countertop for support if needed. Take 10-15 steps.',
    category: 'Strength'
  },
  {
    id: 'ex13',
    name: 'Seated Hamstring Stretch',
    description: 'Sit on the edge of a chair. Extend one leg straight out in front of you with the heel on the floor. Gently lean forward from your hips until you feel a stretch in the back of your leg. Hold for 20-30 seconds. Switch legs.',
    category: 'Flexibility'
  },
  {
    id: 'ex14',
    name: 'Seated Bicep Curls',
    description: 'Sit in a chair, holding a light weight or can of soup in each hand with palms facing forward. Bend your elbows and lift the weights toward your shoulders. Slowly lower them back down. Repeat 10-12 times.',
    category: 'Strength'
  },
  {
    id: 'ex15',
    name: 'Finger and Hand Stretches',
    description: 'Gently open and close your hands, stretching your fingers wide and then making a soft fist. Repeat 10 times. Then, touch each fingertip to your thumb. This helps maintain dexterity.',
    category: 'Flexibility'
  },
  {
    id: 'ex16',
    name: 'Single Leg Stance',
    description: 'Hold onto a sturdy chair for support. Lift one foot off the ground and try to balance on the other foot for 10-15 seconds. Switch legs. This improves balance.',
    category: 'Strength'
  },
  {
    id: 'ex17',
    name: 'Neck Stretches',
    description: 'Sit tall. Slowly tilt your head to one side, as if bringing your ear toward your shoulder, until you feel a gentle stretch. Hold for 15 seconds. Repeat on the other side. Do not roll your neck in a full circle.',
    category: 'Flexibility'
  },
  {
    id: 'ex18',
    name: 'Seated Row',
    description: 'Sit on the edge of a chair. Hold a resistance band with both hands, with the band looped around a stable object in front of you. Squeeze your shoulder blades together as you pull the band toward your chest. Repeat 10-12 times.',
    category: 'Strength'
  },
  {
    id: 'ex19',
    name: 'Water Aerobics',
    description: 'If you have access to a pool, walking or gentle exercises in the water are excellent for joints. The water supports your weight, reducing impact. Perform activities like walking, leg lifts, or arm movements for 15-20 minutes.',
    category: 'Cardio'
  },
  {
    id: 'ex20',
    name: 'Step-ups',
    description: 'Use a low, sturdy step or the bottom step of a staircase. Step up with your right foot, then your left. Step down with your right foot, then your left. Hold a handrail for support. Repeat 10 times, leading with each foot.',
    category: 'Strength'
  },
  {
    id: 'ex21',
    name: 'Chest Stretch',
    description: 'Sit or stand tall. Clasp your hands behind your back. Gently straighten your arms and lift your hands slightly until you feel a stretch across your chest. Hold for 20-30 seconds.',
    category: 'Flexibility'
  },
  {
    id: 'ex22',
    name: 'Glute Bridge',
    description: 'Lie on your back with your knees bent and feet flat on the floor. Slowly lift your hips off the floor until your body forms a straight line from your shoulders to your knees. Hold for a moment, then lower. Repeat 10 times.',
    category: 'Strength'
  },
  {
    id: 'ex23',
    name: 'Stationary Cycling',
    description: 'If you have a stationary bike, cycle at a low resistance for 15-20 minutes. This is a great non-impact cardio workout.',
    category: 'Cardio'
  },
  {
    id: 'ex24',
    name: 'Triceps Stretch',
    description: 'Sit or stand tall. Raise one arm overhead, then bend your elbow to let your hand fall behind your head. Use your other hand to gently pull the elbow until you feel a stretch. Hold for 20-30 seconds. Switch arms.',
    category: 'Flexibility'
  },
  {
    id: 'ex25',
    name: 'Seated Leg Press (with band)',
    description: 'Sit in a chair and loop a resistance band around one foot. Hold the ends of the band. Gently press your leg forward against the resistance until it is straight. Return to the starting position. Do 10 reps per leg.',
    category: 'Strength'
  },
  {
    id: 'ex26',
    name: 'Deep Breathing',
    description: 'Sit comfortably. Inhale slowly and deeply through your nose for a count of 4, feeling your belly expand. Hold for 2 seconds. Exhale slowly through your mouth for a count of 6. Repeat for 1-2 minutes to promote relaxation.',
    category: 'Flexibility'
  },
  {
    id: 'ex27',
    name: 'Pelvic Tilts',
    description: 'Lie on your back with knees bent. Gently flatten your lower back against the floor by tightening your stomach muscles. Hold for 5 seconds, then relax. This is great for lower back strength. Repeat 10 times.',
    category: 'Strength'
  },
  {
    id: 'ex28',
    name: 'Standing Quad Stretch',
    description: 'Stand behind a chair, holding on for support. Bend one knee and grab your ankle, gently pulling your heel towards your glute. Keep your knees together. Hold for 20-30 seconds. Switch legs.',
    category: 'Flexibility'
  },
  {
    id: 'ex29',
    name: 'Tai Chi',
    description: 'Consider joining a beginner Tai Chi class. It involves slow, graceful movements that are excellent for balance, flexibility, and stress reduction.',
    category: 'Cardio'
  },
  {
    id: 'ex30',
    name: 'Wall Sit',
    description: 'Stand with your back against a wall. Slowly walk your feet forward and slide your back down the wall until your knees are bent at a 45-degree angle. Hold for 15-30 seconds. Slide back up the wall.',
    category: 'Strength'
  }
];


export const placeholderMedications: Medication[] = [
    { id: 'med1', name: 'Metformin', dosage: '500mg', frequency: 'Twice a day', time: ['08:00', '20:00'], intervalHours: 12 },
    { id: 'med2', name: 'Lisinopril', dosage: '10mg', frequency: 'Once a day', time: ['08:00'], intervalHours: 24 },
    { id: 'med3', name: 'Atorvastatin', dosage: '20mg', frequency: 'Once a day', time: ['20:00'], intervalHours: 24 },
];


const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);
const twoDaysAgo = new Date(today);
twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);


export const placeholderBpLog: BloodPressureLog[] = [
    { id: 'bp1', systolic: 122, diastolic: 81, notes: 'Morning reading', timestamp: yesterday},
    { id: 'bp2', systolic: 125, diastolic: 83, notes: 'After walk', timestamp: twoDaysAgo},
]

export const placeholderBsLog: BloodSugarLog[] = [
    { id: 'bs1', level: 98, readingTime: 'Fasting', timestamp: today},
    { id: 'bs2', level: 145, readingTime: 'After Lunch', timestamp: yesterday},
    { id: 'bs3', level: 105, readingTime: 'Before Dinner', timestamp: twoDaysAgo},
]

export const placeholderMoodLog: MoodLog[] = [
    { id: 'mood1', mood: 4, journalEntry: 'Felt good today, had a nice chat with my neighbor.', timestamp: yesterday },
    { id: 'mood2', mood: 3, journalEntry: 'A bit tired, hip was aching.', timestamp: twoDaysAgo },
]

export const bpDataForChart = [
    { date: 'Mon', systolic: 130, diastolic: 85 },
    { date: 'Tue', systolic: 128, diastolic: 82 },
    { date: 'Wed', systolic: 125, diastolic: 80 },
    { date: 'Thu', systolic: 122, diastolic: 78 },
    { date: 'Fri', systolic: 124, diastolic: 81 },
    { date: 'Sat', systolic: 120, diastolic: 79 },
    { date: 'Sun', systolic: 121, diastolic: 80 },
];

export const bsDataForChart = [
    { date: 'Mon', level: 110 },
    { date: 'Tue', level: 140 },
    { date: 'Wed', level: 120 },
    { date: 'Thu', level: 95 },
    { date: 'Fri', level: 130 },
    { date: 'Sat', level: 105 },
    { date: 'Sun', level: 100 },
];
```

---
---

### File: `/src/lib/types.ts`

```ts
export interface Recipe {
  id: string;
  name: string;
  category: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks';
  ingredients: string[];
  instructions: string[];
  prepTime: number;
  cookTime: number;
  nutritionalInfo: {
    carbs: string;
    sugar: string;
    sodium: string;
    protein: string;
  };
}

export interface MealLog {
    id: string;
    recipeName: string;
    category: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks';
    timestamp: Date;
}

export interface Exercise {
  id: string;
  name: string;
  description: string;
  category: 'Strength' | 'Cardio' | 'Flexibility';
}

export interface Medication {
    id: string;
    name: string;
    dosage: string;
    frequency: string;
    time: string[];
    intervalHours: number; // New: hours until next dose is due
}

export interface MedicationLog {
    id: string;
    medicationId: string;
    medicationName: string;
    dosage: string;
    timestamp: Date;
}

export interface BloodPressureLog {
    id:string;
    systolic: number;
    diastolic: number;
    notes: string;
    timestamp: Date;
}

export interface BloodSugarLog {
    id: string;
    level: number;
    readingTime: 'Fasting' | 'Before Meal' | 'After Meal' | 'Other';
    timestamp: Date;
}

export interface MoodLog {
    id: string;
    mood: number; // 1-5 scale
    journalEntry: string;
    timestamp: Date;
}

export interface ActivityLog {
    id: string;
    exerciseId: string;
    exerciseName: string;
    duration: number; // in minutes
    effort: number; // 1-5 scale
    timestamp: Date;
}
```

---
---

### File: `/src/lib/utils.ts`

```ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

---
---

### File: `/tailwind.config.ts`

```ts
import type {Config} from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['var(--font-inter)', 'sans-serif'],
        headline: ['var(--font-inter)', 'sans-serif'],
        code: ['monospace'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
```

---
---

### File: `/tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```
> The file content for UI components is omitted for brevity.
