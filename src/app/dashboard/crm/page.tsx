import { Card } from '@/components/ui/card';
import { FitScore } from '@/components/ui/badge';
import { demoProspects } from '@/lib/demo-data';
import type { PipelineStage } from '@/types';

const STAGES: { key: PipelineStage; label: string }[] = [
  { key: 'new', label: 'New' },
  { key: 'commented', label: 'Commented' },
  { key: 'connected', label: 'Connected' },
  { key: 'messaged', label: 'Messaged' },
  { key: 'replied', label: 'Replied' },
  { key: 'meeting', label: 'Meeting' },
  { key: 'customer', label: 'Customer' },
  { key: 'investor', label: 'Investor' },
  { key: 'lost', label: 'Lost' },
];

export default function CRMPage() {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-display text-2xl">CRM</h1>
        <p className="text-sm text-white/50">Every relationship, tracked through the pipeline.</p>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {STAGES.map((stage) => {
          const prospects = demoProspects.filter((p) => p.pipeline_stage === stage.key);
          return (
            <div key={stage.key} className="w-64 shrink-0">
              <div className="mb-2 flex items-center justify-between px-1">
                <span className="text-xs font-medium uppercase tracking-wide text-white/40">{stage.label}</span>
                <span className="font-mono text-xs text-white/30">{prospects.length}</span>
              </div>
              <div className="flex flex-col gap-2">
                {prospects.map((p) => (
                  <Card key={p.id} className="p-3">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <div className="text-sm font-medium">{p.name}</div>
                        <div className="text-xs text-white/40">{p.company}</div>
                      </div>
                      <FitScore score={p.fit_score} size={30} />
                    </div>
                  </Card>
                ))}
                {prospects.length === 0 && (
                  <div className="rounded-lg border border-dashed border-border p-3 text-center text-xs text-white/25">Empty</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
