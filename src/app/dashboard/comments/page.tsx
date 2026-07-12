import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { demoProspects } from '@/lib/demo-data';

// Demo: comment drafts keyed to prospects' recent activity.
const drafts = demoProspects.slice(0, 3).map((p, i) => ({
  id: `c${i}`,
  prospect: p,
  content: `Really relate to this — ${p.recent_activity?.toLowerCase()}. Been tackling the same thing on my end.`,
}));

export default function CommentsPage() {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-display text-2xl">Comments</h1>
        <p className="text-sm text-white/50">Ready-to-post replies that add real value to the conversation.</p>
      </div>

      <div className="flex flex-col gap-3">
        {drafts.map((d) => (
          <Card key={d.id} className="flex flex-col gap-3 p-4">
            <div className="flex items-center gap-2">
              <span className="font-medium">{d.prospect.name}</span>
              <Badge>{d.prospect.platform}</Badge>
            </div>
            <p className="text-sm text-white/70">{d.content}</p>
            <div className="flex gap-2">
              <Button size="sm">Copy</Button>
              <Button size="sm" variant="outline">
                Regenerate
              </Button>
              <Link href={`/dashboard/prospects/${d.prospect.id}`} className="ml-auto">
                <Button size="sm" variant="ghost">
                  View prospect
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
