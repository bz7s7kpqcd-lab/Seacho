import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { demoProspects } from '@/lib/demo-data';

const drafts = demoProspects.slice(0, 2).map((p, i) => ({
  id: `m${i}`,
  prospect: p,
  content: `Hi ${p.name.split(' ')[0]}, noticed ${p.recent_activity?.toLowerCase()} — exactly the kind of thing Seacho was built for. Open to a quick chat this week?`,
  status: i === 0 ? 'draft' : 'sent',
}));

export default function MessagesPage() {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-display text-2xl">Messages</h1>
        <p className="text-sm text-white/50">DM drafts, ready for your review before sending.</p>
      </div>

      <div className="flex flex-col gap-3">
        {drafts.map((d) => (
          <Card key={d.id} className="flex flex-col gap-3 p-4">
            <div className="flex items-center gap-2">
              <span className="font-medium">{d.prospect.name}</span>
              <Badge>{d.prospect.platform}</Badge>
              <Badge className={d.status === 'sent' ? 'text-good' : ''}>{d.status}</Badge>
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
