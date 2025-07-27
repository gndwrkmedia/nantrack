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
