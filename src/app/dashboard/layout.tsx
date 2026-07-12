import { Sidebar } from '@/components/sidebar';
import { MobileNav } from '@/components/mobile-nav';
import { AIAssistant } from '@/components/ai-assistant';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-grid-fade">
      <Sidebar />
      <main className="flex-1 overflow-x-hidden px-5 pb-24 pt-6 sm:px-8 sm:pb-8">{children}</main>
      <MobileNav />
      <AIAssistant />
    </div>
  );
}
