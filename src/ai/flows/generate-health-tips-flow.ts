
'use server';
/**
 * @fileOverview An AI flow to generate health tips for blood pressure and blood sugar.
 *
 * - generateHealthTip - A function that generates a health tip based on readings.
 * - GenerateHealthTipInput - The input type for the generateHealthTip function.
 * - GenerateHealthTipOutput - The return type for the generateHealthTip function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ReadingSchema = z.object({
    systolic: z.number().optional(),
    diastolic: z.number().optional(),
    level: z.number().optional(),
    timestamp: z.string().optional(),
});

export const GenerateHealthTipInputSchema = z.object({
  readingType: z.enum(['bloodPressure', 'bloodSugar']),
  currentReading: ReadingSchema,
  historicalData: z.array(ReadingSchema),
});
export type GenerateHealthTipInput = z.infer<typeof GenerateHealthTipInputSchema>;

export const GenerateHealthTipOutputSchema = z.object({
  tip: z.string().describe('A helpful, safe, and encouraging medical tip for a senior user based on their health readings.'),
});
export type GenerateHealthTipOutput = z.infer<typeof GenerateHealthTipOutputSchema>;


const prompt = ai.definePrompt({
    name: 'generateHealthTipPrompt',
    input: {schema: GenerateHealthTipInputSchema},
    output: {schema: GenerateHealthTipOutputSchema},
    prompt: `You are a friendly and knowledgeable medical assistant AI for a senior user. Your goal is to provide a single, clear, and actionable health tip based on their latest health readings and historical trends. The user is managing either their blood pressure or blood sugar.

    **IMPORTANT**: The advice must be safe, grounded in general medical knowledge for seniors, and encouraging. Do not give alarming or extreme advice. Focus on gentle, positive changes related to diet, exercise, and monitoring.

    **User's Data:**
    - Reading Type: {{{readingType}}}
    - Latest Reading: {{json currentReading}}
    - Historical Readings (last 7 days): {{json historicalData}}

    **Your Task:**
    Based on the data above, generate one supportive and helpful tip.
    - If the readings are good, provide a tip for maintaining this excellent control.
    - If the readings are slightly elevated, suggest a gentle action to help lower them, like a short walk, a specific food choice, or a reminder to stay hydrated.
    - Refer to the trends if you see a pattern (e.g., "I notice your levels are a bit higher in the mornings...").

    Generate only the tip in the 'tip' field.
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

const generateHealthTipFlow = ai.defineFlow(
  {
    name: 'generateHealthTipFlow',
    inputSchema: GenerateHealthTipInputSchema,
    outputSchema: GenerateHealthTipOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);


export async function generateHealthTip(input: GenerateHealthTipInput): Promise<GenerateHealthTipOutput> {
    return generateHealthTipFlow(input);
}
