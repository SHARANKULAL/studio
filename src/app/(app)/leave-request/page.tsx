// src/app/(app)/leave-request/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LeaveRequestForm } from "@/components/leave/LeaveRequestForm";
import { Send } from "lucide-react";

export default function LeaveRequestPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Send className="h-8 w-8 text-primary" />
            <CardTitle className="text-2xl font-semibold">Submit Leave Request</CardTitle>
          </div>
          <CardDescription>Fill out the form below to request time off.</CardDescription>
        </CardHeader>
        <CardContent>
          <LeaveRequestForm />
        </CardContent>
      </Card>
    </div>
  );
}
