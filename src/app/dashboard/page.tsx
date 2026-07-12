import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { demoOpportunities, demoProspects, demoFollowUps } from '@/lib/demo-data';
import { Radar, Users, MessageSquare, Send, Clock, Calendar, TrendingUp } from 'lucide-react';

const cards = [
  { label: "Today's Opportunities", value: demoOpportunities.length, icon: Radar },
  { label: 'High Match Prospects', value: demoProspects.filter((p) => p.fit_score >= 80).length, icon: Users },
  { label: 'Comments Ready', value: 5, icon: MessageSquare },
  { label: 'Message Drafts', value: 4, icon: Send },
  { label: 'Follow Ups Due', value: demoFollowUps.length, icon: Clock },
  { label: 'Meetings Booked', value: 1, icon: Calendar },
  { label: 'Growth Score', value: '78', icon: TrendingUp },
];

const mission = [
  { label: '10 prospects', done: 6 },
  { label: '5 comments', done: 5 },
  { label: '5 outreach drafts', done: 2 },
  { label: '3 follow ups', done: 1 },
  { label: '1 meeting target', done: 0 },
];

export default function DashboardPage() {
  const totalDone = mission.reduce((a, m) => a + m.done, 0);
  const totalTarget = mission.reduce((a, m) => a + Number(m.label.match(/\d+/)?.[0] ?? 0), 0);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl">Good morning.</h1>
        <p className="text-sm text-white/50">Here&apos;s who&apos;s worth your time today.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {cards.map(({ label, value, icon: Icon }) => (
          <Card key={label} className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-white/50">{label}</span>
              <Icon size={14} className="text-signal-soft" />
            </div>
            <div className="mt-2 font-display text-2xl">{value}</div>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Today&apos;s Mission</CardTitle>
          <span className="font-mono text-xs text-white/40">
            {totalDone}/{totalTarget}
          </span>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-signal transition-all" style={{ width: `${(totalDone / totalTarget) * 100}%` }} />
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {mission.map((m) => {
              const target = Number(m.label.match(/\d+/)?.[0] ?? 0);
              const complete = m.done >= target;
              return (
                <div key={m.label} className="flex items-center justify-between rounded-lg border border-border bg-white/[0.02] px-3 py-2 text-sm">
                  <span className={complete ? 'text-white/40 line-through' : 'text-white/80'}>{m.label}</span>
                  <span className="font-mono text-xs text-white/50">
                    {m.done}/{target}
                  </span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
