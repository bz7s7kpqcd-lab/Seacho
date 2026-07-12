import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      // Not authenticated (e.g. demo mode) — accept and no-op so onboarding can proceed.
      return NextResponse.json({ ok: true, demo: true });
    }

    const { error } = await supabase.from('growth_context').upsert({
      user_id: user.id,
      product_name: body.product_name,
      one_liner: body.one_liner,
      website: body.website,
      target_customer: body.target_customer,
      industry: body.industry,
      keywords: body.keywords,
      competitors: body.competitors,
      goals: body.goals,
      updated_at: new Date().toISOString(),
    });

    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
