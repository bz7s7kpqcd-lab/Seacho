import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { demoProspects } from '@/lib/demo-data';

const drafts = [
  {
    id: 'e1',
    prospect: demoProspects[1],
    subject: 'Quick question about your African founder ecosystem piece',
    content:
      "Hi Daniel, I enjoyed your recent piece on solo-founder SaaS — it lines up closely with what I'm building at Seacho. Would you be open to a short call to swap notes?",
  },
];

export default function EmailDraftsPage() {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-display text-2xl">Email Drafts</h1>
        <p className="text-sm text-white/50">Longer-form outreach for investors and business contacts.</p>
      </div>

      <div className="flex flex-col gap-3">
        {drafts.map((d) => (
          <Card key={d.id} className="flex flex-col gap-3 p-4">
            <div className="flex items-center gap-2">
              <span className="font-medium">{d.prospect.name}</span>
              <Badge>Email</Badge>
            </div>
            <div className="rounded-lg border border-border bg-white/[0.02] p-3">
              <div className="mb-1 text-xs font-medium text-white/40">Subject</div>
              <div className="text-sm">{d.subject}</div>
            </div>
            <p className="text-sm text-white/70">{d.content}</p>
            <div className="flex gap-2">
              <Button size="sm">Copy</Button>
              <Button size="sm" variant="outline">
                Regenerate
              </Button>
              <Button size="sm" variant="ghost">
                Shorten
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
