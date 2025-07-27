
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import {firebase} from '@genkit-ai/firebase';
import {defineDotprompt, dotprompt} from 'dotprompt';

defineDotprompt({
  name: 'dotprompt/site',
  prompts: [],
});

export const ai = genkit({
  plugins: [
    firebase(),
    googleAI({
      apiKey: process.env.GEMINI_API_KEY,
    }),
    dotprompt({
      path: 'dotprompt/site.prompt',
    }),
  ],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});
