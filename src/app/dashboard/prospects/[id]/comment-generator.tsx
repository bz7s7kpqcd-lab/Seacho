'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, RefreshCw } from 'lucide-react';

const TONES = ['Shorter', 'Friendlier', 'More professional', 'More technical'] as const;

export function CommentGenerator({ prospectId, prospectName }: { prospectId: string; prospectName: string }) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  async function generate(tone?: string) {
    setLoading(true);
    setCopied(false);
    try {
      const res = await fetch('/api/ai/comment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prospectId, tone }),
      });
      const data = await res.json();
      setContent(data.content);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>AI Comment</CardTitle>
        <Button size="sm" variant="ghost" onClick={() => generate()} disabled={loading}>
          <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
          {content ? 'Regenerate' : 'Generate'}
        </Button>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="min-h-[5rem] rounded-lg border border-border bg-white/[0.02] p-3 text-sm text-white/80">
          {content || (
            <span className="text-white/30">
              Generate a thoughtful comment to leave on {prospectName}&apos;s recent post.
            </span>
          )}
        </div>
        {content && (
          <div className="flex flex-wrap gap-1.5">
            {TONES.map((t) => (
              <Button key={t} size="sm" variant="outline" onClick={() => generate(t)}>
                {t}
              </Button>
            ))}
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
          </div>
        )}
      </CardContent>
    </Card>
  );
}
