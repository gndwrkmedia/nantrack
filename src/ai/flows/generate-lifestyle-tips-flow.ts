
'use server';
/**
 * @fileOverview An AI flow to generate lifestyle tips for fitness, nutrition, and mood.
 *
 * - generateLifestyleTip - A function that generates a lifestyle tip.
 * - GenerateLifestyleTipInput - The input type for the generateLifestyleTip function.
 * - GenerateLifestyleTipOutput - The return type for the generateLifestyleTip function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

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

const GenerateLifestyleTipInputSchema = z.object({
  tipType: z.enum(['fitness', 'nutrition', 'mood']),
  fitnessData: z.object({ activityLog: z.array(ActivityLogSchema) }).optional(),
  nutritionData: NutritionDataSchema.optional(),
  moodData: z.object({ moodLog: z.array(MoodLogSchema) }).optional(),
});
type GenerateLifestyleTipInput = z.infer<typeof GenerateLifestyleTipInputSchema>;

const GenerateLifestyleTipOutputSchema = z.object({
  tip: z.string().describe('A helpful, safe, and encouraging lifestyle tip for a senior user based on their recent activity.'),
});
type GenerateLifestyleTipOutput = z.infer<typeof GenerateLifestyleTipOutputSchema>;


const prompt = ai.definePrompt({
    name: 'generateLifestyleTipPrompt',
    input: {schema: GenerateLifestyleTipInputSchema},
    output: {schema: GenerateLifestyleTipOutputSchema},
    prompt: `You are a friendly and encouraging wellness coach AI for a senior user. Your goal is to provide a single, clear, and positive tip based on their recent lifestyle logs.

    **IMPORTANT**: The advice must be safe, gentle, and encouraging. Focus on celebrating small wins and suggesting simple, positive actions.

    **User's Data:**
    - Tip Type Requested: {{{tipType}}}
    {{#if fitnessData}}
    - Fitness Log: {{json fitnessData.activityLog}}
    {{/if}}
    {{#if nutritionData}}
    - Nutrition Log (Water): {{json nutritionData}}
    {{/if}}
    {{#if moodData}}
    - Mood Log: {{json moodData.moodLog}}
    {{/if}}

    **Your Task:**
    Based on the data for the requested tip type, generate one supportive and helpful tip.
    - If the user is doing well (e.g., consistent exercise, good hydration, positive mood), provide encouragement and celebrate their progress.
    - If there's room for improvement (e.g., no recent activity, low water intake, sad mood), offer a gentle, easy-to-implement suggestion. For example, suggest a short walk, a glass of water, or a relaxing activity.
    - Keep the tone light, positive, and conversational.

    Generate only the tip in the 'tip' field.
    `,
});

const generateLifestyleTipFlow = ai.defineFlow(
  {
    name: 'generateLifestyleTipFlow',
    inputSchema: GenerateLifestyleTipInputSchema,
    outputSchema: GenerateLifestyleTipOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);


export async function generateLifestyleTip(input: GenerateLifestyleTipInput): Promise<GenerateLifestyleTipOutput> {
    return generateLifestyleTipFlow(input);
}
