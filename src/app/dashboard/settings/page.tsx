'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function SettingsPage() {
  const [apiKey, setApiKey] = useState('');
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="flex max-w-2xl flex-col gap-5">
      <div>
        <h1 className="font-display text-2xl">Settings</h1>
        <p className="text-sm text-white/50">Manage your workspace and integrations.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>OpenAI API key</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <p className="text-xs text-white/40">
            Stored per-workspace. Without a key, Seacho runs in demo mode with sample AI output.
          </p>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="sk-..."
            className="rounded-lg border border-border bg-white/[0.04] px-3 py-2 text-sm outline-none"
          />
          <Button size="sm" className="self-start">
            Save key
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <span className="text-sm text-white/70">Daily opportunity digest</span>
          <button
            onClick={() => setNotifications((n) => !n)}
            className={`h-6 w-11 rounded-full transition-colors ${notifications ? 'bg-signal' : 'bg-white/10'}`}
          >
            <span className={`block h-5 w-5 rounded-full bg-white transition-transform ${notifications ? 'translate-x-5' : 'translate-x-0.5'}`} />
          </button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <input placeholder="Full name" className="rounded-lg border border-border bg-white/[0.04] px-3 py-2 text-sm outline-none" />
          <input placeholder="Email" disabled className="rounded-lg border border-border bg-white/[0.02] px-3 py-2 text-sm text-white/40 outline-none" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Workspace</CardTitle>
        </CardHeader>
        <CardContent>
          <input placeholder="Workspace name" className="w-full rounded-lg border border-border bg-white/[0.04] px-3 py-2 text-sm outline-none" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Billing</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-white/40">Billing integration coming soon.</CardContent>
      </Card>
    </div>
  );
}
