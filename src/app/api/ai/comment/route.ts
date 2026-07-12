import { NextRequest, NextResponse } from 'next/server';
import { getOpenAIClient, isOpenAIConfigured, SYSTEM_PROMPT } from '@/lib/openai';
import { demoProspects } from '@/lib/demo-data';

export async function POST(req: NextRequest) {
  const { prospectId, tone } = await req.json();
  const prospect = demoProspects.find((p) => p.id === prospectId);
  if (!prospect) return NextResponse.json({ error: 'Prospect not found' }, { status: 404 });

  if (!isOpenAIConfigured) {
    // Demo mode fallback — deterministic, still feels personalized.
    return NextResponse.json({
      content: `${prospect.recent_activity ? `Saw your note on "${prospect.recent_activity.toLowerCase()}" — ` : ''}this resonates. I've been circling the same problem building Seacho. Curious what's worked for you so far?`,
    });
  }

  const client = getOpenAIClient()!;
  const completion = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      {
        role: 'user',
        content: `Write a short, thoughtful ${tone ?? 'friendly'} comment to leave on this person's recent post.
Name: ${prospect.name}
Recent activity: ${prospect.recent_activity}
Why they're relevant to me: ${prospect.why_relevant}
Keep it under 3 sentences, specific, and non-generic. No hashtags, no emojis unless natural.`,
      },
    ],
  });

  return NextResponse.json({ content: completion.choices[0]?.message?.content ?? '' });
}
