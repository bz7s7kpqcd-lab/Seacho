import OpenAI from 'openai';

// Central OpenAI client. Falls back gracefully so the app still runs in
// demo mode without a key configured — routes check `isConfigured` and
// return seed/demo content instead of calling the API.
export const isOpenAIConfigured = Boolean(process.env.OPENAI_API_KEY);

export function getOpenAIClient() {
  if (!isOpenAIConfigured) return null;
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

export const SYSTEM_PROMPT = `You are Seacho's AI growth assistant. You help founders identify
relevant people to talk to and draft thoughtful, personalized outreach.

Hard rules:
- Never write content that misrepresents who the sender is.
- Never write mass/generic spam — every draft should reference something
  specific and true about the prospect.
- You draft messages for a human to review and send themselves. You do not
  send anything automatically.
- Keep tone genuine and specific; avoid generic flattery ("great post!").`;
