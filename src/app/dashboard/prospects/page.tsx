import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Badge, FitScore } from '@/components/ui/badge';
import { demoProspects } from '@/lib/demo-data';
import { Search } from 'lucide-react';

export default function ProspectsPage() {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-display text-2xl">Prospects</h1>
        <p className="text-sm text-white/50">Everyone Seacho has surfaced, in one place.</p>
      </div>

      <div className="flex items-center gap-2 rounded-xl border border-border bg-white/[0.03] px-3 py-2">
        <Search size={15} className="text-white/40" />
        <input
          placeholder="Search by industry, role, location, platform…"
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-white/30"
        />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {demoProspects.map((p) => (
          <Link key={p.id} href={`/dashboard/prospects/${p.id}`}>
            <Card className="flex h-full flex-col gap-3 p-4 transition-colors hover:bg-white/[0.05]">
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-medium">{p.name}</div>
                  <div className="text-xs text-white/50">{p.headline}</div>
                </div>
                <FitScore score={p.fit_score} size={38} />
              </div>
              <div className="flex flex-wrap gap-1.5">
                <Badge>{p.platform}</Badge>
                {p.location && <Badge>{p.location}</Badge>}
                <Badge className="capitalize">{p.pipeline_stage}</Badge>
              </div>
              <p className="line-clamp-2 text-xs text-white/40">{p.why_relevant}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
