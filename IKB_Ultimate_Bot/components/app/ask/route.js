import { NextResponse } from 'next/server';

const BLACKBOX_API_URL = 'https://api.blackboxai.com/v1/generate'; // placeholder URL
const BLACKBOX_API_KEY = process.env.BLACKBOX_API_KEY; // assumes you set your API key in env

export async function POST(req) {
  try {
    const body = await req.json();
    const userMessage = body.message;

    if (!userMessage) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Call Blackbox AI API
    const response = await fetch(BLACKBOX_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${BLACKBOX_API_KEY}`,
      },
      body: JSON.stringify({
        prompt: userMessage,
        max_tokens: 100,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({ error: 'Failed to get AI response', details: errorText }, { status: 500 });
    }

    const data = await response.json();
    // Assuming the AI response is in data.reply or similar key; adjust as needed
    const aiReply = data.reply || 'No reply from AI';

    return NextResponse.json({ reply: aiReply });
  } catch (error) {
    return NextResponse.json({ error: 'Server error', details: error.message }, { status: 500 });
  }
}

