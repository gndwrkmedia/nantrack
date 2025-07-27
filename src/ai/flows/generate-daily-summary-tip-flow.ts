
'use server';
/**
 * @fileOverview An AI flow to generate a single, holistic daily tip based on all health data.
 *
 * - generateDailySummaryTip - A function that synthesizes health data into a single tip.
 * - GenerateDailySummaryTipInput - The input type for the function.
 * - GenerateDailySummaryTipOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Schemas for input data types
const ReadingSchema = z.object({
    systolic: z.number().optional(),
    diastolic: z.number().optional(),
    level: z.number().optional(),
    timestamp: z.string().optional(),
});

const ActivityLogSchema = z.object({
  exerciseName: z.string(),
  duration: z.number(),
  effort: z.number(),
  timestamp: z.string(),
});

const MoodLogSchema = z.object({
  mood: z.number(),
  journalEntry: z.string().optional(),
  timestamp: z.string(),
});

const NutritionDataSchema = z.object({
    waterCount: z.number(),
});

// Input schema for the main flow
const GenerateDailySummaryTipInputSchema = z.object({
  bloodPressure: z.object({
    currentReading: ReadingSchema.optional(),
    historicalData: z.array(ReadingSchema).optional(),
  }).optional(),
  bloodSugar: z.object({
    currentReading: ReadingSchema.optional(),
    historicalData: z.array(ReadingSchema).optional(),
  }).optional(),
  fitness: z.object({
    activityLog: z.array(ActivityLogSchema).optional(),
  }).optional(),
  nutrition: NutritionDataSchema.optional(),
  mood: z.object({
    moodLog: z.array(MoodLogSchema).optional(),
  }).optional(),
});
export type GenerateDailySummaryTipInput = z.infer<typeof GenerateDailySummaryTipInputSchema>;

// Output schema for the main flow
const GenerateDailySummaryTipOutputSchema = z.object({
  tip: z.string().describe('A single, holistic, and prioritized health tip for a senior user based on their overall daily health data.'),
});
export type GenerateDailySummaryTipOutput = z.infer<typeof GenerateDailySummaryTipOutputSchema>;


const prompt = ai.definePrompt({
    name: 'generateDailySummaryTipPrompt',
    input: {schema: GenerateDailySummaryTipInputSchema},
    output: {schema: GenerateDailySummaryTipOutputSchema},
    prompt: `You are a holistic wellness coach AI for a senior user. Your task is to analyze all of their health data for the day and provide a single, prioritized, and encouraging "Tip of the Day".

    **IMPORTANT**: The advice must be safe, encouraging, and easy to understand for a senior. Synthesize the information to find the most important area to focus on. Do not give multiple tips. Pick the ONE most impactful piece of advice.

    **User's Comprehensive Health Data:**
    {{#if bloodPressure}}
    - Blood Pressure: {{json bloodPressure}}
    {{/if}}
    {{#if bloodSugar}}
    - Blood Sugar: {{json bloodSugar}}
    {{/if}}
    {{#if fitness.activityLog}}
    - Fitness Log: {{json fitness.activityLog}}
    {{else}}
    - Fitness Log: No activity logged today.
    {{/if}}
    {{#if nutrition}}
    - Nutrition Log (Water): {{json nutrition}}
    {{/if}}
    {{#if mood.moodLog}}
    - Mood Log: {{json mood.moodLog}}
    {{else}}
    - Mood Log: No mood logged today.
    {{/if}}

    **Your Task:**
    1. Review all the data above.
    2. Identify the single most important area for the user to focus on right now. (e.g., if blood sugar is high, that's a priority. If they seem sad, focus on mood. If they haven't moved, suggest gentle activity).
    3. Generate one supportive, actionable, and holistic tip that connects different aspects of their health if possible (e.g., "A short 10-minute walk after your meal can be a great way to help with blood sugar and also lift your spirits.").
    4. If all data looks good, provide a positive reinforcement message.

    Generate only the single tip in the 'tip' field.
    `,
    config: {
        safetySettings: [
          {
            category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
            threshold: 'BLOCK_NONE',
          },
        ],
    }
});

const generateDailySummaryTipFlow = ai.defineFlow(
  {
    name: 'generateDailySummaryTipFlow',
    inputSchema: GenerateDailySummaryTipInputSchema,
    outputSchema: GenerateDailySummaryTipOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);


export async function generateDailySummaryTip(input: GenerateDailySummaryTipInput): Promise<GenerateDailySummaryTipOutput> {
    return generateDailySummaryTipFlow(input);
}
