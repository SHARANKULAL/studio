// src/lib/constants.ts
import type { NavItem } from '@/types';
import { LayoutDashboard, CalendarDays, Send, Lightbulb, FileText } from 'lucide-react';

export const NAV_ITEMS: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Leave Request',
    href: '/leave-request',
    icon: Send,
  },
  {
    title: 'Team Calendar',
    href: '/team-calendar',
    icon: CalendarDays,
  },
  {
    title: 'Policy Advisor',
    href: '/policy-advisor',
    icon: Lightbulb,
  },
];
