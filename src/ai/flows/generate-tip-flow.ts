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
