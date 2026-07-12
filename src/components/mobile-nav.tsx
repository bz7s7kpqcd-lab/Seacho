'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Radar, Users, KanbanSquare, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

// Compact mobile nav — full sidebar collapses to this below `sm`.
const items = [
  { href: '/dashboard', label: 'Home', icon: LayoutDashboard },
  { href: '/dashboard/opportunities', label: 'Opps', icon: Radar },
  { href: '/dashboard/prospects', label: 'Prospects', icon: Users },
  { href: '/dashboard/crm', label: 'CRM', icon: KanbanSquare },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
];

export function MobileNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20 flex justify-around border-t border-border bg-ink-900/90 py-2 backdrop-blur-xl sm:hidden">
      {items.map(({ href, label, icon: Icon }) => {
        const active = pathname === href;
        return (
          <Link key={href} href={href} className={cn('flex flex-col items-center gap-0.5 px-2 py-1 text-[10px]', active ? 'text-signal-soft' : 'text-white/50')}>
            <Icon size={18} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
