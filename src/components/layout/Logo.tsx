// src/components/layout/Logo.tsx
import { Briefcase } from 'lucide-react';
import Link from 'next/link';

export function Logo({ collapsed }: { collapsed?: boolean }) {
  return (
    <Link href="/dashboard" className="flex items-center gap-2 text-sidebar-primary-foreground hover:text-sidebar-primary-foreground/90 transition-colors">
      <Briefcase className="h-7 w-7 text-sidebar-primary" />
      {!collapsed && <span className="text-xl font-semibold">LeavePilot</span>}
    </Link>
  );
}
