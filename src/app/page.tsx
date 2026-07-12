import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Signature: a slow radar sweep behind the hero, evoking the "pilot" instrument panel */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-radar-sweep opacity-40 animate-sweep" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full border border-white/[0.06]" />

      <nav className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <span className="font-display text-xl tracking-tight">Seacho</span>
        <div className="flex items-center gap-3">
          <Link href="/login" className="text-sm text-white/70 hover:text-white">
            Log in
          </Link>
          <Link href="/login">
            <Button size="sm">Get started</Button>
          </Link>
        </div>
      </nav>

      <section className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6 pt-24 text-center">
        <span className="mb-6 rounded-full border border-border bg-white/[0.04] px-3 py-1 font-mono text-xs text-signal-soft">
          HDG 360° · GROWTH
        </span>
        <h1 className="font-display text-5xl leading-[1.05] tracking-tight text-white sm:text-6xl">
          Who should you talk to today?
        </h1>
        <p className="mt-6 max-w-xl text-balance text-white/60">
          Seacho is an AI growth employee for founders. Tell it what you&apos;re building —
          it finds the customers, investors, and collaborators worth reaching, and drafts the
          first message. You stay in control of every send.
        </p>
        <div className="mt-9 flex items-center gap-3">
          <Link href="/onboarding">
            <Button size="md">Set up your Growth Context</Button>
          </Link>
          <Link href="/dashboard">
            <Button size="md" variant="outline">
              View demo dashboard
            </Button>
          </Link>
        </div>
      </section>

      <section className="relative z-10 mx-auto mt-28 grid max-w-5xl grid-cols-1 gap-4 px-6 pb-24 sm:grid-cols-3">
        {[
          { label: 'Find', desc: 'Surfaces prospects who match your Growth Context, ranked by fit.' },
          { label: 'Draft', desc: 'Generates thoughtful comments and outreach — never generic, never mass-sent.' },
          { label: 'Follow up', desc: 'Tracks every relationship through your pipeline so nothing slips.' },
        ].map((item) => (
          <div key={item.label} className="rounded-xl2 border border-border bg-glass p-6 backdrop-blur-xl">
            <div className="font-display text-lg text-signal-soft">{item.label}</div>
            <p className="mt-2 text-sm text-white/60">{item.desc}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
