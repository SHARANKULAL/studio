// src/components/leave/TeamCalendarClient.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { getTeamLeaves } from '@/lib/actions/leave.actions';
import type { LeaveRequest } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, CalendarDays } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

interface LeaveDay {
  date: Date;
  users: { name: string; leaveType: string }[];
}

export function TeamCalendarClient() {
  const [leaves, setLeaves] = useState<LeaveRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(undefined);
  const [leaveDays, setLeaveDays] = useState<Map<string, LeaveDay>>(new Map());

  useEffect(() => {
    async function fetchLeaves() {
      try {
        setLoading(true);
        setError(null);
        const teamLeaves = await getTeamLeaves();
        setLeaves(teamLeaves);

        const newLeaveDays = new Map<string, LeaveDay>();
        teamLeaves.forEach(leave => {
          let currentDate = new Date(leave.startDate);
          const endDate = new Date(leave.endDate);
          while (currentDate <= endDate) {
            const dateString = currentDate.toDateString();
            const dayData = newLeaveDays.get(dateString) || { date: new Date(currentDate), users: [] };
            dayData.users.push({ name: leave.userName, leaveType: leave.leaveType });
            newLeaveDays.set(dateString, dayData);
            currentDate.setDate(currentDate.getDate() + 1);
          }
        });
        setLeaveDays(newLeaveDays);

      } catch (err) {
        console.error("Failed to fetch team leaves:", err);
        setError("Could not load team leave data. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchLeaves();
  }, []);

  const modifiers = {
    onLeave: Array.from(leaveDays.keys()).map(dateString => new Date(dateString)),
  };

  const modifiersStyles = {
    onLeave: {
      backgroundColor: 'hsl(var(--primary) / 0.2)',
      color: 'hsl(var(--primary-foreground))',
      fontWeight: 'bold',
      borderRadius: 'var(--radius)',
    },
  };
  
  const selectedDayLeaves = selectedDate ? leaveDays.get(selectedDate.toDateString()) : undefined;

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-1/2" />
        <Skeleton className="h-[350px] w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-2 shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-3">
             <CalendarDays className="h-8 w-8 text-primary" />
            <CardTitle className="text-2xl font-semibold">Team Leave Calendar</CardTitle>
          </div>
          <CardDescription>Approved leave days for the team. Click on a day to see details.</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            modifiers={modifiers}
            modifiersStyles={modifiersStyles}
            className="rounded-md border p-4 shadow-sm"
            numberOfMonths={1} // Show one month by default, can be increased
          />
        </CardContent>
      </Card>
      <Card className="md:col-span-1 shadow-lg h-fit">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            {selectedDate ? format(selectedDate, 'PPP') : 'Details'}
          </CardTitle>
          <CardDescription>
            {selectedDate ? 'Employees on leave:' : 'Select a date to view leave details.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {selectedDate && selectedDayLeaves && selectedDayLeaves.users.length > 0 ? (
            <ul className="space-y-3">
              {selectedDayLeaves.users.map((userLeave, index) => (
                <li key={index} className="flex items-center justify-between p-3 bg-muted rounded-md">
                  <div>
                    <p className="font-medium">{userLeave.name}</p>
                    <p className="text-sm text-muted-foreground">{userLeave.leaveType}</p>
                  </div>
                  <Badge variant="secondary" className="bg-primary/20 text-primary-foreground">{userLeave.leaveType}</Badge>
                </li>
              ))}
            </ul>
          ) : selectedDate ? (
            <p className="text-muted-foreground">No team members on leave on this day.</p>
          ) : (
             <p className="text-muted-foreground">Click on a date in the calendar to see who is on leave.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// Helper to format date for Map key
const format = (date: Date, fmt: string): string => {
  // Simplified format function for demonstration. Use date-fns for robust formatting.
  if (fmt === 'PPP') {
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  }
  return date.toDateString();
};
