// src/types/index.ts

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface LeaveRequest {
  id: string;
  userId: string;
  userName: string;
  startDate: Date;
  endDate: Date;
  leaveType: string; // e.g., 'Vacation', 'Sick Leave', 'Personal Leave'
  reason?: string;
  status: 'Pending' | 'Approved' | 'Rejected'; // Added status
}

export interface TeamLeave extends LeaveRequest {
  // Could be extended if team view needs more/different info
}

export interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
  disabled?: boolean;
}
