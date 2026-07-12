'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Goal } from '@/types';

const GOALS: { key: Goal; label: string }[] = [
  { key: 'find_customers', label: 'Find customers' },
  { key: 'find_investors', label: 'Find investors' },
  { key: 'find_collaborators', label: 'Find collaborators' },
  { key: 'find_beta_users', label: 'Find beta users' },
  { key: 'partnerships', label: 'Partnerships' },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    product_name: '',
    one_liner: '',
    website: '',
    target_customer: '',
    industry: '',
    keywords: '',
    competitors: '',
    goals: [] as Goal[],
  });
  const [saving, setSaving] = useState(false);

  function toggleGoal(g: Goal) {
    setForm((f) => ({
      ...f,
      goals: f.goals.includes(g) ? f.goals.filter((x) => x !== g) : [...f.goals, g],
    }));
  }

  async function handleSubmit() {
    setSaving(true);
    try {
      await fetch('/api/growth-context', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          keywords: form.keywords.split(',').map((s) => s.trim()).filter(Boolean),
          competitors: form.competitors.split(',').map((s) => s.trim()).filter(Boolean),
        }),
      });
    } catch {
      // Demo mode / no backend configured yet — proceed anyway.
    } finally {
      setSaving(false);
      router.push('/dashboard');
    }
  }

  const steps = [
    // Step 0 — product basics
    <div key="0" className="flex flex-col gap-4">
      <Field label="Product name">
        <input className={inputClass} value={form.product_name} onChange={(e) => setForm({ ...form, product_name: e.target.value })} placeholder="Seacho" />
      </Field>
      <Field label="One sentence description">
        <input className={inputClass} value={form.one_liner} onChange={(e) => setForm({ ...form, one_liner: e.target.value })} placeholder="An AI growth employee for founders" />
      </Field>
      <Field label="Website">
        <input className={inputClass} value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} placeholder="growthpilot.app" />
      </Field>
    </div>,
    // Step 1 — market
    <div key="1" className="flex flex-col gap-4">
      <Field label="Target customer">
        <input className={inputClass} value={form.target_customer} onChange={(e) => setForm({ ...form, target_customer: e.target.value })} placeholder="Solo founders and small teams" />
      </Field>
      <Field label="Industry">
        <input className={inputClass} value={form.industry} onChange={(e) => setForm({ ...form, industry: e.target.value })} placeholder="B2B SaaS" />
      </Field>
      <Field label="Keywords (comma separated)">
        <input className={inputClass} value={form.keywords} onChange={(e) => setForm({ ...form, keywords: e.target.value })} placeholder="AI agents, outbound, indie hacking" />
      </Field>
      <Field label="Competitors (comma separated)">
        <input className={inputClass} value={form.competitors} onChange={(e) => setForm({ ...form, competitors: e.target.value })} placeholder="Clay, Apollo" />
      </Field>
    </div>,
    // Step 2 — goals
    <div key="2" className="flex flex-col gap-3">
      <p className="text-sm text-white/60">What do you want Seacho to help you find?</p>
      {GOALS.map((g) => (
        <button
          key={g.key}
          type="button"
          onClick={() => toggleGoal(g.key)}
          className={cn(
            'flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-colors',
            form.goals.includes(g.key) ? 'border-signal/60 bg-signal-dim text-white' : 'border-border bg-white/[0.02] text-white/70 hover:bg-white/[0.05]'
          )}
        >
          <span
            className={cn(
              'flex h-4 w-4 items-center justify-center rounded border',
              form.goals.includes(g.key) ? 'border-signal bg-signal' : 'border-white/30'
            )}
          />
          {g.label}
        </button>
      ))}
    </div>,
  ];

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      <Card className="w-full max-w-lg p-8">
        <div className="mb-6 flex items-center gap-2">
          {steps.map((_, i) => (
            <div key={i} className={cn('h-1 flex-1 rounded-full', i <= step ? 'bg-signal' : 'bg-white/10')} />
          ))}
        </div>
        <h1 className="font-display text-2xl">What are you building?</h1>
        <p className="mt-1 mb-6 text-sm text-white/60">This becomes your Growth Context — every recommendation is tuned to it.</p>

        {steps[step]}

        <div className="mt-8 flex justify-between">
          <Button variant="ghost" disabled={step === 0} onClick={() => setStep((s) => s - 1)}>
            Back
          </Button>
          {step < steps.length - 1 ? (
            <Button onClick={() => setStep((s) => s + 1)}>Continue</Button>
          ) : (
            <Button onClick={handleSubmit} disabled={saving}>
              {saving ? 'Saving…' : 'Start finding prospects'}
            </Button>
          )}
        </div>
      </Card>
    </main>
  );
}

const inputClass =
  'rounded-xl border border-border bg-white/[0.04] px-3 py-2.5 text-sm outline-none placeholder:text-white/30 focus:border-signal/50';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-white/50">{label}</span>
      {children}
    </label>
  );
}
