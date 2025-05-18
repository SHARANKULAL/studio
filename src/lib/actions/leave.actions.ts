// src/lib/actions/leave.actions.ts
"use server";

import type { LeaveRequest } from '@/types';
import { z } from 'zod';

// Mock database
let mockLeaveRequests: LeaveRequest[] = [
  { id: '1', userId: '1', userName: 'Demo User', startDate: new Date(2024, 6, 20), endDate: new Date(2024, 6, 22), leaveType: 'Vacation', reason: 'Family trip', status: 'Approved' },
  { id: '2', userId: '2', userName: 'Jane Doe', startDate: new Date(2024, 7, 1), endDate: new Date(2024, 7, 2), leaveType: 'Sick Leave', reason: 'Flu', status: 'Approved' },
  { id: '3', userId: '1', userName: 'Demo User', startDate: new Date(2024, 7, 10), endDate: new Date(2024, 7, 15), leaveType: 'Vacation', reason: 'Holiday', status: 'Pending' },
];

const LeaveRequestSchema = z.object({
  userId: z.string(),
  userName: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  leaveType: z.string().min(1, "Leave type is required"),
  reason: z.string().optional(),
});

export async function submitLeaveRequest(data: z.infer<typeof LeaveRequestSchema>) {
  const validatedData = LeaveRequestSchema.safeParse(data);
  if (!validatedData.success) {
    return { success: false, error: "Invalid data provided." };
  }

  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  const newLeaveRequest: LeaveRequest = {
    ...validatedData.data,
    id: String(mockLeaveRequests.length + 1),
    status: 'Pending', // Default status
  };
  mockLeaveRequests.push(newLeaveRequest);
  return { success: true, data: newLeaveRequest };
}

export async function getTeamLeaves(): Promise<LeaveRequest[]> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  // Filter for approved leaves for the calendar
  return mockLeaveRequests.filter(req => req.status === 'Approved');
}
