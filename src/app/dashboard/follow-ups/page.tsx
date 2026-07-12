import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { demoFollowUps } from '@/lib/demo-data';
import { cn } from '@/lib/utils';

const priorityColor = { high: 'text-bad', medium: 'text-signal-soft', low: 'text-white/40' };

export default function FollowUpsPage() {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-display text-2xl">Follow Ups</h1>
        <p className="text-sm text-white/50">Nothing slips through the cracks.</p>
      </div>

      <div className="flex flex-col gap-3">
        {demoFollowUps.map((f) => {
          const daysSince = f.prospect.last_contact_date
            ? Math.round((Date.now() - new Date(f.prospect.last_contact_date).getTime()) / 86400000)
            : null;
          return (
            <Card key={f.id} className="flex flex-col gap-3 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{f.prospect.name}</span>
                  <Badge>{f.prospect.platform}</Badge>
                </div>
                <span className={cn('text-xs font-medium capitalize', priorityColor[f.priority])}>{f.priority} priority</span>
              </div>
              {daysSince !== null && <p className="text-xs text-white/40">Last contact: {daysSince} days ago</p>}
              <div className="rounded-lg border border-border bg-white/[0.02] p-3 text-sm text-white/70">{f.suggested_message}</div>
              <div className="flex gap-2">
                <Button size="sm">Send follow up</Button>
                <Button size="sm" variant="outline">
                  Snooze
                </Button>
                <Link href={`/dashboard/prospects/${f.prospect.id}`} className="ml-auto">
                  <Button size="sm" variant="ghost">
                    View prospect
                  </Button>
                </Link>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
