'use client';

import { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const SUGGESTIONS = [
  'Who should I contact today?',
  'Prioritize today\u2019s prospects',
  'Draft a message for Amara',
  'Find founders building AI tools',
];

export function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hey! I'm your growth assistant. Ask me who to talk to, or ask me to draft an outreach message." },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, open]);

  async function send(text: string) {
    if (!text.trim()) return;
    const next = [...messages, { role: 'user' as const, content: text }];
    setMessages(next);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('/api/ai/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      setMessages((m) => [...m, { role: 'assistant', content: data.reply }]);
    } catch {
      setMessages((m) => [...m, { role: 'assistant', content: "I couldn't reach the AI backend — check your OpenAI key in Settings." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-20 right-5 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-signal text-ink-950 shadow-lg shadow-signal/20 sm:bottom-6"
        aria-label="Open AI assistant"
      >
        {open ? <X size={20} /> : <Sparkles size={20} />}
      </button>

      {open && (
        <div className="fixed bottom-36 right-5 z-30 flex h-[28rem] w-[22rem] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-xl2 border border-border bg-ink-900/95 shadow-2xl backdrop-blur-xl sm:bottom-24">
          <div className="flex items-center gap-2 border-b border-border px-4 py-3">
            <Sparkles size={14} className="text-signal-soft" />
            <span className="text-sm font-medium">Growth Assistant</span>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={cn(
                  'max-w-[85%] rounded-lg px-3 py-2 text-sm',
                  m.role === 'user' ? 'ml-auto bg-signal-dim text-white' : 'bg-white/[0.05] text-white/85'
                )}
              >
                {m.content}
              </div>
            ))}
            {loading && <div className="w-fit rounded-lg bg-white/[0.05] px-3 py-2 text-sm text-white/50">Thinking…</div>}
          </div>

          {messages.length < 3 && (
            <div className="flex flex-wrap gap-1.5 px-4 pb-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="rounded-full border border-border bg-white/[0.03] px-2.5 py-1 text-xs text-white/60 hover:bg-white/[0.07]"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 border-t border-border p-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything…"
              className="flex-1 rounded-lg border border-border bg-white/[0.04] px-3 py-2 text-sm outline-none placeholder:text-white/30 focus:border-signal/50"
            />
            <button type="submit" className="flex h-8 w-8 items-center justify-center rounded-lg bg-signal text-ink-950">
              <Send size={14} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
