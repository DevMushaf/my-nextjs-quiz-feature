import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Quiz from '@/models/Quiz';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    await connectDB();
    
    const quiz = await Quiz.create(body);
    return NextResponse.json(quiz);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create quiz' }, { status: 500 });
  }
}