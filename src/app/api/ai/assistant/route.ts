import { NextRequest, NextResponse } from 'next/server';
import { getOpenAIClient, isOpenAIConfigured, SYSTEM_PROMPT } from '@/lib/openai';
import { demoProspects, demoOpportunities, demoGrowthContext } from '@/lib/demo-data';

export async function POST(req: NextRequest) {
  const { messages } = await req.json();
  const lastUserMessage = messages[messages.length - 1]?.content ?? '';

  if (!isOpenAIConfigured) {
    // Demo-mode canned responses so the assistant is still useful without a key.
    const lower = lastUserMessage.toLowerCase();
    if (lower.includes('who should i') || lower.includes('prioritize')) {
      const top = [...demoProspects].sort((a, b) => b.fit_score - a.fit_score)[0];
      return NextResponse.json({
        reply: `Top pick today: ${top.name} (fit ${top.fit_score}). ${top.why_relevant} Suggested move: ${top.suggested_approach}`,
      });
    }
    if (lower.includes('draft')) {
      return NextResponse.json({ reply: 'Open a prospect\u2019s page and use the Outreach Draft card \u2014 I\u2019ll write a DM or email tuned to them specifically.' });
    }
    return NextResponse.json({
      reply: `I found ${demoOpportunities.length} opportunities matching your Growth Context for "${demoGrowthContext.product_name}" today. Want me to prioritize them?`,
    });
  }

  const client = getOpenAIClient()!;
  const completion = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: `${SYSTEM_PROMPT}\n\nGrowth Context: ${JSON.stringify(demoGrowthContext)}\nKnown prospects: ${JSON.stringify(demoProspects.map((p) => ({ name: p.name, fit: p.fit_score, why: p.why_relevant })))}` },
      ...messages,
    ],
  });

  return NextResponse.json({ reply: completion.choices[0]?.message?.content ?? '' });
}
