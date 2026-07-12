import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Badge, FitScore } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { demoOpportunities } from '@/lib/demo-data';
import type { RecommendedAction } from '@/types';

const actionLabels: Record<RecommendedAction, string> = {
  comment_first: 'Comment first',
  send_dm: 'Send DM',
  follow_up_tomorrow: 'Follow up tomorrow',
  connect_first: 'Connect first',
  ignore: 'Ignore',
};

const actionColor: Record<RecommendedAction, string> = {
  comment_first: 'text-alt bg-alt-dim',
  send_dm: 'text-good bg-good/10',
  follow_up_tomorrow: 'text-signal-soft bg-signal-dim',
  connect_first: 'text-white/70 bg-white/[0.06]',
  ignore: 'text-white/40 bg-white/[0.03]',
};

export default function OpportunitiesPage() {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-display text-2xl">Opportunities</h1>
        <p className="text-sm text-white/50">Ranked by how relevant they are to your Growth Context, right now.</p>
      </div>

      <div className="flex flex-col gap-3">
        {demoOpportunities.map((opp) => (
          <Card key={opp.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <FitScore score={opp.prospect.fit_score} />
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <Link href={`/dashboard/prospects/${opp.prospect.id}`} className="font-medium hover:underline">
                    {opp.prospect.name}
                  </Link>
                  <Badge>{opp.prospect.platform}</Badge>
                </div>
                <p className="mt-0.5 text-sm text-white/60">{opp.reason}</p>
                <p className="mt-1 text-xs text-white/35">{opp.prospect.recent_activity}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:flex-col sm:items-end">
              <span className={`rounded-md px-2 py-1 text-xs font-medium ${actionColor[opp.recommended_action]}`}>
                {actionLabels[opp.recommended_action]}
              </span>
              <Link href={`/dashboard/prospects/${opp.prospect.id}`}>
                <Button size="sm" variant="outline">
                  View
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
