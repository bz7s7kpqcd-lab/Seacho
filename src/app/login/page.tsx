'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleEmailLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: `${window.location.origin}/onboarding` },
      });
      if (error) throw error;
      setSent(true);
    } catch (err: any) {
      setError(err.message ?? 'Something went wrong. Check your Supabase config.');
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/onboarding` },
    });
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <Card className="w-full max-w-sm p-8">
        <h1 className="font-display text-2xl">Welcome to Seacho</h1>
        <p className="mt-1 text-sm text-white/60">Log in to see who to talk to today.</p>

        <button
          onClick={handleGoogleLogin}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-white/[0.06] py-2.5 text-sm text-white hover:bg-white/[0.1]"
        >
          Continue with Google
        </button>

        <div className="my-5 flex items-center gap-3 text-xs text-white/40">
          <div className="h-px flex-1 bg-border" />
          or
          <div className="h-px flex-1 bg-border" />
        </div>

        <form onSubmit={handleEmailLogin} className="flex flex-col gap-3">
          <input
            type="email"
            required
            placeholder="you@startup.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-xl border border-border bg-white/[0.04] px-3 py-2.5 text-sm outline-none placeholder:text-white/30 focus:border-signal/50"
          />
          <Button type="submit" disabled={loading}>
            {loading ? 'Sending link…' : 'Send magic link'}
          </Button>
        </form>

        {sent && <p className="mt-4 text-sm text-good">Check your inbox for a login link.</p>}
        {error && <p className="mt-4 text-sm text-bad">{error}</p>}

        <button
          onClick={() => router.push('/dashboard')}
          className="mt-6 w-full text-center text-xs text-white/40 hover:text-white/60"
        >
          Skip auth and view demo dashboard →
        </button>
      </Card>
    </main>
  );
}
