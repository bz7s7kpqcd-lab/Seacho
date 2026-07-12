'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Copy, RefreshCw } from 'lucide-react';

export function OutreachGenerator({ prospectId, prospectName }: { prospectId: string; prospectName: string }) {
  const [channel, setChannel] = useState<'dm' | 'email'>('dm');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  async function generate(tone?: string) {
    setLoading(true);
    setCopied(false);
    try {
      const res = await fetch('/api/ai/outreach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prospectId, channel, tone }),
      });
      const data = await res.json();
      setContent(data.content);
      setSubject(data.subject ?? '');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>AI Outreach Draft</CardTitle>
        <div className="flex rounded-lg border border-border p-0.5 text-xs">
          {(['dm', 'email'] as const).map((c) => (
            <button
              key={c}
              onClick={() => setChannel(c)}
              className={cn('rounded-md px-2.5 py-1 capitalize', channel === c ? 'bg-signal text-ink-950 font-medium' : 'text-white/50')}
            >
              {c === 'dm' ? 'DM' : 'Email'}
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {channel === 'email' && (subject || content) && (
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Subject"
            className="rounded-lg border border-border bg-white/[0.02] px-3 py-2 text-sm outline-none"
          />
        )}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
          placeholder={`Generate a personalized ${channel === 'dm' ? 'DM' : 'email'} explaining why ${prospectName} is a good fit.`}
          className="rounded-lg border border-border bg-white/[0.02] p-3 text-sm outline-none placeholder:text-white/30"
        />
        <div className="flex flex-wrap gap-1.5">
          <Button size="sm" onClick={() => generate()} disabled={loading}>
            <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
            {content ? 'Regenerate' : 'Generate'}
          </Button>
          <Button size="sm" variant="outline" onClick={() => generate('shorter')}>
            Shorten
          </Button>
          <Button size="sm" variant="outline" onClick={() => generate('friendly')}>
            Friendly
          </Button>
          <Button size="sm" variant="outline" onClick={() => generate('professional')}>
            Professional
          </Button>
          {content && (
            <Button
              size="sm"
              variant="secondary"
              onClick={() => {
                navigator.clipboard.writeText(content);
                setCopied(true);
              }}
            >
              <Copy size={13} />
              {copied ? 'Copied' : 'Copy'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
