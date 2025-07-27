
import { NextRequest, NextResponse } from 'next/server';
import { generateDailySummaryTip, GenerateDailySummaryTipInput } from '@/ai/flows/generate-daily-summary-tip-flow';
import { generateHealthTip, GenerateHealthTipInput } from '@/ai/flows/generate-health-tips-flow';
import { generateLifestyleTip, GenerateLifestyleTipInput } from '@/ai/flows/generate-lifestyle-tips-flow';

// Ensure the API key is available on the server
import 'dotenv/config';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { flow, input } = body;

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ message: 'Missing API key' }, { status: 500 });
    }

    let result;

    switch (flow) {
      case 'generateDailySummaryTip':
        result = await generateDailySummaryTip(input as GenerateDailySummaryTipInput);
        break;
      case 'generateHealthTip':
        result = await generateHealthTip(input as GenerateHealthTipInput);
        break;
      case 'generateLifestyleTip':
        result = await generateLifestyleTip(input as GenerateLifestyleTipInput);
        break;
      default:
        return NextResponse.json({ message: 'Invalid flow specified' }, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('API Route Error:', error);
    return NextResponse.json({ message: 'An error occurred', error: error.message }, { status: 500 });
  }
}
