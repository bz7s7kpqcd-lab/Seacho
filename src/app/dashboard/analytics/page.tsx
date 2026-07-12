import { Card } from '@/components/ui/card';
import { demoAnalytics } from '@/lib/demo-data';

const totals = demoAnalytics.reduce(
  (acc, d) => ({
    prospects: acc.prospects + d.prospects_discovered,
    drafts: acc.drafts + d.outreach_drafts_created,
    replies: acc.replies + d.replies_tracked,
    meetings: acc.meetings + d.meetings_booked,
    customers: acc.customers + d.customers_closed,
  }),
  { prospects: 0, drafts: 0, replies: 0, meetings: 0, customers: 0 }
);

const conversionRate = totals.prospects ? ((totals.customers / totals.prospects) * 100).toFixed(1) : '0.0';
const maxProspects = Math.max(...demoAnalytics.map((d) => d.prospects_discovered));

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-display text-2xl">Analytics</h1>
        <p className="text-sm text-white/50">The last 7 days of growth activity.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {[
          ['Prospects discovered', totals.prospects],
          ['Outreach drafts', totals.drafts],
          ['Replies tracked', totals.replies],
          ['Meetings booked', totals.meetings],
          ['Customers', totals.customers],
          ['Conversion rate', `${conversionRate}%`],
        ].map(([label, value]) => (
          <Card key={label as string} className="p-4">
            <div className="text-xs text-white/50">{label}</div>
            <div className="mt-2 font-display text-xl">{value}</div>
          </Card>
        ))}
      </div>

      <Card className="p-5">
        <div className="mb-4 text-sm font-medium text-white/80">Weekly activity — prospects discovered</div>
        <div className="flex h-40 items-end gap-3">
          {demoAnalytics.map((d) => (
            <div key={d.day} className="flex flex-1 flex-col items-center gap-2">
              <div
                className="w-full rounded-t-md bg-signal/70"
                style={{ height: `${(d.prospects_discovered / maxProspects) * 100}%` }}
              />
              <span className="text-[10px] text-white/30">{new Date(d.day).toLocaleDateString(undefined, { weekday: 'short' })}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
