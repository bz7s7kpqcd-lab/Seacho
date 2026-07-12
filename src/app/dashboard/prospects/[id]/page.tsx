import { demoProspects } from '@/lib/demo-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge, FitScore } from '@/components/ui/badge';
import { CommentGenerator } from './comment-generator';
import { OutreachGenerator } from './outreach-generator';
import { notFound } from 'next/navigation';

export default function ProspectDetailPage({ params }: { params: { id: string } }) {
  const prospect = demoProspects.find((p) => p.id === params.id);
  if (!prospect) return notFound();

  return (
    <div className="flex flex-col gap-5">
      <Card className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="font-display text-2xl">{prospect.name}</h1>
            <p className="text-sm text-white/60">{prospect.headline}</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              <Badge>{prospect.platform}</Badge>
              {prospect.company && <Badge>{prospect.company}</Badge>}
              {prospect.location && <Badge>{prospect.location}</Badge>}
              <Badge className="capitalize">{prospect.pipeline_stage}</Badge>
            </div>
          </div>
          <FitScore score={prospect.fit_score} size={56} />
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Why they match</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 text-sm text-white/70">
            <p>{prospect.why_relevant}</p>
            {prospect.pain_points.length > 0 && (
              <div>
                <div className="mb-1 text-xs font-medium text-white/40">Pain points</div>
                <ul className="list-inside list-disc space-y-0.5">
                  {prospect.pain_points.map((pp) => (
                    <li key={pp}>{pp}</li>
                  ))}
                </ul>
              </div>
            )}
            {prospect.mutual_interests.length > 0 && (
              <div>
                <div className="mb-1 text-xs font-medium text-white/40">Mutual interests</div>
                <div className="flex flex-wrap gap-1.5">
                  {prospect.mutual_interests.map((mi) => (
                    <Badge key={mi}>{mi}</Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent activity</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 text-sm text-white/70">
            <p>{prospect.recent_activity}</p>
            <div>
              <div className="mb-1 text-xs font-medium text-white/40">Suggested approach</div>
              <p>{prospect.suggested_approach}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <CommentGenerator prospectId={prospect.id} prospectName={prospect.name} />
      <OutreachGenerator prospectId={prospect.id} prospectName={prospect.name} />
    </div>
  );
}
