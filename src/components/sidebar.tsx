'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Radar,
  Users,
  MessageSquare,
  Send,
  Mail,
  Clock,
  KanbanSquare,
  BarChart3,
  Settings,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const items = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/opportunities', label: 'Opportunities', icon: Radar },
  { href: '/dashboard/prospects', label: 'Prospects', icon: Users },
  { href: '/dashboard/comments', label: 'Comments', icon: MessageSquare },
  { href: '/dashboard/messages', label: 'Messages', icon: Send },
  { href: '/dashboard/email-drafts', label: 'Email Drafts', icon: Mail },
  { href: '/dashboard/follow-ups', label: 'Follow Ups', icon: Clock },
  { href: '/dashboard/crm', label: 'CRM', icon: KanbanSquare },
  { href: '/dashboard/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r border-border bg-ink-900/60 p-4 backdrop-blur-xl sm:flex">
      <div className="mb-6 flex items-center gap-2 px-2">
        <div className="h-2 w-2 rounded-full bg-signal shadow-[0_0_8px_2px_rgba(245,166,35,0.6)]" />
        <span className="font-display text-lg tracking-tight">Seacho</span>
      </div>
      <nav className="flex flex-col gap-0.5">
        {items.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors',
                active ? 'bg-signal-dim text-signal-soft' : 'text-white/60 hover:bg-white/[0.05] hover:text-white'
              )}
            >
              <Icon size={16} />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
