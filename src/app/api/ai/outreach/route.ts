import { NextRequest, NextResponse } from 'next/server';
import { getOpenAIClient, isOpenAIConfigured, SYSTEM_PROMPT } from '@/lib/openai';
import { demoProspects, demoGrowthContext } from '@/lib/demo-data';

export async function POST(req: NextRequest) {
  const { prospectId, channel, tone } = await req.json();
  const prospect = demoProspects.find((p) => p.id === prospectId);
  if (!prospect) return NextResponse.json({ error: 'Prospect not found' }, { status: 404 });

  if (!isOpenAIConfigured) {
    const body = `Hi ${prospect.name.split(' ')[0]}, I noticed ${(prospect.recent_activity ?? 'your recent work').toLowerCase()} — it's exactly the kind of problem I've been building ${demoGrowthContext.product_name} to solve. ${prospect.suggested_approach ?? ''} Would love to hear your take if you have 5 minutes this week.`;
    return NextResponse.json({
      content: body,
      subject: channel === 'email' ? `Quick question about ${prospect.company ?? 'your work'}` : undefined,
    });
  }

  const client = getOpenAIClient()!;
  const completion = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      {
        role: 'user',
        content: `Draft a ${tone ?? 'professional'} ${channel === 'email' ? 'outreach email (with subject line)' : 'DM'} to this prospect.
My product: ${demoGrowthContext.product_name} — ${demoGrowthContext.one_liner}
Prospect: ${prospect.name}, ${prospect.headline}
Why they're a good fit: ${prospect.why_relevant}
Suggested approach: ${prospect.suggested_approach}
${channel === 'email' ? 'Return as "Subject: ...\\n\\n<body>".' : 'Keep it under 80 words, no subject line.'}
Make it feel personalized — reference something specific and true about them. Never generic.`,
      },
    ],
  });

  const raw = completion.choices[0]?.message?.content ?? '';
  if (channel === 'email') {
    const [subjectLine, ...rest] = raw.split('\n\n');
    return NextResponse.json({ subject: subjectLine.replace(/^Subject:\s*/i, ''), content: rest.join('\n\n').trim() });
  }
  return NextResponse.json({ content: raw });
}
